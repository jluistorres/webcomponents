let pagination = {
    page: 1,
    size: 12,
    total: 0
};

let search;
let data = [];

async function getCounties() {
    let res = await fetch('https://restcountries.eu/rest/v2/lang/es');
    return res.json();
}

async function get() {
    if (!data.length) {
        data = await getCounties();
    }

    search = (search || '').toLowerCase();
    let countries = data.filter(function (x) { return x.nativeName.toLowerCase().startsWith(search) });

    pagination.total = Math.ceil(countries.length / pagination.size);

    let pageData = countries.slice((pagination.page - 1) * pagination.size, pagination.page * pagination.size);

    document.querySelector('.pagination .info').innerHTML = 'Página ' + pagination.page + ' de ' + pagination.total;

    let elem = document.querySelector('.countries');
    elem.innerHTML = "";

    if (pageData.length) {
        pageData.forEach(function (val) {
            let item = document.createElement('wc-country');
            item.value = val;

            elem.appendChild(item);
        });
    } else {
        elem.innerHTML = "No hay resultados de la búsqueda";
    }

}

function previous() {
    if (pagination.page > 1) {
        pagination.page--;
        get();
    }
}

function next() {
    if (pagination.page < pagination.total) {
        pagination.page++;
        get();
    }
}

window.onload = function () {
    get();

    document.querySelector('.search').addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            search = e.target.value;
            pagination.page = 1;
            get();
        }
    });

    document.querySelector('.previous').addEventListener('click', previous);
    document.querySelector('.next').addEventListener('click', next);
};