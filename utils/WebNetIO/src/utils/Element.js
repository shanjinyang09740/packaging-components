import Event from "./Event"

const domParser = new DOMParser()

const isElement = (dom) => dom instanceof Element
const isNodeList = (dom) => dom instanceof NodeList

class Element extends Event {
  constructor(elements) {
    super()
    if (isNodeList(elements)) {
      elements = [...elements]
    } else {
      elements = [elements]
    }
    this.els = elements
    this.euid = Date.now()
    this._remarkIndex()
  }
  /**
   * ===================
   * 私有方法
   * ===================
   */
  _remarkIndex() {
    let i = 0
    if (this.length) {
      while (i < this.length) {
        delete this[i]
        i++
      }
    }
    this._remarkLength()
    i = 0
    while (i < this.length) {
      this[i] = this.els[i]
      i++
    }
  }
  _remarkLength() {
    this.length = this.els.length
  }
  /**
   * ===================
   * 查询操作
   * ===================
   */
  eq(i) {
    return new Element(this.els[i])
  }
  find(a) {
    return $(a, this.els[0])
  }
  first() {
    return this.eq(0)
  }
  last() {
    return this.eq(this.length - 1)
  }
  /**
   * ===================
   * 轮询
   * ===================
   */
  forEach() {
    Array.prototype.forEach.apply(this.els, arguments)
  }
  map() {
    Array.prototype.map.apply(this.els, arguments)
  }
  some() {
    Array.prototype.some.apply(this.els, arguments)
  }
  errey() {
    Array.prototype.errey.apply(this.els, arguments)
  }
  /**
   * ===================
   * 属性操作
   * ===================
   */
  attr(a, b) {
    if (typeof a == "object") {
      for (var key in a) {
        this.els.forEach((e) => {
          e.setAttribute(key, a[key])
        })
      }
    } else if (b != undefined) {
      this.els.forEach((e) => {
        e.setAttribute(a, b)
      })
    } else {
      return this.els[0].getAttribute(a)
    }
  }
  /**
   * ===================
   * 样式操作
   * ===================
   */
  css(a, b) {
    if (typeof a == "object") {
      for (var key in a) {
        this.els.forEach((e) => {
          e.style[key] = a[key]
        })
      }
    } else if (b != undefined) {
      this.els.forEach((e) => {
        e.style[a] = b
      })
    } else {
      return this.els[0].style[a]
    }
  }
  /**
   * ===================
   * 类操作
   * ===================
   */
  addClass(classNames) {
    classNames = classNames.split(" ")
    this.els.forEach((e) => {
      e.classList.add(...classNames)
    })
  }
  removeClass(classNames) {
    classNames = classNames.split(" ")
    this.els.forEach((e) => {
      e.classList.remove(...classNames)
    })
  }
  toggleClass(className) {
    this.els.forEach((e) => {
      e.classList.toggle(className)
    })
  }
  /**
   * ===================
   * 节点操作
   * ===================
   */

  /**
   * 向目标节点的子节点后插入选中节点
   * @param {Node|NodeList|Element} dom
   * @returns {this}
   */
  append(dom) {
    if (!dom) {
      return this
    }
    let _dom = dom
    if (!isElement(dom)) {
      _dom = $(dom)
    }
    _dom.forEach((d) => {
      this.els[0].append(d)
    })
    return this
  }
  /**
   * 将选中节点插入到目标节点子节点尾部
   * @param {Node|NodeList|Element} dom
   * @returns {this}
   */
  appendTo(dom) {
    if (!dom) {
      return this
    }
    let _dom = dom
    if (!isElement(dom)) {
      _dom = $(dom)
    }
    this.els.forEach((el) => {
      _dom[0].append(el)
    })
    return this
  }
  /**
   * 向目标节点的子节点前插入选中节点
   * @param {Node|NodeList|Element} dom
   * @returns {this}
   */
  prepend(dom) {
    if (!dom) {
      return this
    }
    let _dom = dom
    if (!isElement(dom)) {
      _dom = $(dom)
    }
    let firstChild = this.els[0].firstChild
    _dom.forEach((d) => {
      this.els[0].insertBefore(d, firstChild)
    })
    return this
  }
  /**
   * 将选中节点插入到目标节点的子节点头部
   * @param {Node|NodeList|Element} dom
   * @returns {this}
   */
  prependTo(dom) {
    if (!dom) {
      return this
    }
    let _dom = dom
    if (!isElement(dom)) {
      _dom = $(dom)
    }
    let firstChild = _dom[0].firstChild
    this.els.forEach((e) => {
      _dom[0].insertBefore(e, firstChild)
    })
    return this
  }
  /**
   * 在被选中节点后插入目标节点
   * @param {Node|NodeList|Element} dom
   * @returns {this}
   */
  after(dom) {
    if (!dom) {
      return this
    }
    let _dom = dom
    if (!isElement(dom)) {
      _dom = $(dom)
    }
    let parentNode = this.els[0].parentNode
    _dom.forEach((_d) => {
      parentNode.insertBefore(_d, this.els[0].nextSibling)
    })
    return this
  }
  /**
   * 在被选中节点前插入目标节点
   * @param {Node|NodeList|Element} dom
   * @returns {this}
   */
  before(dom) {
    if (!dom) {
      return this
    }
    let _dom = dom
    if (!isElement(dom)) {
      _dom = $(dom)
    }
    let parentNode = this.els[0].parentNode
    _dom.forEach((_d) => {
      parentNode.insertBefore(_d, this.els[0])
    })
    return this
  }
  /**
   * 设置或获得选中节点的innerHTML
   * @param {DOMString|?} dom
   * @returns {DOMString|?}
   */
  html(str) {
    if (str === undefined) {
      return this.els[0].innerHTML
    } else {
      this.els[0].innerHTML = str
    }
  }
}

const $ = (a, parentNode) => {
  if (typeof a == "string") {
    if (a.startsWith("<")) {
      let nodes = domParser.parseFromString(a, "text/html").body.childNodes
      return new Element(nodes)
    } else {
      parentNode = parentNode || document
      return new Element(parentNode.querySelectorAll(a))
    }
  } else {
    return new Element(a)
  }
}

export default $
