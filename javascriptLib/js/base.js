;(function(){

var Base=function (args){
    
    return new Base.init(args);
}
Base.init=function(args){
    this.element=[];
    if(typeof args=='string'){
            if(args.search(/\s+/)>-1){
               var elements=args.split(' ');
               var childElements = [];  
               var node=[];
               for(var i=0;i<elements.length;i++){
                    if(node.length==0) node.push(document);
                    switch (elements[i].charAt(0)) {
                        case '#':
                           childElements = [];              //清理掉临时节点，以便父节点失效，子节点有效
                            childElements.push(this.getId(elements[i].substring(1)));
                          //  alert(elements[i].substring(1));
                            node = childElements;

                            break;
                        case '.':
                            childElements=[];
                            for(var j=0;j<node.length;j++){
                                var temp=this.getClassName(elements[i].substring(1),node[j]);
                                //console.log(elements[i])
                                for(var k=0;k<temp.length;k++){
                                    childElements.push(temp[k]);
                                }
                            }
                            node=childElements;
                            break;
                        default:
                        childElements = []; 
                        for(var j=0;j<node.length;j++){
                            var temp=this.getTagName(elements[i],node[j]);// 获取到了标签节点；
                          //  console.log(temp)
                            for(var k=0;k<temp.length;k++){
                                childElements.push(temp[k]);
                            }
                        }
                        node=childElements;
                    }
               }
               this.element=childElements;
            }else{
                 switch(args.charAt(0)){
                    case '#':
                    this.element.push(this.getId(args.substring(1)));
                    break;
                    case '.':
                        this.element=this.getClassName(args.substring(1));

                    break;
                    default:
                     this.element=this.getTagName(args);
                    
                }
            }
           
        }else if(typeof args=='object'){
            if(args!=undefined){
                this.element=[];
                this.element[0]=args;
            }

        }else if(typeof args=='function'){
            this.ready(args);
        }
}



Base.init.prototype=Base.fn=Base.prototype={
    constructor:Base,  
    getId:function(id){
        return document.getElementById(id);
    },
    getTagName:function(tagName,parentNode){
        var d=null;
        if(parentNode!=undefined){
            d=parentNode;
        }else{
            d=document;
        }
        return d.getElementsByTagName(tagName);
     
    },
    getClassName:function(className,parentNode){
      var node = null;
        var temps = [];
        if (parentNode != undefined) {
            node = parentNode;
        } else {
            node = document;
        }
        var all = node.getElementsByTagName('*');
        for (var i = 0; i < all.length; i ++) {
            if (Tool.hasClass(all[i],className)) {
                temps.push(all[i]);
            }
        }
       // console.log(temps)
    return temps;
    },
    getName:function(name){
         return document.getElementsByName(name);
    },
    css:function(attr,value){
      //  console.log(this)
        for(var i=0;i<this.element.length;i++){
            if(arguments.length==2){
               this.element[i].style[attr]=value;
            }else if(typeof attr =='object'){
                for(var key in attr){
                    this.element[i].style[key]=attr[key];
                }
            }else if(arguments.length==1 && (value==undefined) && (typeof attr!='object')  ){
                console.log(attr)
                 return Tool.getStyle(this.element[i],attr);
            }

            
        }
        return this;
    },
    attr:function(attr,str){
        for(var i=0;i<this.element.length;i++){
            if(str==undefined){
                 return this.element[i].getAttribute(attr);
                
            }else{
                //console.log(this.element[i]);
                this.element[i].setAttribute(attr,str);
               
            }
         
        }
        return this;
    },
    html:function(str){
        
        for(var i=0;i<this.element.length;i++){
        if(typeof str=='undefined'){
          //  alert(this.element[i].innerHTML);
            return this.element[i].innerHTML;
        }else{
          this.element[i].innerHTML=str;  
        }
    }
        return this;
    },
    index:function(){
        var children=this.element[0].parentNode.children;
        for(var i=0;i<children.length;i++){
            children[i].index=i;
            if(children[i]==this.element[0]){
               // alert(children[i].index);
                return children[i].index;
            }
        }

    },
    opacity:function(num){
        for(var i=0;i<this.element.length;i++){
            this.element[i].style.opacity=num/100;
            this.element[i].style.filter='alpha(opacity=' + num + ')';
        }
        return this;
    },
    siblings:function(){

        var nodes=[];
          //alert('')
        for(var i=0;i<this.element.length;i++){
            var elem=this.element[i].previousSibling;
           while(elem!=null){
              if(elem.nodeType==1){
                     nodes.push(elem);
                     elem=prev(elem);
              }else{
                     elem=prev(elem);
              }
           }
        var elem=this.element[i].nextSibling;
           while(elem!=null){
              if(elem.nodeType==1){
                     nodes.push(elem);
                     elem=next(elem);
              }else{
                     elem=next(elem);
              }
           }
         
        }

        function prev(node){
             return node.previousSibling;
       }
        function next(node){
             return node.nextSibling;
       }
        this.element=nodes; 
        return this;
    },
    prevAll:function(){
        var nodes=[];
        var elem=null;
           // console.log(this.element[0].previousSibling.previousSibling);
                elem=this.element[0].previousSibling;
                
                while(elem!=null){
                    if(elem.nodeType==1){
                        nodes.push(elem);
                        elem=prev(elem);
                    }else{
                        elem=prev(elem);
                    }
                }

       function prev(node){
             return node.previousSibling;
       }

       this.element=nodes;
      return this;
    },
    nextAll:function(){
       var nodes=[];
        var elem=null;

                elem=this.element[0].nextSibling;
                
                while(elem!=null){
                    if(elem.nodeType==1){
                        nodes.push(elem);
                        elem=next(elem);
                    }else{
                        elem=next(elem);
                    }
                }

       function next(node){
             return node.nextSibling;
       }
       this.element=nodes;
      return this;
    },
    text:function(str){
        for(var i=0;i<this.element.length;i++){
            if(str==undefined){
                return Tool.getText(this.element[i]);
            }else{
                Tool.setText(this.element[i],str);
            }
        }   
        return this;
    },
    length:function(){
        return this.element.length;
    },
    click:function(fn){
        for(var i=0;i<this.element.length;i++){
            this.element[i].onclick=fn
        }
        return this;
    },
    scroll:function(fn){
        for(var i=0;i<this.element.length;i++){
            this.element[i].onscroll=fn
        }
        return this;
    },
    bind:function(event,fn){
        for(var i=0;i<this.element.length;i++){
            addEvent(this.element[i],event,fn);
        }
        return this;
    },
    form:function(name){
        for(var i=0;i<this.element.length;i++){
           this.element[i]=this.element[i].name;
        }
        return this;
    },
    val:function(str){

        for(var i=0;i<this.element.length;i++){
        if(str==undefined){
            return this.element[i].value;
        }else{
          this.element[i].value=str;  
        }
      }
        return this;
    },
    removeAttr:function(attr){
        for(var i=0;i<this.element.length;i++){
            if(attr==undefined){
                throw new Error('错误参数');
            }else{
                this.element[i].removeAttribute(attr);
            }
        }
        return this;
    },
    addClass:function(className){
        for(var i=0;i<this.element.length;i++){
           if(!Tool.hasClass(this.element[i],className)){
                this.element[i].className+=' '+className;
           }
        }
        return this;
    },
    removeClass:function(className){

         for(var i=0;i<this.element.length;i++){
          //  alert(className)
       
           if(Tool.hasClass(this.element[i],className)){

 this.element[i].className = this.element[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
              //  alert(this.element[i].className)
           }
        }
        return this;
    },
    //添加link或style的CSS规则
    addRule:function (num, selectorText, cssText, position) {
        var sheet = document.styleSheets[num];
        Tool.insertRule(sheet, selectorText, cssText, position);
        return this;
    },

    //移除link或style的CSS规则
    removeRule :function (num, index) {
        var sheet = document.styleSheets[num];
        Tool.deleteRule(sheet, index);
        return this;
    },
    hover:function(over,out){
       // console.log(this);
        for(var i=0;i<this.element.length;i++){
             
            addEvent(this.element[i],'mouseover',over);
            addEvent(this.element[i],'mouseout',out);
        }
        return this;
    },
    toggle:function(){
        for(var i=0;i<this.element.length;i++){
            (function(element,args){
                 var count=0;
                  //alert('')
                addEvent(element,'click',function(){
               
                 args[count++%args.length].call(this);
                
            });
            })(this.element[i],arguments)
            
        }
        return this;


    },
    hide:function(){
        for (var i = 0; i < this.element.length; i ++) {
        this.element[i].style.display = 'none';
         }
        return this;
    },
    show:function(){
        for (var i = 0; i < this.element.length; i ++) {
        this.element[i].style.display = 'block';
         }
        return this;
    },
    next:function(){
        for (var i = 0; i < this.element.length; i ++) {
            this.element[i]=this.element[i].nextSibling;
            if(this.element[i]==null) throw new Error('cuowu');
            if(this.element[i].nodeType==3) this.next();

        }
        return this;
    },
    prev:function(){
        for (var i = 0; i < this.element.length; i ++) {
            this.element[i]=this.element[i].previousSibling;
            if(this.element[i]==null) return null;
            if(this.element[i].nodeType==3) this.prev();
       }
        return this;
    },
    
    eq:function(num){
        var element=this.element[num];
        this.element=[];
        this.element[0]=element;

        return this;
    },
    get:function(num){
        return this.element[num];
    },
    last:function(){
        return this.element[this.element.length-1];
    },
    first:function(){
        return this.element[0];
    },
    find:function(str){
        //alert('')
       
        var childElements=[];
        for(var i=0;i<this.element.length;i++){
            switch(str.charAt(0)){
                case '#':
                    childElements.push(this.getId(str.substring(1)));
                    break;
                 case '.':
                    var all=this.getClassName(str.substring(1),this.element[i]);
                    for(var i=0;i<all.length;i++){
                        childElements.push(all[i]);
                    }
                    break;
                default:
              //   console.log(this.element[i]);
                  // console.log(str.substring(1));
                 var all=this.getTagName(str,this.element[i]);

                    //console.log(all)
                    for(var i=0;i<all.length;i++){
                        childElements.push(all[i]);
                }
            }
        }
        this.element=childElements;
        return this;
    },
    center:function(){

     
           // alert((Tool.getInner().height+this.offset().top - parseInt(Tool.getStyle(this.element[i] ,'height'))) / 2)
       
       // console.log($(window).offset());
         //  alert($(window).offset().top)
      //   alert((Tool.getInner().height+$(window).scrollTop() - parseInt(Tool.getStyle(this.element[i] ,'height'))) / 2);
        // alert(Tool.getInner().height)
          //  alert(parseInt(Tool.getStyle(this.element[i] ,'height')));
            var top = (Tool.getInner().height-parseInt(Tool.getStyle(this.element[0] ,'height'))) / 2+$(window).scrollTop();
//alert(top);
             var left = (Tool.getInner().width-parseInt(Tool.getStyle(this.element[0] ,'width'))) / 2+$(window).scrollLeft();
           
//alert(Tool.getInner().width+parseInt(Tool.getStyle(this.element[i] ,'width')))
            // //console.log(parseInt(Tool.getStyle(this.element[i] ,'width')))
//alert(top)
             this.element[0].style.top = top + 'px';
             this.element[0].style.left = left + 'px';
        
        return this;
    },
    lock:function(){
        for(var i=0;i<this.element.length;i++){
            this.element[i].style.width=Tool.getInner().width+'px';
            this.element[i].style.height=Tool.getInner().height+'px';
            this.element[i].style.display = 'block';
            document.documentElement.style.overflow = 'hidden';
         }
        return this;
    },
    unlock:function(){
          for(var i=0;i<this.element.length;i++){
         this.element[i].style.display = 'none';
         document.documentElement.style.overflow = 'auto';
      }
        return this;
    },
    resize:function(fn){
        for(var i=0;i<this.element.length;i++){
            window.onresize=fn;
        }
        return this;
    },
    offset:function(){
        var top=this.element[0].offsetTop;
        var parentT=this.element.offsetParent;
        while(parentT!=null){
            top+=parent.offsetTop;
            parentT=parentT.offsetParent;
        }
        var left=this.element[0].offsetLeft;
        var parentL=this.element.offsetParent;
        while(parentL!=null){
            left+=parentL.offsetLeft;
            parentL=parentL.offsetParent;
        }
        return {
            'top':top,
            'left':left
        };
    },
    scrollTop:function(){
        
        return document.documentElement.scrollTop ||document.body.scrollTop;
    },
    scrollLeft:function(){
        return document.documentElement.scrollLeft ||document.body.scrollLeft;
    },
    //DOMready 事件！
    ready:function(fn){
        if(document.addEventListener){// W3C
            document.addEventListener('DOMContentLoaded',function(){
                fn();
            },false);
        }else{
            var timer=null;
            var done=true;
            timer=setInterval(function(){
            try{
                if(done){
                 if(/loaded|complete/.test(document.readyState)){
                    done=false;
                    fn();
                 }
                }
            }catch(e){}

             },1);
        }
    },
    serialize:function(){
        var parts={};
        
        for(var i=0;i<this.element.length;i++){
            var field=null;
            var form=this.element[i]; //所有的form
            var elements=form.elements; //每一个fom 的元素；
            for(var j=0;j<elements.length;j++){ //循环第一个for的字段；

                switch(elements[j].type){ //过滤 每一个字段的类型；
                    case undefined:
                    case 'submit':
                    case 'button':
                        break;
                    case 'radio':
                    case 'checkbox':
                         if(!fied.selected) break;
                    case 'select-one':
                    case 'select-multiple':
                       /* for(var k=0;k<elements[j].options.length;k++){
                              var option=elements[k].options;
                            if(option.selected){
                                    var optValue = '';
                                    if (option.hasAttribute) {
                                         optValue = (option.hasAttribute('value') ?
                                         option.value : option.text);
                                    } else {
                                         optValue = (option.attributes['value'].specified ?
                                         option.value :
                                         option.text);
                                    }
                                     parts[elements[j].name] = optValue;
                            }
                        }
                    */
                     parts[elements[j].name]=elements[j].value;
                     //以后修改！；
                  break;
                default:
                    parts[elements[j].name]=elements[j].value;
        }
    }
        
    }
    return parts;
},
/*for (var j = 0; j < field.options.length; j++) {
    var option = field.options[j];
    if (option.selected) {
         var optValue = '';
        if (option.hasAttribute) {
             optValue = (option.hasAttribute('value') ?
             option.value : option.text);
        } else {
             optValue = (option.attributes['value'].specified ?
             option.value :
             option.text);
        }
         parts[field.name] = optValue;
    }
}
*/




    animate:function(obj,fn){
        
      
        /*for(var i=0;i<this.element.length;i++){
            var element=this.element[i];
            var attr=obj['attr']!=undefined?obj['attr']:'left';
            var start=obj['starget']!=undefined?obj['start']:parseInt(Tool.getStyle(element,attr));
            
            var t=obj['t']!=undefined?obj['t']:50;
            var alter=obj['alter']!=undefined?obj['alter']:0;
            var target=obj['target'];
         //  alert(target)
            var speed=obj['speed']!=undefined?obj['speed']:10;
            var type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';
            var step=obj['step']!=undefined?obj['step']:7;
           var  mul=obj['mul'];
            if(mul ==undefined){
                mul={};
                mul[attr]=target;
            }

           console.log(target)
          //  console.log(mul);
           // console.log(attr);
            clearInterval(element.timer);

            element.timer=setInterval(function(){
                var flag=true;
              for(var attr in mul){
                //  alert(attr);
                 //现在的值；
                 
               // console.log(mul[attr]);
                if(type=='buffer'){
                    if(attr!='opacity'){
                     var cur=parseInt(Tool.getStyle(element,attr));
                        step=(mul[attr]-cur)/speed;
                    }else{
                        var cur=parseInt(parseFloat(Tool.getStyle(element,attr))*100);
                        step=(mul[attr]-cur)/speed;
                     }

                 step=step>0?Math.ceil(step):Math.floor(step);
                }
              //  console.log(step)
               if(attr=='opacity'){

                    if(step==0){
                        setopacity()
                    }else{
                       var temp=parseFloat(Tool.getStyle(element,attr))*100;
                        element.style.opacity=(temp+step)/100;
                        element.style.filter='alpha(opacity='+(temp+step)+')'; 
                    }
               }else{
                    if(step==0){
                         setmove();
                    
                    }else{
                        console.log(step)
                      element.style[attr]=cur + step+'px';
                    }
               }
                

               if( parseInt(mul[attr])!=parseInt(target) ) flag=false;
              
           }

           if(flag){
              clearInterval(element.timer);
              if(fn!=undefined) fn();
           }

            }, 30);
        }
        function setmove(){
          element.style[attr] = target + 'px';
        }
        function setopacity(){
            element.style.opacity = parseInt(target) / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
        }
        return this;*/
        for (var i = 0; i < this.element.length; i ++) {
        var element = this.element[i];
        var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 
                       obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 
                       obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';

        
        var start = obj['start'] != undefined ? obj['start'] : 
                        attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 : 
                                                   parseInt(getStyle(element, attr));
        
        var t = obj['t'] != undefined ? obj['t'] : 10;                                              //可选，默认10毫秒执行一次
        var step = obj['step'] != undefined ? obj['step'] : 20;                             //可选，每次运行10像素
        
        var alter = obj['alter'];
        var target = obj['target'];
        var mul = obj['mul'];
        
        var speed = obj['speed'] != undefined ? obj['speed'] : 6;                           //可选，默认缓冲速度为6
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';      //可选，0表示匀速，1表示缓冲，默认缓冲
        
        
        if (alter != undefined && target == undefined) {
            target = alter + start;
        } else if (alter == undefined && target == undefined && mul == undefined) {
            throw new Error('alter增量或target目标量必须传一个！');
        }
        
        
        
        if (start > target) step = -step;
        
        if (attr == 'opacity') {
            element.style.opacity = parseInt(start) / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(start) +')';
        } else {
           // element.style[attr] = start + 'px';
        }
        
        
        if (mul == undefined) {
            mul = {};
            mul[attr] = target;
        }
        
      //  console.log(target);
        clearInterval(element.timer);
        element.timer = setInterval(function () {
        
            /*
                问题1：多个动画执行了多个列队动画，我们要求不管多少个动画只执行一个列队动画
                问题2：多个动画数值差别太大，导致动画无法执行到目标值，原因是定时器提前清理掉了
                
                解决1：不管多少个动画，只提供一次列队动画的机会
                解决2：多个动画按最后一个分动画执行完毕后再清理即可
            */
            
            //创建一个布尔值，这个值可以了解多个动画是否全部执行完毕
            var flag = true; //表示都执行完毕了
            
            for (var i in mul) {
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
                target = mul[i];
                  //  console.log(target);
        
                if (type == 'buffer') {
                    step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
                                                         (target - parseInt(getStyle(element, attr))) / speed;
                                                         
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                }
                
                
                
                if (attr == 'opacity') {
                    if (step == 0) {
                        setOpacity();
                    } else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
                        setOpacity();
                    } else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
                        setOpacity();
                    } else {
                        var temp = parseFloat(getStyle(element, attr)) * 100;
                        element.style.opacity = parseInt(temp + step) / 100;
                        element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
                    }
                    
                    if (parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) flag = false;

                } else {
                    if (step == 0) {
                        setTarget();
                    } else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
                        setTarget();
                    } else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
                        setTarget();
                    } else {
                        element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
                    }
                    
                    if (parseInt(target) != parseInt(getStyle(element, attr))) flag = false;
                }
                
                //document.getElementById('test').innerHTML += i + '--' + parseInt(target) + '--' + parseInt(getStyle(element, attr)) + '--' + flag + '<br />';
                
            }
            
            if (flag) {
                clearInterval(element.timer);
                if (obj.fn != undefined) obj.fn();
            }
                
        }, t);
        
        function setTarget() {
            element.style[attr] = target + 'px';
        }
        
        function setOpacity() {
            element.style.opacity = parseInt(target) / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
        }
    }
    return this;



    }  
}

var $=window.Base=window.$=Base;
//工具函数，善待修改！
$.inArray=function(array,value){
    for(var i=0;i<array.length;i++){
        if(array[i]===value){
            return true;
        }else{
            return false;
        }
    }
}
$.prevIndex=function(current,parent){
   var length= parent.children.length;
   if(current==0) return length-1;
   return current-1;
}
$.nextIndex=function(current,parent){

   var length= parent.children.length;
   //alert(current ==length-1);
   if(current==length-1){
         return 0;
    }else{
        return parseInt(current)+1; 
    }
  
}
$.ajax=function(obj){
    var xhr = (function () {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != 'undefined') {
            var version = [
            'MSXML2.XMLHttp.6.0',
            'MSXML2.XMLHttp.3.0',
            'MSXML2.XMLHttp'
            ];
    for (var i = 0; version.length; i ++) {
        try {
            return new ActiveXObject(version[i]);
        } catch (e) {
            //跳过
        }
    }
    } else {
        throw new Error('您的系统或浏览器不支持 XHR 对象！');
    }
    })();

        obj.url = obj.url + '?rand=' + Math.random();

    obj.data = (function (data) {
        var arr = [];
        for (var i in data) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    })(obj.data);
   // console.log(obj.data);
        if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&'
        + obj.data;
    if (obj.async === true) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) { //已经发送出去了
                 callback();
            }
        };
    }
    xhr.open(obj.method, obj.url, obj.async);
    if (obj.method === 'post') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(obj.data);
    } else {
           xhr.send(null);
    }
    if (obj.async === false) {
         callback();
    }
    function callback() {
    if (xhr.status == 200) {  //成功接到请求！
         obj.success(xhr.responseText); //回调传递参数
    } else {
          alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
         }
    }
};

//cookie
$.cookie=function(name,value,expires,path,domain,secure){
   
   // function setCookie(name,value,expires,path,domain,secure){
   if(name!=undefined && value!=undefined  ){
    //设置
    //alert('set')
        var cookieName=encodeURIComponent(name)+'='+encodeURIComponent(value);
            if(!isNaN(expires)){
             //    alert('')
                cookieName+=';expires='+expires
            }
            if(path){
                cookieName+=';path='+path;
            }
            if(domain){
                cookieName+=';domain='+domain;
            }
            if(secure){
                cookieName+=';secure='+secure;
            }
            document.cookie=cookieName;
            return true;
    }
    if(value==undefined && name!=undefined && expires==undefined && path==undefined && domain==undefined && secure==undefined){
       // alert('get');
      // alert(value==undefined)
        //获取；
        var str=document.cookie;

        str=str.replace(/\s*/g,'');
        var arr=str.split(';');
      //  console.log(arr);
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');
            for(var j=0;j<arr2.length;j++){
               // console.log(arr2);
                if(arr2[0]==name){
                    return decodeURIComponent(arr2[1]);
                }

            }
         }
    }
      //删除
      //  //  console.log(str)
   /* if(name!=undefined && value=='null'){
      
       
        var str=document.cookie;
    
       str=str.replace(/\s*/  //g,'');
     /*    var arr=str.split(';');
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');
            for(var j=0;j<arr2.length;j++){
                if(arr2[j]==name){
                    $.cookie(name,arr2[1],-1);
                }
            }
        }
    }*/
   // }
}
$.removeCookie=function(name){
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=$.cookie(name); 
    if(cval!=null) 
    document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}
function setCookieDate(day){
    var date=null;
    if(typeof day=='number' && day>0){
        date=new Date();
        date.setDate(date.getDate()+day);
    }else{
        throw new Error('你传递的参数有误！');
    }
    return date;
}

$.extend=function(name,fn){
    
    $.prototype[name]=fn;
}
})();