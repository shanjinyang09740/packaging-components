/**
 * @author zhaoyongsheng@gwssi.com
 * @version 0.1
 * @description 事件类
 * @name event
 */

/**
 * 事件列表
 * eventMap => <Map> {
 *      eventName: <Map> {
 *          callback: function(){},
 *          once: true|false
 *      }
 * }
 */
let eventMap = new Map()
// 计步器
let step = 1

/**
 * @class
 * @description event事件类
 */
class Event {
  /**
   * @constructor
   * @param {String} moduleName 设置Event绑定的模块名
   */
  constructor(moduleName = "Root") {
    this.eventName = `Event.${moduleName}`
  }

  /**
   * @description 绑定事件
   * @param {String} name 事件名
   * @param {Function} callback 回调事件
   */
  on(name, callback) {
    let UUID = `${Date.now()}-${step++}`
    if (!eventMap.has(name)) {
      eventMap.set(name, new Map())
    }
    eventMap.get(name).set(UUID, {
      callback: callback,
      once: false,
    })
    return UUID
  }

  /**
   * @description 单次绑定事件
   * @param {String} name 事件名
   * @param {Function} callback 回调事件
   */
  once(name, callback) {
    let UUID = `${Date.now()}-${step++}`
    if (!eventMap.has(name)) {
      eventMap.set(name, new Map())
    }
    eventMap.get(name).set(UUID, {
      callback: callback,
      once: true,
    })
    return UUID
  }

  /**
   * @description 单次绑定事件
   * @param {String} name 事件名
   * @param {Function|String|?} info 回调事件|绑定事件的ID
   */
  off(name, info) {
    if (eventMap.has(name)) {
      let ite = eventMap.get(name)
      if (info === undefined) {
        // 删除name下全部callback
        eventMap.delete(name)
      } else if (typeof info === "function") {
        // 查找方法体并删除
        for (let [id, info] of ite) {
          if (info.callback === info) {
            ite.delete(id)
          }
        }
      } else {
        // 根据id删除方法
        ite.delete(info)
      }
    }
  }

  /**
   * @description 触发事件
   * @param {String} name 事件名
   * @param {Object} data 数据
   */
  emit(name, data) {
    if (eventMap.has(name)) {
      let ite = eventMap.get(name)
      for (let [id, info] of ite) {
        info.callback.call(this, data)
        if (info.once) {
          ite.delete(id)
        }
      }
    }
  }
}

export default Event
