"use strict";

// SELECTORS
const emailInput = document.getElementById("email");
const select__plans = document.querySelector(".select--plans");
const step3summery = document.querySelector(".step--3__summery");
const totalAmount = document.querySelector(".total--amountValue");
const step1__btn = document.querySelector(".step1--btn");
const step2__btn = document.querySelector(".step2--btn");
const step3__btn = document.querySelector(".step3--btn");
const step4__btn = document.querySelector(".step4--btn");
const step2__errorMessage = document.querySelector(".step2--errorMessage");
const step3__errorMessage = document.querySelector(".step3--errorMessage");
const step2PrevBTN = document.querySelector(".prevBtn__step--2");
const step3PrevBTN = document.querySelector(".prevBtn__step--3");
const step4PrevBTN = document.querySelector(".prevBtn__step--4");
const changePlansButton = document.getElementById("changeSelectionButton");
const formCompletionMessage = document.querySelector(".formCompletionMessage");
const monthAmountElement = document.querySelectorAll(".month--amount");
const yearAmountElement = document.querySelectorAll(".year--amount");
const monthWarrantyElement = document.querySelectorAll(".mon--warranty");
const monthText = document.querySelectorAll(".mon");
const yearText = document.querySelectorAll(".year");
const duration = document.querySelectorAll(".duration");
const toggleBoxes = document.querySelectorAll(".toggle-box");
const checkboxes = document.querySelectorAll(
  ".toggle-box input[type='checkbox']"
);
const inputTypes = document.querySelectorAll(".formValidation");
const errorMessage = document.querySelectorAll(".error--message");
const addOns_selector = document.querySelectorAll(".add-ons_selector");
const checkbox = document.querySelectorAll(".checkbox");

let curStep = 1;
// FUNCTION TO REVEAL THE NEXT STEP
const revealNextStep = (curStep) => {
  document.querySelector(.step--${curStep}).style.display = "none";
  document
    .querySelector(.number--${curStep})
    .classList.remove("activeStepNumber");
  curStep++;
  document.querySelector(.step--${curStep}).style.display = "block";
  document
    .querySelector(.number--${curStep})
    .classList.add("activeStepNumber");
};

// STEP--1

// DISPLAYING ERROR TO FORM
const displayError = function (index, input) {
  errorMessage[index].style.display = "block";
  input.style.border = "1px solid var(--Strawberry-red)";
};

// FORM VALIDATION
const step1Validation = function (e) {
  e.preventDefault();
  let isValid = true;
  inputTypes.forEach((input, index) => {
    if (input.value === "") {
      displayError(index, input);
      isValid = false;
    } else {
      errorMessage[index].style.display = "";
      input.style.border = "";
    }
  });

  // EMAIL VALIDATION
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailPattern.test(emailValue)) {
    const emailIndex = Array.from(inputTypes).indexOf(emailInput);
    displayError(emailIndex, email);
    isValid = false;
  }

  // UPDATE THE UI
  if (isValid) {
    revealNextStep(curStep++);
  }
};

// STEP--2
let planSelector;
let previousPlanSelector = null;

// STEP--2 VALIDATION
const step2Validation = function (e) {
  e.preventDefault();

  if (!planSelector) {
    step2__errorMessage.style.display = "block";
  } else {
    step2__errorMessage.style.display = "";

    revealNextStep(curStep++);
  }
};

// FUNCTION THAT ADD THE PLAN VALUE TO STEP4
let Plan2Amount;
let addPlanAmount = document.querySelector(".addPlanAmount");
const addPlanValueToStep4 = function () {
  const planAmount = planSelector.querySelector(".planAmount");
  planAmount.querySelectorAll("p:not(.hidden)").forEach((p) => {
    addPlanAmount.innerHTML = p.textContent;
    Plan2Amount = p.textContent;
  });
};

const selectPlans = function (e) {
  e.preventDefault();
  planSelector = e.target.closest(".plan__selector");

  // ADDS THE PLAN TYPE TO STEP4
  const planType = planSelector.querySelector(
    ".selected--plan__benefits h3"
  ).textContent;
  document.querySelector(".planType").innerHTML = planType;
  if (!planType) return;
  addPlanValueToStep4();

  // ADD CHECKED PROPERTY AND TOGGLE BACKGROUND COLOR ON CLICK
  if (previousPlanSelector) {
    previousPlanSelector.classList.remove("checkedPlan");
  }

  // Add class to new plan selector
  planSelector.classList.add("checkedPlan");

  // Update previous plan selector
  previousPlanSelector = planSelector;
};

// CHANGES THE DURATION PLAN VIA TsOGGLE
const addClass = (targetClass) => {
  targetClass.classList.add("hidden");
};
const removeClass = (targetClass) => {
  targetClass.classList.remove("hidden");
};

toggleBoxes.forEach((toggleBox) => {
  toggleBox.onclick = function () {
    const circle = this.querySelector(".circle");
    const checkbox = this.querySelector("input[type='checkbox']");

    if (checkbox.checked) {
      circle.style.left = "18px";
      monthAmountElement.forEach((monAmount) => addClass(monAmount));
      yearAmountElement.forEach((yrAmount) => removeClass(yrAmount));
      monthWarrantyElement.forEach((warranty) => removeClass(warranty));
      monthText.forEach((month) => addClass(month));
      yearText.forEach((year) => removeClass(year));
      duration.forEach((duration) => duration.classList.toggle("active"));
      addPlanValueToStep4();
    } else {
      circle.style.left = "0px";

      monthAmountElement.forEach((monAmount) => removeClass(monAmount));
      yearAmountElement.forEach((yrAmount) => addClass(yrAmount));
      monthWarrantyElement.forEach((warranty) => addClass(warranty));
      monthText.forEach((month) => removeClass(month));
      yearText.forEach((year) => addClass(year));
      addPlanValueToStep4();
    }
  };
});

// STEP--3
let addons_selector;
let pText;
let storeAmount = [];

// IDENTIFY THE CHECKED CONTAINER
addOns__selector.forEach((selector, index) => {
  selector.addEventListener("click", () => {
    selector.classList.toggle("checkedPlan");
    checkbox[index].classList.toggle("checked");
  });
});

// STEP--3 VALIDATION
const step3Validation = (e) => {
  e.preventDefault();

  // CHANGE THE HTML AMOUNT TO A NUMBER
  const step2Amount = parseFloat(Plan2Amount.match(/(\d+)/)[0]);
  totalAmount.textContent = step2Amount;

  addOns__selector.forEach((selector) => {
    if (selector.classList.contains("checkedPlan")) {
      totalAmount.textContent = "";
      const addOn__type =
        selector.querySelector(".textContainer h3").textContent;
      const addOn__amount = selector.querySelector(".add-ons-amount");
      addOn__amount.querySelectorAll("p:not(.hidden)").forEach((p) => {
        pText = p.textContent;
      });
      const html = <div class="checkedItem"> <p class="benefit">${addOn__type}</p> <p class="amount">${pText}</p> </div>;
      step3summery.insertAdjacentHTML("afterbegin", html);

      // SUM UP THE TOTAL AMOUNT CHECKED
      storeAmount.push(parseFloat(pText.match(/(\d+)/)[0]));
      const added = storeAmount.reduce(function (acc, cur) {
        return acc + cur;
      }, 0);
      totalAmount.textContent = step2Amount + added;
    }
  });
  revealNextStep(curStep++);
};

// NAVIGATE BACK TO CHANGE PLANS
const changePlans = () => {
  document
    .querySelector(.number--${curStep})
    .classList.remove("activeStepNumber");
  document.querySelector(.step--${curStep}).style.display = "none";
  curStep = 2;
  document
    .querySelector(.number--${curStep})
    .classList.add("activeStepNumber");
  document.querySelector(.step--${curStep}).style.display = "block";
};

// NAVIGATE BACK TO THE PREVIOUS STEP
const navigateBack = function () {
  document
    .querySelector(.number--${curStep})
    .classList.remove("activeStepNumber");
  document.querySelector(.step--${curStep}).style.display = "none";

  curStep--;
  document.querySelector(.step--${curStep}).style.display = "block";
  document
    .querySelector(.number--${curStep})
    .classList.add("activeStepNumber");
};

// RESET
const reset = () => {
  step3summery.innerHTML = "";
  storeAmount = [];
};
// BUTTONS
select__plans.addEventListener("click", selectPlans);

// STEP--1 BUTTON
step1__btn.addEventListener("click", step1Validation);

// STEP--2 BUTTON
step2__btn.addEventListener("click", step2Validation);
step2PrevBTN.addEventListener("click", navigateBack);

// STEP--3 BUTTON
step3__btn.addEventListener("click", step3Validation);
step3PrevBTN.addEventListener("click", navigateBack);

// STEP--4 BUTTON
step4__btn.addEventListener("click", () => {
  document.querySelector(.step--${curStep}).style.display = "none";
  formCompletionMessage.classList.remove("hidden");
  document
    .querySelector(.number--${curStep})
    .classList.remove("activeStepNumber");
});
step4PrevBTN.addEventListener("click", () => {
  reset();
  navigateBack();
});

// CHANGE PLAN BUTTON
changePlansButton.addEventListener("click", () => {
  reset();
  changePlans();
});
