<template>
  <div class="login_container">
    <canvas id="startrack"></canvas>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
        <h4 class="title">电商后台管理系统登录</h4>
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        :rules="loginFromRule"
        :model="loginForm"
        class="login_form"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login" class="firstbtn"
            >登录</el-button
          >
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">🍭2021. made by @zjgsu_zjx</div>
    <p id="hitokoto" class="juzi"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登陆表单数据绑定
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //   表单验证
      loginFromRule: {
        //   验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 表单预校验
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) return this.$message.error("登录失败！");
        this.$message.success("登录成功~");
        // 保存token到本地浏览器，使用临时会话存储
        window.sessionStorage.setItem("token", res.data.token);
        // 通过编程式导航跳转至后台主页，路由地址是 /home
        this.$router.push("/home");
      });
    },
  },
  // // 引入外部JS
  // mounted () {
  //   const s = document.createElement('script')
  //   s.type = 'text/JavaScript'
  //   s.src = 'https://api.amogu.cn/public/static/index/js/page.js'
  //   document.body.appendChild(s)
  // }
};
</script>

<style lang="less" scoped>
/* 注意要安装开发依赖的less和less-loader,版本分别为3.9.0和4.1.0*/
.login_container {
  background-color: skyblue;
  height: 100%;
}
#startrack {
  height: 100%;
  width: 100%;
}
.login_box {
  width: 500px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.95;
  z-index: 999;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    box-shadow: 0 0 10px #ddd;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 80%;
      height: 80%;
      position: relative;
      left: 50%;
      transform: translate(-50%, 20%);
    }
  }
}
.login_form {
  position: absolute;
  bottom: 10px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}
.title {
  width: 200%;
  position: relative;
  left: 60%;
  transform: translate(-50%, 200%);
  font-weight: 700;
  text-shadow: 1px 1px 5px #7e7486;
  margin-bottom: 25px;
  letter-spacing: 0.5em;
}
.firstbtn {
  margin-right: 40px;
}
.footer {
  position: absolute;
  bottom: 20px;
  left: 50%;
  color: #fff;
  transform: translate(-50%, 0);
  font-weight: 700;
}
.juzi {
  position: absolute;
  bottom: 50px;
  left: 50%;
  color: #fff;
  transform: translate(-45%, 0);
  font-size: 13px;
  letter-spacing: .5em;
  opacity: 0.9;
  font-weight: 600;
}
</style>
