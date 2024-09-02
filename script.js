let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(ob) {
    spinner.classList.add("d-none");
    let resultContainer = document.createElement("div");
    let resultTitle = document.createElement("a");
    let resultLink = document.createElement("a");
    let resultDescription = document.createElement("p");

    resultTitle.href = ob.link;
    resultTitle.target = "_blank";
    resultTitle.classList.add("result-title", "d-block");
    resultTitle.textContent = ob.title;

    resultLink.href = ob.link;
    resultLink.target = "_blank";
    resultLink.textContent = ob.link;
    resultLink.classList.add("result-url");

    resultDescription.textContent = ob.description;
    resultDescription.classList.add("link-description");

    resultContainer.classList.add("mb-4");
    resultContainer.appendChild(resultTitle);
    resultContainer.appendChild(resultLink);
    resultContainer.appendChild(resultDescription);
    searchResults.appendChild(resultContainer);
}

function fetchResult(event) {
    if (event.key === "Enter") {
        searchResults.innerHTML = "";
        spinner.classList.remove("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search=";
        fetch(url + searchInput.value)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let search_res = data.search_results;
                for (let ob of search_res) {
                    createAndAppend(ob);
                }
            });
    }
}

searchInput.addEventListener("keydown", fetchResult);