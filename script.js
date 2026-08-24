let h1 = document.getElementsByTagName("p")
document.getElementById("changeColor").style.color="green";
let paragraphes = document.querySelectorAll('p');
const inputName = document.getElementById('name');

//Quand je quitte le champs nom, mon input change en majuscule
inputName.addEventListener('blur',()=>{
	inputName.value = inputName.value.toUpperCase();
});


//Numerote les paragraphes
paragraphes.forEach((p, index)=>{
	p.textContent += " |paragraphe No"+ (index+1);
});
 function agrandirTaille(){
	let agrandirTaille = document.querySelector(".agrandir-taille");
	agrandirTaille.style.fontSize = "1.7rem";
	agrandirTaille.style.color="red";
	
 }

// La definition de la fonction pour recuperer les valeurs dans html
function recuperer(){
	const recup = document.querySelector(".recup");
	let nom = document.getElementById("name").value;
	let prenom = document.getElementById("prenom").value;
	let matric = document.getElementById("matricule").value;
	

	
	if(nom.trim()==="" || prenom.trim()==="" || matric.trim()===""){
		alert("Veuillez completer tous les champs");
	}else if(nom.length < 4 || prenom.length < 4){
		alert("Le nom ou prenom doit avoir au moins 4 caracteres!");
	}else if(matric.length < 8){
		alert("Votre numero matricule doit avoir au moins 8 caracteres")
	}else{
		recup.innerHTML = `
		<h3>Nom: ${nom}</h3>
		<h3>Prenom: ${prenom}</h3>
		<h3>Matricule: ${matric}</h3>
	`;
	}
}




