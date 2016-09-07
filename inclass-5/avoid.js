/**
 * Created by danye on 9/6/16.
 */
var curX = 100
var curY = 50
var deltaX = [-20, 20]
var deltaY = [-20, 20]
var shiftDown
var gameOver

window.onload = function () {
    var button = document.getElementById('btn')
    shiftDown = false
    gameOver = false
    button.addEventListener('mouseover', avoidMouse)
    button.addEventListener('click', buttonClick)
    document.addEventListener('keydown', shiftDownFunc)
    document.addEventListener('keyup', shiftUpFunc)
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function avoidMouse() {
    if (gameOver)
        return
    if (shiftDown)
        return
    while (true) {
        var xIdx = randomNum(2)
        var yIdx = randomNum(2)
        var nxtX = curX + deltaX[xIdx]
        var nxtY = curY + deltaY[yIdx]
        if (nxtX<50 || nxtY<50 || nxtX>950 || nxtY>450)
            continue;
        curX = nxtX
        curY = nxtY
        break
    }
    var button = document.getElementById('btn')
    button.style.left = curX+'px'
    button.style.top = curY+'px'
}

function shiftDownFunc() {
    console.log('shift down')
    if (event.keyCode == 16)
        shiftDown = true
}

function shiftUpFunc() {
    console.log('shift up')
    if (event.keyCode == 16)
        shiftDown = false
}

function buttonClick() {
    if (!gameOver)
        gameWin()
    else
        gameRestart()
}

function gameWin() {
    var button = document.getElementById('btn')
    document.getElementById('congrats').style.display = 'block'
    button.setAttribute('value', 'Play Again')
    gameOver = true
}

function gameRestart() {
    var button = document.getElementById('btn')
    document.getElementById('congrats').style.display = 'none'
    button.setAttribute('value', 'Click Me!')
    gameOver = false
}