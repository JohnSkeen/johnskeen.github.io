// Modal JS

// Open the Modal
function openModal() {
  document.getElementById('modal').style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById('modal').style.display = "none";
}

var projectIndex = 1;
showProjects(projectIndex);

// Next/previous controls
function nextProject(n) {
  showProjects(projectIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showProjects(projectIndex = n);
}

function showProjects(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {projectIndex = 1}
  if (n < 1) {projectIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[projectIndex-1].style.display = "block";
  dots[projectIndex-1].className += " active";
  captionText.innerHTML = dots[projectIndex-1].alt;
}

Get Modal Element
function viewModal(index){
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

const employeeGrid = document.getElementById('employeeGrid');
const modal = document.getElementById('modal');
const userInfoApi = 'https://johnskeen.github.io/projects.json';
let currentIndex = 0;
let employeeData = [];

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem!', error));
}

fetchData(userInfoApi)
  .then(data => {
    let employeeInfo = "<ul id='employeeList'>";

    $.each (data.results, function (key, value) {
      employeeInfo += `
      <li class="employee" data-index="` + key + `">
        <img class="employeeImage" src="${value.picture.large}">
        <div class="employeeText">
          <h3 class="employeeName">${value.name.first} ${value.name.last}</h3>
          <p>${value.email}</p>
          <p>${value.location.city}</p>
        </div>
      </li>`

      let employeeResults = {
        image: value.picture.large,
        name: value.name.first + ' ' + value.name.last,
        email: value.email,
        city: value.location.city,
        phone: value.phone,
        address: value.location.street + ', ' + value.location.state + ' ' + value.location.postcode,
        birthday: 'Birthday: ' + value.dob.date.substring(5,7) + '/' + value.dob.date.substring(8,10) + '/' + value.dob.date.substring(0,4)
      };
      employeeData.push(employeeResults);
    });
    employeeInfo += `</ul>`;
    employeeGrid.innerHTML = employeeInfo;
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
