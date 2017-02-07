 
$(function(){
	// 让body的高度等于页面的高度；
	$('body').height($(document).height());

	//搜索框的到焦点时，占位符消失，失去焦点时，占位符出现；
	var pstr = $('#con_search').val();
	$('#con_search').on("focus",function(){
		$(this).val("");
	});
	$('#con_search').on("blur",function(){
		$(this).val(pstr);
	});


	// 点击‘向左’，banner_part向左移动一个部分；
	$('#info_prev').on("click",function(){
		$('#banner_part').stop(true,true).animate({marginLeft: "-=273px"},"normal",function(){
			if (parseInt($('#banner_part').css('marginLeft')) == -4368) {
				$(this).css({marginLeft:"-1638px"});
			}
		});
	})
	// 点击‘向右’，banner_part向右移动一个部分；
	$('#info_next').on("click",function(){
		$('#banner_part').stop(true,true).animate({marginLeft: "+=273px"},"normal",function(){
			if (parseInt($('#banner_part').css('marginLeft')) == 0) {
				$(this).css({marginLeft:"-2730px"});
			}
		});
	})


	// 当鼠标点击在info_title/info_hidden上时，小图标和这个title/hidden栏上滑；
	var info_flow;
	$('#info_btn').on("click",function(){
		if ($(this).css('top') == "126px") {
			clearInterval(info_flow);
			if (!$(this).is(":animated")) {
				$("#info_title").stop(true,true).animate({bottom:"172px"},500);
				$("#info_hidden").stop(true,true).animate({height:"172px"},500);
				$(this).css({backgroundImage:"url('index_out.png')"}).stop(true,true).
				animate({top:"-45px"},500);
				$('#con_info_bottom').css({backgroundImage:"url('banner2.png')"});

				// 当鼠标悬浮在info_title栏上时，下面的选项卡对应切换；
				$('#info_title').find('a').each(function(){
					var index = 0;
					$(this).on("mouseover",function(){
						index = $(this).parent().index();
						$('#con_hidden_left>div').eq(index).addClass('info_on').siblings().
						removeClass('info_on');
					})
				})

				// 当打开上拉按钮时，里面的图片开始轮播；
				function getInfoFlow(){
					$('.con_hidden_right ul').animate({left:"-=188px"},600,function(){
						if ($(this).css('left') == "-752px") {
							if ($(this).find('li').length == 5 ) {
								$(this).append($(this).html());
							}
						}
						if ($(this).css('left') == "-1692px") {
							$(this).css({left: "-752px"});
						}
					});
				}
				info_flow = setInterval(getInfoFlow, 3000);
				// 当鼠标悬浮在里面的图片上，轮播暂停,移出时，再次恢复轮播；
				$('.con_hidden_right ul').on("mouseover",function(){
					clearInterval(info_flow);
				});
				$('.con_hidden_right ul').on("mouseout",function(){
					info_flow = setInterval(getInfoFlow, 3000);
				});
			}
		}else{
			clearInterval(info_flow);
			if (!$(this).is(":animated")) {
				$("#info_title").stop(true,true).animate({bottom:"0px"},500);
				$("#info_hidden").stop(true,true).animate({height:"0px"},500);
				$(this).css({backgroundImage:"url('index_enter.png')"}).stop(true,true).
				animate({top:"126px"},500);
				$('#con_info_bottom').css({backgroundImage:"url('banner.png')"});
			}
		}
	});


	// 背景轮播图;
	var i=0;
	setInterval(function(){
		i++;
		if (i>3) {
			i=1;
			setbgflow(i);
		}else{
			setbgflow(i);
		}
	},5000);
	function setbgflow(i){
		$('.pageFlow img').eq(i).fadeIn(1000).siblings().fadeOut(1000);
	}
})