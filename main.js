
var elementsList = [
    'home',
    'albumPG'
]

function sizePages() {
    for(var i = 0; i < elementsList.length; i++) {
        let WINHEIGHT = window.innerHeight - 130 + 'px'
        document.getElementById(elementsList[i]).style.height = WINHEIGHT;

    }
}

    sizePages()
