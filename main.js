
var elementsList = [
    'Home',
    'albumPG',
    'browse',
    'visualeq'
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
    var eqOpen = false

    function toggleEQ() {
        if(eqOpen===true) {
            document.body.style.overflow = 'hidden'
            document.getElementById('EQMenu').style.animation = 'EQMENUOUT 0.5s'
            setTimeout(() => {
                document.getElementById('EQMenu').style.display = 'none'

                document.body.style.overflow = 'auto'
                eqOpen = false

            }, 500);
        } else {
            document.getElementById('EQMenu').style.display = 'block'

            document.body.style.overflow = 'hidden'
            document.getElementById('EQMenu').style.animation = 'EQMENUIN 0.5s'
            setTimeout(() => {

                document.body.style.overflow = 'auto'
                eqOpen = true

            }, 500);
        }
    }

function updateplaylistoptions() {
    // Iterate through all keys in localStorage
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);

    // Check if the key contains the word "PLAYLIST"
    if (key && key.includes("PLAYLIST")) {
        // If it does, do something with this key
        console.log("Found key with PLAYLIST:", key);


        // You might want to retrieve the value associated with the key
        var value = localStorage.getItem(key);
        console.log("Value:", value);

        
    }
}
}


    updateplaylistoptions()

    console.log('main.js loaded in...')
    console.log('sizing pages...')
    console.error('Using Outdated Method For Sizing Pages!')
    console.warn('this may take a while...')
    console.log('done')
    var memoryInfo = null
    var startTime = null
    var endTime = null
    var elapsedTime = null
    /*setInterval(() => {

            startTime = performance.now();


            endTime = performance.now();
            elapsedTime = endTime - startTime;
            console.log(`Operation took ${elapsedTime} milliseconds`);

            memoryInfo = performance.memory;
            console.log(`Used JS heap size: ${bytesToGB(memoryInfo.usedJSHeapSize)} GB`);
            console.log(`Total JS heap size: ${bytesToGB(memoryInfo.totalJSHeapSize)} GB`);
            console.log(`JS heap size limit: ${bytesToGB(memoryInfo.jsHeapSizeLimit)} GB`);

            console.log('END OF REPORT')

            memoryInfo = null
            startTime = null
            endTime = null
            elapsedTime = null
    }, 10000);*/

    function bytesToGB(bytes) {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2);
    }
    