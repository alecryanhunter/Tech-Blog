console.log("Login Script Loaded...");

const login = document.querySelector("#login");

login.addEventListener("submit",loginHandler);

async function loginHandler(event) {
    event.preventDefault();

    const loginUsername = login.children[1].value
    const loginPassword = login.children[3].value


    if (loginUsername && loginPassword) {

        await fetch("/api/users/login",{
            method: "POST",
            body: JSON.stringify({
                username: loginUsername,
                password: loginPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

    } else {
        // If the username and password fields are not filled out

        const alert = login.lastElementChild
        const newAlert = document.createElement("p");

        if (alert.classList.contains("alert")) {
            // Plays an error animation on the warning if clicked again
            alert.classList.add("error")
            setTimeout(()=>{alert.classList.remove("error")},100)
        } else {
            // Appends a warning to the page
            newAlert.textContent = "Both fields must be filled";
            newAlert.classList.add("alert")
            login.appendChild(newAlert)
        }
    }
    
}