//profile dashboard
const elBurger = document.querySelector(".navbar__burger"); // for responsive burger
const elTextArea = document.querySelector(".navbar__textarea"); // profile choose textArea
const elProfileFormButton = document.querySelector(".profileform__button"); // save profile
const elMainLoader = document.querySelector(".main__loader"); // save profile loader
const elBody = document.querySelector("body"); // html body
const elTitle = document.querySelector(".navbar__title"); // profile dashboard title
const elLink = document.querySelectorAll(".navbar__link"); // navbar__link
const elLeftIcons = document.querySelectorAll(".navbar__left-icons"); // navbar__left-icons night day
const elDayBox = document.querySelectorAll(".navbar__day-box"); // night day wrapper
const elNavbarIcon = document.querySelectorAll(".navbar__profile"); // navbar icon ~user
const elNavbarBurgerItems = document.querySelectorAll(".navbar__burger-items"); // navbar burger items
const elHeaderBoxBurger = document.querySelector(".navbar__box-phone"); // responsive navbar box
const elIconSet = document.querySelector(".navbar__profile-choose"); // navbar profile dashboard choose
const elProfileBoxTop = document.querySelector(".navbar__profile-box-top"); // choose top
const elProfileTextSpan = document.querySelectorAll(".navbar__profile-sub"); // navbar__profile-sub
const elNavbarButton = document.querySelector(".navbar__profile-button"); // navbar icon set button
const elProfileClose = document.querySelector(".navbar__profile-close"); // choose close X
const elProfileForm = document.querySelector(".profileform__form"); // profile form
const elProfileText = document.querySelectorAll(".profileform__text"); //profile form texts
const elProfileInputs = document.querySelectorAll(".profileform__input"); // profile inputs register
const elProfileColors = document.querySelectorAll(".navbar__profile-colors"); // navbar variety colors
const elProfileId = document.querySelectorAll(".profileform__id"); // profile random id
const elProfileTextId = document.querySelectorAll(".profileform__textid"); // profile random text id
const elAbout = document.querySelector(".about"); // navbar about box
const elAboutText = document.querySelectorAll(".about__text"); // about box texts
const elTaskLevelsText = document.querySelectorAll(".task__levels-text"); // low medium high text
const elTaskLevelWarning = document.querySelector(".task__level-warning"); // default low
const elTaskRightSpan = document.querySelector(".task__right-span"); // task => tasks
const elTaskHideText = document.querySelector(".task__hide-text");
let allTasks = 0;
let reportGroups = 0; // report main todo
let reportGroupsSecond = 0; // report for done
let reportDone = 0; // report done show
let windowSize = window.innerWidth; // window passive width
let showHideReport = false; // for responsive box-phone burger
let userEntered = false; // for change color profile color
var includesEmailGlobal = false; // profile form 3 includes '@' for hoisting
let elEmailChecked = false; // includes email checked
let color = "black"; // color night day => black white;
let burgerAnimate = false; // animated burger x or =
let colorChange = false; // color black white changed
let showChoose = false; // navbar choose showed
let profileColorsIndex = 0; // variety color indexes
let profileColorsBg = "var(--colorUserOpacity)"; // variety secondary color chooses
let profileColor = "var(--colorUser)"; // variety color chooses
let showNavbarSections = false; // showed about navbar
elProfileId[0].textContent = Math.random().toFixed(6) * 10 ** 6;
elProfileId[1].textContent = elProfileId[0].textContent;

//-----------------------------------------------------------------
// task profile
let userNamesList = []; // check for repeated items task text
let userNamesIndex = []; // check for entered indexes foe trash -1 | > 0 | <= 0
let userOriginNamesIndex = []; // for not repeated userNamesIndex
let tasksLevel = "low";
let reportLow = 0;
let reportMedium = 0;
let reportHigh = 0;
const elTaskRemove = document.querySelector(".task__remove"); // for remove tasks with indexes
const elTask = document.querySelector(".task"); // task
const elTaskLeft = document.querySelector(".task__left"); // task left for night day color
const elTaskTitle = document.querySelector(".task__title"); // task title for night day color
const elTaskInputs = document.querySelector(".task__inputs"); // task enter name input
const elTaskText = document.querySelector(".task__text"); // check names for input & task items enter name of task
const elTaskButton = document.querySelector(".task__button"); // push items & task left button
const elTaskRight = document.querySelector(".task__right"); // task right night day
const elTaskRightTextSpan = document.querySelectorAll(".task__right-text-span"); // for todo & done
const elTaskRightInput = document.querySelector(".task__right-input"); // for search input right form
const elTaskRightTitle = document.querySelector(".task__right-title"); // for night day color existing tasks
const elTaskRightText = document.querySelector(".task__right-text"); // for todo report bg color
const elTaskMain = document.querySelector(".task__main"); // push entered items
const elTaskTrashInput = document.querySelector(".task__trash-input"); // input for remove items with index -1 | > 0 | <= 0
const elTaskTrashSpan = document.querySelector(".task__trash-span"); // show user entered index for remove or work with
const elTaskTrashText = document.querySelector(".task__trash-text"); // remove trash warning
let elTaskItem = document.querySelectorAll(".task__items"); // task items into main
let userNameRepeat = false; // entered name repeated in items
let userStart = false; // can user start do something with items
let itemsHide = false; // hide show items done
// // functions

function clearMain() {
  if (
    elTaskTrashInput.value.trim() > 0 ||
    elTaskTrashInput.value.trim() == -1
  ) {
    if (elTaskTrashInput.value.trim()) {
      elTaskTrashSpan.textContent = `${elTaskTrashInput.value.trim()}`;
    }
  }
  elTaskTrashInput.value = ``;
  if (!elTaskTrashSpan.textContent) {
    elTaskTrashText.style.cssText = `
      color: red;
    `;
  } else {
    elTaskTrashText.style.cssText = `
      color: var(--colorBlack);
    `;
  }

  if (elTaskTrashSpan.textContent) {
    const elTaskItemText = document.querySelectorAll(".task__items-text");

    if (elTaskTrashSpan.textContent == "-1") {
      const elTaskItemText = document.querySelectorAll(".task__items-text");

      reportGroups = 0;
      for (var i = 0; i < elTaskItemText.length; i++) {
        // itemsTextColor = "var(--colorDarkGray)";
        elTaskItemText[i].style.cssText = `
          text-decoration-line: line-through;
          text-decoration-thickness: 2px;
          color: ${itemsTextColor};
      `;
        itemsTextColor = "var(--colorBlack)";
        userNamesIndex.push(i + 1);
      }

      if (itemsHide) {
        for (var i = 1; i <= elTaskItem.length; i++) {
          for (var a = 0; a < userNamesIndex.length; a++) {
            if (i == userNamesIndex[a]) {
              elTaskItem[i - 1].style.cssText = `
          display: none;
        `;
            }
          }
        }
      }

      reportDone = reportGroupsSecond;
      elTaskRightTextSpan[1].textContent = reportDone;
      elTaskRightTextSpan[0].textContent = `${reportGroups}`;
    } else if (
      Number(elTaskTrashSpan.textContent) > 0 &&
      Number(elTaskTrashSpan.textContent) <= elTaskItemText.length
    ) {
      let itemsRepeatCheck = false;
      for (var i = 0; i < userNamesIndex.length; i++) {
        if (elTaskTrashSpan.textContent == userNamesIndex[i]) {
          itemsRepeatCheck = true;
        }
      }
      if (!itemsRepeatCheck) {
        reportGroups--;
        reportDone++;
      }

      userNamesIndex.push(elTaskTrashSpan.textContent);
      const elTaskItemText = document.querySelectorAll(".task__items-text");
      // itemsTextColor = "var(--colorDarkGray)";
      elTaskItemText[Number(elTaskTrashSpan.textContent) - 1].style.cssText = `
          text-decoration-line: line-through;
          text-decoration-thickness: 2px;
          color: ${itemsTextColor};
      `;
      itemsTextColor = "var(--colorBlack)";
      if (itemsHide) {
        for (var i = 1; i <= elTaskItem.length; i++) {
          for (var a = 0; a < userNamesIndex.length; a++) {
            if (i == userNamesIndex[a]) {
              elTaskItem[i - 1].style.cssText = `
          display: none;
        `;
            }
          }
        }
      }

      elTaskRightTextSpan[1].textContent = reportDone;
      elTaskRightTextSpan[0].textContent = `${reportGroups}`;
    } else {
      elTaskTrashText.style.cssText = `
      color: red;
    `;
    }
  }
}

function levelsCheck(index) {
  elTaskLevelsText[index].style.cssText = `
    opacity: 1;
  `;

  switch (index) {
    case 0: {
      elTaskLevelWarning.textContent = `Low`;
      tasksLevel = "low";
      break;
    }
    case 1: {
      elTaskLevelWarning.textContent = `Medium`;
      tasksLevel = "medium";
      break;
    }
    case 2: {
      elTaskLevelWarning.textContent = `High`;
      tasksLevel = "high";
      break;
    }
  }
}

function itemsToHideShow() {
  elTaskItem = document.querySelectorAll(".task__items");

  if (!itemsHide) {
    itemsHide = true;
    for (var i = 1; i <= elTaskItem.length; i++) {
      for (var a = 0; a < userNamesIndex.length; a++) {
        if (i == userNamesIndex[a]) {
          elTaskItem[i - 1].style.cssText = `
          display: none;
          // visibility: hidden;
        `;
        }
      }
    }
    elTaskHideText.textContent = `Show done`;
  } else {
    itemsHide = false;
    for (var i = 1; i <= elTaskItem.length; i++) {
      for (var a = 0; a < userNamesIndex.length; a++) {
        if (i == userNamesIndex[a]) {
          if (!colorChange) {
            elTaskItem[i - 1].style.cssText = `
          display: flex;
          // visibility: visible;
          background-color: var(--white);
        `;
          } else {
            elTaskItem[i - 1].style.cssText = `
          display: flex;
          // visibility: visible;
          background-color: var(--colorOpacityBlack);
        `;
          }
        }
      }
    }
    elTaskHideText.textContent = `Hide done`;
  }
}
//code
let itemsTextColor = "var(--colorBlack)";
elTaskRightInput.addEventListener("input", (e) => {
  let searchValue = e.target.value.trim();
  // console.log(searchValue);
  const elTaskItemText = document.querySelectorAll(".task__items-text-right");
  let searchInputValue = `<span class="task__search-span-text">${searchValue}</span>`;

  for (var i = 1; i <= elTaskItem.length; i++) {
    if (userNamesIndex.length) {
      // for (var a = 0; a < userNamesIndex.length; a++) {
      // if (i != userNamesIndex[a]) {

      if (searchValue) {
        if (
          elTaskItemText[i - 1].textContent
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          elTaskItemText[i - 1].style.cssText = `
            color: var(--colorUserYellow);
          `;
        } else {
          elTaskItemText[i - 1].style.cssText = `
            color: ${itemsTextColor};
          `;
        }
      } else {
        elTaskItemText[i - 1].style.cssText = `
            color: ${itemsTextColor};
          `;
      }
      if (searchValue == elTaskItemText[i - 1].textContent) {
        elTaskItem[i - 1].style.cssText = `
              order: -1;
              background-color: var(--colorUserOpacity);
              transform: scale(1.02);
            `;
      } else {
        if (!colorChange) {
          elTaskItem[i - 1].style.cssText = `
              order: 0;
              background-color: var(--white);
            `;
        } else {
          elTaskItem[i - 1].style.cssText = `
              order: 0;
              background-color: var(--colorOpacityBlack);
            `;
        }
      }
      itemsHide = false;
      elTaskHideText.textContent = `Hide done`;
      // }
      // }
    } else {
      if (searchValue) {
        if (
          elTaskItemText[i - 1].textContent
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          elTaskItemText[i - 1].style.cssText = `
            color: var(--colorUserYellow);
          `;
        } else {
          elTaskItemText[i - 1].style.cssText = `
            color: ${itemsTextColor};
          `;
        }
      } else {
        elTaskItemText[i - 1].style.cssText = `
            color: ${itemsTextColor};
          `;
      }

      if (searchValue == elTaskItemText[i - 1].textContent) {
        elTaskItem[i - 1].style.cssText = `
              order: -1;
              background-color: var(--colorUserOpacity);
              transform: scale(1.02);
            `;
      } else {
        if (!colorChange) {
          elTaskItem[i - 1].style.cssText = `
              order: 0;
              background-color: var(--white);
            `;
        } else {
          elTaskItem[i - 1].style.cssText = `
              order: 0;
              background-color: var(--colorOpacityBlack);
            `;
        }
      }
      itemsHide = false;
      elTaskHideText.textContent = `Hide done`;
    }
  }
});

elTaskHideText.addEventListener("click", () => {
  itemsToHideShow();
});

elTaskLevelsText[0].addEventListener("click", () => {
  levelsCheck(0);
  elTaskLevelsText[1].style.cssText = `
    opacity: 0.4;
  `;
  elTaskLevelsText[2].style.cssText = `
    opacity: 0.4;
  `;
});
elTaskLevelsText[1].addEventListener("click", () => {
  levelsCheck(1);
  elTaskLevelsText[0].style.cssText = `
    opacity: 0.4;
  `;
  elTaskLevelsText[2].style.cssText = `
    opacity: 0.4;
  `;
});
elTaskLevelsText[2].addEventListener("click", () => {
  levelsCheck(2);
  elTaskLevelsText[0].style.cssText = `
    opacity: 0.4;
  `;
  elTaskLevelsText[1].style.cssText = `
    opacity: 0.4;
  `;
});

elTaskRemove.addEventListener("click", () => {
  clearMain();
  if (elTaskTrashSpan.textContent) {
    elTaskTrashText.style.cssText = `
      color: var(--colorBlack);
    `;
  }
});

elTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  let enterStart = false;
  userNameRepeat = false;
  if (elTaskInputs.value.trim()) {
    for (var i = 0; i < userNamesList.length; i++) {
      if (userNamesList[i] == elTaskInputs.value.trim()) {
        userNameRepeat = true;
      }
    }
  }

  if (!userNameRepeat) {
    userNamesList.push(`${elTaskInputs.value.trim()}`);
  }

  if (!elTaskInputs.value.trim()) {
    enterStart = false;
    elTaskText.textContent = `Enter name of task`;
    if (!colorChange) {
      elTaskInputs.style.cssText = `
          background-color: var(--white);
          color: var(--colorBlack);
          border: 1px solid red;
        `;
    } else {
      elTaskInputs.style.cssText = `
          background-color: var(--colorOpacityBlack);
          color: var(--colorBlack);
          border: 1px solid red;
        `;
    }

    elTaskText.style.cssText = `
        animation-name: warningTask;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
        color: red;
      `;
  } else {
    if (!colorChange) {
      elTaskInputs.style.cssText = `
          background-color: var(--white);
          color: var(--colorBlack);
          border: 1px solid var(--colorUser);
        `;
    } else {
      elTaskInputs.style.cssText = `
          background-color: var(--colorOpacityBlack);
          color: var(--colorBlack);
          border: 1px solid var(--colorUser);
        `;
    }

    elTaskText.style.cssText = `
        animation: none;
        color: var(--colorUser);
      `;
    enterStart = true;
  }
  if (enterStart) {
    if (userNameRepeat) {
      elTaskText.textContent = `Name is repeating`;
      if (!colorChange) {
        elTaskInputs.style.cssText = `
          background-color: var(--white);
          color: var(--colorBlack);
          border: 1px solid red;
          `;

        elTaskText.style.cssText = `
          animation-name: warningTask;
          animation-duration: 0.4s;
          animation-fill-mode: forwards;
          color: red;
          `;
      } else {
        elTaskInputs.style.cssText = `
          background-color: var(--colorOpacityBlack);
          color: var(--colorBlack);
          border: 1px solid red;
          `;

        elTaskText.style.cssText = `
          animation-name: warningTask;
          animation-duration: 0.4s;
          animation-fill-mode: forwards;
          color: red;
          `;
      }
    }

    if (!userNameRepeat) {
      reportGroups++;
      reportGroupsSecond++;
      elTaskMain.innerHTML += `
          <div class="task__items">
              <div class="task__items-box">
              <span class="task__items-text-span">${reportGroupsSecond}</span>
              <p class="task__items-text">  <span class="task__items-text-right">${elTaskInputs.value.trim()}</span></p>
              </div>
              
              <p class="task__levels-text ${tasksLevel}">${tasksLevel}</p>
            </div>
        `;
      elTaskItem = document.querySelectorAll(".task__items");
      itemsHide = false;
      elTaskHideText.textContent = `Hide done`;
      userStart = true;
      elTaskRightTextSpan[0].textContent = `${reportGroups}`;
      elTaskInputs.value = ``;
      allTasks++;
      switch (tasksLevel) {
        case "low": {
          reportLow++;
          elTaskRightTextSpan[3].textContent = reportLow;
          break;
        }

        case "medium": {
          reportMedium++;
          elTaskRightTextSpan[4].textContent = reportMedium;
          break;
        }

        case "high": {
          reportHigh++;
          elTaskRightTextSpan[5].textContent = reportHigh;
          break;
        }
      }

      if (allTasks > 1) {
        elTaskRightSpan.textContent = "Tasks";
      }
      elTaskRightTextSpan[2].textContent = allTasks;
      for (var i = 0; i < 3; i++) {
        elTaskLevelsText[i].style.cssText = ` 
          opacity: 0.4;
        `;
      }
      elTaskLevelWarning.textContent = `Low (Default)`;
      tasksLevel = "low";
      for (var i = 0; i < elTaskItem.length; i++) {
        if (!colorChange) {
          elTaskItem[i].style.cssText = `
              background-color: var(--white)
            `;
        } else {
          elTaskItem[i].style.cssText = `
              background-color: var(--colorOpacityBlack);
            `;
        }
      }
    }
  }
});

//-------------------------------------------------------------------

window.addEventListener("resize", () => {
  windowSize = window.innerWidth;
  if (windowSize < 650) {
    if (color == "white") {
      showNavbarSections = false;
      elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorGray);
                border: 1px solid ${profileColor};
              `;
    } else {
      showNavbarSections = false;
      elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorDarkGray);
                border: 1px solid ${profileColor};
              `;
    }
  }
});

function profileColors(proColor) {
  elNavbarIcon[0].style.cssText = `
      border: 1px solid ${proColor};
      background-color: ${profileColorsBg};
    `;
  elNavbarIcon[1].style.cssText = `
      border: 1px solid ${proColor};
      background-color: ${profileColorsBg};
    `;
  elNavbarIcon[2].style.cssText = `
      border: 1px solid ${proColor};
      background-color: ${profileColorsBg};
    `;

  elTaskHideText.style.cssText = `
      background-color: ${profileColor}
    `;
  if (windowSize < 650) {
    if (color == "white") {
      if (showNavbarSections) {
        elAbout.style.cssText = `
              animation-name: showNavbarSectionsPhone;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorDarkGray);
              border: 1px solid ${proColor};
            `;
      } else {
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorDarkGray);
                border: 1px solid ${proColor};
              `;
      }
      for (var i = 0; i < 3; i++) {
        elAboutText[i].style.cssText = `
            color: var(--colorOpacityBlack);
          `;
      }
    } else {
      if (showNavbarSections) {
        elAbout.style.cssText = `
              animation-name: showNavbarSectionsPhone;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorGray);
              border: 1px solid ${proColor};
            `;
      } else {
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorGray);
                border: 1px solid ${proColor};
              `;
      }
      for (var i = 0; i < 3; i++) {
        elAboutText[i].style.cssText = `
            color: var(--colorBlack);
          `;
      }
    }
  } else {
    if (color == "white") {
      if (showNavbarSections) {
        elAbout.style.cssText = `
              animation-name: showNavbarSections;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorDarkGray);
              border: 1px solid ${proColor};
            `;
      } else {
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorDarkGray);
                border: 1px solid ${proColor};
              `;
      }
      for (var i = 0; i < 3; i++) {
        elAboutText[i].style.cssText = `
            color: var(--colorOpacityBlack);
          `;
      }
    } else {
      if (showNavbarSections) {
        elAbout.style.cssText = `
              animation-name: showNavbarSections;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorGray);
              border: 1px solid ${proColor};
            `;
      } else {
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorGray);
                border: 1px solid ${proColor};
              `;
      }
      for (var i = 0; i < 3; i++) {
        elAboutText[i].style.cssText = `
            color: var(--colorBlack);
          `;
      }
    }
  }

  elTaskRightText.style.cssText = `
    background-color: ${proColor};
  `;

  if (!colorChange) {
    elTaskLeft.style.cssText = `
    animation-none;
    visibility: visible;
    border: 1px solid ${proColor};
    background-color: var(--colorGray);
  `;
    elTaskRight.style.cssText = `
    animation-none;
    visibility: visible;
    border: 1px solid ${proColor};
    background-color: var(--colorGray);
  `;
  } else {
    elTaskLeft.style.cssText = `
    animation-none;
    visibility: visible;
    border: 1px solid ${proColor};
    background-color: var(--colorDarkGray);
  `;
    elTaskRight.style.cssText = `
    animation-none;
    visibility: visible;
    border: 1px solid ${proColor};
    background-color: var(--colorDarkGray);
  `;
  }

  elTaskButton.style.cssText = `
    background-color: ${proColor};
  `;

  if (windowSize < 650) {
    if (color == "black") {
      elIconSet.style.cssText = `
                display: flex;
                top: 90px;
                right: 10px;
                margin-bottom: -130px;
                animation-name: showIconSetPhone;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${proColor};
                background-color: var(--colorGray);
              `;
    } else {
      elIconSet.style.cssText = `
                display: flex;
                right: 10px;
                top: 90px;
                margin-bottom: -130px;
                animation-name: showIconSetPhone;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${proColor};
                background-color: var(--colorDarkGray);
                
              `;
    }
  } else {
    if (color == "black") {
      elIconSet.style.cssText = `
                display: flex;
                right: 30px;
                // top: -150px;
                // margin-bottom: -130px;
                animation-name: showIconSetPhone2;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${proColor};
                background-color: var(--colorGray);
                
              `;
    } else {
      elIconSet.style.cssText = `
                display: flex;
                right: 30px;
                // top: -150px;
                // margin-bottom: -130px;
                animation-name: showIconSetPhone2;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${proColor};
                background-color: var(--colorDarkGray);
                
              `;
    }
  }
  if (window.innerWidth <= 650) {
    if (showHideReport) {
      showHideReport = true;
      if (!colorChange) {
        elHeaderBoxBurger.style.cssText = `
                display: block;
                animation-name: showHeaderBox;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${proColor}
                `;
      } else {
        elHeaderBoxBurger.style.cssText = `
                display: block;
                background-color: var(--colorDarkGray);
                animation-name: showHeaderBox;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${proColor}
              `;
      }
    } else {
      elHeaderBoxBurger.style.cssText = `
                display: none;
                animation: none;
                border: 1px solid ${proColor}
            `;
    }
  }
  if (!userEntered) {
    if (!colorChange) {
      elProfileForm.style.cssText = `
        display: flex;
        border: 1px solid ${proColor};
        background-color: var(--colorGray)
      `;
    } else {
      elProfileForm.style.cssText = `
        display: flex;
        border: 1px solid ${proColor};
        background-color: var(--colorDarkGray)
      `;
    }
  }
}

function setProfileColor(profileSwitchIndex) {
  switch (profileSwitchIndex) {
    case 0: {
      profileColors(profileColor);
      break;
    }
    case 1: {
      profileColors(profileColor);

      break;
    }
    case 2: {
      profileColors(profileColor);
      break;
    }
    case 3: {
      profileColors(profileColor);
      break;
    }
    case 4: {
      profileColors(profileColor);
      break;
    }
    case 5: {
      profileColors(profileColor);
      break;
    }
    case 6: {
      profileColors(profileColor);
      break;
    }
    case 7: {
      profileColors(profileColor);
      break;
    }
    case 8: {
      profileColors(profileColor);
      break;
    }
    case 9: {
      profileColors(profileColor);
      break;
    }
  }
}

elProfileColors[0].addEventListener("click", () => {
  profileColorsIndex = 0;
  profileColor = "var(--colorUser)";
  setProfileColor(0);
});

elProfileColors[1].addEventListener("click", () => {
  profileColorsIndex = 1;
  profileColor = `var(--colorUserGreen)`;
  setProfileColor(1);
});
elProfileColors[2].addEventListener("click", () => {
  profileColorsIndex = 2;
  profileColor = "var(--colorUserYellow)";
  setProfileColor(2);
});
elProfileColors[3].addEventListener("click", () => {
  profileColorsIndex = 3;
  profileColor = "var(--colorUserPurple)";
  setProfileColor(3);
});
elProfileColors[4].addEventListener("click", () => {
  profileColorsIndex = 4;
  profileColor = "var(--colorUserBlack)";
  setProfileColor(4);
});

elProfileColors[5].addEventListener("click", () => {
  profileColorsIndex = 5;
  profileColorsBg = "var(--colorUserOpacity)";
  setProfileColor(5);
});

elProfileColors[6].addEventListener("click", () => {
  profileColorsIndex = 6;
  profileColorsBg = "var(--colorUserGreenOpacity)";
  setProfileColor(6);
});

elProfileColors[7].addEventListener("click", () => {
  profileColorsIndex = 7;
  profileColorsBg = "var(--colorUserYellowOpacity)";
  setProfileColor(7);
});

elProfileColors[8].addEventListener("click", () => {
  profileColorsIndex = 8;
  profileColorsBg = "var(--colorUserPurpleOpacity)";
  setProfileColor(8);
});

elProfileColors[9].addEventListener("click", () => {
  profileColorsIndex = 9;
  profileColorsBg = "var(--colorUserBlackOpacity)";
  setProfileColor(9);
});

function burgerAnimateF(color) {
  if (!burgerAnimate) {
    burgerAnimate = true;
    elNavbarBurgerItems[0].style.cssText = `
                  visibility: hidden;
                  // transition: all 0.2s ease-in-out;
                  background-color: ${color};

                `;
    elNavbarBurgerItems[1].style.cssText = `
                  transform: rotate(45deg);
                  background-color: ${color};
                  transition: all 0.2s ease-in-out;

                `;
    elNavbarBurgerItems[2].style.cssText = `
                  position: relative;
                  top: -4.5px;
                  transition: all 0.2s ease-in-out;
                  transform: rotate(-45deg);
                  background-color:${color};
                `;
  } else {
    burgerAnimate = false;
    elNavbarBurgerItems[0].style.cssText = `
                  background-color: ${color};
                  transition: all 0.2s ease-in-out;
                `;
    elNavbarBurgerItems[1].style.cssText = `
                  background-color: ${color};
                  transform: rotate(0deg);
                  transition: all 0.2s ease-in-out;
                `;
    elNavbarBurgerItems[2].style.cssText = `
                  background-color: ${color};
                  transform: rotate(0deg );
                  transition: all 0.2s ease-in-out;
                `;
  }
}

function blackToWhite() {
  colorChange = false;
  color = "black";
  elProfileTextId[0].style.cssText = `
    color: var(--colorBlack);
  `;
  elProfileTextId[1].style.cssText = `
    color: var(--colorBlack);
  `;
  elBody.style.cssText = `
    background-color: var(--white);
  `;
  elTitle.style.cssText = `
    color: var(--colorBlack);
  `;
  elProfileId[0].style.cssText = `
    color: var(--colorBlack);
  `;
  elProfileId[1].style.cssText = `
    color: var(--colorBlack);
  `;

  elTaskTitle.style.cssText = `
    color: var(--colorBlack);
  `;

  elTaskInputs.style.cssText = `
    background-color: var(--white);
    color: var(--colorBlack);
  `;

  elTaskRightTitle.style.cssText = `
    color: var(--colorBlack);
  `;

  if (elTaskItem) {
    for (var i = 0; i < elTaskItem.length; i++) {
      elTaskItem[i].style.cssText = `
        background-color: var(--white);
      `;
    }
  }

  elTaskLeft.style.cssText = `
    animation-none;
    visibility: visible;
    border: 1px solid ${profileColor};
    background-color: var(--colorGray);
  `;
  elTaskRight.style.cssText = `
    animation-none;
    visibility: visible;
    border: 1px solid ${profileColor};
    background-color: var(--colorGray);
  `;

  for (var i = 0; i <= 5; i++) {
    elProfileInputs[i].style.cssText = `
      background-color: var(--white)
    `;
  }

  for (var i = 0; i <= 5; i++) {
    elLink[i].style.cssText = `
      color: var(--colorBlack);
    `;

    elProfileTextSpan[i].style.cssText = `
      color: var(--colorBlack);
    `;

    if (i >= 0 && i <= 1) {
      elLeftIcons[i].style.cssText = `
        color: var(--colorBlack);
      `;
    }

    switch (i) {
      case 0: {
        elNavbarBurgerItems[i].style.cssText = `
          background-color: var(--colorBlack);
        `;
        break;
      }
      case 1: {
        elNavbarBurgerItems[i].style.cssText = `
          background-color: var(--colorBlack);
        `;
        break;
      }
      case 2: {
        elNavbarBurgerItems[
          i
        ].style.cssText = `background-color: var(--colorBlack)`;
        break;
      }
    }
  }
  if (windowSize < 650) {
    if (showNavbarSections) {
      elAbout.style.cssText = `
                animation-name: showNavbarSectionsPhone;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
                background-color: var(--colorGray);
                border: 1px solid ${profileColor};

              `;
    } else {
      elAbout.style.cssText = `
                  visibility: hidden;
                  animation: none;
                  background-color: var(--colorGray);
                  border: 1px solid ${profileColor};

                `;
    }
    for (var i = 0; i < 3; i++) {
      elAboutText[i].style.cssText = `
              color: var(--colorBlack);
            `;
    }
  } else {
    if (showNavbarSections) {
      elAbout.style.cssText = `
                animation-name: showNavbarSections;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
                background-color: var(--colorGray);
                border: 1px solid ${profileColor};

              `;
    } else {
      elAbout.style.cssText = `
                  visibility: hidden;
                  animation: none;
                  background-color: var(--colorGray);
                  border: 1px solid ${profileColor};

                `;
    }
    for (var i = 0; i < 3; i++) {
      elAboutText[i].style.cssText = `
              color: var(--colorBlack);
            `;
    }
  }

  elTextArea.style.cssText = `
    background-color: var(--white)
  `;
  elProfileBoxTop.style.cssText = `
    border-bottom: 1px solid var(--colorBlack);
  `;
  if (!userEntered) {
    elProfileForm.style.cssText = `
      display: flex;
      background-color: var(--colorGray);
      border: 1px solid ${profileColor}
    `;
  } else {
    elProfileForm.style.cssText = `
      background-color: var(--colorGray);
      border: 1px solid ${profileColor}
    `;
  }
  if (windowSize < 650) {
    if (!showChoose) {
      showChoose = false;
      elIconSet.style.cssText = `
      display: none;
      right: 10px;
      top: 90px;
      margin-bottom: -130px;
      background-color: var(--colorGray);
      border: 1px solid ${profileColor};

    `;
    } else {
      showChoose = true;
      elIconSet.style.cssText = `
      display: flex;
      right: 10px;
      top: 90px;
      margin-bottom: -130px;
      background-color: var(--colorGray);
      border: 1px solid ${profileColor};

    `;
    }
  } else {
    if (!showChoose) {
      showChoose = false;
      elIconSet.style.cssText = `
      display: none;
      right: 30px;
      // top: -150px;
      // margin-bottom: -130px;
      background-color: var(--colorGray);
      border: 1px solid ${profileColor};

    `;
    } else {
      showChoose = true;
      elIconSet.style.cssText = `
      display: flex;
      right: 30px;
      // top: -150px;
      // margin-bottom: -130px;
      background-color: var(--colorGray);
      border: 1px solid ${profileColor};

    `;
    }
  }

  elProfileClose.style.cssText = `
  color: var(--colorBlack);
`;
}

function whiteToBlack() {
  colorChange = true;
  color = "white";

  elProfileTextId[0].style.cssText = `
    color: var(--white);
  `;
  elProfileTextId[1].style.cssText = `
    color: var(--white);
  `;
  elBody.style.cssText = `
    background-color: var(--colorBlack)
  `;
  elTitle.style.cssText = `
    color: var(--white)
  `;
  elProfileId[0].style.cssText = `
    color: var(--white);
  `;
  elProfileId[1].style.cssText = `
    color: var(--white);
  `;

  elTaskTitle.style.cssText = `
    color: var(--white);
  `;

  elTaskInputs.style.cssText = `
    background-color: var(--colorOpacityBlack);
  `;

  elTaskRightTitle.style.cssText = `
    color: var(--white);
  `;

  if (elTaskItem) {
    for (var i = 0; i < elTaskItem.length; i++) {
      elTaskItem[i].style.cssText = `
        background-color: var(--colorOpacityBlack);
      `;
    }
  }

  elTaskLeft.style.cssText = `
    animation-none;
    visibility: visible;
    border: 1px solid ${profileColor};
    background-color: var(--colorDarkGray);
  `;
  elTaskRight.style.cssText = `
    animation-none;
    visibility: visible;
    border: 1px solid ${profileColor};
    background-color: var(--colorDarkGray);
  `;

  for (var i = 0; i <= 5; i++) {
    elProfileInputs[i].style.cssText = `
      background-color: var(--colorOpacityBlack);
    `;
  }

  for (var i = 0; i <= 5; i++) {
    elLink[i].style.cssText = `
      color: var(--white);
    `;

    elProfileTextSpan[i].style.cssText = `
      color: var(--white);
    `;

    if (i >= 0 && i <= 1) {
      elLeftIcons[i].style.cssText = `
        color: var(--white);
      `;
    }

    switch (i) {
      case 0: {
        elNavbarBurgerItems[i].style.cssText = `
          background-color: var(--white);
        `;
        break;
      }
      case 1: {
        elNavbarBurgerItems[i].style.cssText = `
          background-color: var(--white);
        `;
        break;
      }
      case 2: {
        elNavbarBurgerItems[i].style.cssText = `background-color: var(--white)`;
        break;
      }
    }
  }
  if (windowSize < 650) {
    if (showNavbarSections) {
      elAbout.style.cssText = `
              animation-name: showNavbarSectionsPhone;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorDarkGray);
              border: 1px solid ${profileColor};

            `;
    } else {
      elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorDarkGray);
                border: 1px solid ${profileColor};

              `;
    }
    for (var i = 0; i < 3; i++) {
      elAboutText[i].style.cssText = `
            color: var(--colorOpacityBlack);
          `;
    }
  } else {
    if (showNavbarSections) {
      elAbout.style.cssText = `
              animation-name: showNavbarSections;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorDarkGray);
              border: 1px solid ${profileColor};

            `;
    } else {
      elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorDarkGray);
                border: 1px solid ${profileColor};

              `;
    }
    for (var i = 0; i < 3; i++) {
      elAboutText[i].style.cssText = `
            color: var(--colorOpacityBlack);
          `;
    }
  }

  elTextArea.style.cssText = `
    background-color: var(--colorGray)
  `;
  elProfileBoxTop.style.cssText = `
    border-bottom: 1px solid var(--colorGray);
  `;

  if (!userEntered) {
    elProfileForm.style.cssText = `
      display: flex;
      background-color: var(--colorDarkGray);
      border: 1px solid ${profileColor}
    `;
  } else {
    elProfileForm.style.cssText = `
      background-color: var(--colorGray);
      border: 1px solid ${profileColor}
    `;
  }
  if (windowSize < 650) {
    if (!showChoose) {
      showChoose = false;
      elIconSet.style.cssText = `
      display: none;
      right: 10px;
      top: 90px;
      margin-bottom: -130px;
      background-color: var(--colorDarkGray);
      border: 1px solid ${profileColor};

    `;
    } else {
      showChoose = true;
      elIconSet.style.cssText = `
      display: flex;
      right: 10px;
      top: 90px;
      margin-bottom: -130px;
      background-color: var(--colorDarkGray);
      border: 1px solid ${profileColor};

    `;
    }
  } else {
    if (!showChoose) {
      showChoose = false;
      elIconSet.style.cssText = `
      display: none;
      right: 30px;
      // top: -150px;
      // margin-bottom: -130px;
      background-color: var(--colorDarkGray);
      border: 1px solid ${profileColor};

    `;
    } else {
      showChoose = true;
      elIconSet.style.cssText = `
      display: flex;
      right: 30px;
      // top: -150px;
      // margin-bottom: -130px;
      background-color: var(--colorDarkGray);
      border: 1px solid ${profileColor};

    `;
    }
  }

  elProfileClose.style.cssText = `
  color: var(--white);
`;
}

function formShow() {
  elProfileForm.style.cssText = `
    display: flex;
    animation-name: showForm;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    border: 1px solid ${profileColor}
  `;
}

formShow();

elDayBox[0].addEventListener("click", () => {
  if (colorChange) {
    elIconSet.style.cssText = `
                display: flex;
                // top: -150px;
                // margin-bottom: -130px;
                animation-name: showIconSetPhone;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${profileColor};
                background-color: var(--colorDarkGray);

                
              `;
  } else {
    elIconSet.style.cssText = `
                display: flex;
                // top: -150px;
                // margin-bottom: -130px;
                animation-name: showIconSetPhone;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${profileColor};
                background-color: var(--colorGray);

                
              `;
  }

  if (!colorChange) {
    colorChange = true;
    whiteToBlack();
    elLeftIcons[0].style.cssText = `
            visibility: visible;

          `;
    elLeftIcons[1].style.cssText = `
            visibility: hidden;
          `;
    elLeftIcons[2].style.cssText = `
            visibility: visible;

          `;
    elLeftIcons[3].style.cssText = `
            visibility: hidden;
          `;
  } else {
    colorChange = false;
    blackToWhite();
    elLeftIcons[0].style.cssText = `
            visibility: hidden;

          `;
    elLeftIcons[1].style.cssText = `
            visibility: visible;
          `;
    elLeftIcons[2].style.cssText = `
            visibility: hidden;

          `;
    elLeftIcons[3].style.cssText = `
            visibility: visible;
          `;
  }
});

elDayBox[1].addEventListener("click", () => {
  if (showHideReport) {
    showHideReport = true;
    if (colorChange) {
      elHeaderBoxBurger.style.cssText = `
                display: block;
                animation-name: showHeaderBox;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${profileColor};

                `;
    } else {
      elHeaderBoxBurger.style.cssText = `
                display: block;
                background-color: var(--colorDarkGray);
                animation-name: showHeaderBox;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${profileColor};

              `;
    }
  } else {
    showHideReport = false;
    showChoose = false;
    elIconSet.style.cssText = `
          display: none;
        `;
    elHeaderBoxBurger.style.cssText = `
                display: none;
                animation: none;
            `;
  }
  if (!colorChange) {
    colorChange = true;
    whiteToBlack();
    elLeftIcons[2].style.cssText = `
            visibility: visible;

          `;
    elLeftIcons[3].style.cssText = `
            visibility: hidden;
          `;
    elLeftIcons[0].style.cssText = `
            visibility: visible;

          `;
    elLeftIcons[1].style.cssText = `
            visibility: hidden;
          `;
  } else {
    colorChange = false;
    blackToWhite();
    elLeftIcons[2].style.cssText = `
            visibility: hidden;

          `;
    elLeftIcons[3].style.cssText = `
            visibility: visible;
          `;
    elLeftIcons[0].style.cssText = `
            visibility: hidden;

          `;
    elLeftIcons[1].style.cssText = `
            visibility: visible;
          `;
  }
});

function start() {
  elLink[1].addEventListener("click", () => {
    if (color == "white") {
      if (!showNavbarSections) {
        showNavbarSections = true;
        elAbout.style.cssText = `
              animation-name: showNavbarSections;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorDarkGray);
              border: 1px solid ${profileColor};
            `;
      } else {
        showNavbarSections = false;
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorDarkGray);
                border: 1px solid ${profileColor};
              `;
      }
      for (var i = 0; i < 3; i++) {
        elAboutText[i].style.cssText = `
            color: var(--colorOpacityBlack);
          `;
      }
    } else {
      if (!showNavbarSections) {
        showNavbarSections = true;
        elAbout.style.cssText = `
              animation-name: showNavbarSections;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorGray);
              border: 1px solid ${profileColor};
            `;
      } else {
        showNavbarSections = false;
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorGray);
                border: 1px solid ${profileColor};
              `;
      }
      for (var i = 0; i < 3; i++) {
        elAboutText[i].style.cssText = `
            color: var(--colorBlack);
          `;
      }
    }
  });

  elLink[4].addEventListener("click", () => {
    if (color == "white") {
      if (!showNavbarSections) {
        showNavbarSections = true;
        elAbout.style.cssText = `

              animation-name: showNavbarSectionsPhone;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorDarkGray);
              border: 1px solid ${profileColor};

            `;
      } else {
        showNavbarSections = false;
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorDarkGray);
                border: 1px solid ${profileColor};
              `;
      }
      for (var i = 0; i < 3; i++) {
        elAboutText[i].style.cssText = `
            color: var(--colorOpacityBlack);
          `;
      }
    } else {
      if (!showNavbarSections) {
        showNavbarSections = true;
        elAbout.style.cssText = `
              animation-name: showNavbarSectionsPhone;
              animation-duration: 0.4s;
              animation-fill-mode: forwards;
              background-color: var(--colorGray);
              border: 1px solid ${profileColor};

            `;
      } else {
        showNavbarSections = false;
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorGray);
                border: 1px solid ${profileColor};
              `;
      }
      for (var i = 0; i < 3; i++) {
        elAboutText[i].style.cssText = `
            color: var(--colorBlack);
          `;
      }
    }
  });

  elProfileClose.addEventListener("click", () => {
    showChoose = false;
    elIconSet.style.cssText = `
              animation: none;
              display: none;
            `;
  });

  elNavbarIcon[0].addEventListener("click", () => {
    if (!showChoose) {
      showChoose = true;
      if (!colorChange) {
        elIconSet.style.cssText = `
              display: flex;
              animation-name: showIconSet;
              animation-duration: 0.3s;
              animation-fill-mode: forwards;
              border: 1px solid ${profileColor};

            `;
      } else {
        elIconSet.style.cssText = `
              display: flex;
              animation-name: showIconSet;
              animation-duration: 0.3s;
              animation-fill-mode: forwards;
              background-color: var(--colorDarkGray);
              border: 1px solid ${profileColor};
            `;
      }
    } else {
      showChoose = false;
      elIconSet.style.cssText = `
              animation: none;
              display: none;
            `;
    }
  });

  elNavbarIcon[1].addEventListener("click", () => {
    if (!showChoose) {
      showChoose = true;
      if (!colorChange) {
        elIconSet.style.cssText = `
                display: flex;
                top: 90px;
                margin-bottom: -130px;
                animation-name: showIconSetPhone;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${profileColor};

              `;
      } else {
        elIconSet.style.cssText = `
                display: flex;
                top: 90px;
                margin-bottom: -130px;
                animation-name: showIconSetPhone;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
              background-color: var(--colorDarkGray);
              border: 1px solid ${profileColor};
                
              `;
      }
    } else {
      showChoose = false;
      elIconSet.style.cssText = `
              animation: none;
              display: none;
            `;
    }
  });

  elNavbarButton.addEventListener("click", (e) => {
    if (!elTextArea.value.trim()) {
      if (!colorChange) {
        elTextArea.style.cssText = `
            border: 1px solid red;
          `;
      } else {
        elTextArea.style.cssText = `
            border: 1px solid red;
            background-color: var(--colorGray);
          `;
      }
    } else {
      elNavbarIcon[0].innerHTML = `
            ${elTextArea.value.trim()}
          `;
      elNavbarIcon[1].innerHTML = `
            ${elTextArea.value.trim()}
          `;
      elNavbarIcon[2].innerHTML = `
            ${elTextArea.value.trim()}
          `;
    }
    elNavbarButton.disabled = true;
    elNavbarButton.style.cssText = `
          opacity: 0.7;

        `;
  });

  elBurger.addEventListener("click", () => {
    if (showNavbarSections) {
      showNavbarSections = false;
      elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorGray);
                border: 1px solid ${profileColor};
              `;
    }
    if (!showHideReport) {
      showHideReport = true;
      if (!colorChange) {
        elHeaderBoxBurger.style.cssText = `
                display: block;
                animation-name: showHeaderBox;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${profileColor};

                `;
      } else {
        elHeaderBoxBurger.style.cssText = `
                display: block;
                background-color: var(--colorDarkGray);
                animation-name: showHeaderBox;
                animation-duration: 0.3s;
                animation-fill-mode: forwards;
                border: 1px solid ${profileColor};

              `;
      }
    } else {
      showHideReport = false;
      showChoose = false;
      elIconSet.style.cssText = `
          display: none;
        `;
      elHeaderBoxBurger.style.cssText = `
                display: none;
                animation: none;
                border: 1px solid ${profileColor}
            `;
    }
    burgerAnimateF(color);
  });

  function headerBurgerWork() {
    if (window.innerWidth < 650) {
      if (!showHideReport) {
        elBurger.style.cssText = `
            display: flex;
          `;
      }

      elIconSet.style.cssText = `
            display: none;
            `;
      elAbout.style.cssText = `
            visibility: hidden;
          `;
      showNavbarSections = false;
      if (color == "white") {
        showNavbarSections = false;
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorGray);
                border: 1px solid ${profileColor};
              `;
      } else {
        showNavbarSections = false;
        elAbout.style.cssText = `
                visibility: hidden;
                animation: none;
                background-color: var(--colorDarkGray);
                border: 1px solid ${profileColor};
              `;
      }
    } else {
      if (burgerAnimate) {
        burgerAnimate = true;
        burgerAnimateF(color);
      }

      elBurger.style.cssText = `
          display: none;
        `;
      elHeaderBoxBurger.style.cssText = `
          visibility: hidden;
        `;
      elIconSet.style.cssText = `
          display: none;
        `;
      elAbout.style.cssText = `
          visibility: hidden;
        `;
      showNavbarSections = false;
      showHideReport = false;
    }
    return 0;
  }
  headerBurgerWork();
  window.addEventListener("resize", () => {
    headerBurgerWork();
  });
}

start();

function elProfileInputsWork(index) {
  elProfileInputs[index].addEventListener("click", () => {
    if (!colorChange) {
      elProfileInputs[index].style.cssText = `
      border: 1px solid var(--colorUser);
      background-color: var(--white);
    `;

      elProfileText[index].style.cssText = `
      animation-name: inputText;
      animation-duration: 0.2s;
      animation-fill-mode: forwards;
      color: var(--colorUser)
    `;

      if (index == 3) {
        elEmailChecked = true;
      }
    } else {
      elProfileInputs[index].style.cssText = `
      border: 1px solid var(--colorUser);
      background-color: var(--colorOpacityBlack)
    `;

      elProfileText[index].style.cssText = `
      animation-name: inputText;
      animation-duration: 0.2s;
      animation-fill-mode: forwards;
      color: var(--colorUser)
    `;

      if (index == 3) {
        elEmailChecked = true;
      }
    }

    keyDown();
  });
}
elProfileInputsWork(0);
elProfileInputsWork(1);
elProfileInputsWork(2);
elProfileInputsWork(3);
elProfileInputsWork(4);
elProfileInputsWork(5);
function inputRepeatCheck(value) {
  for (var i = 0; i < userNamesList.length; i++) {
    if (userNamesList[i] == value) {
      userNameRepeat = true;
      break;
    } else {
      userNameRepeat = false;
    }
  }

  if (!userStart) {
    if (!value) {
      elTaskText.textContent = `Enter name of task`;
      if (!colorChange) {
        elTaskInputs.style.cssText = `
          background-color: var(--white);
          color: var(--colorBlack);
          border: 1px solid red;
        `;
      } else {
        elTaskInputs.style.cssText = `
          background-color: var(--colorOpacityBlack);
          color: var(--colorBlack);
          border: 1px solid red;
        `;
      }

      elTaskText.style.cssText = `
        animation-name: warningTask;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
        color: red;
      `;
    } else {
      elTaskText.textContent = `You can add`;
      if (!colorChange) {
        elTaskInputs.style.cssText = `
          background-color: var(--white);
          color: var(--colorBlack);
          border: 1px solid var(--colorUser);
        `;
      } else {
        elTaskInputs.style.cssText = `
          background-color: var(--colorOpacityBlack);
          color: var(--colorBlack);
          border: 1px solid var(--colorUser);
        `;
      }

      elTaskText.style.cssText = `
        animation: none;
        color: var(--colorUser);
      `;
    }
  } else {
    if (!value) {
      elTaskText.textContent = `Enter name of task`;
      if (!colorChange) {
        elTaskInputs.style.cssText = `
          background-color: var(--white);
          color: var(--colorBlack);
          border: 1px solid red;
        `;
      } else {
        elTaskInputs.style.cssText = `
          background-color: var(--colorOpacityBlack);
          color: var(--colorBlack);
          border: 1px solid red;
        `;
      }

      elTaskText.style.cssText = `
        animation-name: warningTask;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
        color: red;
      `;
    } else if (userNameRepeat) {
      elTaskText.textContent = `Name is repeating`;
      if (!colorChange) {
        elTaskInputs.style.cssText = `
          background-color: var(--white);
          color: var(--colorBlack);
          border: 1px solid red;
          `;

        elTaskText.style.cssText = `
          animation-name: warningTask;
          animation-duration: 0.4s;
          animation-fill-mode: forwards;
          color: red;
          `;
      } else {
        elTaskInputs.style.cssText = `
          background-color: var(--colorOpacityBlack);
          color: var(--colorBlack);
          border: 1px solid red;
          `;

        elTaskText.style.cssText = `
          animation-name: warningTask;
          animation-duration: 0.4s;
          animation-fill-mode: forwards;
          color: red;
          `;
      }
    } else {
      elTaskText.textContent = `You can add`;
      if (!colorChange) {
        elTaskInputs.style.cssText = `
          background-color: var(--white);
          color: var(--colorBlack);
          border: 1px solid var(--colorUser);
        `;
      } else {
        elTaskInputs.style.cssText = `
          background-color: var(--colorOpacityBlack);
          color: var(--colorBlack);
          border: 1px solid var(--colorUser);
        `;
      }

      elTaskText.style.cssText = `
        animation: none;
        color: var(--colorUser);
      `;
    }
  }
}
elTaskInputs.addEventListener("input", (e) => {
  const taskInputValue = e.target.value.trim();
  inputRepeatCheck(taskInputValue);
});

function keyDown() {
  // elTaskInputs.addEventListener("input", (e) => {
  //   const taskInputValue = e.target.value.trim();
  //   inputRepeatCheck(taskInputValue);
  // });
  if (elTextArea.value.trim()) {
    if (!colorChange) {
      elTextArea.style.cssText = `
            border: none;
          `;
    } else {
      elTextArea.style.cssText = `
            border: none;
            background-color: var(--colorGray);
            `;
    }

    elNavbarButton.style.cssText = `
            opacity: 1;
          `;
    elNavbarButton.disabled = false;
  }
  if (
    Number(elProfileInputs[2].value.trim()) < 120 &&
    elProfileInputs[2].value.trim().length > 0
  ) {
    elProfileText[2].textContent = "Correct";
    if (!colorChange) {
      elProfileInputs[2].style.cssText = `
      border: 1px solid var(--colorUser);
      background-color: var(--white);
    `;
    } else {
      elProfileInputs[2].style.cssText = `
      border: 1px solid var(--colorUser);
      background-color: var(--colorOpacityBlack);
    `;
    }

    elProfileText[2].style.cssText = `
      animation-name: inputText;
      animation-duration: 0.2s;
      animation-fill-mode: forwards;
      color: var(--colorUser)
    `;
  } else if (Number(elProfileInputs[2].value.trim()) >= 120) {
    elProfileText[2].textContent = "Make sure less than 120";
    if (!colorChange) {
      elProfileInputs[2].style.cssText = `
                border: 1px solid red;
                background-color: var(--white);
              `;
      elProfileText[2].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
          `;
    } else {
      elProfileInputs[2].style.cssText = `
                border: 1px solid red;
                background-color: var(--colorOpacityBlack);
              `;
      elProfileText[2].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
          `;
    }
  }

  if (
    elProfileInputs[3].value.trim()[
      elProfileInputs[3].value.trim().length - 1
    ] != "@" &&
    includesEmailGlobal
  ) {
    elProfileText[3].textContent = "Correct";
    if (!colorChange) {
      elProfileInputs[3].style.cssText = `
      border: 1px solid var(--colorUser);
      background-color: var(--white);
    `;
    } else {
      elProfileInputs[3].style.cssText = `
      border: 1px solid var(--colorUser);
      background-color: var(--colorOpacityBlack);
    `;
    }

    elProfileText[3].style.cssText = `
      animation-name: inputText;
      animation-duration: 0.2s;
      animation-fill-mode: forwards;
      color: var(--colorUser)
    `;
  }

  if (elEmailChecked) {
    var includesInEmail = elProfileInputs[3].value.trim().includes("@");
    includesEmailGlobal = includesInEmail;
    if (!includesInEmail) {
      elProfileText[3].textContent = "Make sure '@'";
      elProfileText[3].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
      if (!colorChange) {
        elProfileInputs[3].style.cssText = `
      border: 1px solid red;
      background-color: var(--white);
    `;
      } else {
        elProfileInputs[3].style.cssText = `
      border: 1px solid red;
      background-color: var(--colorOpacityBlack);
    `;
      }
    } else if (includesInEmail) {
      for (var i = 0; i < elProfileInputs[3].value.trim().length; i++) {
        if (elProfileInputs[3].value.trim()[i] == "@") {
          if (
            elProfileInputs[3].value.trim()[
              elProfileInputs[3].value.trim().length - 1
            ] == "@"
          ) {
            elProfileText[3].textContent = "Make sure text after '@'";
            if (!colorChange) {
              elProfileInputs[3].style.cssText = `
                border: 1px solid red;
                background-color: var(--white);
              `;
            } else {
              elProfileInputs[3].style.cssText = `
                border: 1px solid red;
                background-color: var(--colorOpacityBlack);
              `;
            }
            elProfileText[3].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
          }
        }
      }
    }
  }
}

window.addEventListener("keydown", () => {
  keyDown();
});

elProfileFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  let accept = 0;

  for (var i = 0; i <= 5; i++) {
    if (!elProfileInputs[i].value.trim()) {
      if (!colorChange) {
        elProfileInputs[i].style.cssText = `
                border: 1px solid red;
                background-color: var(--white);
                
              `;
        elProfileText[i].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
      } else {
        elProfileInputs[i].style.cssText = `
                border: 1px solid red;
                background-color: var(--colorOpacityBlack);
                
              `;
        elProfileText[i].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
      }
    }
  }

  if (elEmailChecked) {
    var includesInEmail = elProfileInputs[3].value.trim().includes("@");
    includesEmailGlobal = includesInEmail;

    if (
      elProfileInputs[3].value.trim()[
        elProfileInputs[3].value.trim().length - 1
      ] != "@" &&
      includesEmailGlobal
    ) {
      elProfileText[3].textContent = "Correct";
      if (!colorChange) {
        elProfileInputs[3].style.cssText = `
                border: 1px solid var(--colorUser);
                background-color: var(--white);
                
              `;
        elProfileText[3].style.cssText = `
                animation-name: inputText;
                animation-duration: 0.2s;
                animation-fill-mode: forwards;
                color: var(--colorUser)
              `;
      } else {
        elProfileInputs[3].style.cssText = `
                border: 1px solid var(--colorUser);
                background-color: var(--colorOpacityBlack);
                
              `;
        elProfileText[3].style.cssText = `
                animation-name: inputText;
                animation-duration: 0.2s;
                animation-fill-mode: forwards;
                color: var(--colorUser)
              `;
      }
    }

    if (!includesInEmail) {
      elProfileText[3].textContent = "Make sure '@'";
      if (!colorChange) {
        elProfileInputs[3].style.cssText = `
                border: 1px solid red;
                background-color: var(--white);
                
              `;
        elProfileText[3].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
      } else {
        elProfileInputs[3].style.cssText = `
                border: 1px solid red;
                background-color: var(--colorOpacityBlack);
                
              `;
        elProfileText[3].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
      }
    } else if (includesInEmail) {
      for (var i = 0; i < elProfileInputs[3].value.trim().length; i++) {
        if (elProfileInputs[3].value.trim()[i] == "@") {
          if (
            elProfileInputs[3].value.trim()[
              elProfileInputs[3].value.trim().length - 1
            ] == "@"
          ) {
            elProfileText[3].textContent = "Make sure text after '@'";
            if (!colorChange) {
              elProfileInputs[3].style.cssText = `
                border: 1px solid red;
                background-color: var(--white);
                
              `;
              elProfileText[3].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
            } else {
              elProfileInputs[3].style.cssText = `
                border: 1px solid red;
                background-color: var(--colorOpacityBlack);
                
              `;
              elProfileText[3].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
            }
          }
        }
      }
    }
  }

  if (
    elProfileInputs[3].value.trim()[
      elProfileInputs[3].value.trim().length - 1
    ] != "@" &&
    includesEmailGlobal
  ) {
    elProfileText[3].textContent = "Correct";

    if (Number(elProfileInputs[2].value.trim()) < 120) {
      for (var i = 0; i <= 5; i++) {
        if (!elProfileInputs[i].value.trim()) {
          if (!colorChange) {
            elProfileInputs[i].style.cssText = `
                border: 1px solid red;
                background-color: var(--white);
              `;
            elProfileText[i].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
          } else {
            elProfileInputs[i].style.cssText = `
                border: 1px solid red;
                background-color: var(--colorOpacityBlack);
              `;
            elProfileText[i].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
              `;
          }
        } else {
          accept++;
        }
      }
    } else {
      elProfileText[2].textContent = "Make sure less than 120";

      if (!colorChange) {
        elProfileInputs[2].style.cssText = `
                border: 1px solid red;
                background-color: var(--white);
              `;
        elProfileText[2].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
          `;
      } else {
        elProfileInputs[2].style.cssText = `
                border: 1px solid red;
                background-color: var(--colorOpacityBlack);
              `;
        elProfileText[2].style.cssText = `
                color: red ;
                animation-name: warning;
                animation-duration: 0.4s;
                animation-fill-mode: forwards;
          `;
      }
    }
  }

  if (accept == 6) {
    elProfileFormButton.style.cssText = `
      animation-name: block;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
    `;

    elProfileFormButton.disabled = true;

    for (var i = 0; i <= 5; i++) {
      if (!colorChange) {
        elProfileInputs[i].style.cssText = `
        animation-name: accepted;
        animation-duration: 0.1s;
        animation-delay: ${i / 4}s;
        animation-fill-mode: forwards;
        background-color: var(--white);
      `;
      } else {
        elProfileInputs[i].style.cssText = `
        animation-name: accepted;
        animation-duration: 0.1s;
        animation-delay: ${i / 4}s;
        animation-fill-mode: forwards;
        background-color: var(--colorOpacityBlack);
      `;
      }

      elProfileText[i].style.cssText = `
        animation-name: acceptedText;
        animation-duration: 0.1s;
        animation-delay: ${i / 4}s;
        animation-fill-mode: forwards;
        top: 0px;
        transform: translateX(-4px);

      `;
    }

    if (!colorChange) {
      elProfileForm.style.cssText = `
      display: flex;
      animation-name: closeForm;
      animation-duration: 0.5s;
      animation-delay: 2s;
      animation-fill-mode: forwards;
      background-color: var(--colorGray);
    `;
    } else {
      elProfileForm.style.cssText = `
      display: flex;
      animation-name: closeForm;
      animation-duration: 0.5s;
      animation-delay: 2s;
      animation-fill-mode: forwards;
      background-color: var(--colorSecondBlack);
    `;
    }

    elProfileFormButton.textContent = "";
    elMainLoader.style.cssText = `
      visibility: visible;      
    `;
    function userNames(inputs) {
      const userInputFirst = inputs.value.trim().toLowerCase();
      const userNameFinal = userInputFirst[0]
        .toUpperCase()
        .concat(userInputFirst.slice(1));

      return userNameFinal;
    }

    elProfileTextSpan[0].textContent = userNames(elProfileInputs[0]);
    elProfileTextSpan[1].textContent = userNames(elProfileInputs[1]);

    for (var i = 2; i <= 5; i++) {
      elProfileTextSpan[i].textContent = elProfileInputs[i].value.trim();
    }

    userEntered = true;
    // showTask();
    elTask.style.cssText = `
    display: flex;
    `;
    // showTaskForm = true;
    // start();
  }
});
