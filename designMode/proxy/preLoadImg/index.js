let imageNode = null;
window.onload = function() {
    loadImage();
};

let myImage = (function() {
    let containDom = document.querySelector("#contain");
    if (!imageNode) {
        imageNode = document.createElement("img");
        containDom.appendChild(imageNode);
    }
    return function(src) {
        imageNode.src = src;
    };
})();

let proxyImage = (function() {
    let newImg = new Image();
    newImg.onload = function() {
        myImage(this.src);
    };
    return function(src) {
        myImage("./images/loading.png");
        newImg.src = src;
    };
})();

function loadImage() {
    proxyImage("./images/bg.png");
}