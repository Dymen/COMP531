/**
 * Created by danye on 9/3/16.
 */
var pics = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.png','7.png','8.png','9.png','10.png','11.jpg','12.png']
var intervals = [1000, 1000, 1000]
var picIds = ['img0','img1','img2']
var btnIds = ['btn0', 'btn1', 'btn2']
var START = 'start'
var STOP = 'stop'
var btns = [STOP, STOP, STOP]
var intervalIds = []
var nPics = 3

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

window.onload = function () {
    var i
    for (i = 0; i < nPics; i ++) {
        intervals[i] = (randomNum(5)+1)*1000
        intervalIds[i] = setInterval(refreshPic, intervals[i], i)
    }
}

function refreshPic(id) {
    var newPic = randomNum(12)
    var pic = document.getElementById(picIds[id])
    pic.setAttribute('src', 'pic/'.concat(pics[newPic]))
}

function clickBtn(id) {
    var button = document.getElementById(btnIds[id])
    if (btns[id] == STOP) {
        stopPic(id)
        btns[id] = START
        button.value = 'Start'
    } else {
        startPic(id)
        btns[id] = STOP
        button.value = 'Stop'
    }
}

function stopPic(id) {
    clearInterval(intervalIds[id])
}

function startPic(id) {
    intervals[id] = (randomNum(5)+1)*1000
    intervalIds[id] = setInterval(refreshPic, intervals[id], id)
}