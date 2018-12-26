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



class Rock {
	constructor ( x, y, size) {
		this.image = new Image()
		this.url = 'rocks_rotated.png'
		this.rows = 8
		this.columns = 8
		this.width = 2028
		this.height = 2048
		this.grid = 256
		this.size = size | 100
		this.sizeBox = this.size / 3 
		this.isLoad = false

		this.queryDraw()
		this.likeAParticle( x, y)
	}
	queryDraw() {
		this.image.src = this.url
		let _this = this
		this.image.addEventListener('load', () => _this.isLoad = true )
	}
	likeAParticle( x, y) {
		this.x = x
		this.y = y
		this.sx = 0
		this.sy = 0
		this.dx = 5
	}
	draw() {
		if ( this.isLoad ) {
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
			c.arc(this.x, this.y, this.sizeBox, 0, Math.PI * 2, true)
			c.stroke()
			this.rotate()
		}
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
	update() {
		if ( this.x + this.sizeBox > _w || this.x - this.sizeBox < 0) this.dx = -this.dx
		this.x += this.dx 
		this.draw()
	}
}


// var things = []

var rock = new Rock( _w/2, _h/2, 50)
 
!function init() {
  for ( let  i = 0; i < 1; i++ ) {
  	
  }


}();
// a IIFE 

function loop() {
  requestAnimationFrame(loop)
  refreshSize()

  rock.update()



};loop();
// loop to animate