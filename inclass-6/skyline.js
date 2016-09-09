'use strict'

var buildingInfo = []
var nBuilding = 0
// common size for windows
var windowSpacing = 2, floorSpacing = 3
var windowHeight = 5, windowWidth = 3
var sunX, sunY
var car

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

        var blgColor = blgColors[ Math.floor(Math.random()*blgColors.length)]
        buildingInfo[nBuilding] = {left: x0, bottom: floor, right: x0+blgWidth, top: floor-blgHeight, color: blgColor}
        nBuilding = nBuilding + 1
        console.log(x0+' '+(x0+blgWidth)+' '+(floor-blgHeight)+' '+floor)

		c.fillStyle= blgColor
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.random()>0.5)
				    continue;
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	return {
		build: build
	}
}

function findBuilding(x, y) {
    console.log(x+' '+y)
    var curBlg = nBuilding-1
    while (curBlg>=0) {
        if (buildingInfo[curBlg].left<=x && buildingInfo[curBlg].right>=x)
            if (buildingInfo[curBlg].top<=y && buildingInfo[curBlg].bottom>=y)
                return curBlg
        curBlg = curBlg-1
    }
    return curBlg
}

function redraw() {
    var canvas = document.getElementById('canvas')
    var c = canvas.getContext('2d')
    c.clearRect(0, 0, canvas.width, canvas.height)
    // Draw sun
    c.beginPath()
    c.arc(sunX, sunY, 20, 0, 2*Math.PI)
    c.fillStyle = 'red'
    c.fill()

    // Create the ground
    var floor = canvas.height/2
    var grad = c.createLinearGradient(0,floor,0,canvas.height)
    grad.addColorStop(0, "green")
    grad.addColorStop(1, "black")
    c.fillStyle=grad
    c.fillRect(0, floor, canvas.width, canvas.height)

    // Draw buildings
    for (var curBlg = 0; curBlg < nBuilding; curBlg ++) {
        var width = buildingInfo[curBlg].right - buildingInfo[curBlg].left
        var height = buildingInfo[curBlg].bottom - buildingInfo[curBlg].top
        // draw building
        c.fillStyle = buildingInfo[curBlg].color
        c.fillRect(buildingInfo[curBlg].left, buildingInfo[curBlg].top, width, height)

        // draw windows

        c.fillStyle = "yellow"
        for (var y = buildingInfo[curBlg].bottom; y > buildingInfo[curBlg].top; y -= floorSpacing + windowHeight) {
            for (var x = windowSpacing; x < width - windowWidth; x += windowSpacing + windowWidth) {
                if (Math.random() > 0.5)
                    continue;
                c.fillRect(buildingInfo[curBlg].left + x, y - windowHeight, windowWidth, windowHeight)
            }
        }
    }

    // Draw car body
    var carC = canvas.getContext('2d')
    carC.beginPath()
    carC.moveTo(car, 390)
    carC.lineTo(car, 380)
    carC.lineTo(car+10, 380)
    carC.lineTo(car+20, 370)
    carC.lineTo(car+40, 370)
    carC.lineTo(car+50, 380)
    carC.lineTo(car+60, 380)
    carC.lineTo(car+60, 390)
    carC.lineTo(car, 390)
    carC.stroke()
    carC.closePath()
    carC.fillStyle = 'blue'
    carC.fill()
    var wheel = canvas.getContext('2d')
    wheel.fillStyle = 'black'
    wheel.beginPath()
    wheel.arc(car+10, 390, 10, 0, Math.PI, false)
    wheel.lineTo(car, 390)
    wheel.arc(car+50, 390, 10, 0, Math.PI, false)
    wheel.lineTo(car+50, 390)
    wheel.stroke()
    wheel.fill()
}

function moveSun() {
    if (sunY == 0)
        return
    sunX = sunX + 10
    sunY = sunY - 5
    redraw()
}

function moveCar() {
    if (car == 740)
        return
    car = car + 10
    console.log(car)
    redraw()
}

document.onclick = function () {
    var rect = document.getElementById('canvas').getBoundingClientRect()
    var mouseX = event.clientX-rect.left
    var mouseY = event.clientY-rect.top
    var blgChosen = findBuilding(mouseX, mouseY)
    if (blgChosen == -1)
        return
    if (buildingInfo[blgChosen].top<10)
        return
    buildingInfo[blgChosen].top = buildingInfo[blgChosen].top - 10
    redraw()
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
    sunX = 0
    sunY = 400
    car = 0
    setInterval(moveSun, 1000)
    setInterval(moveCar, 500)
	document.getElementById("build").onclick = app.build
}


