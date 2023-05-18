console.log("Post Script Loaded...");

const comForm = document.querySelector("#new-comment");

if (comForm){
    comForm.addEventListener("submit",comFormHandler);
}

async function comFormHandler(event) {
    event.preventDefault();

    // Gets value from the form input
    const comment = comForm.children[0].value.trim()
    // Grabs id from the URL, parsing int in case of queries
    const postId = parseInt(window.location.href.split("/").pop())

    // First grabs the sessiondata
    await fetch("/sessiondata")
    .then(res => { return res.json() })
    .then(async(cookie)=>{

        // Posts the new comment
        await fetch("/api/comments",{
            method: "POST",
            body: JSON.stringify({
                body: comment,
                post_id: postId,
                user_id: cookie.user_id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        comForm.children[0].value = ""
        location.reload();
    })
    

}