
// Lock Top Screen Until Button is Clicked and then smooth scroll to proper area

$("a[href^='#']").click(function(e) {
	e.preventDefault();
	$('#burger').prop('checked', false);

	var position = $($(this).attr("href")).offset().top;

	$("body, html").animate({scrollTop: position}, 1000 );
});

// Modal JS

const portfolio = document.getElementById('portfolio');
const modal = document.getElementById('modal');
const close = document.getElementById('close');
const projectInfoApi = 'https://raw.githubusercontent.com/JohnSkeen/johnskeen.github.io/master/projects.json';
let projectData = [];
let currentIndex = 0;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem!', error));
}

fetchData(projectInfoApi)
  .then(data => {
    let projectInfo = "<ul class=\"grid-container\">";

    $.each (data, function (key, value) {
      projectInfo += `
      <li class="${value.class} project" data-index="` + key + `">
        ${value.thumbnail}
      </li>`

      let portfolioResults = {
        title: value.title,
        challenge: value.challenge,
        skill1: value.skill1,
        skill2: value.skill2,
        skill3: value.skill3,
        skill4: value.skill4,
        fullImage: value.fullImage,
        thumbnail: value.thumbnail,
        class: value.class,
        githubLink: value.githubLink,
        liveLink: value.liveLink
      };
      projectData.push(portfolioResults);
    });
    projectInfo += `</ul>`;
    portfolio.innerHTML = projectInfo;
  })

	// ------------------------------------------
	//  HELPER FUNCTIONS
	// ------------------------------------------

	function checkStatus(response) {
	  if(response.ok) {
	    return Promise.resolve(response);
	  } else {
	    return Promise.reject(new Error(response.statusText));
	  }
	}

	function scrollCheck(){
		if (currentIndex == 0) {
			$('#scrollLeft').hide();
		} else if (currentIndex == 4) {
			$('#scrollRight').hide();
		} else {
			$('#scrollRight').show();
			$('#scrollLeft').show();
		}
	}

	// Get Modal Element
	function viewModal(index){
	  let currentProject = projectData[index];

	  modalInner.innerHTML = `
		<div class="modal-image">
			<img src="${currentProject.fullImage}" alt="">
		</div> <!-- modal image -->
		<div class="modal-info">
			<div class="info-text">
				<h2>${currentProject.title}</h2>
				<p><strong>The Challenge</strong></p>
				<p>${currentProject.challenge}</p>
				<p><strong>Skills Used</strong></p>
				<p>${currentProject.skill1}</p>
				<p>${currentProject.skill2}</p>
				<p>${currentProject.skill3}</p>
				<p>${currentProject.skill4}</p>
			</div>
		</div> <!-- modal-info -->
		<button class="demo-button"><a href="${currentProject.liveLink}" target="_blank">
			<div class="modal-button">
				<svg class="demosvg"><use xlink:href="#demosvg"></use></svg>
				<p>View Demo</p>
			</div> <!-- modal-button -->
		</a></button>
		<button class="code-button"><a href="${currentProject.githubLink}" target="_blank">
			<div class="modal-button">
				<svg class="codesvg"><use xlink:href="#codesvg"></use></svg>
				<p>See Github</p>
			</div> <!-- modal-button -->
		</a></button>`;
	  modal.style.display = 'block';
	}

	  $('#portfolio').on('click', 'LI', (function(){
	    currentIndex = parseInt(this.dataset.index);
	    scrollCheck();
	    viewModal(currentIndex);



		// Close modal
		$('#close').click(function(){
		  $('#modal').hide();
		});

		// Scroll modal

		$('#scrollLeft').click(function(){
			currentIndex -= 1;
			scrollCheck();
			viewModal(currentIndex);
		});

		$('#scrollRight').click(function(){
			currentIndex += 1;
			scrollCheck();
			viewModal(currentIndex);
		});
	}));
