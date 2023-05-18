console.log("Signup Script Loaded...")
const signup = document.querySelector("#signup");

// Signup event listener
signup.addEventListener("submit", async function(event) {
    const name = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    console.log(name)
    console.log(password)

    event.preventDefault();
    const response = await fetch("/api/users/",{
        method: "POST",
        body: JSON.stringify({
            name: name,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.ok) {
        console.log("OK");
    } else {
        console.log("NOT OK");
    }
});