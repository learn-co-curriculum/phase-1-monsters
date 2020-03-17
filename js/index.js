document.addEventListener("DOMContentLoaded", pageSetup)

function pageSetup() {
    fetchMonsters()
    monsterForm().addEventListener('submit', processMonsterForm)
    nextButton().addEventListener('click', () => paginate('next'))
    backButton().addEventListener('click', () => paginate('back'))
}

function callPaginateNext() {
    paginate('next')
}

function fetchMonsters(page_num=1) {
    monsterContainer().innerHTML = ""
    monsterContainer().dataset.currentPage = page_num
    fetch(`http://localhost:3000/monsters?_limit=10&_page=${page_num}`)
        .then(r => r.json())
        .then(monsterJson => monsterJson.forEach(monster => renderMonster(monster)))
}

function paginate(direction) {
    let currentPage = monsterContainer().dataset.currentPage 
    if (direction === 'back') {
        currentPage--
    } else {
        currentPage++
    }
    currentPage = Math.min(Math.max(currentPage, 1), 100)
    fetchMonsters(currentPage)
}

function renderMonster(monster) {
    let container = monsterContainer()
    let card = document.createElement('div')
    let monsterName = document.createElement('h2')
    monsterName.innerText = monster.name 

    let monsterAge = document.createElement('div')
    monsterAge.innerText = monster.age

    let monsterDesc = document.createElement('div')
    monsterDesc.innerText = monster.description

    container.appendChild(card)
    card.appendChild(monsterName)
    card.appendChild(monsterAge)
    card.appendChild(monsterDesc)

}

function monsterContainer() {
    return document.getElementById('monster-container')
}

function monsterForm() {
    return document.getElementsByTagName('form')[0]
}

function processMonsterForm(event) {
    event.preventDefault() 
    let form = event.currentTarget

    let name = form.children.name.value
    let age = form.children.age.value 
    let description = form.children.description.value

    let monsterPayload = {"name": name, age: age, description: description}
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(monsterPayload)
    }).then(r => r.json())
    .then(monster => renderMonster(monster))
    .catch(error => console.log(`Paul's error: ${error}`))
    form.reset()
}

function nextButton() {
    return document.getElementById("next")
}

function backButton() {
    return document.getElementById("back")
}