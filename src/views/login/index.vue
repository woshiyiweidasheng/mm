<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">波波面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单 -->
      <el-form class="user-box" :model="inputForm" :rules="rules" ref="formRef">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-phone" v-model="inputForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            v-model="inputForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="inputForm.code"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="codeUrl" @click="getCode" alt class="captcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="ischecked">
          <el-checkbox v-model="inputForm.ischecked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" style="width:100%;" @click="submitForm('formRef')">登录</el-button>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" style="width:100%;" @click="dy">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <regiest ref="reg"></regiest>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
  </div>
</template>

<script>
import {setToken} from '@/utails/token.js'
import regiest from '@/views/login/regiest.vue'
export default {
  components:{
        regiest:regiest
      },
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      inputForm: {
        phone: "18520409113",
        code: "",
        password: "123456",
        ischecked: true
      },
      rules: {
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("不能为空"));
              } else if (!/^1[358]\d{9}$/.test(value)) {
                callback(new Error("请输入正确的手机号"));
              }
              callback(); //阻止代码继续向下执行
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 66, message: "请输入正确密码", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入正确的验证码", trigger: "blur" }
        ],
        ischecked: [
          {
            validator: (rule, value, callback) => {
              //不用就不写，如果创建脚手架的时候选了eslint
              console.log(value);
              if (!value) {
                callback(new Error("请勾选用户协议"));
              }
              callback(); //阻止代码继续向下执行
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    dy:function(){
      this.$refs.reg.dialogVisible=true
    },
    getCode: function() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&id=" + +new Date();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$axios.post("/login", this.inputForm);
          if (res.data.code == 200) {
            console.log(res);
            setToken(res.data.data.token)
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            this.$router.push('/layout')
          } else {
            this.$message.error(res.data.message);
            this.codeUrl =
              process.env.VUE_APP_BASEURL +
              "/captcha?type=login&id=" +
              +new Date();
          }
          //promise 只适合解决简单的回调地狱问题
          // this.$axios.post("/login", this.inputForm)
          // .then(res => {
          //   console.log(res);
          //   if (res.data.code == 200) {
          //     console.log(res);
          //     this.$message({
          //       message: "登陆成功",
          //       type: "success"
          //     });
          // } else {
          //   this.$message.error(res.data.message);
          //   this.codeUrl =
          //     process.env.VUE_APP_BASEURL +
          //     "/captcha?type=login&id=" +
          //     +new Date();
          // }
          // });
        } else { 
          this.codeUrl =
            process.env.VUE_APP_BASEURL +
            "/captcha?type=login&id=" +
            +new Date();
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less'>
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 2px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .user-box {
      margin-top: 27px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>