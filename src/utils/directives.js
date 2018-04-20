import Vue from "vue"

const NUMBER_REG = /\D/g,
  FLOAT_REG = /[^0-9\.]|(^\.+)/g;
/**
 * v-enter-number限制用户只能输入数字，并且离开光标时输入框为空时会强制值为1。
 * 指令的值表示限制输入数字的位数，不传、传入数值小于等于0和传入非数字都表示不限制输入位数。
 * e.g <input v-enter-number="3" />
 * @type {DirectiveOptions}
 */
export const enterNumber = Vue.directive("enterNumber", {
  bind(el, binding) {
    let val = binding.value;
    if (val > 0) {
      el._limit = val
    }
    el._preValue = val;
    el._blurEvent = function () {
      let val = this.value;
      if (!val) {
        this.value = 1;
      }
      this._triggerInput();
    };
    el._triggerInput = function () {
      this.dispatchEvent(new Event("input"));
    };
    el.addEventListener("blur", el._blurEvent);
  },
  update(el) {
    let val = "" + el.value;
    //去掉非数字及头部0
    val = val.replace(NUMBER_REG, "").replace(/^0+/, "");
    NUMBER_REG.lastIndex = 0;//全局匹配正则表达式lastIndex置0
    if (el._limit) {
      if (new RegExp("9{" + el._limit + "}").test(el._preValue) && val - el._preValue > 0) {
        val = el._preValue;
      } else if (val.length > el._limit) {
        val = val.substr(0, el._limit);
      }
    }
    el.value = el._preValue = val;
    el._triggerInput();
  },
  unbind(el) {
    el.removeEventListener("blur", el._blurEvent);
  }
});

/**
 * v-enter-float限制用户只能输入小数，并且离开光标时输入框为空时会强制值为1。
 * 指令的值表示限制输入数字的位数，中间用“,”分隔，左边表示整数位数，右边表示小数位数不传，
 * 各边数值小于等于0和传入非数字都表示不限制输入位数。
 * e.g <input v-enter-number="3,2" />
 * @type {DirectiveOptions}
 */
export const enterFloat = Vue.directive("enterFloat", {
  bind(el, binding) {
    let val = binding.expression;
    let _limits=val.split(",");
    let _len=_limits.length;
    switch(_len){
      case 0:
        el._integer=0;
        el._decimal=0;
        break;
      case 1:
        el._integer=parseInt(_limits[0])||0;
        el._decimal=1;
        break;
      default:
        el._integer=parseInt(_limits[0])||0;
        el._decimal=parseInt(_limits[1])||0;
    }
    el._blurEvent = function () {
      let val = this.value;
      if (!val) {
        this.value = 1;
      }
      this._triggerInput();
    };
    el._triggerInput = function () {
      this.dispatchEvent(new Event("input"));
    };
    el.addEventListener("blur", el._blurEvent);
  },
  update(el) {
    let val = "" + el.value,_f="",_e="",dotIndex=0;
    //去掉非数字及头部多个0
    val = val.replace(FLOAT_REG, "").replace(/^0+/, "0").replace(/^\.+/,"");
    FLOAT_REG.lastIndex = 0;//全局匹配正则表达式lastIndex置0
    if(val.length>=2) val=val.replace(/^0(?!\.)/, "");//去掉前置0
    dotIndex=val.indexOf(".");
    if(dotIndex>0){
      _f=val.substring(0,dotIndex);
      _e=val.substring(dotIndex+1);
    }else{
      _f=val;
    }
    if(_e.indexOf(".")>-1){
      _e=_e.replace(/\./g,"");
    }

    console.log(_f,_e);
    if(el._integer){
      _f=_f.substring(0,el._integer);
    }
    if(el._decimal&&_e){
      console.log("_e",_e);
      _e=_e.substring(0,el._decimal);
    }
    val=_f+(dotIndex>0?"."+_e:"");

    el.value = el._preValue = val;
    el._triggerInput();
  },
  unbind(el) {
    el.removeEventListener("blur", el._blurEvent);
  }
});
/**
 * v-enter-length限制用户输入字符位数
 * 指令的值表示限制输入字符的位数，不传、传入数值小于等于0和传入非数字都表示不限制输入位数。
 * e.g <input v-enter-length="3" />
 * @type {DirectiveOptions}
 */
export const enterLength = Vue.directive("enterLength", {
  bind(el, binding) {
    let val = binding.value;
    if (val > 0) {
      el._limit = val
    }
    console.log("enterLength",val)
  },
  update(el) {
    let val = "" + el.value;
    if (el._limit&&val.length>el._limit) {
      el.value = val.substr(0, el._limit);
      el.dispatchEvent(new Event("input"));
    }
  }
});
