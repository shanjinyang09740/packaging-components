
function passAjax() {
    fetch("./test.json").then(response => response.json()).then(data => console.log(3333, data));
}