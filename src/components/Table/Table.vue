<template>
  <el-container>
    <el-header>
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddView">添加</el-button>
      <el-dialog title="新增" :visible.sync="dialogVisible">
        <el-form :model="addForm">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="addForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeView">关闭</el-button>
        </div>
      </el-dialog>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%" stripe max-height="500">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column label="地址">
            <el-table-column prop="province" label="省份" width="120"></el-table-column>
            <el-table-column prop="city" label="市区" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" width="300"></el-table-column>
            <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'myTable',
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 3,
      addForm: {
        name: '',
        region: ''
      },
      formLabelWidth: '120px'
    };
  },
  mounted: function() {
    this.loadDatas();
  },
  methods: {
    initTableData() {
      return [
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-05",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-09",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-10",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-11",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-12",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-13",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-14",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-15",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-16",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ];
    },
    loadDatas() {
      let _this = this;
      let tableDatas = _this.initTableData();
      _this.tableData = tableDatas.slice(
        (_this.currentPage - 1) * _this.pageSize,
        (_this.currentPage - 1) * _this.pageSize + _this.pageSize
      );
      _this.totalCount = tableDatas.length;
    },
    handleCurrentChange(newpage) {
      this.currentPage = newpage;
      this.loadDatas();
    },
    showAddView() {
      this.dialogVisible = true;
    },
    closeView() {
      this.dialogVisible = false;
    }
  }
};
</script>