<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <div class="title-box-left">
          <i class="el-icon-s-operation" @click="isCollapse=!isCollapse" style="font-size:30px"></i>
          <img src="@/assets/layout_icon.png" alt class="marginlr" />
          <span class="title">波波面面</span>
        </div>
        <div class="title-box-right">
          <img :src="avatar" alt class="userHeader" />
          <span class="marginlr">{{username}}</span>
          <el-button type="primary" @click="qiet">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside style="width:auto">
          <el-menu default-active="5" class="el-menu-vertical-demo" :collapse="isCollapse" router>
            <el-menu-item index="/layout/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据预览</span>
            </el-menu-item>
            <el-menu-item index="/layout/user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/enterprise">
              <i class="el-icon-document"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getToken, removeToken } from "@/utails/token.js";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      isCollapse: false
    };
  },
  methods: {
    qiet: function() {
      removeToken();
      this.$router.push("/login");
    }
  },
  created: async function() {
    // console.log(getToken());
    const res = await this.$axios.get("/info", {
      // headers: { token: getToken() }
    });
    if (res.data.code === 200) {
      this.username = res.data.data.username;
      this.avatar = process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
    }
  }
};
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f3f3f3;
      .title-box-left {
        display: flex;
        align-items: center;
        .marginlr {
          margin: 0 20px;
        }
      }
      .title-box-right {
        display: flex;
        align-items: center;
        .marginlr {
          margin: 0 20px;
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
    .el-aside {
      background-color: #ffffff;
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
      .el-menu {
        border-right: solid 0px #e6e6e6;
      }
    }
    .el-main {
      background-color: #e9eef3;
    }
    body > .el-container {
      margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
  }
}
</style>