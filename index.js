//enter form
const elForm = document.querySelector(".form");
const elEmail = elForm["email"];
const elUserName = elForm["username"];
const elPassword = elForm["passwd"];
const elFormText = document.querySelectorAll(".form__text");
let toastyAnimate = false;
let inputs = false;

//profile
const elProfile = document.querySelector(".profile");
const elResult = document.querySelector(".result");
const elWeatherForm = document.querySelector(".profile__weather-form");
const elProfileFormText = document.querySelectorAll(".profile__form-text");
const elDate = elWeatherForm["profile-date"];
const elDegree = elWeatherForm["profile-degree"];
const elAir = elWeatherForm["profile-air"];
const elFirstTime = elWeatherForm["profile-been-first"];
const elSecondTime = elWeatherForm["profile-been-second"];
const elProfileInputs = document.querySelectorAll(".profile__inputs");
const elWeatherChoose = document.querySelectorAll(".profile__top-choose");
const elWeatherText = document.querySelector(".profile__weather-text");
let chooseWeather = false;
let dateArray = [];
let userDateProfile = {
  date: "",
};

let weatherArray = [];
let weather = {
  date: null,
  degree: null,
  wind: 0,
  timeFirst: null,
  timeSecond: null,
  weather: null,
  svg: "",
};

let inputsIndex = [];

elWeatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputsCheck = true;
  for (var i = 0; i < 5; i++) {
    if (!elProfileInputs[i].value.trim()) {
      inputsCheck = false;
      elProfileInputs[i].classList.add("input-warning");
    }
  }

  if (!chooseWeather) {
    inputsCheck = false;
    if (!toastyAnimate) {
      toastyAnimate = false;
    }
    if (!toastyAnimate) {
      toastify("Please select weather, and behavior");
      toastyAnimate = true;
    }

    if (!chooseWeather) {
      for (var i = 0; i < 5; i++) {
        elWeatherChoose[i].classList.add("input-warning");
      }
    }
  }

  if (inputsCheck) {
    weather.date = elDate.value.trim();
    weather.degree = elDegree.value.trim();
    weather.wind = elAir.value.trim();
    weather.timeFirst = elFirstTime.value.trim();
    weather.timeSecond = elSecondTime.value.trim();
    weatherArray.push({...weather});

    userDateProfile.date = elDate.value.trim();

    if (!dateArray.includes(userDateProfile.date)) {
      dateArray.push(userDateProfile.date);
    }
    const elResultCardsBox = document.querySelector(
      ".result__bottom-cards-box"
    );
    elResultCardsBox.innerHTML += `
        <div class="result__bottom-items">
              <p class="result__items-top-text">${weather.date}</p>
              ${weather.svg}
              <div class="result__bottom-items-box">
                <h2 class="result__bottom-items-title">${weather.degree}</h2>
              <svg width="30" height="auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="rgb(136, 136, 136)" d="M4 9.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0M6.5 5a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9m9.602 4.214C14.844 10.68 14 12.93 14 16s.845 5.32 2.102 6.786C17.352 24.243 19.07 25 21 25s3.649-.757 4.898-2.214A7.8 7.8 0 0 0 27.16 20.7c.171-.41.56-.699 1.004-.699c.676 0 1.17.644.922 1.273a9.8 9.8 0 0 1-1.67 2.816C25.77 26.007 23.488 27 21 27s-4.77-.993-6.416-2.911C12.946 22.179 12 19.429 12 16s.946-6.18 2.584-8.089C16.23 5.993 18.512 5 21 5s4.77.993 6.416 2.911a9.8 9.8 0 0 1 1.67 2.816c.247.63-.246 1.273-.922 1.273c-.445 0-.833-.288-1.004-.699a7.8 7.8 0 0 0-1.262-2.087C24.648 7.757 22.93 7 21 7s-3.649.757-4.898 2.214"/></svg>
              </div>
              <p class="result__top-text"><span class="result__top-span">${weather.wind}</span>m/s</p>
            </div>
      `;

    function resultItems(index) {
      const elResultItems = document.querySelectorAll(".result__bottom-items");
      elResultItems[index + 1].addEventListener("click", () => {
        const elResultTopText = document.querySelector(".result__top-text");
        const elResultTopDegree = document.querySelector(".result__top-degree");
        const elResultTopSpan = document.querySelectorAll(".result__top-span");
        const elResultTopRight = document.querySelector(".result__top-right");
        const {date, degree, wind, timeFirst, timeSecond, svg} =
          weatherArray[index];
        elResultTopText.textContent = date;
        elResultTopDegree.textContent = degree;
        elResultTopSpan[0].textContent = wind;
        elResultTopSpan[1].textContent = timeFirst;
        elResultTopSpan[2].textContent = timeSecond;
        elResultTopRight.innerHTML = svg;
      });
    }

    for (var i = 0; i < weatherArray.length; i++) {
      resultItems(i);
    }
    elWeatherForm.reset();
    if (!toastyAnimate) {
      toastyAnimate = false;
    }
    for (var i = 0; i < 5; i++) {
      elWeatherChoose[i].classList.remove("input-warning");
      elWeatherChoose[i].classList.remove("choose");
    }
    chooseWeather = false;
  }
});

weatherChoose(0);
weatherChoose(1);
weatherChoose(2);
weatherChoose(3);
weatherChoose(4);

function weatherChoose(index) {
  elWeatherChoose[index].addEventListener("click", () => {
    for (var i = 0; i < 5; i++) {
      elWeatherChoose[i].classList.remove("input-warning");
      elWeatherChoose[i].classList.remove("choose");
    }
    elWeatherChoose[index].classList.add("choose");
    chooseWeather = true;
    switch (index) {
      case 0: {
        weather.weather = "Sunny";
        weather.svg =
          '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><g fill="#ffcc33" stroke="#ffcc33" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#ffcc33" fill-opacity="0" stroke-dasharray="36" stroke-dashoffset="36" d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5"><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.15s" values="0;0.3"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0"/></path><path stroke-dasharray="2" stroke-dashoffset="2" d="M12 19v1M19 12h1M12 5v-1M5 12h-1" opacity="0"><animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="2;0"/><set fill="freeze" attributeName="opacity" begin="0.6s" to="1"/><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path stroke-dasharray="2" stroke-dashoffset="2" d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5" opacity="0"><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="2;0"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>';
        break;
      }
      case 1: {
        weather.weather = "Hail";
        weather.svg = `<svg width="50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
              <defs>
                <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#f3f7fe"/>
                  <stop offset="0.45" stop-color="#f3f7fe"/>
                  <stop offset="1" stop-color="#deeafb"/>
                </linearGradient>
                <linearGradient id="b" x1="23.25" y1="43.7" x2="24.75" y2="46.3" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#86c3db"/>
                  <stop offset="0.45" stop-color="#86c3db"/>
                  <stop offset="1" stop-color="#5eafcf"/>
                </linearGradient>
                <linearGradient id="c" x1="30.25" y1="43.7" x2="31.75" y2="46.3" xlink:href="#b"/>
                <linearGradient id="d" x1="37.25" y1="43.7" x2="38.75" y2="46.3" xlink:href="#b"/>
              </defs>
              <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#a)"/>
              <path d="M24,43.5A1.5,1.5,0,1,0,25.5,45,1.5,1.5,0,0,0,24,43.5Z" fill="url(#b)">
                <animateTransform attributeName="transform" type="translate" values="1 -5; -2 18; -4 14" dur="0.6s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;1;0" dur="0.6s" repeatCount="indefinite"/>
              </path>
              <path d="M31,43.5A1.5,1.5,0,1,0,32.5,45,1.5,1.5,0,0,0,31,43.5Z" fill="url(#c)">
                <animateTransform attributeName="transform" type="translate" values="1 -5; -2 18; -4 14" dur="0.6s" begin="-0.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;1;0" dur="0.6s" begin="-0.4s" repeatCount="indefinite"/>
              </path>
              <path d="M38,43.5A1.5,1.5,0,1,0,39.5,45,1.5,1.5,0,0,0,38,43.5Z" fill="url(#d)">
                <animateTransform attributeName="transform" type="translate" values="1 -5; -2 18; -4 14" dur="0.6s" begin="-0.2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;1;0" dur="0.6s" begin="-0.2s" repeatCount="indefinite"/>
              </path>
            </g></svg>`;
        break;
      }
      case 2: {
        weather.weather = "Rainy";
        weather.svg = `<svg width="50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#f3f7fe"/>
                <stop offset="0.45" stop-color="#f3f7fe"/>
                <stop offset="1" stop-color="#deeafb"/>
              </linearGradient>
              <linearGradient id="b" x1="23.31" y1="44.3" x2="24.69" y2="46.7" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#4286ee"/>
                <stop offset="0.45" stop-color="#4286ee"/>
                <stop offset="1" stop-color="#0950bc"/>
              </linearGradient>
              <linearGradient id="c" x1="30.31" y1="44.3" x2="31.69" y2="46.7" xlink:href="#b"/>
              <linearGradient id="d" x1="37.31" y1="44.3" x2="38.69" y2="46.7" xlink:href="#b"/>
            </defs>
            <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#a)"/>
            <line x1="24.08" y1="45.01" x2="23.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#b)">
              <animateTransform attributeName="transform" type="translate" values="1 -5; -2 10" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite"/>
            </line>
            <line x1="31.08" y1="45.01" x2="30.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#c)">
              <animateTransform attributeName="transform" type="translate" begin="-0.5s" values="1 -5; -2 10" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" begin="-0.5s" values="0;1;1;0" dur="1.5s" repeatCount="indefinite"/>
            </line>
            <line x1="38.08" y1="45.01" x2="37.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#d)">
              <animateTransform attributeName="transform" type="translate" begin="-1s" values="1 -5; -2 10" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" begin="-1s" values="0;1;1;0" dur="1.5s" repeatCount="indefinite"/>
            </line>
          </svg>`;
        break;
      }
      case 3: {
        weather.weather = "Thunder";
        weather.svg = `<svg width="50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#f3f7fe"/>
                <stop offset="0.45" stop-color="#f3f7fe"/>
                <stop offset="1" stop-color="#deeafb"/>
              </linearGradient>
              <linearGradient id="b" x1="22.53" y1="42.95" x2="25.47" y2="48.05" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#4286ee"/>
                <stop offset="0.45" stop-color="#4286ee"/>
                <stop offset="1" stop-color="#0950bc"/>
              </linearGradient>
              <linearGradient id="c" x1="29.53" y1="42.95" x2="32.47" y2="48.05" xlink:href="#b"/>
              <linearGradient id="d" x1="36.53" y1="42.95" x2="39.47" y2="48.05" xlink:href="#b"/>
              <linearGradient id="e" x1="26.74" y1="37.88" x2="35.76" y2="53.52" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#f7b23b"/>
                <stop offset="0.45" stop-color="#f7b23b"/>
                <stop offset="1" stop-color="#f59e0b"/>
              </linearGradient>
            </defs>
            <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#a)"/>
            <line x1="24.39" y1="43.03" x2="23.61" y2="47.97" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#b)">
              <animateTransform attributeName="transform" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="0.7s" repeatCount="indefinite"/>
            </line>
            <line x1="31.39" y1="43.03" x2="30.61" y2="47.97" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#c)">
              <animateTransform attributeName="transform" begin="-0.4s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite"/>
              <animate attributeName="opacity" begin="-0.4s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite"/>
            </line>
            <line x1="38.39" y1="43.03" x2="37.61" y2="47.97" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#d)">
              <animateTransform attributeName="transform" begin="-0.2s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite"/>
              <animate attributeName="opacity" begin="-0.2s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite"/>
            </line>
            <polygon points="30 36 26 48 30 48 28 58 38 44 32 44 36 36 30 36" stroke="#f6a823" stroke-miterlimit="10" stroke-width="0.5" fill="url(#e)">
              <animate attributeName="opacity" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1" dur="2s" repeatCount="indefinite"/>
            </polygon>
          </svg>`;
        break;
      }
      case 4: {
        weather.weather = "Cloud";
        weather.svg = `<svg width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="a" x1="40.76" y1="23" x2="50.83" y2="40.46" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#9ca3af"/>
                <stop offset="0.45" stop-color="#9ca3af"/>
                <stop offset="1" stop-color="#6b7280"/>
              </linearGradient>
              <linearGradient id="b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#f3f7fe"/>
                <stop offset="0.45" stop-color="#f3f7fe"/>
                <stop offset="1" stop-color="#deeafb"/>
              </linearGradient>
            </defs>
            <path d="M34.23,33.45a4.05,4.05,0,0,0,4.05,4H54.79a4.34,4.34,0,0,0,.81-8.61,3.52,3.52,0,0,0,.06-.66,4.06,4.06,0,0,0-6.13-3.48,6.08,6.08,0,0,0-11.25,3.19,6.34,6.34,0,0,0,.18,1.46h-.18A4.05,4.05,0,0,0,34.23,33.45Z" stroke="#848b98" stroke-miterlimit="10" stroke-width="0.5" fill="url(#a)">
              <animateTransform attributeName="transform" type="translate" values="-2.1 0; 2.1 0; -2.1 0" dur="7s" repeatCount="indefinite"/>
            </path>
            <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#b)">
              <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite"/>
            </path>
          </svg>`;
        break;
      }
    }
    elWeatherText.textContent = `${weather.weather}`;
  });
}

function profileInputs(el, value) {
  if (!value) {
    el.classList.add("input-warning");
  } else {
    el.classList.remove("input-warning");
  }
}

elDate.addEventListener("input", (e) => {
  const inputsValue = e.target.value.trim();
  profileInputs(elDate, inputsValue);
});
elDegree.addEventListener("input", (e) => {
  const inputsValue = e.target.value.trim();
  profileInputs(elDegree, inputsValue);

  if (inputsValue > 120) {
    elProfileFormText[1].textContent = "Can't be high than 120";
    elProfileFormText[1].classList.add("warning");
    elDegree.classList.add("input-warning");
  } else {
    elProfileFormText[1].textContent = "Degree";
    elProfileFormText[1].classList.remove("warning");
    elDegree.classList.remove("input-warning");
  }
});
elAir.addEventListener("input", (e) => {
  const inputsValue = e.target.value.trim();
  profileInputs(elAir, inputsValue);
  if (inputsValue > 113) {
    elProfileFormText[2].textContent = "The highest speed is 113m/s";
    elProfileFormText[2].classList.add("warning");
    elAir.classList.add("input-warning");
  } else {
    elProfileFormText[2].textContent = "Speed of air";
    elProfileFormText[2].classList.remove("warning");
    elAir.classList.remove("input-warning");
  }
});
elFirstTime.addEventListener("input", (e) => {
  const inputsValue = e.target.value.trim();
  profileInputs(elFirstTime, inputsValue);
});
elSecondTime.addEventListener("input", (e) => {
  const inputsValue = e.target.value.trim();
  profileInputs(elSecondTime, inputsValue);
});

// enter form
let userProfile = {
  email: null,
  username: null,
  password: null,
};
elForm.classList.add("display", "show-form");
function toastify(text) {
  Toastify({
    text: `${text}`,
    duration: 3000, // Duration in milliseconds (3 seconds)
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, red, red)", // Custom background color
    style: {
      fontFamily: "sans-serif",
    },
    stopOnFocus: true, // Stop timer when mouse is over toast (default is false)
    onClick: function () {
      // Callback after click
      alert("Toast clicked!");
    },
  }).showToast();
}

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!elEmail.value.trim()) {
    elFormText[0].classList.add("warning");
    elEmail.classList.add("input-warning");
  }
  if (!elUserName.value.trim()) {
    elFormText[1].classList.add("warning");
    elUserName.classList.add("input-warning");
  }
  if (!elPassword.value.trim()) {
    elFormText[2].classList.add("warning");
    elPassword.classList.add("input-warning");
  }

  const regexpEmail = /^.+@.+\..+$/;
  const regexpPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  if (
    regexpEmail.test(elEmail.value.trim()) &&
    regexpPasswd.test(elPassword.value.trim()) &&
    elUserName.value.trim()
  ) {
    inputs = true;
  }

  if (inputs) {
    userProfile.email = elEmail.value.trim();
    userProfile.password = elPassword.value.trim();
    userProfile.username = elUserName.value.trim();
    elForm.classList.remove("show-form", "display");
    elForm.classList.add("exit");
    elProfile.classList.add("display", "show");
    elResult.classList.add("display", "show");
  }

  if (!inputs) {
    if (!toastyAnimate) {
      toastyAnimate = false;
    }
    if (!toastyAnimate) {
      toastify("Please fill inputs, and correctly");
      toastyAnimate = true;
    }
  }
});

function inputCheck(index, value, input) {
  if (!value) {
    elFormText[index].classList.add("warning");
    input.classList.add("input-warning");
  } else {
    elFormText[index].classList.remove("warning");
    input.classList.remove("input-warning");
  }
}

elEmail.addEventListener("input", (e) => {
  const inputsValue = e.target.value.trim();
  inputCheck(0, inputsValue, elEmail);
  const regexp = /@/;
  const regexpAfter = /^.+@.+\..+$/;
  if (regexp.test(inputsValue)) {
    elFormText[0].textContent = "Email address";
    if (regexpAfter.test(inputsValue)) {
      elFormText[0].textContent = "Email address";
      elFormText[0].classList.remove("warning");
      elEmail.classList.remove("input-warning");
    } else {
      elFormText[0].textContent = 'Don\'t forget "example.com"';
      elFormText[0].classList.add("warning");
      elEmail.classList.add("input-warning");
    }
  } else {
    elFormText[0].textContent = 'Don\'t forget "@"';
    elFormText[0].classList.add("warning");
    elEmail.classList.add("input-warning");
  }
});
elUserName.addEventListener("input", (e) => {
  const inputsValue = e.target.value.trim();
  inputCheck(1, inputsValue, elUserName);
});
elPassword.addEventListener("input", (e) => {
  const inputsValue = e.target.value.trim();
  inputCheck(2, inputsValue, elPassword);

  const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  if (regexp.test(inputsValue)) {
    elFormText[2].textContent = "Password";
    elFormText[2].classList.remove("warning");
    elEmail.classList.remove("input-warning");
  } else {
    elFormText[2].textContent = "At least 8 letter, a-z & A-Z & 0-9";
    elFormText[2].classList.add("warning");
    elPassword.classList.add("input-warning");
  }
});
