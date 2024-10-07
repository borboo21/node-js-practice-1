document.addEventListener("click", event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'put') {
        const id = event.target.dataset.id;
        const newTitle = prompt('Enter Title');
        if (newTitle) {
            putTitle(id, newTitle).then(() => {
               event.target.closest('li').firstElementChild.textContent = newTitle;
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: "DELETE"})
}

async function putTitle(id, newTitle) {
    await fetch(`/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title: newTitle}),
    })
}