// 点击祖先元素中的任意一个相同标签元素，缓慢、打开或收起下拉栏；
function header_tab(ele1,ele2,name,tag){
	var ele1=getId(ele1);
	var ele2=getId(ele2);
	ele1.onclick=function(event){
		var e=event||window.event;
		var target=e.srcElement||e.target;
		if (target.tagName.toLowerCase()==tag&&target.getAttribute('type')!='text') {
			if (!new RegExp(name).test(ele2.className)) {
				addClass(ele2,name);
			}else{
				removeClass(ele2,name);
			}
			e.preventDefault();
		}
	}
	window.addEventListener('click',function(event){
		var e=event||window.event;
		var target=e.srcElement||e.target;
		if (target.tagName.toLowerCase()!=tag) {
			removeClass(ele2,name);
		}
	},false);
}



//鼠标悬浮在小圆点时，切换到这个div；
function conTab(ele1,ele2,ele,name1,name2){
	var ele1=getId(ele1);
	var ele2=getId(ele2);
	var ele=getId(ele);
	ele1.onmouseover=function(){
		addClass(ele,name1);
		removeClass(ele,name2);
		ele1.style.backgroundColor="#63065F";
		ele2.style.backgroundColor="#666666";
	}
}


// 获取主页中所有的a链接，当点击任意链接的时候，跳转到subpage页面；
// 点击带有类名为class="toindex"的a标签，回到首页；
function toSubpage(){
	var body=document.getElementsByTagName('body')[0];
	var partten1=new RegExp('toindex');
	body.addEventListener('click',function(event){
		var e=event||window.event;
		var target=e.srcElement||e.target;
		if (target.tagName.toLowerCase()=="a"&&!partten1.test(target.className)
			&&target.className.toLowerCase()!="banner_left"&&target.className.toLowerCase()!="banner_right") {
			target.href="subpage.html";
		}
		if (target.tagName.toLowerCase()=="a"&&partten1.test(target.className)) {
			target.href="nanjingdaxue.html";
		}
	},false);
}







