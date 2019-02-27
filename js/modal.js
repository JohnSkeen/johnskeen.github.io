// Modal JS

const portfolio = document.getElementById('portfolio');
const modal = document.getElementById('modal');
const userInfoApi = 'https://johnskeen.github.io/projects.json';
let currentIndex = 0;
let projectData = [];

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem!', error));
}

fetchData(projectInfo)
  .then(data => {
    let projectInfo = "<ul id='gridContainer'>";

    $.each (data.results, function (key, value) {
      projectInfo += `
      <li class="${value.class} project" data-index="` + key + `">
        ${value.thumbnail}
      </li>`

      let portfolioResults = {
        title: value.title,
        challenge: value.challenge,
        skill1: value.skill1,
        skill1: value.skill2,
        skill1: value.skill3,
        skill1: value.skill4,
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
  .catch(console.log('This does not seem to be working!'));

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
  } else if (currentIndex == 11) {
    $('#scrollRight').hide();
  } else {
    $('#scrollRight').show();
    $('#scrollLeft').show();
  }
}

// Get Modal Element
function viewModal(index){
  let currentEmployee = employeeData[index];

  modalInfo.innerHTML = `
  <img src="${currentEmployee.image}" class="modalImage">
  <div class="modalText">
    <h3>${currentEmployee.name}</h3>
    <p>${currentEmployee.email}</p>
    <p>${currentEmployee.city}</p>
    <hr class="lineBreak" />
    <p>${currentEmployee.phone}</p>
    <p>${currentEmployee.address}</p>
    <p>${currentEmployee.birthday.substring()}</p>
  </div>`;
  modal.style.display = 'block';
}

  $('#employeeGrid').on('click', 'LI', (function(){
    currentIndex = parseInt(this.dataset.index);
    scrollCheck();
    viewModal(currentIndex);
}));

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
