<template>
  <div class="create-project">
    <div class="header">
      <div class="left">
        <fu-button size="medium" type="primary">立项</fu-button>
        <fu-button size="medium" type="primary">导出</fu-button>
      </div>
      <div class="right">
        <highlevel-query :columns="queryColumns" @tableSearch="tableSearch">
        </highlevel-query>
      </div>
    </div>
    <div class="table fu-table-wrapper">
      <fu-table
        ref="create-table"
        border
        :fu-request="tableReq"
        :fu-data="table.data"
      >
        <fu-table-column
          type="index"
          label="序号"
          align="center"
          width="70"
          :index="computedIndex"
        >
        </fu-table-column>
        <fu-table-column
          v-for="(item, index) in table.columns"
          show-overflow-tooltip
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :min-width="item.width"
        >
          <template slot-scope="scope">
            <span v-if="item.prop == 'pType'">
              {{ tableChangeCode(scope.row[item.prop], typeSelect) }}
            </span>
            <span v-else-if="item.prop == 'supervisionWay'">{{
              tableChangeCode(scope.row[item.prop], governWaySelect)
            }}</span>
            <span v-else-if="item.prop == 'approvalStatus'">{{
              tableChangeCode(scope.row[item.prop], projectStatus)
            }}</span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </fu-table-column>
      </fu-table>
      <fu-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="table.data.page"
        :page-size="table.data.pagerows"
        :page-sizes="[5, 10, 20, 50]"
        :total="table.data.totalrows"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :fu-request="tableReq"
      >
      </fu-pagination>
    </div>
  </div>
</template>

<script>
import {
  Table,
  TableColumn,
  Select,
  Option,
  Button,
  Form,
  FormItem,
  Input,
  Pagination,
} from "@/FuComponents";
import { postJSON } from "@/utils/post.js";
import HighlevelQuery from "@/components/HighlevelQuery.vue";
export default {
  components: {
    FuTable: Table,
    FuTableColumn: TableColumn,
    FuSelect: Select,
    FuOption: Option,
    FuButton: Button,
    FuForm: Form,
    FuFormItem: FormItem,
    FuInput: Input,
    FuPagination: Pagination,

    HighlevelQuery,
  },
  data() {
    return {
      popoverVisible: false,
      queryForm: {
        projectYear: "",
        projectName: "",
        projectState: "",
        projectType: "",
        governWay: "",
        projectProcess: "",
        operation: "0",
      },
      //项目类型
      typeSelect: [],
      //项目立项状态
      projectStatus: [],
      //监督方式
      governWaySelect: [],
      //高级查询的参数
      queryColumns: [
        {
          label: "项目年度",
          labelWidth: "80px",
          placeholder: "请选择年度",
          type: "select",
          searchShow: true,
          modelData: "projectYear",
          selectrequest: {
            url: "/api/oa/projectArguments/getProjectYearList.do",
            params: [],
          },
        },
        {
          label: "项目名称",
          labelWidth: "80px",
          placeholder: "请输入项目名称",
          modelData: "projectName",
          type: "input",
          searchShow: true,
        },
        {
          label: "项目类型",
          labelWidth: "80px",
          placeholder: "请选择项目类型",
          type: "select",
          searchShow: false,
          modelData: "projectType",
          selectrequest: {
            url: "/api/core/v1/dictionary/queryData.do?dicId=pType",
            params: [],
          },
        },
        {
          label: "监督方式",
          labelWidth: "80px",
          placeholder: "请选择监督方式",
          type: "select",
          searchShow: false,
          modelData: "governWay",
          selectrequest: {
            url: "/api/core/v1/dictionary/queryData.do?dicId=supervisionWay",
            params: [],
          },
        },
        {
          label: "项目进度",
          labelWidth: "80px",
          placeholder: "请选择项目进度",
          type: "select",
          searchShow: false,
          modelData: "projectProcess",
          selectrequest: {
            url: "/api/core/v1/dictionary/queryData.do?dicId=XLMLZT",
            params: [],
          },
        },
        {
          label: "项目立项状态",
          labelWidth: "100px",
          placeholder: "请选择项目立项状态",
          type: "select",
          searchShow: true,
          modelData: "projectState",
          selectrequest: {
            url:
              "/api/core/v1/dictionary/queryData.do?dicId=projectApprovalStatus",
            params: [],
          },
        },
      ],
      yearSelect: [
        {
          text: "2021年度",
          value: "2021年度",
        },
        {
          text: "2020年度",
          value: "2020年度",
        },
        {
          text: "2019年度",
          value: "2019年度",
        },
      ],
      stateSelect: [
        {
          text: "已立项",
          value: "0",
        },
        {
          text: "待审核",
          value: "1",
        },
        {
          text: "审核不通过",
          value: "2",
        },
      ],
      // 表格数据
      table: {
        columns: [
          {
            prop: "pName",
            label: "项目名称",
            width: "150",
          },
          {
            prop: "pType",
            label: "项目类型",
            width: "150",
          },
          {
            prop: "projectSchedule",
            label: "监督方式",
            width: "150",
          },
          {
            prop: "projectSchedule",
            label: "项目进度",
            width: "150",
          },
          {
            prop: "approvalStatus",
            label: "项目立项状态",
            width: "150",
          },
          {
            prop: "authorizeDesc",
            label: "审核备注",
            width: "150",
          },
        ],
        data: {
          rows: [
            {
              projectName: "你好",
              projectType: "你好",
              governWay: "你好",
              projectProcess: "你好",
              projectState: "你好",
              auditNote: "你好",
            },
            {
              projectName: "你好",
              projectType: "你好",
              governWay: "你好",
              projectProcess: "你好",
              projectState: "你好",
              auditNote: "你好",
            },
            {
              projectName: "你好",
              projectType: "你好",
              governWay: "你好",
              projectProcess: "你好",
              projectState: "你好",
              auditNote: "你好",
            },
          ],
          page: 1,
          pagerows: 5,
          totalrows: 0,
        },
      },
    };
  },
  created() {
    //代码表请求
    postJSON("/api/core/v1/dictionary/queryData.do?dicId=pType").then((res) => {
      this.typeSelect = res.data[0].data;
    });
    postJSON(
      "/api/core/v1/dictionary/queryData.do?dicId=projectApprovalStatus"
    ).then((res) => {
      this.projectStatus = res.data[0].data;
    });
    postJSON("/api/core/v1/dictionary/queryData.do?dicId=supervisionWay").then(
      (res) => {
        this.governWaySelect = res.data[0].data;
      }
    );
  },
  mounted() {},
  computed: {
    // 表格数据请求响应式数据
    tableReq() {
      return {
        url: "/api/oa/execute/findProjectEstablish.do",
        params: [
          {
            name: "queryCondition",
            vtype: "formpanel",
            data: {
              year: this.queryForm.projectYear,
              projectName: this.queryForm.projectName,
              type: this.queryForm.projectType,
              supervisionWay: this.queryForm.governWay,
              projectSchedule: this.queryForm.projectProcess,
              approvalStatus: this.queryForm.projectState,
              operation: this.queryForm.operation,
            },
          },

          { vtype: "pagination", name: "page", data: this.table.data.page },
          {
            vtype: "pagination",
            name: "pagerows",
            data: this.table.data.pagerows,
          },
          {
            vtype: "pagination",
            name: "totalrows",
            data: 0,
          },
        ],
      };
    },
  },
  methods: {
    // 表格转码
    tableChangeCode(data, arr) {
      if (data) {
        let filArr = arr.filter((item) => item.value === data.trim());
        return filArr.length === 1 ? filArr[0].text : data;
      }
    },
    tableSearch(form) {
      this.queryForm = JSON.parse(JSON.stringify(form));
      this.queryForm.operation = "0";
    },
    resetForm() {},
    // 切换分页表格index更新方法
    computedIndex(index) {
      return (this.table.data.page - 1) * this.table.data.pagerows + index + 1;
    },
    // 分页方法
    handleCurrentChange(val) {
      this.table.data.page = val;
    },
    handleSizeChange(val) {
      this.table.data.pagerows = val;
    },
  },
};
</script>

<style lang="less" scoped>
.create-project {
  width: 1660px;

  .header {
    width: 100%;
    height: 60px;
    display: flex;
    .left {
      width: 487px;
      height: 100%;
    }
    .right {
      margin-left: auto;
      // margin-right: 10px;
      width: 1026px;
      height: 100%;
    }
  }
  .table {
    width: 100%;
  }
}
</style>
