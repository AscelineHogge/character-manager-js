async function lesHeros() {
    try{
        const api = await fetch('https://character-database.becode.xyz/characters');
        const data = await api.json();
        console.log(data);

        const temp = document.querySelector("#template");
        const target = document.querySelector("#target");


        data.forEach(({name, shortDescription, image}) => {
            const copy = temp.cloneNode(true).content;

            copy.querySelector("#name").innerHTML = name;
            copy.querySelector("#signaletics").innerHTML = shortDescription;
            copy.querySelector("#image").src = image;

            target.appendChild(copy);
        });

    } catch(error) {
        console.error(error);
    }
}

lesHeros();