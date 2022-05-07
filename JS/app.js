
// ----- Navbar Change ----- //

let hamburgerActive = false;

window.addEventListener("scroll", function () {
  if(hamburgerActive === false) {
    let header = document.querySelector("header");
    header.classList.toggle("active", window.scrollY > 0);
    // console.log(window.scrollY);
  }
});



// ----- Dark & Light Mode ----- //

var nightModeSwitch = document.querySelector(".nightModeSwitch");
let nightMode = localStorage.getItem("nightMode");

window.addEventListener("load", initNightMode, true);
function initNightMode() {
  if (nightMode == "true") {
    document.body.classList.add("nightModeChange");
    localStorage.setItem("nightMode", "true");
    // console.log("night mode on...");
    // console.log(nightMode);
  }
}

nightModeSwitch.addEventListener("click", () => {
  switchNightMode();
});

const switchNightMode = () => {
  nightMode = localStorage.getItem("nightMode");
  // Knopf Input
  if (nightMode !== "true") {
    document.body.classList.add("nightModeChange");
    localStorage.setItem("nightMode", "true");
    // console.log("night mode on...");
  } else {
    document.body.classList.remove("nightModeChange");
    localStorage.setItem("nightMode", null);
    // console.log("night mode off...");
  }
};



// ----- Hamburger Menu ----- //

const hamburgerSwitch = document.querySelector(".hamburger");
const smallerNav = document.querySelector('.navList');
hamburgerSwitch.addEventListener('click', function(e) {
  hamburgerSwitch.classList.toggle('active');
  smallerNav.classList.toggle('active');

  document.body.classList.toggle('navListActive');

  if(hamburgerActive == false) {
    hamburgerActive = true;
  } else {
    hamburgerActive = false;
  }
});

function linkClicked() {
  if(hamburgerActive === true) {
    console.log('clicked');
    hamburgerSwitch.classList.remove('active');
    smallerNav.classList.remove('active');
    hamburgerActive = false;
  }
}



// ----- Project Section Popups----- //

const popupButton1 = document.querySelector('.readButton1');
const popupButton2 = document.querySelector('.readButton2');
const popupButton3 = document.querySelector('.readButton3');

const popup1 = document.getElementById('popup1');
const popup2 = document.getElementById('popup2');
const popup3 = document.getElementById('popup3');

popupButton1.addEventListener('click', () => {
  popup1.classList.add('active');
});

popupButton2.addEventListener('click', () => {
  popup2.classList.add('active');
});

popupButton3.addEventListener('click', () => {
  popup3.classList.add('active');
});

function closePopUp1() {
  console.log("closed");
  popup1.classList.remove('active');
}

function closePopUp2() {
  console.log("closed");
  popup2.classList.remove('active');
}

function closePopUp3() {
  console.log("closed");
  popup3.classList.remove('active');
}

// ----- Get Website Visits ----- //
function websiteVisits(res) {
  document.getElementById("count").textContent = res.value;
}

// ----- Website Preloader ----- //

var loader = document.getElementById('preloader');

window.addEventListener('load', function() {
  loader.style.display = 'none';
});


// ----- Contact Submit ----- //

// function contactSubmit() {
//   window.alert('Ich habe leider kein BackEnd programmiert. Ich bin nur ein FrontEnd Dev :)');
// }

// ----- Mobile Menu Paragraph Rotation ----- //

const text = document.querySelector('.mobileP');
const triangle = document.querySelector('.triangle');

let triangleWidth = window.innerWidth;
let triangleHeight = vhToPx(10);

function vhToPx(value) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  var result = (y*value)/100;
  return result;
}

function getTangent(opposite, adjacent) {
  return Math.atan(opposite / adjacent);
}

console.log(getTangent(triangleHeight, triangleWidth));
text.style.transform = `rotateZ(${getTangent(triangleHeight, triangleWidth)}rad)`;



