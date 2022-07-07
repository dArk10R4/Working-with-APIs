let back = document.getElementById("back");
let myurl = new URL(location.href);
detailDiv = document.getElementById("detailDiv");
back.addEventListener("click", function () {
  history.back();
});
request();
async function request() {
  const data = await fetch(
    `https://restcountries.com/v2/name/${myurl.searchParams.get("country")}`
  )
    .then((res) => res.json())
    .then();
  makeDetail(data);
}

function makeDetail(e) {
  let langs = "";
  for (el of e[0].languages) {
    langs += el.name + ", ";
  }
  let curren = "";
  for (el of e[0].currencies) {
    curren += el.name + ", ";
  }
  let border = "";
  if (e[0].borders != undefined) {
    for (el of e[0].borders) {
      border += `<span>${el}</span>`;
    }
  }
  let dethtml = `
        <img src="${e[0].flags.png}" alt="sekil" class="detail__img">
        <div class="detail__div__div">
            <h1 class="olkeAdi">${e[0].name}</h1>
            <div class="detail__div__div__div">
                <div style="margin-right: 100px ;">
                    <p class="infolar"><span>Native Name:</span> ${
                      e[0].nativeName
                    }</p>
                    <p class="infolar"> <span>Population:</span> ${
                      e[0].population
                    }</p>
                    <p class="infolar"> <span>Region:</span> ${e[0].region}</p>
                    <p class="infolar"><span>Sub Region:</span> ${
                      e[0].subregion
                    }</p>
                    <p class="infolar"><span>Capital:</span> ${e[0].capital}</p>
                </div>
                <div>
                    <p class="infolar"><span>Top Level Domain:</span> ${e[0].topLevelDomain.join(
                      ","
                    )}  </p>
                    <p class="infolar"> <span>Currencies:</span> ${curren.slice(
                      0,
                      -2
                    )} </p>
                    <p class="infolar"><span>Languages:</span>${langs.slice(
                      0,
                      -2
                    )}</p>
                </div>
            </div>
            <div class="borders"> <b> Border Countries:</b> ${border}</div>
        </div>
   `;
  detailDiv.innerHTML = dethtml;
}
