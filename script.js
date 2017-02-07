// 先用jq写，等全部的行为都写完了，再用原生js重构代码，去掉jq；

$(function(){
	// body的rem字体设置；
	var w = 0,
		fontChange = function(){
			w = $(window).width();
			$('html,body').css({fontSize : 2.8 * (w/320) + 'px'})
		}
		fontChange();
	$(window).on('resize', fontChange);

	// 响应式导航栏下拉切换；
	$('#navhide div').on('click',function(){
		$(this).next().stop().slideToggle(400);
	})

	// 回到顶部；
	$(document).scroll(function(){
		toTop();
	})
	$('#totop').click(function(){
		$('html,body').animate({scrollTop:0},500);
	})
	function toTop(){
		var $h = $(document).scrollTop(),
			$totop = $('#totop');
		if ($h > 200) {
			$totop.fadeIn('fast');
		} else {
			$totop.fadeOut('fast');
		}
	}
	toTop();

})