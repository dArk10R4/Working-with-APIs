let array = [];
let lang;
let url = new URL(location.href);
console.log(url.href + "/?region=all");
let countries = document.getElementById("countries");
let myurl;
let region;
let choose = document.getElementById("choose");
let search = document.getElementById("search");
let detail = document.getElementById("detail");
let main = document.getElementById("main");

if (url.searchParams.has("region")) {
  choose.value = url.searchParams.get("region");
  region = choose.value;
}
if (choose.value != "all") {
  myurl = `https://restcountries.com/v3.1/region/${region}`;
} else {
  myurl = "https://restcountries.com/v2/all";
}
choose.addEventListener("change", function () {
  region = choose.value;

  history.replaceState({ region: region }, null, `?region=${region}`);
  if (choose.value != "all") {
    myurl = `https://restcountries.com/v3.1/region/${region}`;
  } else {
    myurl = "https://restcountries.com/v2/all";
  }
  generateCountries(array);
});
generateCountries();
function generateHtml(arra) {
  let check = typeof arra[0].name == "object";
  let html = ``;
  for (elem of arra) {
    html += `<div class="cart" data-name="${
      !check ? elem.name : elem.name.official
    }">
    <a href=DETAIL.HTML?country=${
      !check ? elem.name.toLowerCase() : elem.name.official.toLowerCase()
    } style="pointer-events: none;" target="_self" ></a>
    <img src="${elem.flags.png}" alt="flag">
      <div class="info">
          <h3 class="info__name infoItem">${
            !check ? elem.name : elem.name.official
          }</h3>
          <h4 class="info__country infoItem"><strong>Population:</strong> ${
            elem.population
          } </h4>
          <h4 class="info__country infoItem"><strong>Region:</strong> ${
            elem.region
          }</h4>
          <h4 class="info__country infoItem"><strong>Capital:</strong>${
            elem.capital
          } </h4>
      </div>
  </div>`;
  }
  countries.innerHTML = html;
}
async function generateCountries() {
  choose.disabled = true;
  const data = await fetch(`${myurl}`)
    .then((res) => res.json())
    .then();
  array = data;
  console.log(data);
  searchsmth();
  choose.disabled = false;
}
search.addEventListener("keyup", searchsmth);
function searchsmth() {
  let newarr = [];
  if (search.value != "") {
    try {
      if (typeof array[0].name == "object") {
        newarr = array.filter(function (x) {
          let name = x.name.official;
          return name.toLowerCase().includes(search.value.toLowerCase());
        });
      } else {
        newarr = array.filter(function (x) {
          return x.name.toLowerCase().includes(search.value.toLowerCase());
        });
      }
      generateHtml(newarr);
    } catch (error) {
      countries.innerHTML = "";
    }
  } else {
    generateHtml(array);
  }
}
countries.addEventListener("click", function (event) {
  let tg;
  classlar = event.target.classList;
  if (classlar.contains("infoItem")) {
    tg = event.target.parentElement.parentElement;
  } else if (classlar.contains("info") || event.target.tagName == "IMG") {
    tg = event.target.parentElement;
  } else if (classlar.contains("cart")) {
    tg = event.target;
  }
  if (tg != undefined) {
    tg.firstElementChild.click();
  }
});

// fetch("https://restcountries.com/v2/name/per")
//   .then((res) => res.json())
//   .then((data) => console.log(data));
