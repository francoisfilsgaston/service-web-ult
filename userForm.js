const userForm = document.getElementById("userForm");
const listeUser = document.getElementById("listeUser");

let arrayUsers = [];

userForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	const nom = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const contact = document.getElementById("number").value;
	
	//creer un nouvel userAgent
	let user = {
		id: arrayUsers.length+1,
		nom: nom,
		email: email,
		contact: contact
	}
	//ajouter l'user
	arrayUsers.push(user);
	
	//appel a la fonction
	afficherUser();
	
	//vider le formulaire
	userForm.reset();
	
});

//fonction pour afficher l'user
function afficherUser(){
	listeUser.innerHTML="";
	
	arrayUsers.forEach((user)=>{
		const ligne = document.createElement("tr");
		ligne.innerHTML=`
			<td>${user.id}</td>
			<td>${user.nom}</td>
			<td>${user.email}</td>
			<td>${user.contact}</td>
			
			<td>
				<button onclick="modifierUser(${user.id})">Modifier</button>
				<button onclick="supprimerUser(${user.id})">Supprimer</button>
			</td>
		`;
		listeUser.appendChild(ligne);
	});
}

//fonction pour modifier l'utilisateur
function modifierUser(id){
	const user = arrayUsers.find((user)=>{
		return user.id === id;
	});
	
	if(user){
		const newName = prompt("Nouveau nom", user.nom);
		if(newName === null){
			return;
		}
		const newMail = prompt("Nouveau E-mail", user.email);
		if(newMail === null){
			return;
		}
		const newPhone = prompt("Nouveau Contact", user.contact);
		if(newPhone === null){
			return;
		}
		
		const resume = 
			"Resume des modifications:\n\n"+
			"Nom:"+newName+"\n"+
			"E-mail:"+newMail+"\n"+
			"Contact:"+newPhone+"\n"+
			"\n\nVoulez-vous réellement effectuer ces modifications ?";
			
		const confirmation = confirm(resume);
		if(confirmation){
			user.nom = newName;
			user.email = newMail;
			user.contact = newPhone;
			
			afficherUser();
			alert("Utilisateur modifié avec succès ");
		}else{
			alert("Modification annulé");
		}
		
		
	}
		
}

//fonction pour supprimer l'utilisateur
function supprimerUser(id){
	const confirme = confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
	if(confirme){
		const index = arrayUsers.findIndex((user)=>{
			return user.id === id;
		});
		if(index !== -1){
			arrayUsers.splice(index, 1);
			alert("Utilisateur supprimé avec succès");
		}
		afficherUser();
		
	}else{
		alert("Suppression annulé");
	}
	
}