import refs from "./refs";

const ApiKey = "18623551-685e1819373a3e2d77873e072";
const baseUrl = `https://pixabay.com/api/`;
// let query = "js";
// let page = 1;
// let perPage = 12;

export default {
  _query: "",
  page: 1,
  perPage: 12,
  fetchImages() {
    let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=${this.perPage}&key=${ApiKey}`;
    return fetch(url)
      .then((res) => res.json())
      .catch((error) => displayError(error));
    //   .then(({ hits }) => hits);
  },
  setPage() {
    return this.page++;
  },
  get query() {
    return this._query;
  },
  set query(newQuery) {
    this._query = newQuery;
  },
};

function displayError(error) {
  const errorH2 = document.createElement("h2");
  errorH2.textContent = error;
  refs.body.prepend(errorH2);
}
