var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

var gravity = 1
var friction = 0.8

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
		c.stroke()

	}

	update () {
		if ( this.y + this.radius + this.dy  > canvas.height ) { 
			this.dy = -this.dy * friction
		} else {
			this.dy += gravity
		}


		if ( this.x + this.dx +this.radius > canvas.width || this.x - this.radius < 0 ) { 
			this.dx = -this.dx 
		} else {
			this.dx = this.dx * 0.98
		}


		this.x += this.dx
		this.y += this.dy


		this.draw()
	}
}



const COLORS = [
	'#34ace0',
	'#40407a',
	'#33d9b2'
]

var ballArray = []

function init() {

	for (let i = 0 ; i < 100; i++) {

		let color = COLORS[ Math.floor( Math.random() * COLORS.length  )]

		ballArray.push( new Ball( false , false , 20, color ) )
		ballArray[i].draw()
		// console.log(ballArray)

	}
}
init()



function animate () {
	c.clearRect( 0, 0, innerWidth, innerHeight )

	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update()
	}
	
	requestAnimationFrame(animate)
}

var one = true
document.body.style.cursor = 'pointer'
window.addEventListener('click', () => {
	if ( one ) {

		animate()
		document.body.style.cursor = 'default'
		one = !one
		
	}
})



window.addEventListener('keyup', function (ev) {
	if ( ev.keyCode == 78 ) init()
})

