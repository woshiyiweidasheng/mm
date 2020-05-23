<template>
  <div class="regiest">
    <el-dialog :visible.sync="dialogVisible" width="600px" center>
      <!-- 头部插槽 -->
      <div slot="title" class="dialog-title">用户注册</div>
      <!-- form表单 -->
      <el-form class="user-box" :model="regForm" :rules="rules" ref="formRef" label-width="100px">
        <!-- 头像 -->
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="avatarUrl"
            :show-file-list="false"
            name="image"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input placeholder="请输入昵称" v-model="regForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="regForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input placeholder="请输入手机" v-model="regForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="regForm.password"></el-input>
        </el-form-item>

        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="18">
              <el-input placeholder="请输入图形码" v-model="regForm.code"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="codeUrl" alt class="captcha" @click="changeCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="18">
              <el-input placeholder="请输入验证码" v-model.number="regForm.rcode"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button size="small" class="btn" @click="getRcode">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 底部插槽 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formRef')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: process.env.VUE_APP_BASEURL + "/uploads",
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      imageUrl: "",
      dialogVisible: false,
      regForm: {
        phone: "13345678910",
        rcode: "",
        email: "1111@qq.com",
        username: "leburang",
        avatar: "",
        password: "123456",
        code: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
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
          { min: 4, max: 4, message: "请输入正确的图形码", trigger: "blur" }
        ],
        rcode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("验证码不能为空"));
              }
              if (value.toString().length != 4) {
                return callback(new Error("验证码只能为4位"));
              }
              setTimeout(() => {
                if (!Number.isInteger(value)) {
                  callback(new Error("请输入数字值"));
                } else {
                  callback();
                }
              }, 1000);
            },
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("不能为空"));
                return;
              }
              if (
                !/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(
                  value
                )
              ) {
                callback(new Error("请输入正确的邮箱"));
              }
              callback(); //阻止代码继续向下执行
            },
            trigger: "blur"
          }
        ],
        avatar: [
          {
            required: false,
            message: "请上传头像哟",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return;
        if (valid) {
          const res = await this.$axios.post("/register", this.regForm);
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.$message({
              message: "注册成功",
              type: "success"
            });
          }else{
            this.changeCode();
            this.$message.error(res.data.message);
          }
        }
      });
    },
    changeCode() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&r" + +new Date();
    },
    async getRcode() {
      const res = await this.$axios.post("/sendsms", {
        phone: this.regForm.phone,
        code: this.regForm.code
      });
      if (res.data.code == 200) {
        this.regForm.rcode = res.data.data.captcha;
      } else {
        this.$message.error(res.data.message);
        this.changeCode();
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl =process.env.VUE_APP_BASEURL+"/"+ res.data.file_path;
      this.regForm.avatar =res.data.file_path;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      console.log(isJPG && isLt2M);
      return isJPG && isLt2M;
    }
  }
};
</script>






<style lang="less" >
.regiest {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .dialog-title {
    height: 53px;
    background-color: #03c0f9;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100px;
    height: 40px;
    margin-left: 8px;
  }
  .btn {
    width: 100%;
    height: 40px;
    margin-left: 8px;
  }
}
</style>