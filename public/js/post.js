const comForm = document.querySelector("#new-comment");
// Grabs id from the URL, parsing int in case of queries
const postId = parseInt(window.location.href.split("/").pop())

if (comForm){
    comForm.addEventListener("submit",comFormHandler);
}

async function comFormHandler(event) {
    event.preventDefault();

    // Gets value from the form input
    const comment = comForm.children[0].value.trim()

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

const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");

editBtn.addEventListener("click",editHandler);
deleteBtn.addEventListener("click",deleteHandler);

async function editHandler() {

}

// Very simple delete handler. Deletes then sends to home
async function deleteHandler() {
    await fetch(`/api/posts/${postId}`,{
        method: "DELETE"
    })
    window.location.replace("/home");
}