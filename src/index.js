let baseUrl = 'https://api.imgflip.com/get_memes'

document.addEventListener("DOMContentLoaded", () => {
    getAllMemes()
})


function getAllMemes() {
    fetch(baseUrl)
        .then(resp => resp.json())
        .then(info => {
            let container = document.getElementById('display-container')
            info.data.memes.forEach(meme => {

                let newTitle = document.createElement('h1')
                let newImage = document.createElement('img')
                let count = document.createElement('h2')

                newTitle.innerHTML = meme.name
                newImage.src = meme.url
                count.innerHTML = meme.box_count

                container.append(newTitle)
                container.append(newImage)
                container.append(count)
            });

        })
}