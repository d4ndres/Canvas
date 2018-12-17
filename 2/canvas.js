var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


function Circle( x, y, dx, dy, radius ) {
	this.radius = radius || 20
	this.x = x || Math.random() * ( innerWidth - this.radius * 2) + this.radius 
	this.y = y || Math.random() * ( innerHeight - this.radius * 2) + this.radius 
	this.dx = dx || ( Math.random() - 0.5 ) * 4
	this.dy = dy || ( Math.random() - 0.5 ) * 4

	this.draw = function() {
		c.beginPath()
		c.arc( this.x, this.y , this.radius, 0, Math.PI * 2, true)
		// c.strokeStyle = 'blue'
		c.fill()
		// c.fillStyle = 'rgba(0,0,0, .8)'
		c.stroke()
	}

	this.update = function() {
		if ( this.x + this.radius> innerWidth || this.x - this.radius * 2< 0 ) this.dx = -this.dx;
		if ( this.y + this.radius> innerHeight || this.y - this.radius < 0 ) this.dy = -this.dy;

		this.x += this.dx
		this.y += this.dy

		this.draw()
	}
}

var circleArray = []

for ( let i = 0; i < 500; i++ ) {
	var dx = Math.random() - 0.5
	var dy = Math.random() - 0.5
	var radius = 10

	circleArray.push( new Circle( false, false, dx,dy, radius) )
}

function animate() {
	requestAnimationFrame(animate)

	c.clearRect( 0, 0, innerWidth, innerHeight)
	for ( let i = 0; i < circleArray.length; i++ ) {
		circleArray[i].update()
	}
}
animate()




// requestAnimationFrame(callback) llama a la funcion por callback, en este caso esta es una funcion recursiva
// c.clearReact(xinit, yinit, xfin, yfin) limpia lo que este adentro del rectangulo  