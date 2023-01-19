// http://api.tvmaze.com/singlesearch/shows?q=girls


const form = document.querySelector("#searchForm");


form.addEventListener('submit', async function (e) {
  
    e.preventDefault();
    let audio = await new Audio('pornhub-community-intro.mp3');
    audio.play();
    document.querySelector(".container").innerHTML = "";
    greet = document.querySelector('.greet');
    greet.innerText = "";
    const searchTerm = form.elements.query.value;
    const config = { params: {q: searchTerm}}
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    console.log(res.data);
    makeImages(res.data);
    console.log(res.data.length);
    form.elements.query.value = ''; 
})



const makeImages = (shows) => {
    let cont = 0;
    let a = 0;
    if (shows.length!=0) {
        greet.innerText = "Ca ci su i to risultati:";
    }
    
    for (let result of shows) {

        if (result.show.image) {
            if(cont > 4){
                a++;
                cont=0;
                const elRow = document.createElement('div'); 
                elRow.classList.add("row"); 
                document.querySelector(".container").append(elRow);
            }
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            const elRow = document.createElement('div'); 
            elRow.classList.add("row");  
            document.querySelector(".container").append(elRow);
            const singolaColonna = document.createElement('div');  
            singolaColonna.classList.add("col");   
            const nomeSerie = document.createElement("p");
            nomeSerie.classList.add("nome")
            nomeSerie.innerText = result.show.name.toUpperCase();
           
            // const content = document.createElement('div');          
            // content.classList.add("contenuto");               
            const row = document.querySelectorAll(".row")[a];
            row.append(singolaColonna);   
            // singolaColonna.append(content);
            singolaColonna.append(img);
            singolaColonna.append(nomeSerie);
            if(result.show.premiered){
                const annoSerie = document.createElement("p");
                annoSerie.innerText = `ANNO: ${result.show.premiered.substring(0,4)}`;
                annoSerie.classList.add("year"); 
                singolaColonna.append(annoSerie);
                }
                if(result.show.premiered==null){
                const annoSerie = document.createElement("p");  
                annoSerie.innerText = "ANNO: N/D"
                annoSerie.classList.add("year"); 
                singolaColonna.append(annoSerie);
                } 
            if(result.score){
                const score = document.createElement("p");
                score.innerText=`SCORE: ${Math.trunc(result.score)}`;
                singolaColonna.append(score);
            }
            cont++;
        }
    }
}

