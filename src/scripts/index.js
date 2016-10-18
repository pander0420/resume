//js的入口文件
//引入zepto
var $ = require('./components/zepto-modules/_custom');


//引入weixin-js-sdk
var wx = require('./components/weixin-js-sdk/index');
 //引入iscroll

var Iscroll = require('./components/iscroll/iscroll.js');
console.log(Iscroll)


//设置iscroll对象默认为hide
$('#mainContent').hide();
$('.swiper-container').hide();



$('#enter').tap(function(){
	$('#mainContent').show();
	$('.swiper-container').hide();


	//需要进行post请求，然后请求/api/skill,并且将数据列表显示在iscroll

	$.post('/api/skill', { }, function(response){
  		console.log(response)
  		var html="";
  		for(var i=0;i<response.length;i++){
  			html+="<li><span class='iconfont'>"+response[i].iconfont+"</span><div class='category'>"+response[i].category+"</div>"+"<div class='name'>"+response[i].name+"</div>"+"</li>";
  			
  		}
      $("#scroller ul").html(html);
  		//调用iscroll
  		var myScroll = new Iscroll('#wrapper', { mouseWheel: true ,hScrollbar:true, vScrollbar:true});

  		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);



	})

	
})

//引入swiper

var Swiper = require('./components/swiper/swiper-3.3.1.min.js');

//引入swiper animate
var SwiperAnimate = require('./components/swiper/swiper.animate1.0.2.min');

 var mySwiper = new Swiper ('.swiper-container', {
 	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
	    SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
	    SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
  	}, 
  	onSlideChangeEnd: function(swiper){ 
    	SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  	} 
  })  

 $("#footer div").tap(function(){

 	var apiTarget = $(this).attr("id"); 
  $("#title").html(apiTarget);
  if(apiTarget=="skill"||apiTarget=="interests"){
    $.post('/api/'+apiTarget, {}, function(response){

      var html="";
      for(var i=0;i<response.length;i++){
        html+="<li><span class='iconfont'>"+response[i].iconfont+"</span><div class='category'>"+response[i].category+"</div>"+"<div class='name'>"+response[i].name+"</div>"+"</li>";
        
      }

      $("#scroller ul").html(html);
    })
  }
  if(apiTarget=="me"){
    $('#mainContent').hide();
    $('.swiper-container').show();

  }
  else{
    $.post('/api/'+apiTarget, {}, function(response){

      var html="";
      for(var i=0;i<response.length;i++){
        html+="<li><span class='iconfont'>"+response[i].iconfont+"</span><div class='category'>"+response[i].category+"</div>"+"<div class='name'>"+response[i].name+"</div>"+"</li>";
        
      }
      $("#scroller ul").html(html);
    })
  }
 	

 })

 var interval = setInterval(function(){
  if(document.readyState ==='complete'){
    clearInterval(interval);
    $('#preload').hide();
    $('.swiper-container').show();
    mySwiper.updateContainerSize();
    mySwiper.updateSlidesSize();
  }else{
    $('#preload').show();
  }
 },100);
 

 console.log($.post());
$("#qcode").tap(function(){
    $.post("http://1.1075803802.applinzi.com/php/getsign.php",{
        url:window.location.href
    },function(data){
        pos = data.indexOf('}');
        dataStr = data.substring(0,pos+1);
        objData = JSON.parse(dataStr);
        console.log(dataStr);
            wx.config({
                debug:true,
                appId:objData.appId,
                timestamp: objData.timestamp,
                nonceStr:objData.nonceStr,
                signature:objData.signature,
                jsApiList:[
                'scanQRCode','getLocation'
                //所有要调用的API都要加到这个列表中
                ]
            });

            wx.ready(function(){
                //在这里调用 API
               
                wx.scanQRCode({
                    needResult:1,//默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType:["qrCode","barCode"],//可以指定扫二维码还是一维码，默认二者都有
                    success:function(res){
                        var result = res.resultStr;//当needResult为 1时，扫码返回的结果
                    }
                });
                // wx.getLocation({
                //    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                //    success: function (res) {
                //        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                //        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                //        var speed = res.speed; // 速度，以米/每秒计
                //        var accuracy = res.accuracy; // 位置精度
                //    }
                //});
            });
    });
})





