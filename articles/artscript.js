// 实现阅读统计的功能；
var $pageurl = window.location.href,
	$urlid = $pageurl.match(/(\/\w+\.)?html/);
	$urlid = $urlid[1].substring(1, $urlid[1].length-1);
window.onload = function(){
	$('.count').each(function(){
		var $obj = $(this);
		var $objid = $obj.attr('id');
		var $id = $urlid+$objid; 
		$.post('../php/readcount.php', {id:$id}, function(data,status){
			$obj.text('(' + data + ')');
		});
	})

	// 写一个canvas时钟；
	var myclock = document.getElementById('myclock'),
		ctx = myclock.getContext('2d');
	function goTime(){
			ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //清除画布；

			// 获取时间;
			var t = new Date(),
				h = t.getHours(), //0-24;
				min = t.getMinutes(),
				s = t.getSeconds();
				h = h + min/60;
				min = min + s/60;
				h = h > 12 ? h - 12 : h;

			ctx.beginPath();
			ctx.strokeStyle = "gray";
			ctx.lineWidth = 10;
			ctx.arc(95,95,85,0,2*Math.PI);
			ctx.stroke();
			ctx.closePath();

			// 画60个点和12个数字；
			var x=0,y=0;
			for (var i = 0; i < 60; i++) {
				if (i%5) {  //另外，还可以用ctx.translate()设置60个点，和数字；
					ctx.fillStyle = '#d1d1d1';
				} else {
					ctx.fillStyle = 'black';
					ctx.font = "16px sans-serif";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(1+(i/5),95+60*Math.cos((i*Math.PI/30)-Math.PI/3),
						95+60*Math.sin((i*Math.PI/30)-Math.PI/3));
				}
				ctx.beginPath();
				x = 95+74*Math.cos(i*Math.PI/30);
				y = 95+74*Math.sin(i*Math.PI/30);
				ctx.arc(x,y,2.5,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}

			// 画三根指针；
			// 旋转时；
			ctx.save();  //创建一个新环境
			ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
			ctx.rotate(h*30*Math.PI/180);  //只对rotate之后restore之前的起旋转作用；
			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.lineCap = "round";
			ctx.lineWidth = 5;
			ctx.moveTo(0,-40);
			ctx.lineTo(0,10);
			ctx.stroke();
			ctx.closePath();
			ctx.restore(); //将当前新环境放回原来的画布中；

			// 旋转分；
			ctx.save();
			ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
			ctx.rotate(min*6*Math.PI/180);
			ctx.beginPath();
			ctx.fillStyle = "#F60300";
			ctx.lineWidth=5;
			ctx.lineJoin="miter";
			ctx.miterLimit=5;
			ctx.moveTo(-2,12);
			ctx.lineTo(0,-70);
			ctx.lineTo(2,12);
			ctx.lineTo(-2,12);
			ctx.fill();
			ctx.closePath();
			ctx.restore();

			// 旋转秒；
			ctx.save();
			ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
			ctx.rotate(s*6*Math.PI/180);
			ctx.beginPath();
			ctx.fillStyle = "gray";
			ctx.lineWidth=5;
			ctx.lineJoin="miter";
			ctx.miterLimit=5;
			ctx.moveTo(-2,15);
			ctx.lineTo(0,-75);
			ctx.lineTo(2,15);
			ctx.lineTo(-2,15);
			ctx.fill();
			ctx.closePath();
			ctx.restore();

			ctx.beginPath();
			ctx.fillStyle = 'gray';
			ctx.arc(95,95,4,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();

	}
	goTime();
	setInterval(goTime,1000);
}

$(function(){
	// 实现点击文章目录展开和关闭；
	$('#art-index-title').click(function(){
		if ($(this).next().is(':visible')) {
			$(this).next().hide('fast').end().css({borderBottom:'none'});
		} else {
			$(this).next().show('fast').end().css({borderBottom:''});
		}
	})

	// 实现抓取文章中的h3标题，按顺序排列在文章目录中；
	$('#art-middle h3').each(function(){
		$i = $('#art-middle h3').index(this) + 1;
		$(this).attr('id','t'+$i);
		var $text = $(this).text();
		var $li = $('<li><a href="#'+'t'+$i+'">'+$text+'</a></li>');
		$('#art-menu').append($li);
	})

	// 实现点赞的功能；
	var $n = true;
	$('.zan').click(function(){
		if ($n) {
			var $obj = $(this);
			var $x = 'true';
			getNum($obj,$x);
		}
		$n = false;
	});
	function getNum(obj,x){
		var $objid = obj.attr('id');
		var $id = $urlid+$objid; 
		$.post('../php/dianzan.php',{id:$id,x:x},function(data,status){
			obj.text(data);
		});
	}
	$('.zan').each(function(){
		var $obj = $(this);
		var $x = 'false';
		getNum($obj,$x);
	})

	// 实现日历自动更新；
	var autoTime = function(){
		var $now = new Date(),
		    $year = $now.getFullYear(),
		    $month = $now.getMonth()+1,
		    $day = $now.getDate(),
		    $week = $now.getDay();
		    $week = $week == 0 ? 7 : $week;
		    
		    function showcurdate(){
		    	$('#dateyear dt').text($year+'年');
		    	$('#datemonth dt').text($month+'月');
		    	$('#dateday').text($day+'日');
		    	// 显示当前星期；
		    	$arr = ['一','二','三','四','五','六','日'];
		    	$('#curweek span').text('星期'+$arr[$week-1]);
		    	// 显示当天的背景；
		    	$('#dateday span').each(function(){
		    		$(this).removeClass('choiceday');
		    	});
		    	$('#dateday td span').eq($day-1).addClass('choiceday');

		    	// 显示当天的星期背景；
		    	$('#dateweek td').eq($week-1).addClass('choiceweek').siblings().removeClass('choiceweek');
		    }
		    showcurdate()

		    // 当鼠标离开除calandar之外任何区域，日历恢复当前日期；
		    $('.calendar').on('mouseleave',function(){
		    	if (Math.floor($('#dateyear dt').text()) != $year || 
		    		Math.floor($('#datemonth dt').text()) != $month) {
		    		showcurdate();
		    		getFestival();
		    		forbidDay();
		    	}
		    })

		    // 点击年份、月份时显示下拉，并阻止冒泡；
		    $('#dateyear dt,#datemonth dt').on('click',function(){
		    	if (!$(this).next().is(':visible')) {
		    		$(this).next().show();
		    		$(this).parent().siblings().find('dd').hide();
		    		return false;
		    	} else {
		    		$(this).next().hide();
		    		$(this).parent().siblings().find('dd').hide();
		    		return false;
		    	}
		    })
		    // 点击任何地方除年份、月份栏本身以外，下拉收起来；
		    $(document).on('click',function(){
		    	$('#datemonth').parent().find('dd').hide();
		    })
		    // 点击年份、月份，切换栏的文字显示；
		    $('#dateyear dd li,#datemonth dd li').on('click',function(){
		    	var $sub = $(this).text();
		    	$(this).parent().parent().prev().text($sub);
		    })

		    // 点击下拉月份时候，切换日历界面的显示效果；
		    $('#datemonth li').click(function(){
		    	getFestival();
		    	forbidDay();
		    	showym();
		    })

		    // 点击下拉年份时候，切换日历界面的显示效果；
		   $('#dateyear li').click(function(){
			   	showym();
			   	forbidDay();
		   }) 

		   // 判断是否显示星期背景，和日期背景；
		   function showym(){
		   		var $showmonth = parseInt($('#datemonth dt').text());
			   	var $showyear = parseInt($('#dateyear dt').text());
		   		if ($showyear == $year && $showmonth == $month ) {
			   		$('#dateday td span').eq($day-1).addClass('choiceday');
			   		$('#dateweek td').eq($week-1).addClass('choiceweek');
			   	} else {
			   		$('#dateday td span').removeClass('choiceday');
			   		$('#dateweek td').eq($week-1).removeClass('choiceweek');
			   	}
		   }

			function getFestival(){
				var $m = parseInt($('#datemonth dt').text());
				    if ($m == 1) {
				    	$('#dateday td span').eq(0).text('元旦').css({fontSize:'12px',color:'green'});  
				    } else if($m == 5){
				    	$('#dateday td span').eq(0).text('劳动').css({fontSize:'12px',color:'green'});  
				    }else if($m == 6){
				    	$('#dateday td span').eq(0).text('儿童').css({fontSize:'12px',color:'green'});  
				    }else if($m == 7){
						$('#dateday td span').eq(0).text('建党').css({fontSize:'12px',color:'green'});  	
				    }else if($m == 8){
				    	$('#dateday td span').eq(0).text('建军').css({fontSize:'12px',color:'green'});
				    }else if($m == 10){
				    	$('#dateday td span').eq(0).text('国庆').css({fontSize:'12px',color:'green'});
				    } else {
				    	$('#dateday td span').eq(0).text(1).css({fontSize:'16px',color:'gray'}); 
				    }
				   if ($m == 3) { 
				   		$('#dateday td span').eq(7).text('妇女').
				   		css({fontSize:'12px',color:'green'});  
				   		$('#dateday td span').eq(11).text('植树').
				   		css({fontSize:'12px',color:'green'}); 
				   } else {
				   		$('#dateday td span').eq(7).text(8).
				   		css({fontSize:'16px',color:'gray'}); 
				   		$('#dateday td span').eq(11).text(12).
				   		css({fontSize:'16px',color:'gray'});
				   }
				   if ($m == 4) { 
				   		$('#dateday td span').eq(4).text('清明').
				   		css({fontSize:'12px',color:'green'});  
				   } else {
				   		$('#dateday td span').eq(4).text(5).
				   		css({fontSize:'16px',color:'gray'}); 
				   }
				   if ($m == 5) { 
				   		$('#dateday td span').eq(3).text('青年').
				   		css({fontSize:'12px',color:'green'});  
				   } else {
				   		$('#dateday td span').eq(3).text(4).
				   		css({fontSize:'16px',color:'gray'}); 
				   }
				   if ($m == 9) { 
				   		$('#dateday td span').eq(2).text('胜利').
				   		css({fontSize:'12px',color:'green'});  
				   } else {
				   		$('#dateday td span').eq(2).text(3).
				   		css({fontSize:'16px',color:'gray'}); 
				   }
			}
			getFestival();

			function getDays(){
				var days = 0;
				var $m = parseInt($('#datemonth dt').text());
				var $y = parseInt($('#dateyear dt').text());
				if ($m == 1|| $m == 3 || $m == 5 || $m == 7 || $m == 8 || $m == 10 || $m == 12) {
					days = 31;
				} else if ($m == 4 || $m == 6 || $m == 9 || $m == 11){
					days = 30;
				} else {
					if (($y % 4 == 0 && $y % 100 != 100) || $y % 100 == 0) {
						days = 29;
					}else {
						days = 28;
					}
				}
				return days;
			}

			function forbidDay(){
				var days = getDays();
				if (days == 30) {
					$('#dateday td span').eq(30).parent().addClass('forbid');
					$('#dateday td span').eq(29).parent().removeClass('forbid');
					$('#dateday td span').eq(28).parent().removeClass('forbid');
				} else if (days == 29) {
					$('#dateday td span').eq(30).parent().addClass('forbid');
					$('#dateday td span').eq(29).parent().addClass('forbid');
					$('#dateday td span').eq(28).parent().removeClass('forbid');
				} else if (days == 28) {
					$('#dateday td span').eq(30).parent().addClass('forbid');
					$('#dateday td span').eq(29).parent().addClass('forbid');
					$('#dateday td span').eq(28).parent().addClass('forbid');
				} else if (days == 31) {
					$('#dateday td span').eq(30).parent().removeClass('forbid');
					$('#dateday td span').eq(29).parent().removeClass('forbid');
					$('#dateday td span').eq(28).parent().removeClass('forbid');
				}
			}
			forbidDay();
	}
	autoTime();
	setInterval(autoTime,1000*60*10);
})

