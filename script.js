function mostrarResults(results) {
    const contenedor = document.querySelector(".results");
    // es el contenedor vacío que voy a llenar con el resultado de usar el template
    const templ = document.querySelector("#result-item-template");
    // selecciono el item template y todo lo que contiene (que sería un modelo de cómo quedaría 1 resultado final)
    for (const i of results) {
        //hago un forof para que repita el proceso por cada resultado
        const titleEl = templ.content.querySelector(".result-item-title");
        titleEl.textContent = i.title;
        //defino el item a editar del template (titleEl) y le sobreescribo el textContent con la parte del json que es
        //el título, lo que quiero que vaya ahí (en este caso "i" representa un resultado de la api que tiene la propiedad title)
        //
        //LUEGO repito el proceso para rellenar todos los textos
        const conditionEl = templ.content.querySelector(
            ".result-item-condition"
        );
        conditionEl.textContent = i.condition;

        const priceEl = templ.content.querySelector(".result-item-price");
        console.log(priceEl);
        priceEl.textContent = "$ " + i.price;

        const sellCountEl = templ.content.querySelector(
            ".result-item-sell-count-num"
        );
        sellCountEl.textContent = i.sold_quantity;

        const imgEl = templ.content.querySelector(".result-item-img");
        imgEl.src = i.thumbnail;
        //en el caso de la imagen, la propiedad a modificar es "src" (porque no es un texto obviamente)

        const clone = document.importNode(templ.content, true);
        //Y AL FINAL, duplica el "result" del template,
        contenedor.append(clone);
        //y lo appendea al HTML real
    }
}

function main() {
    const formEl = document.querySelector(".search-form");
    //en main traigo el campo de búsqueda (que es un mini-form)
    formEl.addEventListener("submit", function (e) {
        e.preventDefault();
        //le agrego un listener y prevengo el comportamiento por defecto
        const palabraABuscar = e.target.buscar.value;
        //guardo la búsqueda del usuario en una variable
        fetch(
            "https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar
        )
            //hago un fetch de la api de mercadolibre construyendo la URL con el input del usuario
            .then((response) => response.json())
            // la línea 51 (esto que está arriba) es lo mismo que si pusiera
            // .then( (response) => {return response.json();} )
            .then((data) => console.log(data.results));
        //estos 2 then hay que hacerlos porque así funciona el fetch, recibe la respuesta de la API
        //la transforma en json. Ya transformada es la Data y finalmente invoco la función que creé
        //más arriba para que procese los "results" que es la información lista para usar
    });
    // mostrarResults([1, 2, 3, 4, 5, 6]);
}

main();
