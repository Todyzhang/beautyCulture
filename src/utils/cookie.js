/**
 * 设置cookie
 * @param name    cookie名字
 * @param value   cookie值
 * @param domain
 * @param day
 */
function setCookie(name, value, domain, day) {
  let Days = day || 0.5;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() +
    (domain ? (";domain=" + domain) : "") + ";path=/";
}

/**
 * 读到cookie
 * @param name           cookie名字
 * @returns {string}     cookie值，没有返回""
 */
function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return decodeURIComponent(arr[2]);
  } else {
    return "";
  }
}

/**
 * 删除cookies
 * @param name        cookie名字
 */
function delCookie(name) {
  setCookie(name, "", null, -1);
}

export default{
  "name":"util-cookie",
  setCookie,
  getCookie,
  delCookie
}
