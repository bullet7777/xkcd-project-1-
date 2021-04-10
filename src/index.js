let baseUrl = 'https://api.imgflip.com/get_memes'
let allMemes = []
let currentIndex = 0
let totalMemes = 0

document.addEventListener("DOMContentLoaded", () => {

    
    getAllMemes()

    document.getElementById('like').addEventListener('click', likeButton)
    document.getElementById('forward').addEventListener('click', next)
    document.getElementById('back').addEventListener('click', back)
    document.getElementById('random').addEventListener('click', showRandom)
    document.getElementById('how-many-likes').addEventListener('click', removeLike)

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
    let newLi

    let allLi = ul.getElementsByTagName('li')



    for (let i = 0; i < allLi.length; i++) {
        if (parseInt(allLi[i].dataset.id) === currentIndex) {
            newLi = allLi[i]
        }

    }

    if (newLi === undefined) {
        newLi = document.createElement('li')
        newLi.dataset.id = currentIndex
        newLi.dataset.count = 1

        ul.appendChild(newLi)

        newLi.innerText = `${allMemes[currentIndex].name} was liked ${newLi.dataset.count} times`
        newLi.classList.add('like-text')
    } else {
        newLi.dataset.count++
        newLi.innerText = `${allMemes[currentIndex].name} was liked ${newLi.dataset.count} times`
    }

    let removeButton = document.createElement('button')
    removeButton.innerHTML = 'X'

    newLi.append(removeButton)
    
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

async function fetchMemes() {
    let res = await fetch(baseUrl)
    let data = await res.json()
    return data
}

function showRandom() {

    let random = Math.floor(Math.random() * totalMemes);
    console.log(random)
    currentIndex = random

    drawImage()

}

