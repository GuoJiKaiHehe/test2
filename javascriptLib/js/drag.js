 $.extend('drag',function(title){
    for(var i=0;i<this.element.length;i++){

           addEvent(this.element[i],'mousedown',function(e){


               // e.preventDefault();//阻止默认行为！
                e.stopPropagation();
            
                var _this=this; //this 点击的那个node
                this.diffX=e.clientX-_this.offsetLeft;
                this.diffY=e.clientY-_this.offsetTop;
                
              //   alert();
                 if(e.target.tagName==title){
                 addEvent(document,'mousemove',move);
                 }
                document.onmouseup=function(){
                  //alert('')
                    removeEvent(document,'mousemove',move);
                    document.onmouseup=null;
              } 
              function move(e){

                    var top=e.clientY-_this.diffY;
                    var left=e.clientX-_this.diffX;
                    if (left < 0) {
                    left = 0;
                     } else if (left > Tool.getInner().width - _this.offsetWidth) {
                         left = Tool.getInner().width - _this.offsetWidth;
                      }
                    if (top < 0) {
                          top = 0;
                     } else if(top<= Tool.scrollTop() ){
						
						 top=Tool.scrollTop();
					 }else if (top > Tool.getInner().height - _this.offsetHeight+ Tool.scrollTop() ) {
                         top = Tool.getInner().height - _this.offsetHeight + window.Tool.scrollTop();
                     }
					 // alert(Tool.scrollTop());
                   // console.log(top+'---'+left)
                    _this.style.position="absolute";
                    _this.style.top=top+'px';
                    _this.style.left=left+'px';
              }
           });
        }
        return this;
   
 });
