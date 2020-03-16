document.addEventListener("DOMContentLoaded", setupPage)

function setupPage() {
    loadMonsters()
    monsterForm().addEventListener('submit', processForm)
    backButton().addEventListener('click', () => paginate('back'))
    nextButton().addEventListener('click', () => paginate('next'))

}

function loadMonsters(page_num=1) {
    monsterContainer().innerHTML = ""
    monsterContainer().dataset.currentPage = page_num
    fetch(`http://localhost:3000/monsters?_limit=10&_page=${page_num}`)
        .then(r => r.json())
        .then(monsters => 
            monsters.forEach(
                monster => renderMonster(monster)))
}

function paginate(direction) {
    let currentPage = monsterContainer().dataset.currentPage
    if (direction == 'back') {
        currentPage--
    } else {
        currentPage++
    }
    currentPage = Math.min(Math.max(parseInt(currentPage), 1), 20);
    loadMonsters(currentPage)
}

function monsterForm() {
    return document.getElementsByTagName('form')[0]
}

function processForm(e) {
    e.preventDefault()
    let form = monsterForm()
    let name = form.name.value
    let age = form.age.value
    let description = form.description.value
    createMonster(name, age, description)
    form.reset()
}


function createMonster(name, age, description)  {
    payload = {name: name, age: age, description: description}
    fetch(`http://localhost:3000/monsters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(r => r.json())
    .then(monster => renderMonster(monster))
}

function backButton() {
    return document.getElementById('back')
}

function nextButton() {
    return document.getElementById('next')
}
function monsterContainer() {
    return document.getElementById("monster-container")
}

function renderMonster(monster) {
    let card = document.createElement('div')
    let monsterName = document.createElement('h2')
    monsterName.innerText = monster.name
    let monsterAge = document.createElement('h4')
    monsterAge.innerText = monster.age
    let monsterDesc = document.createElement('p')
    monsterDesc.innerText = monster.description
    card.appendChild(monsterName)
    card.appendChild(monsterAge)
    card.appendChild(monsterDesc)
    monsterContainer().appendChild(card)
}