var gravity = .98
var coefficient_of_energy_dissipated = .4
var resistance_to_fluid = 0.985 // condiciones normales 
// var resistance_to_fluid = 1.02 // condiciones a favor
// var resistance_to_fluid = 0.97 // condiciones en contra


var canvas = document.querySelector( 'canvas')
// get canvas


var _w, _h
function refreshSize() {
  _w = canvas.width = innerWidth
  _h = canvas.height = innerHeight
}; refreshSize();
// set width and height to canvas

var c = canvas.getContext( '2d')
// get context now you can draw from here


function mapNumber( number, maxS, maxDs) {
	if ( number > maxS) {
		number = maxDs
	} else {
		number = number * maxDs / maxS
	}
	return number
}


function getVector( ob1, ob2, maxS, maxDs) {
	let ob = {}
	ob.x = ob2.x - ob1.x
	ob.y = ob2.y - ob1.y
	ob.falseY = -ob2.y + ob1.y

	ob.h = Math.sqrt( Math.pow( ob.x, 2) + Math.pow( ob.y, 2))


	ob.uX = ob.x > 0 ? 1: -1 
	ob.uY = ob.y > 0 ? 1: -1
	
	ob.angle = Math.abs( Math.atan( ob.falseY / ob.x) )

	ob.h = mapNumber( ob.h, maxS, maxDs )

	ob.dx = ob.h * Math.cos( ob.angle ) * ob.uX
	ob.dy = ob.h * Math.sin( ob.angle ) * ob.uY

	// aun hay error
	return ob 
}


let mouse = {
	x: undefined,
	y: undefined
}


class Rock {
	constructor ( x, y, size) {
		this.image = new Image()
		this.url = 'rocks_rotated.png'
		this.rows = 8
		this.columns = 8
		this.width = 2028
		this.height = 2048
		this.grid = 256
		this.size = size | 35
		this.sizeBox = this.size / 3 
		this.isLoaded = false
		this.isRotated = false
		this.queryDraw()
		this.likeAParticle( x, y)
	}
	queryDraw() {
		this.image.src = this.url
		let _this = this
		this.image.addEventListener('load', () => _this.isLoaded = true )
	}
	likeAParticle( x, y) {
		this.xx = this.x = x
		this.yy = this.y = y
		this.maxDs = 50
		this.maxS = 200
		this.sx = 0
		this.sy = 0
		this.dx = 0
		this.dy = 0
	}
	draw() {
		if ( this.isLoaded ) {
			c.drawImage( 	
						this.image,
						this.sx,
						this.sy,
						this.grid,
						this.grid,
						this.x - this.size / 2,
						this.y - this.size / 2,
						this.size,
						this.size
						)
			// c.arc(this.x, this.y, this.sizeBox, 0, Math.PI * 2, true)
			// c.stroke()
			this.drawMaxVelocity()
		}
	}
	drawMaxVelocity() {
		c.beginPath()
		c.arc( this.xx, this.yy, this.maxS, 0, Math.PI * 2, true )
		c.stroke()
		c.closePath()
	}
	line( mouse ) {
		c.beginPath()
		c.moveTo(this.x, this.y )
		c.lineTo( mouse.x, mouse.y)
		c.stroke()
		c.closePath()

		let ob = getVector( this, mouse, this.maxS, this.maxDs) 
		
		this.dx = ob.dx
		this.dy = ob.dy

		console.log(ob)

	}
	rotate() {
		this.sx += this.grid
		if ( this.sx == this.rows * this.grid ) {
			this.sx = 0
			this.sy += this.grid
			if ( this.sy == this.columns * this.grid / 2 ) {
				this.sy = 0
			}
		}
	}
	move() {
		this.x += this.dx 
		this.y += this.dy 

		if ( this.x + this.sizeBox > _w || 
			 this.x - this.sizeBox < 0) {
			
			this.dx = -this.dx 
		}
		else {
			this.dx *= resistance_to_fluid
			
		}


		if ( this.y + this.sizeBox + this.dy > _h ) {
		 	this.dy = -this.dy * coefficient_of_energy_dissipated
		} else {
			this.dy += gravity
		}
	}
	update() {

		if ( this.isRotated ) {
			this.rotate()
			this.move()
		}

		this.draw()
	}
}



// var things = []
var rock = new Rock( 200, _h - 200, 100)



!function init() {
	canvas.addEventListener( 'click', (ev) => {
		mouse.x = ev.x
		mouse.y = ev.y


		rock.line( mouse )
		rock.isRotated = !rock.isRotated
	})

}();
// a IIFE 

function loop() {
  requestAnimationFrame(loop)
  refreshSize()
  // c.fillStyle = 'rgba(255,255,255, 0.5)'
  // c.fillRect(0,0,_w,_h)
  

  rock.update()
};loop();
// loop to animate

