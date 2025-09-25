const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("searchinput");
const resultArea = document.getElementById("resultarea");
const closeResultBtn = document.getElementById("closeresult");

function hideElm() {
  resultArea.style.display = "none";
  closeResultBtn.style.display = "none";
  searchInput.value = "";
}

function showElm() {
  resultArea.style.display = "flex";
  closeResultBtn.style.display = "block";
}

let emptyResult = `<h3 class="noresult">No result</h3>`;

searchForm.addEventListener("submit", (e) => {
  let data = [];
  let searchItem = "";

  resultArea.innerHTML = "";
  e.preventDefault();
  let userValue = searchInput.value.trim().toLowerCase();

  if (!userValue || userValue === "") {
    showElm();
    resultArea.innerHTML = emptyResult;
  } else {
    fetch("travel_recommendation_api.json")
      .then((res) => res.json())
      .then((d) => {
        for (const key in d) {
          const arr = d[key];
          arr.forEach((entry) => {
            if (entry?.cities?.length > 0) {
              entry.cities.forEach((entry) => {
                if (
                  entry.name.toLowerCase().includes(userValue) ||
                  entry.description.toLowerCase().includes(userValue)
                ) {
                  data.push(entry);
                }
              });
            } else if (entry.name !== "" && entry.description !== "") {
              if (
                entry.name.toLowerCase().includes(userValue) ||
                entry.description.toLowerCase().includes(userValue)
              ) {
                data.push(entry);
              }
            }
          });
        }

        // show items
        console.log(data);

        if (data.length > 0) {
          showElm();
          data.slice(0, 4).forEach((entry) => {
            searchItem += `<div class="searchitem">
              <div><img src="images/about.png" alt="" /></div>
              <div>
                <h3>${entry.name}</h3>
                <p>
                 ${entry.description}
                </p>
              </div>
            </div>`;
          });
          resultArea.innerHTML = searchItem;
        } else {
          showElm();
          resultArea.innerHTML = emptyResult;
        }
      });
  }
});

closeResultBtn.addEventListener("click", () => {
  hideElm();
});
