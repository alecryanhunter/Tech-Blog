// This script file handles all site-wide functionality
console.log("Universal Script Loaded...")

const logout = document.querySelector("#logout");

if (logout) {
logout.addEventListener("click",async function(event){
    event.preventDefault();

    const logoutResponse = await fetch("/api/users/logout",{
        method: "POST"
    })
    if (logoutResponse.ok){
        window.location.href = '/home'
    }
})
}