<template>
  <div class="manage">
    <div class="common-header">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <div class="header-right">
        <el-input
          v-model="searchKey"
          placeholder="输入关键字"
          @clear="clearSearch"
          @keyup.enter.native="onSearch"
          @input="handleChange"
          clearable
        ></el-input>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </div>
    </div>
    <div class="common-table">
      <el-table
        :data="tableData"
        height="70%"
        style="width: 100%"
        v-loading="tableLoading"
        stripe
      >
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 0 ? "女" : "男" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址" width="450">
        </el-table-column>
        <el-table-column label="操作" width="140">
          <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template> -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="updateUser(scope.row)"
              circle
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.id)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-size="pageData.limit"
        :page-sizes="[10, 20, 30, 50]"
        :total="pageData.total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      @close="dialogClose"
    >
      <el-form
        ref="userRef"
        :rules="rules"
        :model="userForm"
        label-width="80px"
        class="dialogForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="userForm.age" style="width: 20%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model.number="userForm.sex" size="medium">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="userForm.birth"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input
            type="textarea"
            :rows="4"
            v-model="userForm.addr"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserData,
  addUser,
  updateUser,
  deleteUser,
  batchDeleteUser,
} from "../api";
export default {
  name: "User",
  mounted() {
    this.getUserData();
  },
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      userForm: {
        id: "",
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      searchKey: "",
      pageData: {
        total: 0,
        page: 1,
        limit: 20,
      },
      dialogTitle: "新增用户",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
        birth: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      tableLoading: true,
      timer: null,
    };
  },
  methods: {
    onSearch() {
      this.getUserData();
    },
    handleChange() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getUserData();
        this.timer = null;
      }, 300);
    },
    handleSizeChange(size) {
      this.pageData.limit = size;
      this.getUserData();
    },
    handleCurrentChange(current) {
      this.pageData.page = current;
      this.getUserData();
    },
    getUserData() {
      this.tableLoading = true;
      getUserData({
        params: {
          name: this.searchKey,
          page: this.pageData.page,
          limit: this.pageData.limit,
        },
      }).then((data) => {
        // console.log(data);
        setTimeout(() => {
          this.tableData = data.data.list;
          this.pageData.total = data.data.count;
          this.tableLoading = false;
        }, Math.floor(Math.random() * 3 + 1) * 300);
      });
    },
    addUser() {
      this.dialogFormVisible = true;
      this.dialogTitle = "新增用户";
    },
    updateUser(user) {
      this.dialogFormVisible = true;
      this.dialogTitle = "更新用户";
      this.$nextTick(() => {
        this.userForm = JSON.parse(JSON.stringify(user));
      });
    },
    deleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser({ id: id }).then((data) => {
            this.$message({
              type: "success",
              showClose: true,
              message: data.data.msg,
            });
            this.getUserData();
          });
        })
        .catch(() => {});
    },
    dialogCancel() {
      this.dialogFormVisible = false;
    },
    dialogConfirm() {
      this.$refs.userRef.validate((valid) => {
        if (!valid) {
          this.$message({
            showClose: true,
            message: "信息未填完整，请重试。",
            type: "error",
          });
          return;
        }
        const requestFn = this.userForm.id ? updateUser : addUser;
        console.log(requestFn);
        requestFn(this.userForm).then((data) => {
          this.$message({
            showClose: true,
            message: data.data.msg,
            type: "success",
          });
          this.dialogClose();
          this.dialogFormVisible = false;
          this.getUserData();
        });
        // if (!this.userForm.id) {
        //   addUser(this.userForm).then((data) => {
        //     this.$message({
        //       showClose: true,
        //       message: data.data.msg,
        //       type: "success",
        //     });
        //     this.dialogClose();
        //     this.dialogFormVisible = false;
        //     this.getUserData();
        //   });
        // } else {
        //   updateUser(this.userForm).then((data) => {
        //     this.$message({
        //       showClose: true,
        //       message: data.data.msg,
        //       type: "success",
        //     });
        //     this.dialogClose();
        //     this.dialogFormVisible = false;
        //     this.getUserData();
        //   });
        // }
      });
    },
    dialogClose() {
      this.$refs.userRef.resetFields();
    },
    clearSearch() {
      this.getUserData();
    },
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .common-table {
    .el-pagination {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }
    /deep/.el-table {
      .el-table__body {
        .el-table__cell {
          padding: 5px 0;
        }
      }
    }
  }
  .common-header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    .header-right {
      display: flex;
    }
  }
  .common-table {
    height: 90%;
  }
}
.dialogForm {
  .el-input {
    width: 70%;
  }
}
</style>
