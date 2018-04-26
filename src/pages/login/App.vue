<template>
  <top-content>
    <nav-bar slot="page-header" nb-title="登录" :nb-left="nbLeft"/>
    <!--<img class="logo" src="../../assets/logo.png"/>-->
    <form class="login-form">
      <div class="mui-input-row">
        <span class="mui-icon mui-icon-person"></span>
        <input type="text" class="mui-input-clear" placeholder="手机号/用户名"
               v-model="iAccout">
      </div>
      <div class="mui-input-row mui-password">
        <span class="mui-icon mui-icon-locked"></span>
        <input type="password" class="mui-input-password" placeholder="密码"
               v-model="iPwd">
      </div>
      <button type="button" id="comfirmBtn" class="mui-btn mui-btn-block mui-btn-primary" @tap="comfirm"
              data-loading-text="登录中...">确认
      </button>
      <div class="link-area">
        <a id='reg'>注册账号</a> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
      </div>
    </form>
    <div class="oauth-area">
      <a class="oauth-btn qq" v-show="oauth.qq.has" @tap="thirdOauth('qq')"></a>
      <a class="oauth-btn weixin" v-show="oauth.weixin.has" @tap="thirdOauth('weixin')"></a>
      <a class="oauth-btn sinaweibo" v-show="oauth.sinaweibo.has" @tap="thirdOauth('sinaweibo')"></a>
    </div>
  </top-content>
</template>

<script>
  import mui from "mui"
  import fetch from "../../fetch/index"
  import * as _ from "../../utils/tool"
  import NavBar from "../../components/NavBar"
  import TopContent from "../../containers/topContent";

  export default {
    name: "login",
    components: {
      TopContent,
      NavBar
    },
    data() {
      return {
        iAccout: "",
        iPwd: "",
        test: "",
        nbLeft: {
          icon: "mui-icon-back"
        },
        oauth: {
          qq: {has: !0},
          weixin: {has: !0},
          sinaweibo: {has: !0}
        }
      }
    },
    comments: {},
    methods: {
      comfirm() {
        if (!this.iAccout) {
          _.toast("请输入帐号");
          return;
        }
        if (!this.iPwd) {
          _.toast("请输入密码");
          return;
        }
        this.login();
      },
      login() {
        let btn = mui("#comfirmBtn");
        let params = {user: this.iAccout, pwd: this.iPwd};

        btn.button('loading');
        fetch.Login(params)
          .then(res => {
            // mui.openWindow({
            //   url: 'login.html',
            //   id: 'login',
            //   show: {
            //     aniShow: 'pop-in'
            //   }
            // });
            if(res.resultcode==0){
              _.toast("登录成功");
            }
          }, err => {
            // console.log(err);
          })
        .finally(() => btn.button('reset'))
      },
      thirdOauth(type) {
        let auth = this.oauth[type].auth;
        auth.login(function () {
          plus.nativeUI.toast("登录认证成功");
          auth.getUserInfo(function () {
            plus.nativeUI.toast("获取用户信息成功");
            let name = auth.userInfo.nickname || auth.userInfo.name;
            console.log("login msg:", JSON.stringify(auth.userInfo))
            // app.createState(name, function() {
            //   toMain();
            // });
          }, function (e) {
            plus.nativeUI.toast("获取用户信息失败：" + e.message);
          });
        }, function (e) {
          plus.nativeUI.toast("登录认证失败：" + e.message);
        });
      }
    },
    mounted() {
      let vm = this;
      mui.init({
        statusBarBackground: '#f7f7f7'
      });
      mui.plusReady(function () {
        //锁定屏幕方向为竖屏正方向
        plus.screen.lockOrientation("portrait-primary");
        //[{"id":"xiaomi","description":"小米"},{"id":"qq","description":"QQ"},{"id":"sinaweibo","description":"新浪微博"},{"id":"weixin","description":"微信"}]
        plus.oauth.getServices(function (services) {
          let service = {};
          for (let i = 0, len = services.length; i < len; i++) {
            service = services[i];
            if (_.has3thClient(service.id)) {
              vm.oauth[service.id] = {has: !0, auth: service};
            }
          }
        }, function (e) {
          plus.nativeUI.toast("获取登录认证失败：" + e.message);
        });
      });
      mui(".mui-scroll-wrapper").scroll();
      //点击清除输入框时需同时置空vue model
      mui(".mui-input-row").on("tap", ".mui-icon-clear", (e) => {
        let input = e.target.previousSibling;
        mui.trigger(input, "input");
      });
    },
    beforeDestroy() {
      mui(".mui-input-row").off("tap");
    }
  }
</script>
<style>
  .mui-pager .mui-disabled > span {
    opacity: 1;
    color: #fff;
    border: none;
    background:none;
  }
</style>
<style scoped>
  .logo {
    display: block;
    margin: 10px auto;
  }

  .login-form {
    padding: 2.66%;
  }

  .mui-icon {
    padding-top: 7px;
    padding-left: 15px;
    position: absolute;
    left: 0;
  }

  .mui-icon + input {
    padding-left: 50px;
  }

  .mui-btn-block {
    padding: 8px 0;
    margin-top: 20px;
  }

  .link-area {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
  }

  .link-area > a {
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
  }

  .link-area > span {
    color: #bbb;
    padding: 0 8px;
  }

  .oauth-area {
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    width: 100%;
    padding: 0;
    margin: 20px 0 0 0;
  }

  .oauth-area .oauth-btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0px 20px;
    /*-webkit-filter: grayscale(100%); */
    border: solid 1px #ddd;
    border-radius: 25px;
  }

  .oauth-area .oauth-btn.weixin {
    background-image: url("../../../static/imgs/weixin.png");
  }

  .oauth-area .oauth-btn.qq {
    background-image: url("../../../static/imgs/qq.png");
  }

  .oauth-area .oauth-btn.sinaweibo {
    background-image: url("../../../static/imgs/sinaweibo.png");
  }

  .oauth-area .oauth-btn:active {
    border: solid 1px #aaa;
  }

  .oauth-area .oauth-btn.disabled {
    background-color: #ddd;
  }
</style>
