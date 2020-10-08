import refs from "./refs.js";
import apiService from "./apiService.js";
import template from "../template/template.hbs";
import debounce from "lodash.debounce";

const loadMoreBtn = document.createElement("button");

refs.form.addEventListener(
  "input",
  debounce((event) => {
    event.preventDefault();
    // console.log(event.target.value);
    apiService.query = event.target.value;
    renderApi();
    refs.form.value = "";
  }, 500)
);

loadMoreBtn.addEventListener("click", loadMore);

function renderApi() {
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
}

function renderImages(data) {
  loadMoreBtn.textContent = "Load more...";
  loadMoreBtn.classList.add("loadMore-button");

  const items = template(data);
  refs.galleryList.insertAdjacentHTML("beforeend", items);

  if (refs.galleryList.children) {
    refs.body.insertAdjacentElement("beforeend", loadMoreBtn);
    loadMoreBtn.classList.remove("hidden");
  } else {
    loadMoreBtn.classList.add("hidden");
  }
}

function loadMore() {
  apiService.setPage();
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
}
