if (window.self !== window.top) {
    var parentHostname = document.referrer.split('/')[2];
    console.log("Check190T = " + parentHostname);

    if(parentHostname === 'zatoga.net') {
        document.getElementById('ZINTRO').style.display = 'block'
    }
} else {
    console.log("Check190T = false");
}
//document.getElementById('ZINTRO').style.display = 'block'
