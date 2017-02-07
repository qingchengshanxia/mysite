$(function(){
	// 将sidebar的导航栏clone到main-menu里面；
	var $menu = $('#accordion').clone(true);
	var resizeNav = function(){
		var w = $(window).width();
			if (w > 768){
				$('.visible-xs').remove();
			} else {
				if ($('#main-menu').children().length < 2 ) {
					$menu.addClass('visible-xs');
					$('#main-menu').append($menu);
				}
				$('.visible-xs #sidebar1').removeClass('in');
				$('a[href="#sidebar1"] .glyphicon').removeClass('glyphicon-chevron-up').
				addClass('glyphicon-chevron-down');
			}
		}
	resizeNav();
	$(window).on('resize', resizeNav);


	// 实现sidebar栏上的三角图标上下变换；
	$('.panel-heading a').on('click',function(){
		var $span = $(this).find('.glyphicon');
		if (/glyphicon-chevron-down/g.test($span.attr('class'))) {
			$span.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
		}else{
			$span.removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
		}
	})

	$("[data-toggle='tooltip']").tooltip();
	$("[data-toggle='popover']").popover({html:true});
})