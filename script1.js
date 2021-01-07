

const auta = [
    { vyrobce: 'Renault', model: 'Megane', rokVyroby: 2006, palivo: 'benzín', barva: 'červená', najetoKm: 58795 },
    { vyrobce: 'Škoda', model: 'Octavia', rokVyroby: 2012, palivo: 'nafta', barva: 'zelená', najetoKm: 159734 },
    { vyrobce: 'Ford', model: 'Mondeo', rokVyroby: 2019, palivo: 'benzín', barva: 'černá', najetoKm: 94322 },
    { vyrobce: 'Renault', model: 'Clio', rokVyroby: 2018, palivo: 'nafta', barva: 'bílá', najetoKm: 12985 },
    { vyrobce: 'Škoda', model: 'Fabia', rokVyroby: 2014, palivo: 'benzín', barva: 'černá', najetoKm: 1385 },
    { vyrobce: 'Škoda', model: 'Favorit', rokVyroby: 1987, palivo: 'nafta', barva: 'modrá', najetoKm: 57985 },
    { vyrobce: 'Honda', model: 'Civic', rokVyroby: 2001, palivo: 'lpg', barva: 'bílá', najetoKm: 239785 },
    { vyrobce: 'Tesla', model: 'Model S', rokVyroby: 2018, palivo: 'elektřina', barva: 'červená', najetoKm: 29785 },
    { vyrobce: 'Volkswagen', model: 'Beetle', rokVyroby: 1964, palivo: 'nafta', barva: 'modrá', najetoKm: 167520 },
    { vyrobce: 'Škoda', model: 'Octavia', rokVyroby: 2009, palivo: 'nafta', barva: 'bílá', najetoKm: 75986 },
    { vyrobce: 'Škoda', model: 'Fabia', rokVyroby: 2011, palivo: 'benzín', barva: 'stříbrná', najetoKm: 4289 },
    { vyrobce: 'Volkswagen', model: 'Passat', rokVyroby: 2019, palivo: 'benzín', barva: 'zelená', najetoKm: 34976 },
    { vyrobce: 'Škoda', model: 'Superb', rokVyroby: 2014, palivo: 'nafta', barva: 'bílá', najetoKm: 134687 },
    { vyrobce: 'Audi', model: 'R8', rokVyroby: 2019, palivo: 'lpg', barva: 'černá', najetoKm: 67545 },
];

let autaCopy;


function initialize() {
    createCarListDOM(auta);
    createDataCopy();
}

function createDataCopy() {
    let dataCopy = [];
    for (let item of auta) {
        dataCopy.push(item);
    }
    autaCopy = dataCopy;
}

function createCarListDOM(carList) {
    const divSeznam = document.querySelector('#seznam');
    cleanSeznam();

    for (let index = 0; index < carList.length; index++) {
        const newItem = document.createElement('div');
        divSeznam.appendChild(newItem);
        newItem.classList.add('auto');
        newItem.innerHTML = createCarItem(index, carList);
    }
}

function cleanSeznam() {
    const divSeznam = document.querySelectorAll('.auto');

    for (let item of divSeznam) {
        item.remove();
    }
}

function createCarItem(index, carList) {
    return getMake(index, carList) + getModel(index, carList) + getYear(index, carList) + getColor(index, carList) + getMileage(index, carList);
}

function getMake(index, carList) {
    return `<div class="vyrobce">${carList[index].vyrobce}</div>`;
}

function getModel(index, carList) {
    return `<div class="model">${carList[index].model}</div>`;
}

function getYear(index, carList) {
    return `<div class="rok">${carList[index].rokVyroby}</div>`;
}

function getFuel() {

}

function getColor(index, carList) {
    return `<div class="barva">${carList[index].barva}</div>`;
}

function getMileage(index, carList) {
    return `<div class="najeto">${carList[index].najetoKm}</div>`;
}

function filter(event) {
    const elementMakeValue = document.querySelector('#make').value;
    const elementModelValue = document.querySelector('#model').value;
    let carList;

    clearHeader();
    if (elementModelValue === '' && elementMakeValue === '') {
        createDataCopy();
        carList = autaCopy;
    }
    if (elementModelValue === '' && elementMakeValue !== '') carList = filterByMake(autaCopy);
    if (elementModelValue !== '' && elementMakeValue === '') carList = filterByModel(autaCopy);
    if (elementModelValue !== '' && elementMakeValue !== '') {
        if (event !== null) {
            const eventTarget = event.target.id;
            if (eventTarget === 'make') {
                carList = filterByModel(autaCopy);
                carList = filterByMake(carList);
            }
            if (eventTarget === 'model') {
                carList = filterByMake(autaCopy);
                carList = filterByModel(carList);
            }
        }
        if (event === null) {
            carList = filterByMake(autaCopy);
            carList = filterByModel(carList);
        }
    }
    createCarListDOM(carList);
    return carList;
}

function filterByMake(carList) {
    const searchedMake = document.querySelector('#make').value.trim().toLowerCase();
    let selected = [];

    for (let item of carList) {
        if (item.vyrobce.toLowerCase().startsWith(searchedMake)) {
            selected.push(item);
        }
    }
    return selected;
}

function filterByModel(carList) {
    const searchedModel = document.querySelector('#model').value.trim().toLowerCase();
    let selected = [];

    if (document.querySelector('#make').value !== '') {
        carList = filterByMake(auta);
    }

    for (let item of carList) {
        if (item.model.toLowerCase().startsWith(searchedModel)) {
            selected.push(item);
        }
    }
    return selected;
}

function arrange(event) {
    const eventTarget = event.target.id;

    switch (eventTarget) {
        case 'header-make': arrangeByMake();
            break;
        case 'header-model': arrangeByModel();
            break;
        case 'header-year': arrangeByYear();
            break;
        case 'header-color': arrangeByColor();
            break;
        case 'header-mileage': arrangeByMileage();
            break;
    }
    highlightHeader(eventTarget);
}

function arrangeByMake() {
    let newOrder = filter(null).sort((a, b) => {
        return a.vyrobce.localeCompare(b.vyrobce);
    });

    createCarListDOM(newOrder);
}

function arrangeByModel() {
    let newOrder = filter(null).sort((a, b) => {
        return a.model.localeCompare(b.model);
    });

    createCarListDOM(newOrder);
}

function arrangeByYear() {
    let newOrder = filter(null).sort((a, b) => a.rokVyroby - b.rokVyroby);
    createCarListDOM(newOrder);
}

function arrangeByColor() {
    let newOrder = filter(null).sort((a, b) => {
        return a.barva.localeCompare(b.barva);
    });

    createCarListDOM(newOrder);
}

function arrangeByMileage() {
    let newOrder = filter(null).sort((a, b) => a.najetoKm - b.najetoKm);
    createCarListDOM(newOrder);
}

function  highlightHeader(eventTargetId) {
    const header = document.querySelector('.header').children;
    for (let i = 0; i < header.length; i++) {
        header[i].style.backgroundColor = 'lightgray';
        if (header[i].id === eventTargetId) {
            header[i].style.backgroundColor = 'white';
        }
    }
}

function clearHeader() {
    const header = document.querySelector('.header').children;
    for (let i = 0; i < header.length; i++) {
        header[i].style.backgroundColor = 'lightgray';
    }
}


initialize();
document.querySelector('.search').addEventListener('input', (event) => filter(event));
document.querySelector('.header').addEventListener('click', (event) => arrange(event));


