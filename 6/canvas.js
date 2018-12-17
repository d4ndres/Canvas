var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


var c = canvas.getContext('2d')


function getDistances( x1, y1, x2, y2) {
	let x = x1 - x2
	let y = y1 - y2
	return Math.sqrt( x*x + y*y)
}
function randomInt( min, max ) {
	return Math.floor( Math.random() * (max - min)  + min) 
}



class Particle {
	constructor( x, y, radius, color) {
		this.radius = radius
		// this.x = x || Math.random() * ( innerWidth - radius * 2 ) + radius

		this.x = x || randomInt( radius * 2,  canvas.width - radius * 2 )
		this.y = y || randomInt( radius * 2,  canvas.height - radius * 2 )
		this.color = color || '#000'



		this.velocity = {
			x: Math.random()  - 0.5 ,
			y: Math.random()  - 0.5 
		}

	}


	draw () {
		c.beginPath()
		c.arc( this.x, this.y, this.radius, 0, Math.PI * 2, true)
		c.strokeStyle = this.color
		c.stroke()
		c.closePath()

	}

	update ( particles = [] ) {

		for ( let i = 0; i < particles.length; i++ ) {

			let d = getDistances( this.x, this.y,  particles[i].x, particles[i].y)

			if ( d <=  this.radius + particles[i].radius && d != 0 ) {
				console.log(`collision`)






















				
			}

		}


		if ( this.x + this.radius > canvas.width || this.x - this.radius < 0) this.velocity.x  = - this.velocity.x 
		if ( this.y + this.radius > canvas.height || this.y - this.radius < 0) this.velocity.y  = - this.velocity.y 

		this.x += this.velocity.x
		this.y += this.velocity.y

		this.draw()
	}
}

var particles = []

function init () {

	for (let i = 0; i < 4; i++) {
		particles.push( new Particle( false, false, 100, 'blue'))

	

		for ( let j = 0; j < particles.length; j++ ) {


			let d = getDistances( particles[i].x, particles[i].y,  particles[j].x, particles[j].y)

			console.log(d)

			if ( d <=  particles[i].radius + particles[j].radius && d != 0 ) {

				console.log(`${i} no cumple con ${j}`)
				particles[i].x = randomInt( particles[i].radius * 2,  canvas.width - particles[i].radius * 2 )
				particles[i].y = randomInt( particles[i].radius * 2,  canvas.height - particles[i].radius * 2 )

				j = -1
			
			}
		}

	}

}

init()

function animate () {
	c.clearRect( 0, 0, innerWidth, innerHeight )
	requestAnimationFrame(animate)
	
	particles.forEach( particle => particle.update(particles) )
}
animate()
