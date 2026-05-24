// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get a parameter value from the URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// generic function for rendering a list using a template
// takes a template function, where to put it, the data to render, and a couple options
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  // sometimes we want to wipe out whatever was there first
  if (clear) {
    parentElement.innerHTML = "";
  }
  // run each item through the template function to get an array of html strings
  const htmlStrings = list.map(templateFn);
  // then dump them all into the parent element at the position we want
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}