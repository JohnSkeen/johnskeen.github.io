
// Lock Top Screen Until Button is Clicked and then smooth scroll to proper area

$("a[href^='#']").click(function(e) {
	e.preventDefault();
  $('.home').css('overflow', 'auto');
	$('#burger').prop('checked', false);

	var position = $($(this).attr("href")).offset().top;

	$("body, html").animate({scrollTop: position}, 1000 );
});

// Open the Modal
function openModal() {
  document.getElementById('modal').style.display = "block";
}

// Close the Modal
$('#close').click(function(){
  $('#modal').hide();
});

var projectIndex = 1;
showProjects(projectIndex);

// Next/previous controls
function plusSlides(n) {
  showProjects(projectIndex += n);
}

function showProject(n) {
  var i;
  var project = document.getElementsByClassName("project");
  if (n > project.length) {projectIndex = 1}
  if (n < 1) {projectIndex = project.length}
  for (i = 0; i < project.length; i++) {
    project[i].style.display = "none";
  }
  project[projectIndex-1].style.display = "block";
}
