# MONSTERS

For this practice code challenge, your objective is to build a frontend for our monsters data. Currently the index.html page has a script tag to ```demo.js``` so that you can see a demo of the finished app. Comment out the script tag to ```demo.js``` and uncomment out the script tag to ```index.js``` where you will code your solution

## Getting Started

If you haven't yet, install json-server
```bash
npm install -g json-server
```

Then run the server with
```bash
json-server monsters.json
```

## Objectives
- When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
- Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
- At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.


## API methods

Get the list of monsters
```js
GET http://localhost:3000/monsters

optional parameters:

_limit=[number] - limit the number of monsters returned
_page=[number] - offset your request for monsters to some page (must specify a limit)

example:

GET http://localhost:3000/monsters/?_limit=20&_page=3

sample response:
[
  {
    "name": "Chronos",
    "age": 4005.302453418598,
    "description": "Effulgence eldritch shunned foetid. Ululate gibbering tenebrous foetid iridescence daemoniac. Stench nameless gambrel. Amorphous furtive iridescence noisome. Foetid mortal nameless.",
    "id": 1
  },
  {
    "name": "Tartarus",
    "age": 1874.4913565609456,
    "description": "Cyclopean swarthy amorphous singular accursed furtive non-euclidean stygian. Swarthy gibbering charnel eldritch daemoniac gibbous. Cyclopean lurk hideous tentacles squamous immemorial tenebrous mortal. Madness tentacles furtive mortal foetid decadent. Foetid immemorial comprehension.",
    "id": 2
  },
  {
    "name": "Hemera",
    "age": 4094.8375978925988,
    "description": "Dank immemorial abnormal gambrel. Cat lurk unutterable. Abnormal tenebrous ululate. Nameless swarthy manuscript eldritch indescribable accursed antediluvian decadent.",
    "id": 3
  }
]
```

Create a monster

```
POST http://localhost:3000/monsters
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

data:
{ name: string, age: number, description: string }
```
