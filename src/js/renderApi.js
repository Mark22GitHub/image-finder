import refs from "./refs.js";
import apiService from "./apiService.js";
import template from "../template/template.hbs";
import debounce from "lodash.debounce";
import * as basicLightbox from "basiclightbox";
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css";

refs.galleryList.addEventListener("click", (event) => {
  const imgModal = document.querySelector(".imgModal");

  if (event.target.nodeName === "IMG") {
    let modalSrc = event.target.dataset.src;

    const instance = basicLightbox.create(`
    <div class="modal">
    <button class="js-modal-btn">X</button>
      <img class='imgModal' src="${modalSrc}" alt="image">
    </div>
`);

    instance.show();
  }

  console.dir(event.target);
});

refs.form.addEventListener(
  "input",
  debounce((event) => {
    event.preventDefault();
    refs.galleryList.innerHTML = "";
    apiService.query = event.target.value;
    renderApi();
    refs.input.value = "";
  }, 700)
);

function renderApi() {
  apiService.fetchImages().then((data) => renderImages(data));
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

const loadMoreBtn = document.createElement("button");

loadMoreBtn.addEventListener("click", loadMore);

function loadMore() {
  apiService.setPage();
  apiService.fetchImages().then((data) => renderImages(data));

  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.offsetHeight - 800,
      behavior: "smooth",
    });
  }, 700);
}
