//Demo Link: https://www.youtube.com/watch?v=TlP5WIxVirU

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input",(evt)=>{
    const value = evt.target.value.toLowerCase();
    // console.log(value)
    // console.log(users)
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        user.element.classList.toggle("hide",!isVisible)

    })
})
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            //clones the content inside the userCardTemplate, Yes is confirming that.
            //the [0] get the first element in the container, which is the <.card>
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]");
            const body = card.querySelector("[data-body]");
            header.textContent = user.name;
            body.textContent = user.email
            userCardContainer.insertAdjacentElement("beforeend",card)
            console.log(card);
            return {
                name:user.name,
                email:user.email,
                element: card
            }


        })
    })