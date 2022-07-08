/**
 * @class
 * @description 键盘监听事件(订阅发布者模式)
 * @author ZHAO.CJ
 *
 * 懒得实现 https://blog.csdn.net/weixin_34260071/article/details/112670523
 * 对照表 https://codeplayer.vip/app/key-event-which-keycodes
 */

// TODO. AVAILABLE_KEY_LIST 这东西可以去掉 无所谓
const AVAILABLE_KEY_LIST = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "ESC",
  "TAB",
  "UP",
  "DOWN",
  "LEFT",
  "RIGHT",
  "DELETE",
  "SHIFT",
  "CTRL",
  "ALT",
]

const AVAILABLE_KEY_MAP = [
  { key: "A", keyCode: 65 },
  { key: "B", keyCode: 66 },
  { key: "C", keyCode: 67 },
  { key: "D", keyCode: 68 },
  { key: "E", keyCode: 69 },
  { key: "F", keyCode: 70 },
  { key: "G", keyCode: 71 },
  { key: "H", keyCode: 72 },
  { key: "I", keyCode: 73 },
  { key: "J", keyCode: 74 },
  { key: "K", keyCode: 75 },
  { key: "L", keyCode: 76 },
  { key: "M", keyCode: 77 },
  { key: "N", keyCode: 78 },
  { key: "O", keyCode: 79 },
  { key: "P", keyCode: 80 },
  { key: "Q", keyCode: 81 },
  { key: "R", keyCode: 82 },
  { key: "S", keyCode: 83 },
  { key: "T", keyCode: 84 },
  { key: "U", keyCode: 85 },
  { key: "V", keyCode: 86 },
  { key: "W", keyCode: 87 },
  { key: "X", keyCode: 88 },
  { key: "Y", keyCode: 89 },
  { key: "Z", keyCode: 90 },
  { key: "0", keyCode: 48 },
  { key: "1", keyCode: 49 },
  { key: "2", keyCode: 50 },
  { key: "3", keyCode: 51 },
  { key: "4", keyCode: 52 },
  { key: "5", keyCode: 53 },
  { key: "6", keyCode: 54 },
  { key: "7", keyCode: 55 },
  { key: "8", keyCode: 56 },
  { key: "9", keyCode: 57 },
  { key: "ESC", keyCode: 27 },
  { key: "UP", keyCode: 38 },
  { key: "DOWN", keyCode: 40 },
  { key: "LEFT", keyCode: 37 },
  { key: "RIGHT", keyCode: 39 },
  { key: "DELETE", keyCode: 46 },
  { key: "TAB", keyCode: 9 },
]

import Event from "./Event"

class KeyEvent extends Event {
  /**
   * @constructor
   */
  constructor(eventName) {
    super()
    if (eventName != "keyup" || eventName != "keydown") {
      eventName = "keyup"
    }
    this.initEvent(eventName)
  }

  /**
   * @description 初始化键盘事件
   */
  initEvent(eventName) {
    // TODO. 先只监听keyup
    document.addEventListener(eventName, (event) => {
      const eventKey = event.key.toUpperCase()
      let keyName
      AVAILABLE_KEY_MAP.some(({ key }) => {
        if (key === eventKey) {
          keyName = key
          return true
        } else {
          return false
        }
      })
      if (keyName) {
        let result = [keyName]
        if (event.altKey) {
          result.push("ALT")
        }
        if (event.shiftKey) {
          result.push("SHIFT")
        }
        if (event.ctrlKey) {
          result.push("CTRL")
        }
        // 必须执行排序 保证和绑定时候的key逻辑一样
        result = result.sort().join("+")
        super.emit(result, event)
        super.emit("keyup", {
          key: result,
          event,
        })
        // TODO. 先强制阻止冒泡
        event.preventDefault()
        event.stopPropagation()
      }
    })
  }

  /**
   * @description 初始化键盘事件
   */
  _checkKeyName(keyName) {
    return keyName
      .split("+")
      .every((key) => AVAILABLE_KEY_LIST.indexOf(key) != -1)
  }
  /**
   * @description 初始化键盘事件
   */
  _renameKeyName(keyName) {
    return keyName.split("+").sort().join("+")
  }

  /**
   * @description 绑定事件
   * @param {String} name 事件名
   * @param {Function} callback 回调事件
   */
  $on(name, callback) {
    super.on(name, callback)
  }

  /**
   * @description 绑定事件
   * @param {String} name 事件名
   * @param {Function} callback 回调事件
   */
  on(name, callback) {
    name = name.toLocaleUpperCase()
    if (this._checkKeyName(name)) {
      name = this._renameKeyName(name)
      super.on(name, callback)
    } else {
      return new Error("keyName 非法")
    }
  }

  /**
   * @description 绑定事件
   * @param {String} name 事件名
   * @param {Function} callback 回调事件
   */
  $once(name, callback) {
    super.once(name, callback)
  }

  /**
   * @description 单次绑定事件
   * @param {String} name 事件名
   * @param {Function} callback 回调事件
   */
  once(name, callback) {
    name = name.toLocaleUpperCase()
    if (this._checkKeyName(name)) {
      name = this._renameKeyName(name)
      super.once(name, callback)
    } else {
      return new Error("keyName 非法")
    }
  }

  /**
   * @description 单次绑定事件
   * @param {String} name 事件名
   * @param {Function|String|?} info 回调事件|绑定事件的ID
   */
  off(name, info) {
    name = name.toLocaleUpperCase()
    if (this._checkKeyName(name)) {
      name = this._renameKeyName(name)
      super.off(name, info)
    } else {
      return new Error("keyName 非法")
    }
  }

  /**
   * @description 触发事件(禁用)
   * @param {String} name 事件名
   * @param {Object} data 数据
   */
  emit(name, data) {
    super.emit(name, data)
  }
}

export default KeyEvent
