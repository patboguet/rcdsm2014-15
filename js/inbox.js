$('.fab').hover(function () {
    $(this).toggleClass('active');
});
if($(window).width() < 420)
{
	$('.fab').click(function () {
		if($('#inbox .show-on-hover:hover > ul.dropdown-menu').is(':visible'))
		{
			$('#inbox .show-on-hover:hover > ul.dropdown-menu').hide();
		}
		else
		{
			$('#inbox .show-on-hover:hover > ul.dropdown-menu').show();
		}
		$(this).toggleClass('rotate');
		if($(this).hasClass('rotate'))
		{
			$('.fab-primary').css({
				'opacity': '0',
				'transform': 'rotate(225deg)'
			});
	    	$('.fab-secondary').css({
	    		'opacity': '1',
	    		'transform': 'rotate(0)',
	    		'marginTop': '-2px'
	  		})
	  	}
	  	else {
	  		$('.fab-primary').css({
				'opacity': '1',
				'transform': 'rotate(0)'
			});
	    	$('.fab-secondary').css({
	    		'opacity': '0'
	  		})
	  	}
	});
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


