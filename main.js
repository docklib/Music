
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

    var queueOpen = false
    function toggleQueue() {
        if(queueOpen===true) {
            document.body.style.overflow = 'hidden'
            document.getElementById('QUEUEUI').style.animation = 'slideOutQueue 0.5s'
            setTimeout(() => {
                document.getElementById('QUEUEUI').style.display = 'none'

                document.body.style.overflow = 'auto'
                queueOpen = false

            }, 500);
        } else {
            document.getElementById('QUEUEUI').style.display = 'block'

            document.body.style.overflow = 'hidden'
            document.getElementById('QUEUEUI').style.animation = 'slideInQueue 0.5s'
            setTimeout(() => {

                document.body.style.overflow = 'auto'
                queueOpen = true

            }, 500);
        }
    }