window.onload=function(){
    // var str=load('demo.txt');
    // alert(str);
 var json='[ {"title":"a"}, {"title":"b"},{"title":"c"}]';
    var obj=JSON.parse(json);
    console.log(obj);
}