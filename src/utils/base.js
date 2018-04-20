import * as dir from "./directives";
import * as fil from "./filter";

require("@/assets/css/common.css");
require('@/mock/mock'); //此部分引入的是我们所编写的mockjs文档

//使用上面的代码后，滚动页面，position:fixed固定
// mui.plusReady(function() {
//   plus.webview.currentWebview().setStyle({
//     softinputMode: "adjustResize"
//   });
// });

export default {
  name:"base-js"
}
