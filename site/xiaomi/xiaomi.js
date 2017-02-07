// 设置nav下拉的最外层div的宽度为网页窗口宽度；
(function(){
	var mi_tab=getId('mi-tab'),
		items=mi_tab.getElementsByClassName('item_children'),
		w;
	if (document.documentElement&&document.documentElement.clientWidth) {
		w=document.documentElement.clientWidth;
	}
	for (var i = 0; i < items.length; i++) {
		items[i].style.width=w+"px";
	}
})();


// 当聚焦在搜索框时，搜索按钮出现黄色边框；
function colorChange(){
	var search=getId('search');
	var search_submit=getId('search_submit');
	var hot_words=getId('hot_words');
	var search_tab_num=getId('search-tab-num');
	search.addEventListener('focus',function(){
		addClass(hot_words,'tab-words');
		search_submit.style.borderColor="#FF6700";
		search_tab_num.style.display="block";
	},false);
	search.addEventListener('blur',function(){
		search_submit.style.borderColor="#e0e0e0";
		removeClass(hot_words,"tab-words");
		search_tab_num.style.display="none";
	},false);
}
colorChange();


// 轮播图；实现小圆圈跟随切换和点击切换、tab按钮切换、自动轮播三个功能；
function navFlow(){
	var mi_flow=getId('mi-flow-image'),
		lis=mi_flow.getElementsByTagName('li'),
		prev=getId('mi-prev'),
		next=getId('mi-next'),
		mi_circle=getId('mi-circle'),
		flow_top_top=getId('flow-top-top'),
		circles=mi_circle.getElementsByTagName('a'),
		p=new RegExp('image-choice'),
		n=0;

	function tabRightImage(){
		for (var i = 0; i < lis.length; i++) {
			if (p.test(lis[i].className)) {
				n=i+1;
			}
		}
		n++;
		if (n==6) {
			addClass(lis[0],'image-choice');
			removeClass(lis[4],'image-choice');
			addClass(circles[0],'circle-choice');
			removeClass(circles[4],'circle-choice');
		}else{
			addClass(lis[n-1],'image-choice');
			removeClass(lis[n-2],'image-choice');
			addClass(circles[n-1],'circle-choice');
			removeClass(circles[n-2],'circle-choice');
		}
	}

	function tabLeftImage(){
		for (var i = 0; i < lis.length; i++) {
			if (p.test(lis[i].className)) {
				n=i+2;
			}
		}
		n--;
		if (n==1) {
			addClass(lis[4],'image-choice');
			removeClass(lis[0],'image-choice');
			addClass(circles[4],'circle-choice');
			removeClass(circles[0],'circle-choice');
		}else{
			addClass(lis[n-2],'image-choice');
			removeClass(lis[n-1],'image-choice');
			addClass(circles[n-2],'circle-choice');
			removeClass(circles[n-1],'circle-choice');
		}
	}

	prev.addEventListener('click',function(event){
		var e=event||window.event;
		var target=e.srcElement||e.target;
		if (e.preventDefault) {
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
		tabLeftImage();
	},false);

	next.addEventListener('click',function(event){
		var e=event||window.event;
		var target=e.srcElement||e.target;
		if (e.preventDefault) {
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
		tabRightImage();
	},false);

	var t=setInterval(tabRightImage,3000);
	flow_top_top.addEventListener('mouseover',function(){clearInterval(t)},false);
	flow_top_top.addEventListener('mouseout',function(){t=setInterval(tabRightImage,3000);},false);
	var m=0;

	mi_circle.addEventListener('click',function(event){
		var e=event||window.event;
		var target=e.srcElement||e.target;
		if (target.tagName.toLowerCase()=="a") {
			if (e.preventDefault) {
				e.preventDefault();
			}else{
				e.returnValue=false;
			}
			for (var i = 0; i < circles.length; i++) {
				circles[i].className=" ";
			}
			addClass(target,'circle-choice');
			for (var i = 0; i < circles.length; i++) {
				if(target==circles[i]){
					m=i;
				}
				for (var j = 0; j < lis.length; j++) {
					removeClass(lis[j],'image-choice');
				}
				addClass(lis[m],'image-choice');
			}
		}
	},false);
}
navFlow();


// 小米明星产品轮播图
function starFlow(){
	var left=getId('star-left'),
		right=getId('star-right'),
		starflow=getId('mi-star-flow');

	var rightflow=function(){
			addClass(starflow,'onright');
			addClass(right,'onshow');
			removeClass(left,'onshow');
		}

	var leftflow=function(){
			removeClass(starflow,'onright');
			addClass(left,'onshow');
			removeClass(right,'onshow');
		}

	right.addEventListener('click',rightflow,false);
	left.addEventListener('click',leftflow,false);
	var part=new RegExp('onright');
	
	setInterval(function(){
		if (part.test(starflow.className)) {
			leftflow();
		}else{
			rightflow();
		}
	},5000);
}
starFlow();


// 配件栏的选项卡切换；
partTabShow('partshow','main-subtitle','oncolorshow',"onpartshow");



// 内容区域栏
// 当鼠标悬浮在左右tab按钮上时，添加类名opc2,删除opc1；
// 当鼠标悬浮在li上时，添加类名opc1.删除opc2；
function addOpc(){
	var tabs=document.getElementsByClassName('con-flow-tab');
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('mouseover',function(event){
			var e=event||window.event;
			var target=e.srcElement||e.target;
			if (target.tagName.toLowerCase()=="a") {
				addClass(target,"opc2");
				removeClass(target,"opc1");
			}
		},false);
		tabs[i].addEventListener('mouseout',function(event){
			var e=event||window.event;
			var target=e.srcElement||e.target;
			if (target.tagName.toLowerCase()=="a") {
				addClass(target,"opc1");
				removeClass(target,"opc2");
			}
		},false);
	}
}
addOpc();


// 内容区域栏
// tab选项卡轮播
function conflow(e,left,right,circle){
	var con_ul=getId(e),
		left=getId(left),
		right=getId(right),
		circles=getId(circle),
		lis=circles.getElementsByTagName('li'),
		ul_length=0;

	function tabcursor(){
		if (ul_length==0) {
			left.style.cursor="default";
			right.style.cursor="pointer";
		}else if (ul_length==-888) {
			right.style.cursor="default";
			left.style.cursor="pointer";
		}else{
			left.style.cursor="pointer";
			right.style.cursor="pointer";
		}
	}
	tabcursor();

	function leftmove(){
		if (ul_length<0) {
			con_ul.style.marginLeft=(ul_length+296)+"px";
		}else{
			con_ul.style.marginLeft=0;
		}
		ul_length=parseInt(con_ul.style.marginLeft);
		cirfollow();
		tabcursor();
	}
	function rightmove(){
		if (ul_length>-888) {
			con_ul.style.marginLeft=(ul_length-296)+"px";
		}else{
			con_ul.style.marginLeft="-888px";
		}
		ul_length=parseInt(con_ul.style.marginLeft);
		cirfollow();
		tabcursor();
	}
	left.addEventListener('click',leftmove,false);
	right.addEventListener('click',rightmove,false);

	function cirfollow(){
		for (var n = 0; n < lis.length; n++) {
			removeClass(lis[n],'onorange');
		}
		switch(parseInt(ul_length)){
			case 0:
				addClass(lis[0],'onorange');
				break;
			case -296:
				addClass(lis[1],'onorange');
				break;
			case -592:
				addClass(lis[2],'onorange');
				break;
			case -888:
				addClass(lis[3],'onorange');
				break;
		}
	}
	function cirshow(event){
		var m=0;
		var e=event||window.event;
		var target=e.srcElement||e.target;
		if (target.tagName.toLowerCase()=="li"||target.parentNode.tagName.toLowerCase()=="li") {
			for (var j = 0; j < lis.length; j++) {
				removeClass(lis[j],'onorange');
			}
			for(var i in lis){
				if (target==lis[i]) {
					m=i;
					addClass(target,'onorange');
				}else if(target.parentNode==lis[i]){
					m=i;
					addClass(target.parentNode,'onorange');
				}
			}
			// i是属性非数字,m是字符串；
			switch (parseInt(m)){
			  	case 0:
			    	con_ul.style.marginLeft="0px";
			    	ul_length=parseInt(con_ul.style.marginLeft);
			    	break;
			  	case 1:
			    	con_ul.style.marginLeft="-296px";
			    	ul_length=parseInt(con_ul.style.marginLeft);
			    	break;
			  	case 2:
			    	con_ul.style.marginLeft="-592px";
			    	ul_length=parseInt(con_ul.style.marginLeft);
			    	break;
			  	case 3:
			    	con_ul.style.marginLeft="-888px";
			    	ul_length=parseInt(con_ul.style.marginLeft);
			    	break;
			}
		}
	}
	circles.addEventListener('click',cirshow,false);
}
conflow('one-ul','con-left1','con-right1','con-flow-circle1');
conflow('two-ul','con-left2','con-right2','con-flow-circle2');
conflow('three-ul','con-left3','con-right3','con-flow-circle3');
conflow('four-ul','con-left4','con-right4','con-flow-circle4');


// 设置所有的a链接指向；
function aL(){
	var body=document.getElementsByTagName('body')[0];
	function aclick(event){
		var e=event||window.event;
		var target=e.target||e.srcElement;
		if (target.tagName.toLowerCase()=="a"||target.parentNode.tagName.toLowerCase()=="a") {
			if (e.preventDefault) {
				e.preventDefault();
			}else{
				e.returnValue=false;
			}
		}
	}
	body.addEventListener('click',aclick,false);
}
aL();