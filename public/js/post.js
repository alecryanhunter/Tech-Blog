console.log("Post Script Loaded...");

const comForm = document.querySelector("#newComment");

comForm.addEventListener("submit",comFormHandler);

async function comFormHandler(event) {
    event.preventDefault();

    // Gets value from the form input
    const comment = comForm.children[0].value
    // Grabs id from the URL, parsing int in case of queries
    const postId = parseInt(window.location.href.split("/").pop())

    await fetch("/sessiondata")
    .then(res => { return res.json() })
    .then(cookie=>{
        // MUST USE COOKIE HERE
        console.log(cookie);
    })

    // await fetch("/api/comments",{
    //     method: "POST",
    //     body: JSON.stringify({
    //         body: comment,
    //         post_id: postId,
    //         user_id: 
    //     }),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
}