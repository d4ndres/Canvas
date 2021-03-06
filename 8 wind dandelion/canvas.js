const PI = Math.PI
const randomInt = (min, max) => Math.floor( Math.random() * ( max - min ) + min)
const fromDegToradian = deg => deg * PI / 180 
const arcFromDegToradian = rad => rad * 180 / PI 

var canvas = document.querySelector( 'canvas')

var _w, _h
function refreshSize() {
  _w = canvas.width = innerWidth
  _h = canvas.height = innerHeight
}; refreshSize();

var c = canvas.getContext( '2d')

class Dandelion {
  // d: diente, p: particulas
  constructor( origin_x, origin_y, d_radius, p_number) {
    this.d_radius = d_radius | randomInt( 10, 15)
    this.x = this.xx = origin_x | randomInt(this.d_radius * 3, _w - this.d_radius * 3)
    this.y = this.yy = origin_y | _h / 2 + randomInt(0 , _h/4)
    this.p_number = p_number | this.d_radius * 10
    this.particles = new Array( this.p_number )
    this.wind = {
      isActive: false,
      force: 0.35,
      x: randomInt( 4, 10),
      y: randomInt( -10, 10)     
    }
  }
  draw() {
    c.beginPath()
    c.arc( this.xx , this.yy, this.d_radius, 0, PI * 2, true)
    c.fillStyle = '#000'
    c.fill()
    c.moveTo( this.xx, this.yy)
    c.quadraticCurveTo( this.x + 10, _h, this.x, this.y * 2 - 10)
    c.lineWidth = 3
    c.strokeStyle = '#000'
    c.stroke()
    c.closePath()   
  }
  update() {

    this.draw()
  }
}

class Particle {
  constructor( x, y, size) {
    this.x = this.xx = x
    this.y = this.yy = y
    this.radius = randomInt( 3, 7)
    this.amplitude = randomInt( size * 2, size * 6)
    this.radians = fromDegToradian( randomInt( 0, 360 ) ) 
    this.deg = arcFromDegToradian( this.radians )
    this.wind = {
      isActive: false,
      x: Math.random() * 10 + 3,
      y: Math.random() * 4 - 2     
    }

    
  }

  draw() {
    c.beginPath()
    c.arc( this.x, this.y, this.radius, 0, PI * 2, true)
    c.strokeStyle = '#000'
    c.fillStyle = 'rgba(0,0,0, 0.4)'
    c.fill()
    c.moveTo( this.x, this.y)
    c.lineTo( this.xx, this.yy)
    c.lineWidth = 0.7
    c.strokeStyle = 'rgba(0,0,0, 0.7)'
    c.stroke()
    c.closePath()
  }
  pulldown() {

    let direction 

    if( this.deg < 270 && this.deg > 90 ) {
      direction = 1
    } else {
      direction = -1
    }

    this.deg = direction * 0.5 + this.deg
    this.radians = fromDegToradian( this.deg )
  }
  update() {
    
    if ( this.wind.isActive ) {
      this.pulldown()
      this.xx += this.wind.x
      this.yy += this.wind.y 
    }
    
    this.x = this.xx + -Math.cos( this.radians ) * this.amplitude 
    this.y = this.yy + Math.sin( this.radians ) * this.amplitude
    this.draw()
  }
}


// setup



var lions = new Array()
!function init() {
  for ( let i = 0; i < 7; i++) {
    
    lions.push( new Dandelion() )
  }
  
  lions.forEach( l => {
    for( let i = 0; i < l.p_number ; i++ ) {
      l.particles.push( new Particle( l.xx, l.yy, l.d_radius))
    } 
  })

  
  addEventListener( 'click', () => {
    lions.forEach( l => {
      l.particles.forEach( p => { if( Math.random() < 0.9 ) p.wind.isActive = true })
      l.wind.isActive = true
    })
   
    
  }) 
  
}();





// loop


function loop() {
  requestAnimationFrame(loop)
  refreshSize()
  
  lions.forEach( l => {
    l.update()
    l.particles.forEach( p => p.update())
  })
 
};loop();




