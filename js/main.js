
// Lock Top Screen Until Button is Clicked and then smooth scroll to proper area

$("a[href^='#']").click(function(e) {
	e.preventDefault();
  $('.home').css('overflow', 'auto');
	$('#burger').prop('checked', false);

	var position = $($(this).attr("href")).offset().top;

	$("body, html").animate({scrollTop: position}, 1000 );
});
