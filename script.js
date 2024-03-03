const formEl = document.querySelector("#subscribe-form");
const emailEl = formEl.querySelector("#email");

console.log("formEl:", formEl);
console.log("emailEl:", emailEl);

const isRequired = (value) => (value === "" ? false : true);

const isEmailValid = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const showError = (element, message) => {
  const parentEl = element.parentElement;
  const errorEl = parentEl.querySelector("small");

  parentEl.classList.add("error");
  errorEl.innerText = message;
};

const hideError = (element) => {
  const parentEl = element.parentElement;
  const errorEl = parentEl.querySelector("small");

  parentEl.classList.remove("error");
  errorEl.innerText = "";
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();

  if (!isRequired(email)) {
    showError(emailEl, "Email is required");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Please enter a valid email");
  } else {
    hideError(emailEl);
    valid = true;
  }

  return valid;
};

const debounce = (fn, delay = 500) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  let isEmailValid = checkEmail();

  if (isEmailValid) {
    alert("Form submitted successfully!");
    formEl.reset();
  }
});

emailEl.addEventListener("input", debounce(checkEmail, 500));
