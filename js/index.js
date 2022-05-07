document.addEventListener('DOMContentLoaded', () => {
    getMonsters(url, page)
})

const url = 'http://localhost:3000/monsters'
let page = 1

const monsterContainer = document.querySelector('#monster-container')
const divContainer = document.querySelector('#create-monster')
const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')

const createForm = document.createElement('form')
const nameForm = document.createElement('input')
const ageForm = document.createElement('input')
const descriptionForm = document.createElement('input')
const descriptionLabel = document.createElement('label')
const createButton = document.createElement('button')

createForm.id = 'monster-form'
nameForm.id = 'name'
nameForm.type = 'text'
nameForm.placeholder = 'name'
ageForm.id = 'age'
ageForm.type = 'text'
ageForm.placeholder = 'age'
descriptionForm.id = 'description'
descriptionForm.type = 'text'
descriptionForm.placeholder = 'description'
createButton.type = 'submit'
createButton.textContent = 'Create'

divContainer.append(createForm)
createForm.append(nameForm, ageForm, descriptionForm, createButton)

const loadMonsterButtons = button => {
    button.addEventListener('click', (e) => {
        let page = 1
        if (button === forwardButton) {
            while (page > 0) {
                return getMonsters(url, (page + 1))
            }    
        }
        // button works but renders the first 50 monsters again.
        // else if (button ===  backButton) {
        //     while (page > 0) {
        //         pageInc = page - 1
        //         return getMonsters(url, pageInc)
        //     }    
        // }
    })    
}

loadMonsterButtons(backButton)
loadMonsterButtons(forwardButton)

const formSelect = document.querySelector('#monster-form')
//console.log(formSelect)

formSelect.addEventListener('submit', (e) => {
    e.preventDefault()
    const createMonsterArray = [{
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value,
    }]
    renderMonsters(createMonsterArray)
    postMonster(createMonsterArray)
})


const renderMonsters = monstersArray => {  
    monstersArray.forEach(monsterObj => {
        document.createElement('div')
        const name = document.createElement('h2')
        const age = document.createElement('h4')
        const description = document.createElement('p')
        name.innerText = monsterObj.name
        age.innerText = monsterObj.age
        description.innerText = monsterObj.description
        monsterContainer.append(name, age, description)
    })
}


const getMonsters = (url, page) => {
    fetch(`${url}/?_limit=50&_page=${page}`)
        .then(r => r.json()).then(monstersArray => {
            renderMonsters(monstersArray)
        })
}


const postMonster = (newMonster) => {
    const configObj = {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify(newMonster),
    }
    
    fetch(url, configObj)
        .then(r => r.json()).then(data => data).catch(error => {
            alert("new monster not uploaded")
            error.message
        })
}


// get data from api through fetch and pass info into render
//  render monsters call back in getMonser
// list the first 50 monsters
// each monster should have name, age, description
//  render should go to div id='monster-container'
//      div for each monster w/ tags: name <h2>, age <h4>, description <p>

// set parameter to only recieve first 50 monsters