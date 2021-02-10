//let model = {};

async function getCounties() {
    let res = await fetch('https://restcountries.eu/rest/v2/lang/es');
    return res.json();
}

function get(search) {
    getCounties().then(res => {
        // console.log(res);

        let elem = document.querySelector('.countries');
        elem.innerHTML = "";

        search = (search || '').toLowerCase();
        let countries = res
            .filter(function (x) { return x.nativeName.toLowerCase().indexOf(search) != -1 })
            .slice(0, 12);

        if (countries.length) {
            countries.forEach(function (data) {
                let item = document.createElement('wc-country');
                item.value = data;
                
                //p.setAttribute('data', JSON.stringify(country));
                
                // item.setAttribute('name', data.nativeName);
                // item.setAttribute('flag', data.flag);
                // item.setAttribute('capital', data.capital);
                // item.setAttribute('region', data.region);
                // item.setAttribute('population', data.population);

                elem.appendChild(item);
            });
        } else {
            elem.innerHTML = "No hay resultados de la búsqueda";
        }
    });
}

window.onload = function () {
    get();

    document.querySelector('.search').addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            get(e.target.value);
        }
    });
};