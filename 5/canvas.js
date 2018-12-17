var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.background = '#576574'


var c = canvas.getContext('2d')


var mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}

window.addEventListener('mousemove', 
	function(ev) {
		mouse.x = ev.x
		mouse.y = ev.y
		// console.log(mouse)
})

function getDistances( x1, y1, x2, y2) {
	let x = x1 - x2
	let y = y1 - y2
	return Math.sqrt( x*x + y*y)
}




class Ball {
	constructor( x, y, radius, color) {
		this.x = x || Math.random() * ( innerWidth - radius * 2 ) + radius
		this.y = y || Math.random() * ( innerHeight - radius * 2) + radius
		this.radius = radius
		this.color = color


		this.dy = 1
		this.dx = ( Math.random() - 0.5 ) * 40


	}


	draw () {
		c.beginPath()
		c.arc( this.x, this.y, this.radius, 0, Math.PI * 2, true)
		c.fillStyle = this.color
		c.fill()
		// c.strokeStyle = 'transparent'
		// c.stroke()

	}

	update () {

		this.draw()
	}
}


var ball = new Ball ( canvas.width / 2 , canvas.height / 2, 100, '#ee5253' )
var cursorBall = new Ball ( mouse.x, mouse.y, 20, '#c8d6e5')


function animate () {
	c.clearRect( 0, 0, innerWidth, innerHeight )
	requestAnimationFrame(animate)
	

	ball.update()
	

	cursorBall.update()
	cursorBall.x = mouse.x
	cursorBall.y = mouse.y

	let d = getDistances( cursorBall.x, cursorBall.y, ball.x, ball.y )

	console.log(d)

	if ( d < ball.radius + cursorBall.radius) {
		ball.color = '#c8d6e5'
	} else {
		ball.color = '#ee5253'

	}
}
animate()
