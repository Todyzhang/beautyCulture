<template>
  <nav class="mui-bar mui-bar-tab">
    <a class="mui-tab-item" v-for="(item,index) in items" @tap="showPage(item,index+1)"
       :class="{'mui-active':activeItem===index+1}">
      <span class="mui-icon" :class="item.className">
        <span v-show="item.msgNum>0||item.hasNew" class="mui-badge" :class="{'has-new':item.hasNew}">{{item.msgNum||' '}}</span>
      </span>

      <span class="mui-tab-label">{{item.label}}</span>
    </a>
  </nav>
</template>

<script>

  export default {
    name: "nav-tab",
    props: {
      tabActive: {
        type: [String, Number],
        default: 1
      }
    },
    data() {
      return {
        items: [
          {url: "index.html", label: "首页", className: "icon-home", is1stShow: !1,msgNum:10},
          {url: "person.html", label: "美丽说", className: "icon-beauty", is1stShow: !1},
          {url: "person.html", label: "消息", className: "icon-msg", is1stShow: !1,hasNew:1},
          {url: "person.html", label: "我", className: "icon-person", is1stShow: !1}
        ],
        activeItem: this.tabActive
      }
    },
    computed: {
      itemsLen() {
        return this.items.length;
      }
    },
    methods: {
      showPage(page, num) {
        if (num === this.activeItem) {
          return;
        }

        //若为iOS平台或非首次显示，则直接显示
        if (mui.os.ios || !page.is1stShow) {
          plus.webview.show(page.url);
        } else {
          //否则，使用fade-in动画显示
          plus.webview.show(page.url, "fade-in", 300);
        }
        //隐藏当前;
        plus.webview.hide(this.items[this.activeItem - 1].url);
        this.activeItem = num;
      }
    },
    mounted() {
      //创建子页面，首个选项卡页面显示，其它均隐藏；
      mui.plusReady(() => {
        let self = plus.webview.currentWebview();
        let pageUrl, sub;
        for (let i = 0; i < this.itemsLen; i++) {
          pageUrl = this.items[i].url;
          sub = plus.webview.create(pageUrl, pageUrl, {
            bottom: '60px',
            top: '0'
          });

          self.append(sub);
          if (i > 0) {
            sub.hide();
          } else {
            this.items[i].is1stShow = !1;
          }
        }
      });
    }
  }
</script>

<style scoped>
  .mui-bar {
    background-color: #fff;
  }

  .mui-bar-tab .mui-tab-item {
    color: #333;
    position:relative;
  }
  .mui-badge{
    background: #ff5b42;
    border:2px solid #fff;
    color:#fff;
  }
  .mui-badge.has-new{
    width: 16px;
    height: 16px;
    padding: 0;
  }
  .mui-tab-item .mui-icon {
    display: inline-block;
    background-size: 110% 110%;
    background-repeat: no-repeat;
    width:30px;
    height:30px;
    top: 6px;
  }

  .mui-bar-tab .mui-tab-item.mui-active {
    color: #00ae84;
  }

  .mui-bar-tab .mui-tab-item .mui-icon:active {
    background-size: 100% 100%;
  }

  .mui-icon.icon-home {
    background-image: url(../assets/icon_home_nor.png);
  }

  .mui-active .mui-icon.icon-home {
    background-image: url(../assets/icon_home_pre.png);
  }

  .mui-icon.icon-msg {
    background-image: url(../assets/icon_message_nor.png);
  }

  .mui-active .mui-icon.icon-msg {
    background-image: url(../assets/icon_message_pre.png);
  }

  .mui-icon.icon-person {
    background-image: url(../assets/icon_user_nor.png);
  }

  .mui-active .mui-icon.icon-person {
    background-image: url(../assets/icon_user_pre.png);
  }
  .mui-icon.icon-beauty {
    background-image: url(../assets/icon_beauty_nor.png);
  }

  .mui-active .mui-icon.icon-beauty {
    background-image: url(../assets/icon_beauty_pre.png);
  }
</style>
