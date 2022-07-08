import $ from "../utils/Element"

let body = $("body")

$("<div class='c1'>111111</div>").appendTo(body)
$("<div class='c2'>2222</div>").appendTo(body)
$("<div class='c2'>3333</div>").appendTo(body)
$("<div class='c3'>4444</div>").appendTo(body)
$("<div class='c3'>5555</div>").appendTo(body)

import WebNetIO from "../../WebNetIO"

window.html = WebNetIO.get("http://localhost:8080/test.xml")
console.log(html, html.xhr)
html.xhr.onabort = () => {
  console.log(11111)
}
html.abort()
html.then((data) => {
  console.log(data)
})
