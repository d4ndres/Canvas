// d(t) = di + vi*t + a*t*t/2
// Frozamiento = k*v*v
// y-y0 = m (x - x0)
// ley de gravitacion universa; de newton 
// fG = 1/ pow( d, 2)

var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')


var gravity = .98
var coefficient_of_energy_dissipated = .6
var resistance_to_fluid = 0.985 // condiciones normales 
// var resistance_to_fluid = 1.02 // condiciones a favor
// var resistance_to_fluid = 0.97 // condiciones en contra


const radToDeg = rad => rad*180/Math.PI;

function getVetor( ob1, ob2) {
	let ob = {}
	ob.x = ob2.x - ob1.x
	ob.y = ob2.y - ob1.y
	ob.modx = Math.sqrt( Math.pow( ob.x, 2) + Math.pow( ob.y, 2) )

	if ( ob.modx > 300 ) {
		ob.modx = 50	// velocidad maxima
	} else { 
		ob.modx = ob.modx * 50 / 300 // regulando velocidad 
	}


	ob.ux = ob.x / ob.modx
	ob.uy = ob.y / ob.modx

	ob.ang = Math.atan(ob.y / ob.x)

	ob.x = ob.modx * Math.cos( ob.ang )
	ob.y = ob.modx * Math.sin( ob.ang )


	return ob
}


var mouse = {
	x: undefined,
	y: undefined
}
canvas.addEventListener('click', 
	function(ev) {
		mouse.x = ev.x 
		mouse.y = ev.y 
	console.log(mouse)
})


class Bullet {
	constructor( x, y) {
		this.x = x
		this.y = y
		this.radius = 10
		this.dx = undefined
		this.dy = undefined
	}
	draw() {
		c.beginPath()
		c.arc( this.x, this.y, this.radius, 0, Math.PI * 2, true )
		c.stroke()
		c.closePath()
	}
	init() {
		this.draw()
		this.maxRang()
	}
	getVelocity() {
		let ob = getVetor(this, mouse)
		this.dx = ob.x 
		this.dy = ob.y 
		console.log(ob)
	// modulo maximo 500
	}

	maxRang() {
		c.beginPath()
		c.arc( this.x , this.y , 50, 0, Math.PI * 2, true )
		c.stroke()
		c.closePath()
		c.beginPath()
		c.arc( this.x , this.y , 300, 0, Math.PI * 2, true )
		c.stroke()
		c.closePath()
	}
	update() {
		if ( this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx 
		} else {
			this.dx *= resistance_to_fluid
			
		}

		if ( this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy * coefficient_of_energy_dissipated
		} else {
			this.dy = this.dy + gravity
		}



		this.x += this.dx 
		this.y += this.dy


		this.draw()
	}
}




function animate() {
	requestAnimationFrame(animate)
	// c.clearRect(0,0, canvas.width, canvas.height)
	// console.log(bullet)
	bullet.update()
}

var bullet
function init() {
	bullet = new Bullet( 100, canvas.height - 100)
	bullet.init()
}
init()


//Funcion iniciadora 
var one = 1
canvas.style.mouse ='pointer'

window.addEventListener('click', 
	function () {
		if ( one ) {
			one = 0

			bullet.getVelocity()

			animate()
		} 
})

let zombie = {
	x: undefined,
	y: undefined
}
