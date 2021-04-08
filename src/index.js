let baseUrl = 'https://api.imgflip.com/get_memes'
let allMemes = []
let currentIndex = 0
let totalMemes = 0

document.addEventListener("DOMContentLoaded", () => {
    
    form()
    getAllMemes()
    
    document.getElementById('like').addEventListener('click', likeButton)
    document.getElementById('forward').addEventListener('click', next)
    document.getElementById('back').addEventListener('click', back)
    document.getElementById('random').addEventListener('click',showRandom)
   
   
})


function getAllMemes() {

    fetchMemes()
        .then(info => {

            allMemes = info.data.memes
            totalMemes = info.data.memes.length
            drawImage()

        })

}

function drawImage() {
    let meme = allMemes[currentIndex]

    let container = document.getElementById('display-container')
    container.innerHTML = ''
    let newTitle = document.createElement('h1')
    let newImage = document.createElement('img')


    newTitle.innerHTML = meme.name
    newImage.src = meme.url

    newImage.classList.add('image')

    container.append(newTitle)
    container.append(newImage)

}


function likeButton() {
    let ul = document.getElementById('how-many-likes')
    let newLi = document.createElement('li')

    ul.appendChild(newLi)

    newLi.innerText = `${allMemes[currentIndex].name} was liked!`

    newLi.classList.add('like-text')

    let removeButton = document.createElement('button')
    removeButton.innerHTML = 'X'

    newLi.append(removeButton)
    ul.addEventListener('click', removeLike)

}

function removeLike(event) {
    console.log(event.target.innerText)
    if (event.target.innerText === "X") {
        event.target.parentElement.remove()
    }
}

    function next() {

        if (currentIndex < totalMemes - 1) {
            currentIndex++
            drawImage()
        }
    }

    function back() {

        if (currentIndex > 0) {
            currentIndex--
            drawImage()
        }
    }

function form() {

    let newSearch = document.getElementById('search')
    let newForm = document.createElement('form')
    let newInput = document.createElement('input')
    let submitInput = document.createElement('input')

    newInput.placeholder = 'Search Meme'
    newInput.value = ''
    submitInput.type = "submit"
    submitInput.value = 'SEARCH'

    newSearch.appendChild(newForm)
    newForm.appendChild(newInput)
    newForm.appendChild(submitInput)

    newForm.addEventListener('submit', search)


    function search(event) {
        event.preventDefault()
        console.log(currentIndex)
        console.log(totalMemes)

        if (parseInt(newInput.value) <= totalMemes - 1) {
            currentIndex = parseInt(newInput.value)
            drawImage()
        } else {
            alert('you exceeded the total')
        }
    }
}

async function fetchMemes() {
    let res = await fetch(baseUrl)
    let data = await res.json()
    return data
}


function showRandom() {
  
      let random=Math.floor(Math.random() * totalMemes);
      console.log(random)
     currentIndex=random
     
     drawImage()
     
}