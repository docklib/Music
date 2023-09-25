
function slideIn(element) {
    document.getElementById(element).style.display = 'block'

    document.getElementById(element).style.animation = 'slideIn 0.5s'

}

function slideOut(element) {
    document.getElementById(element).style.display = 'block'

    document.getElementById(element).style.animation = 'slideOut 0.5s'
    setTimeout(() => {
        document.getElementById(element).style.display = 'none'


    }, 500);
}

function movePage(from, to) {
    document.body.style.overflow = 'hidden'

    slideOut(from)
    slideIn(to)
    setTimeout(() => {

        document.body.style.overflow = 'auto'

    }, 550);
}

function albumMove(from, to, json, bg) {
    document.body.style.overflow = 'hidden'
    let div = document.createElement('div')

    div.setAttribute('id', 'albumSongs')
    div.classList.add('albumMenu')
    document.getElementById('albumPG').appendChild(div)
    

    slideOut(from)
    slideIn(to)
    document.getElementById('albumSongs').remove()
    document.getElementById('ALBUMSANDSTUFF').remove()

    itemsAdd(json, 'albumSongs')
    
   
    setTimeout(() => {

        document.body.style.overflow = 'auto'

    }, 550);
}