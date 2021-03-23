const url = 'https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:'

const searchInput = getElement('.search-input'),
    searchButton = getElement('.search-button'),
    container = getElement('.datamed'),
    erroMessage = getElement('.error');

    let element = document.getElementById('info')

var medic,
    datamed,
    card;

function getElement(element) {
    return document.querySelector(element);
}

function requestMedInfo(url, name) {
    fetch(url + name)
        .then(response => response.json())
        .then(data => {
            datamed = data;
        })
        .catch(err => console.log(err));
}

function createCard() {
    element.innerHTML = `
            <h1 class="name"> Brand Name: ${datamed.results[0].products[0].brand_name}</h1>
            <h2 class="marketing"> Marketing Status: ${datamed.results[0].products[0].marketing_status}</h2>
            <h3 class="rest">Strength of Medication: ${datamed.results[0].products[0].active_ingredients[0].strength}</h3>
            <h3 class="rest">Route of Medication: ${datamed.results[0].products[0].route}</h3>
            <h3 class="rest"> Dosage Form: ${datamed.results[0].products[0].dosage_form}</h3>`;
    return card;
}

function startApp(medic) {
    requestMedInfo(url, medic);

    setTimeout(function () {
        container.innerHTML = createCard();
    }, 2000);
}

searchButton.addEventListener('click', event => {
    event.preventDefault();
    medic = searchInput.value.toLowerCase();
    startApp(medic);
});
