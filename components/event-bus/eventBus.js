/**
 * @description 创建全局Vue事件总线 EventBus
 * 
*/
const EventBus = (Vue) => {
    const Bus = new Vue({
        methods: {
            on(event, ...args){
                this.$on(event, ...args);
            },
            emit(event, callback){
                this.$emit(event, callback);
            },
            off(event, callback){
                this.$off(event, callback);
            }
        }
    });
    Vue.prototype.$bus = Bus;
}
export default EventBus;


/**
 * @description 在 main.js 中引入全局事件总线 eventBus.js --- vue中使用
 * 
*/
import Bus from "@/utils/eventBus";
Vue.use(Bus);


/**
 * @description 在组件中使用
 * 
*/
//在mounted中监听事件
mounted() {
    //监听数据管理级联选择器事件
    this.$bus.on("panelSelect", (data) => {
      this.panelSelect(data);
    });
}

/**
 * @description 数据管理级联选择器
 *
 */
function panelSelect(val) {
this.showECHARTS = false;
if (val[0] === "recover,恢复") {
    this.changeData();
} else {
    const loading = Loading.service({
    lock: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
    target: document.querySelector(".app-main"),
    });
    calculate(this.reqData, val)
    .then((res) => {
        this.reqData = res.data[0].data;
        this.titleOptions = res.data[0].data.title.content;
        this.mainData.rows = res.data[0].data.main.content;
        this.side = res.data[0].data.side.content;
        this.dataGrid = res.data[0].data.dataGrid;
        if (this.titleOptions[0]) {
        this.titleValue = this.titleOptions[0].value;
        }
    })
    .finally(() => {
        loading.close();
    });
}
}

//在事件中触发



//在beforeDestroy中解绑事件
beforeDestroy() {
    this.$bus.off("panelSelect");
},