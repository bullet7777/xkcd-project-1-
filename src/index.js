let baseUrl = 'https://api.imgflip.com/get_memes'
let allMemes = []
let currentIndex = 0
let totalMemes = 0

document.addEventListener("DOMContentLoaded", () => {
    buttons()

    getAllMemes()
})


function getAllMemes() {
    fetch(baseUrl)
        .then(resp => resp.json())
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
    let count = document.createElement('h2')

    newTitle.innerHTML = meme.name
    newImage.src = meme.url
    count.innerHTML = meme.box_count

    container.append(newTitle)
    container.append(newImage)
    container.append(count)
}

function buttons() {
    let forwardButton = document.getElementById('forward')

    forwardButton.addEventListener('click', next)
    function next() {
        currentIndex++
        drawImage()

    }
    let backButton = document.getElementById('back')
    backButton.addEventListener('click', back)
    function back() {

        if (currentIndex > 0) {
            currentIndex--
            drawImage()
        }

    }
}