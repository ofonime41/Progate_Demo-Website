
const contactForm =document.getElementById("contactForm");
const name =document.getElementById("name");
const email =document.getElementById("email");
const textarea =document.getElementById("textarea");
const btn =document.getElementById("sendBtn");
const notification = document.getElementById("notification");
btn.disable=true;

// ENABLE BUTTON
	contactForm.addEventListener('input',()=>{
	if (email.value.length>0 &&textarea.value.length>1 && name.value.length>1){
		btn == false;
		btn.style.backgroundColor ="#2196f3";
		btn.style.color ="#fff";
	}
})


// VALIDATE FORM

contactForm.addEventListener("submit",(e) =>{
	if (email.value.length<1 && textarea.value.length<2 && name.value.length<2) {
		e.preventDefault();
	}else{
			alert.log("form submitted")
	}

});


