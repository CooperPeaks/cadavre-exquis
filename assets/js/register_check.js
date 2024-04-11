function RegisterCheck() {
    // Retrieve form values
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confPassword = document.getElementById("confPass").value.trim();

    // Regex create
    let checkUsername = /^.{2,}$/;
    let checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    // Test two passwords
    if (password !== confPassword) {
        alert("Mot de passe non confirmé")
        return false
    }
    // Test password length
    else if (password.length < 3) {
        alert("trop court");
        return false
    }
    // Test password regex
    else if (!checkPassword.test(password)) {
        alert("Le mot de passe doit comporter au moins...")
        return false
    }
    // Password = true
    else {
        console.log("mdp ok");
        // Test username regex
        if (!checkUsername.test(username)) {
            alert("Username non valide")
            return false
        }
        // Test mail regex
        else if (!checkEmail.test(email)) {
            alert("email non valide")
            return false
        }
        // Form = true
        else {
            alert("Tout est ok")
            return true
        }
    }
}