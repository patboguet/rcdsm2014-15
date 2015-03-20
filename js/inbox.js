$('.fab').hover(function () {
    $(this).toggleClass('active');
});
$('.fab').click(function () {
    $(this).toggleClass('active');
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});