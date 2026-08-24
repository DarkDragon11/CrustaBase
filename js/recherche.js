/* ============================
   CrustaBase - Recherche
============================ */

const especes = [

    {
        nom: "Pagure de roche",
        scientifique: "Clibanarius erythropus",
        famille: "Diogenidae",
        habitat: "Estran rocheux",
        page: "pagure-roche.html"
    },

    {
        nom: "Crabe Dormeur (Tourteau)",
        scientifique: "Cancer pagurus",
        famille: "Cancridae",
        habitat: "Fonds rocheux",
        page: "tourteau.html"
    },

    {
        nom: "Écrevisse de Louisiane",
        scientifique: "Procambarus clarkii",
        famille: "Cambaridae",
        habitat: "Eaux douces",
        page: "ecrevisse-louisiane.html"
    },

    {
        nom: "Homard européen",
        scientifique: "Homarus gammarus",
        famille: "Nephropidae",
        habitat: "Fonds rocheux",
        page: "homard-europeen.html"
    },
{
    nom: "Paramole de Cuvier",
    scientifique: "Paromola cuvieri",
    famille: "Homolidae",
    habitat: "Grands fonds marins",
    page: "paramole-de-cuvier.html"
},

{
    nom: "Petite crevette rose",
    scientifique: "Palaemon elegans",
    famille: "Palaemonidae",
    habitat: "Mares rocheuses",
    page: "petite-crevette-rose.html"
},
{
    nom: "Araignée de mer Atlantique",
    scientifique: "Maja brachydactyla",
    famille: "Majidae",
    habitat: "Fonds rocheux et sableux",
    page: "araignee-de-mer.html"
},

{
    nom: "Langoustine commune",
    scientifique: "Nephrops norvegicus",
    famille: "Nephropidae",
    habitat: "Fonds vaseux",
    page: "langoustine.html"
},
{
        nom: "Porcellane grise",
        scientifique: "Porcellana platycheles",
        famille: "Porcellanidae",
        habitat: "Estran rocheux",
        page: "porcellane-grise.html"
    },

    {
        nom: "Crabe de pierre",
        scientifique: "Xantho hydrophilus",
        famille: "Xanthidae",
        habitat: "Estran rocheux",
        page: "crabe-de-pierre.html"
    },

    {
        nom: "Langouste rose",
        scientifique: "Palinurus mauritanicus",
        famille: "Palinuridae",
        habitat: "Fonds rocheux",
        page: "langouste-rose.html"
    },

    {
        nom: "Langouste rouge",
        scientifique: "Palinurus elephas",
        famille: "Palinuridae",
        habitat: "Fonds rocheux",
        page: "langouste-rouge.html"
    },

{
    nom: "Petite cigale de mer",
    scientifique: "Scyllarus arctus",
    famille: "Scyllaridae",
    habitat: "Fonds rocheux",
    page: "petite-cigale-de-mer.html"
},

{
    nom: "Crabe vert",
    scientifique: "Carcinus maenas",
    famille: "Carcinidae",
    habitat: "Estran rocheux, sableux et vaseux",
    page: "crabe-vert.html"
},

{
    nom: "Bouquet commun",
    scientifique: "Palaemon serratus",
    famille: "Palaemonidae",
    habitat: "Mares rocheuses",
    page: "bouquet-commun.html"
},{
    nom: "Macropode rostré",
    scientifique: "Macropodia rostrata",
    famille: "Inachidae",
    habitat: "Fonds rocheux et herbiers",
    page: "macropode-rostre.html"
},
{
    nom: "Pagure commun",
    scientifique: "Pagurus bernhardus",
    famille: "Paguridae",
    habitat: "Fonds rocheux, sableux et vaseux",
    page: "pagure-commun.html"
},
];

/* ============================
   Tri alphabétique
============================ */

especes.sort((a, b) => a.nom.localeCompare(b.nom, "fr"));

/* ============================
   Remplissage automatique
============================ */

const tbody = document.getElementById("listeEspeces");

if (tbody) {

    especes.forEach(espece => {

        tbody.innerHTML += `
            <tr>
                <td><a href="${espece.page}">${espece.nom}</a></td>
                <td><i>${espece.scientifique}</i></td>
                <td>${espece.famille}</td>
                <td>${espece.habitat}</td>
            </tr>
        `;

    });

}

/* ============================
   Recherche
============================ */

const recherche = document.getElementById("nomRecherche");
const suggestions = document.getElementById("suggestions");

let indexSelection = -1;
let resultats = [];

function normaliser(texte){

    return texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"");

}

if(recherche){

recherche.addEventListener("input", afficherSuggestions);

recherche.addEventListener("keydown", function(e){

    const elements = document.querySelectorAll(".suggestion");

    if(e.key==="ArrowDown"){

        e.preventDefault();

        if(indexSelection < elements.length-1)
            indexSelection++;

        mettreSelection(elements);

    }

    else if(e.key==="ArrowUp"){

        e.preventDefault();

        if(indexSelection>0)
            indexSelection--;

        mettreSelection(elements);

    }

    else if(e.key==="Enter"){

        if(indexSelection>=0 && resultats[indexSelection]){

            window.location.href=resultats[indexSelection].page;

        }

    }

    else if(e.key==="Escape"){

        suggestions.style.display="none";

    }

});

}

function mettreSelection(elements){

    elements.forEach(e=>e.classList.remove("selected"));

    if(indexSelection>=0){

        elements[indexSelection].classList.add("selected");

    }

}

function afficherSuggestions(){

    const texte = normaliser(recherche.value);

    suggestions.innerHTML="";

    indexSelection=-1;

    if(texte===""){

        suggestions.style.display="none";

        return;

    }

    resultats = especes.filter(e=>

        normaliser(e.nom).includes(texte) ||

        normaliser(e.scientifique).includes(texte) ||

        normaliser(e.famille).includes(texte)

    );

    if(resultats.length===0){

        suggestions.style.display="none";

        return;

    }

    suggestions.style.display="block";

    resultats.forEach(espece=>{

        suggestions.innerHTML += `

<div class="suggestion"

onclick="window.location.href='${espece.page}'">

🦀 <strong>${espece.nom}</strong><br>

<small><i>${espece.scientifique}</i></small>

</div>

`;

    });

}

document.addEventListener("click", function(e){

    if(!e.target.closest(".search-box")){

        suggestions.style.display="none";

    }

});
const ouvrirPhylo = document.getElementById("ouvrirPhylo");
const phylo = document.getElementById("phylo");
const flechePhylo = document.getElementById("flechePhylo");

if (ouvrirPhylo) {

    ouvrirPhylo.addEventListener("click", () => {

        phylo.classList.toggle("hidden");

        if (phylo.classList.contains("hidden")) {

            flechePhylo.style.transform = "rotate(0deg)";

        } else {

            flechePhylo.style.transform = "rotate(90deg)";

        }

    });

}
/* ============================
   Liste des espèces
============================ */

const ouvrirEspeces = document.getElementById("ouvrirEspeces");
const listeEspecesContainer = document.getElementById("listeEspecesContainer");
const flecheEspeces = document.getElementById("flecheEspeces");

if (ouvrirEspeces) {

    ouvrirEspeces.addEventListener("click", () => {

        listeEspecesContainer.classList.toggle("hidden");

        if (listeEspecesContainer.classList.contains("hidden")) {

            flecheEspeces.style.transform = "rotate(0deg)";

        } else {

            flecheEspeces.style.transform = "rotate(90deg)";

        }

    });

}
