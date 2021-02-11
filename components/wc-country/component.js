// const template = document.createElement('template');

// template.innerHTML = `

// `;

class wccountry extends HTMLElement {
    constructor() {
        super();
    }

    _value;

    set value(val) {
        this._value = val;
    }

    get value() {
        return this._value;
    }

    format(value) {
        return (value || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    connectedCallback() {
        let shadowRoot = this.attachShadow({ mode: 'open' });

        //let data = JSON.parse(this.getAttribute('data'));
        /* let data = {
            name: this.getAttribute('name'),
            flag: this.getAttribute('flag'),
            capital: this.getAttribute('capital'),
            region: this.getAttribute('region'),
            population: this.getAttribute('population').replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        } */

        let data = this.value;
        data.area = this.format(data.area);
        data.population = this.format(data.population);

        shadowRoot.innerHTML = `
        <link rel="stylesheet" href="components/wc-country/style.css">
        <style>
            img { outline: none; }
        </style>
        <div class="card">
            <div class="flag">
                <img src="${data.flag}" />
            </div>            
            <div class="info">
                <h3 class="name">${data.nativeName}</h3>
                <h4 class="capital">Capital: ${data.capital}</h4>
                <div class="region">Área: ${data.area} km<sup>2</sup></div>
                <h5 class="population">Población: ${data.population} habitantes</h5>
            </div>
        </div>
        `;

        shadowRoot.querySelector('.name').addEventListener('click', function () {
            let modal = document.querySelector('.popup-container');
            modal.querySelector('h4').innerHTML = data.nativeName;
            modal.querySelector('.region').innerHTML = data.region;
            modal.style.display = 'block';
            modal.querySelector('.close').addEventListener('click', function () {
                modal.querySelector('.popup').classList.add('zoomOut');
                setTimeout(() => {
                    modal.querySelector('.popup').classList.remove('zoomOut');
                    modal.style.display = 'none';
                }, 400);
            });
        });
    }
}

window.customElements.define('wc-country', wccountry);