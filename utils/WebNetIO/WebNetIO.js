import $ from "@utils/Element"
import * as Req from "@utils/Req"
import Event from "@utils/Event"
import KeyEvent from "@utils/KeyEvent"

let WebNetIO = new Object()

const extend = (target, modules) => {
  for (let key in modules) {
    target[key] = modules[key]
  }
}
const extendProto = (target, modules) => {
  for (let key in modules) {
    target.__proto__[key] = modules[key]
  }
}

extend(WebNetIO, Req)

extendProto($, Req)

WebNetIO.$ = $

WebNetIO.Event = Event

WebNetIO.KeyEvent = KeyEvent

window.WebNetIO = WebNetIO

export default WebNetIO
