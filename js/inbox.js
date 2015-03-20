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

	});
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});