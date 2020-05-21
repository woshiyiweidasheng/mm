<template>
  <div class="login-container">
      <div class="left">
        <div class="title-box">
          <img src="@/assets/login_icon.png" alt="">
          <span class="title">波波面面</span>
          <span class="line"></span>
          <span class="sub-title">用户登录</span>
        </div>
      </div>
      <div class="right">
        <img src="@/assets/login_bg.png" alt="">
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
  .login-container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: linear-gradient(225deg,#1493fa,#01c6fa);
    .left{
      width: 478px;
      height: 550px;
      background-color: #f5f5f5;
      padding: 48px;
      .title-box{
        display: flex;
        align-items: center;
        img{
          width: 22px;
          height: 17px;
          margin-right: 16px;
        }
        .title{
          font-size: 24px;
          margin-right: 14px;
        }
        .line{
          width: 2px;
          background-color: #c7c7c7;
          height: 27px;
          margin-right: 12px;
        }
        .sub-title{
          font-size: 22px;
        }
      }
    }
  }
</style>