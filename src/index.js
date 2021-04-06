let baseUrl = 'https://api.imgflip.com/get_memes'
let allMemes = []
let currentIndex = 0
let totalMemes = 0

document.addEventListener("DOMContentLoaded", () => {
    buttons()
    form()

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
    newImage.classList.add('image')

    container.append(newTitle)
    container.append(newImage)
    container.append(count)
}

function buttons() {
    let forwardButton = document.getElementById('forward')

    forwardButton.addEventListener('click', next)
    function next() {
        if (currentIndex < totalMemes-1) {


            currentIndex++
            drawImage()
        }
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
function form() {
let newSearch = document.getElementById('search')
let newForm = document.createElement('form')
let newInput = document.createElement('input')
let submitInput = document.createElement('input')

newInput.placeholder = 'Search Meme'
newInput.value =''
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

    if(parseInt(newInput.value) <= totalMemes-1){
        currentIndex=parseInt(newInput.value)
    drawImage()
    }else{
        
        alert('you exceeded the total')
    }
}
}

