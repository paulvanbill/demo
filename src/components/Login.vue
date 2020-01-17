<template>
  <div class="login-container">
    <el-form
      :model="loginform"
      ref="loginform"
      :rules="rules"
      class="login-form"
      label-position="left"
      v-loading="loading"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input type="text" v-model="loginform.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="passwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" ref="password" v-model="loginform.passwd" placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="submitForm"
      >登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginform: {
        username: "",
        passwd: ""
      },
      checked: true,
      loading: false,
      passwordType: "password",
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        passwd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm: function(event) {
      let _this = this;
      _this.loading = true;
      _this.$refs.loginform.validate(valid => {
        if (valid) {
          if (
            _this.loginform.username == "admin" &&
            _this.loginform.passwd == "123"
          ) {
            //跳转
            var user = { username: _this.loginform.username };
            _this.$store.commit("login", user);
            var path = _this.$route.query.redirect;
            _this.$router.replace({
              //path: path == "/" || path == undefined ? "/home" : path
              path: path == "/" || path == undefined ? "/index/dashboard" : path
            });
          } else {
            this.$message({
              message: "用户或密码错误",
              type: "error"
            });
          }

          //   请求验证
          //   _this
          //     .postRequest("/", {
          //       username: _this.loginform.username,
          //       passwd: _this.loginform.passwd
          //     })
          //     .then(rsp => {
          //       _this.loading = false;
          //       console.log(rsp);
          //     });
        } else {
          this.$message({
            message: "输入错误",
            type: "error"
          });
        }
        _this.loading = false;
      });
    },

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>


<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$title_color: #53595f;
$light_gray: #eee;

.title-container {
  position: relative;
  .title {
    font-size: 26px;
    color: $title_color;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}

.login-container {
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>