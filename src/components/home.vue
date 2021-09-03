<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <div>
        <el-button type="info" @click="returnWelcome">回到首页</el-button>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体部分 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 伸缩按钮 -->
        <div class="toggle-button" @click="toggleCollapse">| | |</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409BFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="$route.path"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItme.path + ''"
              v-for="subItme in item.children"
              :key="subItme.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItme.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="version" v-if="isCollapse===false">
          <div class="ver1">V1.0正式版</div>
          <div class="ver2">🍭made by <a href="https://github.com/zjgsuzjx/shop" target=“_blank”>@zjgsu_zjx</a></div>
        </div>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: false,
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
          this.$message.success("退出成功~");
        })
        .catch(() => {
          this.$message.info("已取消退出~");
        });
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
      // console.log(this.menuList);
    },
    // 菜单折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    returnWelcome(){
      this.$router.push("/welcome")
    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: rgb(83, 81, 81);
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    height: 100%;
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    height: 100%;
  }
}
.el-aside {
  background-color: #545c64;
  .el-menu {
    border-right: 0px;
  }
  transition: 0.5s;
}
.el-main {
  background-color: #fff;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.version {
  color: #fff;
  position: absolute;
  left: 8px;
  bottom: 40px;
  text-align: center;
  .ver1 {
    margin-bottom: 20px;
  }
  a {
    color: #d4d0d0;
    font-weight: 600;
  }
}
</style>
