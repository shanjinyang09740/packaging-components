class UserCard extends HTMLElement {
    constructor() {
        super();
        var templateEle = document.querySelector("#userCardComp");
        var cloneNode = templateEle.content.cloneNode(true);
        this.append(cloneNode);
    }
}
window.customElements.define("user-card", UserCard);