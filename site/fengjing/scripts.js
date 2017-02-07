
$(function(){
	// 当search框获得焦点并且有字时，显示下拉框；
	$('#search').on("keydown",function(){
		if ($(this).val() != "") {
			$('#search_tab').css({display:"block"});
		}else{
			$('#search_tab').css({display:"none"});
		}
	})
	$('#search').on("focus",function(){
		if ($(this).val() == "请输入关键字查询") {
			$(this).val("");
		}
	})
	$('#search').on("blur",function(){
		if ($(this).val() == "") {
			$(this).val("请输入关键字查询");
		}
		$('#search_tab').css({display:"none"});
	})


	//轮播大图；
	function flowImage(){
		var $left;
		var $slide_img = $("#slide_img");
		var slideTime = setInterval(decide,3000);
		function decide(){
			showPrev();
			showNext();
		}
		function showPrev(){
			$left = $('#slide_img').css('left');
			if ($left == "-1440px") {
				$slide_img.animate({left:"+=1440px"},600);
				$('#circle_one').addClass('circle_on').parent().siblings().find('#circle_two')
				.removeClass("circle_on");
			}
		}
		function showNext(){
			$left = $('#slide_img').css('left');
			if ($left == "0px") {
				$slide_img.animate({left:"-=1440px"},600);
				$('#circle_two').addClass('circle_on').parent().siblings().find('#circle_one')
				.removeClass("circle_on");
			}
		}
		$('#slide_prev').on("click",function(){
			if (!$slide_img.is(":animated")) {
				showPrev();
			}
		})
		$('#slide_next').on("click",function(){
			if (!$slide_img.is(":animated")) {
				showNext();
			}
		})
		$('#circle_one').on("click",function(){
			showPrev();
		})
		$('#circle_two').on("click",function(){
			showNext();
		})
		$('#header_slidebox').on("mouseover",function(){
			clearInterval(slideTime);
		})
		$('#header_slidebox').on("mouseout",function(){
			slideTime = setInterval(decide,3000);
		})
	}
	flowImage();
	

	// 点击hot_map的title栏，会出现栏目变长然后展现下拉；
	$('#hot_btn').on("click",function(){
		var $l = $("#hot_scene").width();
		var $hot_scene = $("#hot_scene");
		if ($l == 200) {
			$hot_scene.animate({width:"260px"},600,function(){
				$hot_scene.find('span').css({backgroundImage:"url(images/t-up.png)"});
				$('#hot_map_con').slideDown(400);
			});
		}else{
			$('#hot_map_con').slideUp(400,function(){
				 $hot_scene.find('span').css({backgroundImage:"url(images/t-down.png)"});
				 $hot_scene.animate({width:"200px"},600);
			})
		}
	})


	//当鼠标悬浮在31个省份中任意一个时，显示子栏目；
	var $dw_sub = $('#dw_sub');
	$('.hot_map_dw').each(function(){
		$(this).on("mouseover",function(){
			$dw_sub.css({display:"block",top: (56 + $(this).height() + parseInt($(this).css('top'))) + "px",
				left:(parseInt($(this).css('left')) - $dw_sub.width()/2 + $(this).width()/2) + "px"});
		})
		$(this).on("mouseout",function(){
			$dw_sub.css({display:"none"});
		})
		$dw_sub.on("mouseover",function(){
			$(this).css({display:"block"});
		})
		$dw_sub.on("mouseout",function(){
			$(this).css({display:"none"});
		})
	})


	//选中哪一个月份，哪一个月份就出现变化；
	$('#season_time_two span').each(function(){
		var $index;
		$(this).on("click",function(){
			$(this).addClass('season_circle_on').parent().siblings().find('span').removeClass('season_circle_on');
			$index = $(this).parent().index();
			$('#season_time_one span').eq($index).addClass('season_word_on').parent().siblings().find('span').
			removeClass('season_word_on');
			$('#season_sights span').each(function(i){
				if ($index == 10) {
					$index =-2;
				}else if ($index == 11) {
					$index =-1;
				}
				$(this).css({fontSize:"16px"}).text(($index+3) + "月的图片：第" + i + "张");
			});
		})
	}) 
	var currentTime = new Date();
	var getM = currentTime.getMonth() - 2;
	if (getM == -2) {
		getM == 10;
	}else if (getM == -1) {
		getM == 11;
	}
	$('#season_time_one span').eq(getM).addClass('season_word_on');
	$('#season_time_two span').eq(getM).addClass('season_circle_on');


	// 点击左右按钮轮播一次移动三张图片，
	// 按住按钮不放时，加速轮播，一次移动一张图片
	// 自动轮播，常速一次移动一张图片；
	// 悬浮鼠标时，停止轮播，移出鼠标时继续轮播；
	// 实现以上4个功能之间的多级联动；
	var $aapflow = $('#appflow');
	function sportApp(){
		$aapflow.animate({left:"-=73px"},200,function(){
			if ($aapflow.css('left') == "-1241px") {
				$aapflow.css({left:"-146px"});
			}
		})
	}
	var appTime = setInterval(sportApp,1000);
	$('#part7').hover(function(){
		clearInterval(appTime);
		$aapflow.stop(true,true);
	},function(){
		appTime = setInterval(sportApp,1000);
	})

	var time1;
	var time2;
	$('#part7_left').on("mousedown",function(){
		clearInterval(appTime);
		$aapflow.stop(true,true);
		time1 = setInterval(function(){
			$aapflow.animate({left:"-=73px"},100,"linear",function(){
				if ($aapflow.css('left') == "-1241px") {
					$aapflow.css({left:"-146px"});
				}
			})
		},0);
	})
	$('#part7_left').on("mouseup",function(){
		$aapflow.stop(true,true);
		clearInterval(time1);
	})
	$('#part7_right').on("mousedown",function(){
		clearInterval(appTime);
		$aapflow.stop(true,true);
		if ($aapflow.css('left') == "0px") {
			$aapflow.css({left:"-1095px"});
		}
		time2 = setInterval(function(){
			$aapflow.animate({left:"+=73px"},100,"linear",function(){
				if ($aapflow.css('left') == "0px") {
					$aapflow.css({left:"-1095px"});
				}
			})
		},0);
	})
	$('#part7_right').on("mouseup",function(){
		clearInterval(time2);
		$aapflow.stop(true,true);
	})
})