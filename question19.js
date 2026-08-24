let visites = 0;
let points = 0;

const affichageVisites = document.getElementById("visites");
const affichagePoints = document.getElementById("points");

const pages = [

    {
        id: "google",
        nom: "Google",
        url: "https://www.google.com",
        limite: 2,
        visites: 0
    },

    {
        id: "youtube",
        nom: "YouTube",
        url: "https://www.youtube.com",
        limite: 3,
        visites: 0
    },

    {
        id: "wikipedia",
        nom: "Wikipédia",
        url: "https://fr.wikipedia.org",
        limite: 2,
        visites: 0
    },

    {
        id: "livescore",
        nom: "Livescore",
        url: "https://www.livescore.com",
        limite: 3,
        visites: 0
    },

    {
        id: "facebook",
        nom: "Facebook",
        url: "https://www.facebook.com",
        limite: 2,
        visites: 0
    },

    {
        id: "instagram",
        nom: "Instagram",
        url: "https://www.instagram.com",
        limite: 3,
        visites: 0
    },

    {
        id: "github",
        nom: "GitHub",
        url: "https://github.com",
        limite: 4,
        visites: 0
    },

    {
        id: "linkedin",
        nom: "LinkedIn",
        url: "https://www.linkedin.com",
        limite: 2,
        visites: 0
    },

    {
        id: "microsoft",
        nom: "Microsoft",
        url: "https://www.microsoft.com",
        limite: 3,
        visites: 0
    },

    {
        id: "apple",
        nom: "Apple",
        url: "https://www.apple.com",
        limite: 2,
        visites: 0
    }

];


pages.forEach(function(page) {
    const bouton = document.getElementById(page.id);

    bouton.addEventListener("click", function() {
        if (page.visites < page.limite) {
            page.visites++;
            visites++;
            points++;
			
            affichageVisites.textContent = visites;
            affichagePoints.textContent = points;

            window.open(page.url, "_blank");

            console.log(page.nom +" : " +page.visites +"/" +page.limite +" visites");

        } else {

            alert("La limite de visites pour " +page.nom +" est atteinte."
            );
        }
    });
});