import mui from "mui"
import * as _ from "../utils/tool"

export function fetch(url, params,type) {
  return new Promise((resolve, reject) => {
    mui.ajax(url,{
      data:params,
      dataType:'json',//服务器返回json格式数据
      type:type||'get',//HTTP请求类型
      timeout:10000,//超时时间设置为10秒；
      // headers:{'Content-Type':'application/json'},
      success:function(data){
        //服务器返回响应，根据响应结果，分析是否登录成功；
        console.log(data);
        resolve(data);
      },
      error:function(xhr,type,errorThrown){
        //异常处理；
        console.log(type);
        reject("请求异常");
        _.toast("网络异常");
      }
    });
  })
}

export default {
  /**
   * 用户登录
   */
  Login(params) {
    return fetch("/users/api/userLogin", params,"post")
  },

  /**
   * 用户注册
   */
  Regist(params) {
    return fetch("/users/api/userRegist", params)
  },

  /**
   * 发送注册验证码
   */
  RegistVerifiCode(tellphone) {
    return fetch("/users/api/registVerifiCode", {tellphone: tellphone})
  },

  GetData(){
    return fetch("/api/data");
  }
}
