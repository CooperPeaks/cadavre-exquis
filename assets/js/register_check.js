function RegisterCheck() {
    // Retrieve form values
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confPassword = document.getElementById("confPass").value.trim();
    let checkboxChecked = document.getElementById("exampleCheck1").checked;

    // Retrieve warning elements when displayed
    const warningUser = document.getElementById("warningUser");
    const warningMail = document.getElementById("warningMail");
    const warningPassword = document.getElementById("warningPassword");
    const warningConfpass = document.getElementById("warningConfpass")
    const warningCheck = document.getElementById("warningCheck")

    // Regex create
    let checkUsername = /^.{2,}$/;
    let checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    // Create a warning message on screen
    function CreateWarning(warningTxt, warningId, txtContainer) {
        const warningEl = document.createElement("p");
        warningEl.textContent = warningTxt; 
        warningEl.id = warningId; 
        warningEl.style.color = "red"; 
        txtContainer.appendChild(warningEl);
    }

    // Test username regex
    if (!checkUsername.test(username)) {
        if (!warningUser) {
            const warningUserTxt = "Le nom d'utilisateur doit comporter au moins 2 caractères";
            const userContainer = document.getElementById("user-container");
            CreateWarning(warningUserTxt, "warningUser", userContainer);
        }
        return false;
    } else {
        // Remove warning message if username is valid
        if (warningUser) {
            warningUser.remove();
        }
    }

    // Test email regex
    if (!checkEmail.test(email)) {
        if (!warningMail) {
            const warningMailTxt = "L'adresse mail doit être valide"
            const mailContainer = document.getElementById("mail-container");
            CreateWarning(warningMailTxt, "warningMail", mailContainer);
        }
        return false;
    } else {
        if (warningMail) {
            warningMail.remove();
        }
    }

    // Test password regex
    if (!checkPassword.test(password)) {
        if (!warningPassword) {
            const warningPassTxt = "Le mot de passe doit faire plus de 8 caractères et contenir au moins 1 lettre, 1 chiffre et 1 caractère spécial."
            const passContainer = document.getElementById("password-container");
            CreateWarning(warningPassTxt, "warningPassword", passContainer)
        }
        return false;
    } else {
        if (warningPassword) {
            warningPassword.remove();
        }
    }

    // Test two passwords
    if (password !== confPassword) {
        if (!warningConfpass) {
            const warningConfpassTxt = "Les mots de passe ne correspondent pas."
            const confpassContainer = document.getElementById("confPass-container");
            CreateWarning(warningConfpassTxt, "warningConfpass", confpassContainer)
        }
        return false;
    } else {
        if (warningConfpass) {
            warningConfpass.remove();
        }
    }

    if (!checkboxChecked) {
        if (!warningCheck) {
            const warningCheckTxt = "Vous devez cocher la case pour valider l'inscription"
            const checkContainer = document.getElementById("check-container");
            CreateWarning(warningCheckTxt, "warningCheck", checkContainer);
        }
        return false;
    }

    // Form = true
    else {
        return true
    }
}