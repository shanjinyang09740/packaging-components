<!--
1.高级查询组件需要传tableSearch方法 会将form表单作为第一个参数传出

2.需要传名为columns的数组，也就是要展示的form所有表单
例：queryColumns: [
        {
          label: "项目年度",          //表单名称
          placeholder: "请选择年度",    
          type: "select",            // select/input两种类型，不传默认input类型
          searchShow: true,          //是否显示在上面作为主查询条件
          labelWidth:'110px',        //名称宽度值,默认68px
          modelData: "projectYear",  //双向绑定数据
          selectrequest: {           //只有select需要传
            url: "/api/core/v1/dictionary/queryData.do?dicId=pStatus",
            params: [],
          },                        
        },
        {
          label: "项目名称",
          placeholder: "请输入项目名称",
          modelData: "projectName",
          type: "input",
          searchShow: true,
        },
        //如果多选，会将value值以逗号分隔拼接返回
        {
          label: "组织部门",
          labelWidth: "80px",
          placeholder: "请选择组织部门",
          type: "select-tree", //下拉树
          isMultiple: false, //是否多选，默认多选
          searchShow: false,
          modelData: "organizationDepartment",
          selectrequest: {
            url: "/api/oa/userManage/orgInfoList.do",
            params: [],
          },
        },
        
        ]

3.样式问题：这个组件外层需要包一个div，设置div的高度和宽度，决定组件宽高和位置等信息，组件自适应
-->

<template>
  <div class="highlevel-query">
    <div class="wrapper">
      <div class="header">
        <fu-form
          :model="form"
          :inline="true"
          :style="{ visibility: popoverVisible ? 'hidden' : 'visible' }"
        >
          <fu-form-item
            v-for="(item, index) in filterColumn"
            :key="item.modelData"
            :label="item.label"
            :label-width="item.labelWidth || '68px'"
          >
            <fu-select
              v-if="item.type && item.type === 'select'"
              size="medium"
              v-model="form[item.modelData]"
              :placeholder="item.placeholder || ''"
              clearable
              filterable
            >
              <fu-option
                v-for="every in item.selectOptions"
                :key="every.value"
                :value="every.value"
                :label="every.text"
              ></fu-option>
            </fu-select>
            <fu-input
              v-else
              size="medium"
              v-model="form[item.modelData]"
              :placeholder="item.placeholder || ''"
            ></fu-input>
          </fu-form-item>
        </fu-form>
        <div class="search-btn">
          <fu-button
            type="primary"
            size="medium"
            @click="tableSearch"
            :style="{ visibility: popoverVisible ? 'hidden' : 'visible' }"
            >查询</fu-button
          >
          <fu-button
            type="primary"
            size="medium"
            style="width:100px"
            @click="highlevelQuery"
            >{{ !popoverVisible ? "高级查询" : "收起" }}</fu-button
          >
        </div>
      </div>
      <fu-popover
        class="popover"
        trigger="click"
        placement="left"
        v-model="popoverVisible"
        :visible-arrow="false"
        width="429"
      >
        <div class="text">高级搜索</div>
        <div class="form">
          <fu-form :model="form">
            <fu-form-item
              v-for="(item, index) in columns"
              :key="item.modelData"
              :label="item.label"
              :label-width="item.labelwidth || '100px'"
            >
              <fu-select
                v-if="item.type && item.type === 'select'"
                size="medium"
                v-model="form[item.modelData]"
                :placeholder="item.placeholder || ''"
                clearable
                filterable
              >
                <fu-option
                  v-for="every in item.selectOptions"
                  :key="every.value"
                  :value="every.value"
                  :label="every.text"
                ></fu-option>
              </fu-select>
              <fu-input
                v-else-if="item.type && item.type === 'input'"
                size="medium"
                v-model="form[item.modelData]"
                :placeholder="item.placeholder || ''"
              ></fu-input>
              <!-- 下拉树 -->
              <fu-select
                placeholder="请选择"
                v-else-if="item.type && item.type === 'select-tree'"
                size="medium"
                v-model="form[item.modelData]"
                clearable
                @clear="clearSelect(item)"
              >
                <fu-option
                  :value="form[item.modelData]"
                  :label="item.selectTreeLabel"
                >
                  <fu-tree
                    size="medium"
                    :fu-data="item.selectOptions"
                    :ref="`${item.modelData}SelectTree`"
                    node-key="id"
                    :props="{ label: 'text' }"
                    :show-checkbox="true"
                    :check-strictly="true"
                    :default-expand-all="true"
                    @check-change="
                      (data, checked) => handleCheckChange(data, checked, item)
                    "
                  >
                  </fu-tree>
                </fu-option>
              </fu-select>
            </fu-form-item>
          </fu-form>
          <div class="btn">
            <fu-button size="medium" type="primary" @click="tableSearch"
              >查询</fu-button
            >
            <fu-button size="medium" @click="resetForm">重置</fu-button>
          </div>
        </div>
      </fu-popover>
    </div>
  </div>
</template>
<script>
import {
  Select,
  Option,
  Button,
  Form,
  FormItem,
  Input,
  Tree,
  Popover,
} from "@/FuComponents";
import { postJSON } from "@/utils/post.js";
export default {
  components: {
    FuSelect: Select,
    FuOption: Option,
    FuButton: Button,
    FuForm: Form,
    FuFormItem: FormItem,
    FuInput: Input,
    FuPopover: Popover,
    FuTree: Tree,
  },
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  created() {
    //批量请求下拉框数据
    if (this.columns.length !== 0) {
      this.columns.forEach((item, index) => {
        //形成页面的form表单
        if (item.modelData) {
          this.$set(this.form, item.modelData, "");
          // this.form[item.modelData] = "";
        } else {
          console.log(`${item.label}表单没填写双向绑定变量！`);
        }
        if (
          item.type &&
          (item.type === "select" || item.type === "select-tree")
        ) {
          this.querySelectOrTree(item, index);
        }
      });
      console.log("form", this.form);
    }
  },
  computed: {
    //上面主查询条件数组
    filterColumn() {
      return this.columns.filter((item) => {
        return item.searchShow === true;
      });
    },
  },
  data() {
    return {
      popoverVisible: false,
      //表单
      form: {},
    };
  },
  methods: {
    /**
     * @description   下拉树类型转换树形结构
     */
    transformTozTreeFormat(sNodes) {
      //将普通的数组转换为父子结构
      let i, l;
      let r = [];
      let tmpMap = {};
      for (i = 0, l = sNodes.length; i < l; i++) {
        tmpMap[sNodes[i].id] = sNodes[i];
      }
      for (i = 0, l = sNodes.length; i < l; i++) {
        let p = tmpMap[sNodes[i].pId];
        if (p && sNodes[i].id != sNodes[i].pId) {
          let children = this.nodeChildren(p);
          if (!children) {
            children = this.nodeChildren(p, []);
          }
          children.push(sNodes[i]);
        } else {
          r.push(sNodes[i]);
        }
      }
      return r;
    },
    nodeChildren(node, newChildren) {
      if (typeof newChildren !== "undefined") {
        node.children = newChildren;
      }
      return node.children;
    },
    highlevelQuery() {
      //收起高级查询时清空其他未显示的查询条件
      if (this.popoverVisible) {
        this.columns.forEach((item) => {
          if (!item.searchShow) {
            this.form[item.modelData] = "";
          }
        });
      }
      this.popoverVisible = !this.popoverVisible;
    },
    querySelectOrTree(item) {
      if (item.selectrequest && item.selectrequest.url) {
        postJSON(item.selectrequest.url, {
          postData: JSON.stringify({ data: item.selectrequest.params }),
        })
          .then((res) => {
            //下拉树接口处理返回数据，变成树形结构数据
            if (item.type === "select-tree") {
              this.$set(
                item,
                "selectOptions",
                this.transformTozTreeFormat(res.data[0].data)
              );
            } else {
              this.$set(item, "selectOptions", res.data[0].data);
            }
          })
          .catch((e) => {
            console.log(`${item.fuId}${item.type}请求失败！：`, e);
          });
      }
    },
    tableSearch() {
      this.$emit("tableSearch", this.form);
    },
    resetForm() {
      for (let i in this.form) {
        this.form[i] = "";
      }
    },
    handleCheckChange(data, checked, item) {
      //单选时，因为这个方法在重新点击其他复选框时会触发两次，所以只能通过获取ckeys的方式清空
      let ckeys = this.$refs[
        `${item.modelData}SelectTree`
      ][0].$refs.el.getCheckedNodes();
      console.log("data", ckeys);
      let texts = [],
        values = [];
      ckeys.forEach((item) => {
        texts.push(item.text);
        values.push(item.value);
      });
      this.form[item.modelData] = values.join(",");
      this.$set(item, "selectTreeLabel", texts.join(","));
      // this.selectTreeLabel = texts.join(",");
      if (!item.isMultiple) {
        //单选的逻辑
        if (checked == true) {
          //选择其他选项  控制单选
          this.$refs[
            `${item.modelData}SelectTree`
          ][0].$refs.el.setCheckedNodes([data]);
          // this.form[item.modelData] = data["value"];
          // this.$set(item, "selectTreeLabel", texts.join(","));
        }
      }
    },
    /**清空下拉树内的值 */
    clearSelect(item) {
      //清空树的选中节点
      this.form[item.modelData] = "";
      this.$set(item, "selectTreeLabel", "");
      this.$refs[`${item.modelData}SelectTree`].$refs.el.setCheckedNodes([]);
    },
  },
};
</script>
<style lang="less" scoped>
.highlevel-query {
  width: 100%;
  height: 100%;
  .text {
    font-weight: bold;
  }
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .header {
      display: flex;
      width: 100%;
      height: 100%;

      /deep/.el-form {
        display: flex;
        height: 100%;
        overflow: auto;
        overflow-y: hidden;
        width: calc(100% - 185px);
        .el-form-item {
          display: flex;
        }
        .el-input {
          width: 180px;
        }
      }
      .search-btn {
        width: 180px;
        margin-left: 5px;
      }
    }
    /deep/.el-popover {
      position: absolute;
      right: 0;
      top: 60px;
    }
  }
  .form {
    padding: 20px;
    /deep/.el-form {
      // margin-left: 23px;
      .el-form-item {
        .el-input {
          width: 250px;
        }
      }
    }

    .btn {
      margin-left: auto;
      margin-right: auto;
      width: 167px;
      margin-top: 37px;
    }
  }
}
//下拉树样式
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  max-height: 100%;
  padding: 0;
  overflow: hidden;
  // overflow-y: auto;
  height: 100%;
  width: 250px;
}
</style>
