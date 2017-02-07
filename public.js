// 可复用的公有方法；


// 获得id；
function getId(id){
	return document.getElementById(id);
}


// 获取实时日期时间；
function getDate(ele){
	var today=new Date(),
		year=today.getFullYear(),
		month=today.getMonth()+1,
		day=today.getDate(),
		hour=today.getHours(),
		minute=today.getMinutes(),
		second=today.getSeconds();
	if (hour<10) {
		hour='0'+hour;
	}
	if (minute<10) {
		minute='0'+minute;
	}
	if (second<10) {
		second='0'+second;
	}
	var el=getId(ele);
	el.innerHTML=year+'年'+month+'月'+day+'日'+' '+hour+':'+minute+':'+second;
	setTimeout("getDate('"+ele+"')",1000);  //等价于setTimeout(getDate('ele'),1000);
}


//输入框获得焦点时，占位符消失；失去焦点时，占位符重现；
function removePlace(ele){
	var el=getId(ele),
		v=el.value;
	el.addEventListener('focus',function(){
		el.value='';
	},false);
	el.addEventListener('blur',function(){
		el.value=v;
	},false);
}


// 下拉淡入淡出函数；
function tabChange(el,h){
	var a=null;
	return {
		slidedown:function(){		
			clearTimeout(a);
			el.style.display="block";
			el.style.overflow="hidden";
			var h_change=0;
			var down = function (){
				h_change+=parseInt(h)/30;
				el.style.height=h_change+"px";
				a=setTimeout(arguments.callee,15);
				while(h_change>parseInt(h)){
					el.style.height=parseInt(h)+"px";
					clearTimeout(a);
					el.style.overflow="visible";
					return;
				}
			}
			down();
		},
		slideup:function(){
			clearTimeout(a);
			var h_change=el.clientHeight;
			el.style.overflow="hidden";
			var up = function (){
				h_change-=parseInt(h)/30;
				el.style.height=h_change+"px";
				a=setTimeout(arguments.callee,15);
				while(h_change<0){
					el.style.height=0;
					clearTimeout(a);
					el.style.display="none";
					return;
				}
			}
			up();
		}
	}
}



//添加类名
function addClass(ele,name){
	var pattern=new RegExp(name);
	if (ele&&name) {
		if (ele.className=='') {
			ele.className=name;
		}else{
			if(pattern.test(ele.className)){
				ele.className=ele.className;
			}else{
				ele.className+=' '+name;
			}
		}
	}
}


// 删除类名
function removeClass(ele,name){
	var pattern1=new RegExp(name),
		pattern2=new RegExp("\\s"+name);
	if (ele&&name) {
		if(pattern2.test(ele.className)){
			ele.className=ele.className.replace(pattern2,'');
		}else{
			ele.className=ele.className.replace(pattern1,'');
		}
	}
}



//事件兼容函数；



// '回到顶部'的显示和隐藏；
function toTop(id){
	var to_top=getId(id);
	var t_top=function(){
		var scroll_h=document.documentElement.scrollTop || document.body.scrollTop;
		if (parseInt(scroll_h)>400) {
			to_top.style.display="block";
		}else{
			to_top.style.display="none";
		}
	};
	window.addEventListener("scroll",t_top,false);
	to_top.onclick=function(){
		document.documentElement.scrollTop = document.body.scrollTop =0;
		getId('header').className="header";
	}
}



//轮播图：点击left，向左切换，点击right，向右切换，同时透明度过渡变化，通过切换类名实现；
//ele1/ele2为左轮播右轮播的切换按钮id，ele2为轮播元素的父元素，name为轮播添加的类名；
function flowImage(ele1,ele2,parent,name){
	var ele2=getId(ele2),
		parent=getId(parent),
		lis=parent.getElementsByTagName('li'),
		ele1=getId(ele1),
		part1=new RegExp(name),
		part2=new RegExp("\\s"+name),
		t=0;
	var flowRight=function(){
		for (var i = 0,len=lis.length; i <len ; i++) {
			if (part1.test(lis[i].className)) {
				t=i;
			}
		}
		lis[t].className=lis[t].className==name?'':lis[t].className.replace(part2,'');
		if (t==lis.length-1) {
			lis[0].className=lis[0].className==''?name:" "+name;
		}else{
			lis[t+1].className=lis[t+1].className==''?name:" "+name;
		}
	}
	var flowLeft=function(){
		for (var i = 0,len=lis.length; i < len; i++) {
			if (part1.test(lis[i].className)) {
				t=i;
			}
		}
		lis[t].className=lis[t].className==name?'':lis[t].className.replace(part2,'');
		if (t==0) {
			lis[lis.length-1].className=lis[lis.length-1].className==''?name:" "+name;
		}else{
			lis[t-1].className=lis[t-1].className==''?name:" "+name;
		}
	}
	var f_s=setInterval(flowRight,5000);
	parent.parentNode.addEventListener('mouseover',function(){clearInterval(f_s)},false);
	parent.parentNode.addEventListener('mouseout',function(){f_s=setInterval(flowRight,4000)},false);
	ele1.addEventListener('click',flowRight,false);
	ele2.addEventListener('click',flowLeft,false);
}



// tab选项卡显示切换；
// ele1,name1,为tab按钮元素id和类名；
// ele2,name2,为tab对应的容器元素id和类名；
function partTabShow(ele1,ele2,name1,name2){
	var ele1=getId(ele1),
		uls=ele1.getElementsByTagName('ul'),
		ele2=getId(ele2),
		lis=ele2.getElementsByTagName('li'),
		m=0;
	function loopsiblings(){
		for (var i = 0,lens=uls.length; i < lens; i++) {
			removeClass(uls[i],name2);
		}
		for (var i = 0,len=lis.length; i < len; i++) {
			removeClass(lis[i],name1);
		}
	}
	function addC(event){
		var e=event||window.event,
			target=e.srcElement||e.target;
		if (target.tagName.toLowerCase()=='li') {
			for(var i in lis){
				if (target==lis[i]) {
					m=i;
				}
				loopsiblings();
				addClass(lis[m],name1);
				addClass(uls[m],name2);
			}
		}
	}
	ele2.addEventListener('mouseover',addC,false);
}





