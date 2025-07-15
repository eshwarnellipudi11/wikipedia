let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { title, link, description } = result;

  // Div Container -- result-item
  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");
  searchResultsEl.appendChild(resultItemEl);

  // Anchor Title -- result-item
  let resultTitleEl = document.createElement("a");
  resultTitleEl.classList.add("result-title");
  resultTitleEl.textContent = title;
  resultTitleEl.href = link;
  resultTitleEl.target = "_blank";
  resultItemEl.appendChild(resultTitleEl);

  // Title Break
  let titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  // Anchor URL -- result-url
  let urlElement = document.createElement("a");
  urlElement.classList.add("result-url");
  urlElement.href = link;
  urlElement.target = "_blank";
  urlElement.textContent = link;
  resultItemEl.appendChild(urlElement);

  // Line Break
  let lineBreakEl = document.createElement("br");
  resultItemEl.appendChild(lineBreakEl);

  // Paragraph Description -- Line Description
  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("line-description");
  description.textContent = description;
  resultItemEl.appendChild(descriptionEl);
}

function displayresults(searchResults) {
  spinnerEl.classList.toggle("d-none");
  for (let result of searchResults) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    searchResultsEl.textContent = "";
    spinnerEl.classList.toggle("d-none");
    let searchInput = searchInputEl.value;
    console.log(searchInput);

    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
    //reuest configuration
    let options = {
      method: "GET",
    };
    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        //object desturcting
        let { search_results } = jsonData;
        displayresults(search_results);
      });
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
