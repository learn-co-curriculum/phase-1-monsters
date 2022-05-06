document.addEventListener("DOMContentLoaded", () => {   
    //postMonster()
    getMonsters()

})

const monsterContainer = document.querySelector('#monster-container')
const divContainer = document.querySelector('#create-monster')



const createForm = document.createElement('form')
const nameForm = document.createElement('input')
const nameLabel = document.createElement('label')
const ageForm = document.createElement('input')
const ageLabel = document.createElement('label')
const descriptionForm = document.createElement('input')
const descriptionLabel = document.createElement('label')
const createButton = document.createElement('button')

createForm.id = 'monster-form'
nameForm.id = 'name'
nameForm.type = 'text'
nameLabel.htmlFor = 'name'
nameForm.value = 'name'
ageForm.id = 'age'
ageForm.type = 'text'
ageLabel.htmlFor = 'age'
ageForm.value = 'age'
descriptionForm.id = 'description'
descriptionForm.type = 'text'
descriptionLabel.htmlFor = 'description'
descriptionForm.value = 'description'
createButton.type = 'submit'
createButton.textContent = 'Create'

divContainer.append(createForm)
createForm.append(
    nameLabel, nameForm, ageLabel, ageForm, descriptionLabel, descriptionForm, createButton, 
    )

const formSelect = document.querySelector('#monster-form')

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




    const getMonsters = () => {
        fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
            .then(r => r.json())
            .then(monstersArray => {
                //console.log(monstersArray)
                renderMonsters(monstersArray)
            })
    }


const postMonster = (newMonster) => {
    const configObj = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(newMonster),
    }
    
    fetch("http://localhost:3000/monsters", configObj)
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