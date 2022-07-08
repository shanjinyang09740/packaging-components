const domParser = new DOMParser()

const ajax = (config) => {
  let { method = "GET", url, headers, data, responseType, timeout } = config
  if (method != "GET" && method != "POST") {
    return Promise.reject(new Error("Unkown KeyWord"))
  }
  let _xhr
  let ajax = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    _xhr = xhr
    xhr.open(method, url, true)
    if (timeout) {
      xhr.timeout = timeout
    }
    for (let key in headers) {
      xhr.setRequestHeader(key, headers)
    }
    if (responseType) {
      xhr.responseType = responseType
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status
        if (status === 0 || (status >= 200 && status < 400)) {
          resolve(xhr.response)
        } else {
          reject(status)
        }
      }
    }
    xhr.send(data)
  })

  ajax.xhr = _xhr
  ajax.abort = () => {
    _xhr.abort()
  }

  return ajax
}
const get = (url, responseType = "text") => {
  return ajax({
    method: "GET",
    url,
    responseType,
  })
}
const post = (url, data, responseType = "text") => {
  return ajax({
    method: "POST",
    url,
    data,
    responseType,
  })
}
const html = (url, data) => {
  return ajax({
    method: data ? "POST" : "GET",
    url,
    data,
    responseType: "document",
  })
}
const xml = (url, data) => {
  return ajax({
    method: data ? "POST" : "GET",
    url,
    data,
    responseType: "document",
  })
}
const json = (url, data) => {
  return ajax({
    method: data ? "POST" : "GET",
    url,
    data,
    responseType: "json",
  })
}
const blob = (url, data) => {
  return ajax({
    method: data ? "POST" : "GET",
    url,
    data,
    responseType: "blob",
  })
}
const arrayBuffer = (url, data) => {
  return ajax({
    method: data ? "POST" : "GET",
    url,
    data,
    responseType: "arrayBuffer",
  })
}
export { ajax, get, post, html, xml, json, blob, arrayBuffer }
