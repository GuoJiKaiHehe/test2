(function () {
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase(); 
    var s;      
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
})();

var Tool={
    addEvent:function(obj,type,fn){
        if(typeof obj.addEventListener!='undefined'){
            obj.addEventListener(type,fn,false);
        }else{
            //alert('else')
        //创建一个存放事件的哈希表(散列表)
        if (!obj.events) obj.events = {};
        //第一次执行时执行
        if (!obj.events[type]) {    
            //创建一个存放事件处理函数的数组
            obj.events[type] = [];
            //把第一次的事件处理函数先储存到第一个位置上
            if (obj['on' + type]) obj.events[type][0] = fn;
        }else{
            if(Tool.addEvent.equal(obj.events[type],fn)) return false;

        }
        // alert(Tool.addEvent.equal)
        //从第二次开始我们用事件计数器来存储
        obj.events[type][addEvent.ID++] = fn;
        //执行事件处理函数
        obj['on' + type] = addEvent.exec;
 }
      
    },
    removeEvent:function(obj,type,fn){
        if(typeof obj.removeEventListener!='undefined'){
            obj.removeEventListener(type,fn,false);
        }else{
           for(var i in obj.events[type]){
            if(obj.events[type]==fn){
                delete obj.events[type][i];
            }
        }
        }
    },
    getInner:function(){
        if (typeof window.innerWidth != 'undefined') {
        return {
            width : window.innerWidth,
            height : window.innerHeight
            };
        } else {
            return {
                width : document.documentElement.clientWidth,
                height : document.documentElement.clientHeight
            };
        }
    },
    scrollTop:function(){
        
        return document.documentElement.scrollTop ||document.body.scrollTop;
    },
    getStyle:function(element,attr){
        if(typeof window.getComputedStyle!='undefined'){
            return window.getComputedStyle(element,null)[attr];
        }else if(typeof element.currentStyle!='undefined'){
            return element.currentStyle[attr];
        }
    },
    hasClass:function(element,className){

       return (element.className.match(new RegExp('(\\s|^)'+className+'($|\\s)'))!=null)?true:false;
    },
    innerRule:function(sheet,selectText,cssText,position){
       if (typeof sheet.insertRule != 'undefined') {//W3C
        sheet.insertRule(selectorText + '{' + cssText + '}', position);
        } else if (typeof sheet.addRule != 'undefined') {//IE
            sheet.addRule(selectorText, cssText, position);
        }
    },
    deleteRule:function(sheet,index){
        if (typeof sheet.deleteRule != 'undefined') {//W3C
        sheet.deleteRule(index);
        } else if (typeof sheet.removeRule != 'undefined') {//IE
            sheet.removeRule(index);
        }
    },
    trim:function(str){
        return str.replace(/(^\s*)|(\s*$)/g,'');
        
    },
    inArray:function(str,arr){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==str){
                return true;
            }else{
                return false;
            }
        }
    },
    setText:function(element,str){
        if(typeof element.textContent=='string'){
            element.textContent=str;
        }else{
            element.innerText=str;
        }
    },
    getText:function(element){
        return (typeof element.textContent=='string'?element.textContent:element.innerText);
    },
    isFunction:function(value){
      return  Object.prototype.toString.call(value)=="[object Function]";
    },
    isArray:function(){
        return  Object.prototype.toString.call(value)=="[object Array]";
    },
    isRegExp:function(){
        return  Object.prototype.toString.call(value)=="[object RegExp]";
    }
};
//var obj={"name":"guojikai","age":"18",sayName:function(){}};
var addEvent=Tool.addEvent;
var removeEvent=Tool.removeEvent;
var getStyle=Tool.getStyle;
addEvent.ID=1;
addEvent.exec=function(e){
    var e=addEvent.fixEvent(window.event);
    var es=this.events[e.type];
    for (var i in  es) {
        es[i].call(this,e);
    }
    
}
addEvent.fixEvent=function(event){
    event.preventDefault=addEvent.fixEvent.preventDefault;
    event.stopPropagation=addEvent.fixEvent.stopPropagation;
    event.target=addEvent.fixEvent.target(event);
    return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){
    this.returnValue=false;
}
//IE阻止冒泡！
addEvent.fixEvent.stopPropagation=function(){
    this.cancelBubble=true;
}
addEvent.fixEvent.target=function(e){
     return e.srcElement;
}
addEvent.equal=function(exec,fn){
 for(var i in exec){
     if(exec[i]==fn){
         return true;
     }else{
         return false;
     }
  }
}

//alert(addEvent)
/*addEvent(obj,'click',function(){

})
*/
