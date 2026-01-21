<template>
  <el-card class="box-card" shadow="always">
    <h2>系统登陆</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登陆</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { login } from "../api";
export default {
  name: "Login",
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请选择密码", trigger: "blur" }],
      },
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        const h = this.$createElement;
        if (valid) {
          login(this.form)
            .then((resp) => {
              const { code, data, headers, message } = resp.data;
              if (code === 200) {
                this.$cookie.remove("JSESSIONID");
                this.$cookie.set("JSESSIONID", data.JSESSIONID, 60 * 3);
                this.$notify({
                  title: "提示",
                  message: h(
                    "i",
                    { style: "color: teal" },
                    "欢迎回来：" + this.form.username,
                  ),
                  duration: 0,
                });
                this.$router.push("/home");
              } else {
                this.$message({
                  showClose: true,
                  message: message,
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.$message({
            showClose: true,
            message: "信息未填完整，请重试。",
            type: "error",
          });
          return;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  width: 320px;
}
.el-card {
  margin: 180px auto;
  /deep/.el-card__body {
    h2 {
      text-align: center;
      margin-bottom: 15px;
    }
    input {
      width: 180px;
      height: 33px;
      padding: 0 5px;
    }
    button {
      margin-left: 30px;
    }
  }
}
</style>
