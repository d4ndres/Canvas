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

class dandelion {
  // d: diente, p: particulas
  constructor( origin_x, origin_y, d_radius, p_number) {
    this.x = this.xx = origin_x | _w / 2
    this.y = this.yy = origin_y | _h / 2
    this.d_radius = d_radius | 15
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
    c.fill()
    c.moveTo( this.xx, this.yy)
    c.quadraticCurveTo( this.x + 10, this.y + 20, this.x, this.y * 2 - 10)
    c.lineWidth = 5
    c.stroke()
    c.closePath()   
  }
  update() {
    if ( this.wind.isActive ) {
      this.xx += this.wind.force * 3
      this.yy += this.wind.force  
    }

    if ( this.wind.isActive && this.xx > this.x + 60 ) {
      this.wind.force = -this.wind.force
      setTimeout( () => {
        this.wind.force = -this.wind.force
      }, 400)
    } 

    this.draw()
  }
}

class Wind {
  constructor( x, y, amplitude) {
    this.x = x
    this.xx = x
    this.y = y
    this.yy = y
    this.radius = 5
    this.velocity = 10
    this.amplitude = amplitude
    this.radians = 0
    
  }

  draw() {
    c.beginPath()
    c.arc( this.x, this.y, this.radius, 0, PI * 2, true)
    c.fillStyle = '#000'
    c.fill()
    c.closePath()
  }
  deadParticle( particles = []) {
    let idx = particles.indexOf( this )
    particles.splice( idx, 1)
  }
  update( array = [] ) {
    this.radians += 0.01
    if ( this.amplitude > 0 ) {
      this.amplitude += -1
    } else {
      this.deadParticle( array )
    }
    
    this.x = this.xx + -Math.cos( this.radians * this.velocity )  * this.amplitude  * 2
    this.y = this.yy + Math.sin( this.radians * this.velocity ) * this.amplitude 
    this.draw()
  }
}

class Particle {
  constructor( x, y) {
    this.x = this.xx = x
    this.y = this.yy = y
    this.radius = randomInt( 2, 5)
    this.amplitude = randomInt( 30, 90)
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


var lion = new dandelion()

var wind = []

!function init() {

  for ( let i = 0; i < lion.p_number ; i++ ) {
    lion.particles.push( new Particle( lion.xx, lion.yy, lion.wind ))
  }
  

  addEventListener( 'click', () => {
    lion.particles.forEach( p => {
      if( Math.random() < 0.9 ) p.wind.isActive = true 
    })
    lion.wind.isActive = true
  
    setInterval( () => {
      for( let i = 0; i < 1; i++) {
        let amplitude = 100
        let x = _w /2 
        let y = randomInt( amplitude ,  amplitude * 1.2 ) + _h / 2
        wind.push( new Wind( x, y , amplitude))
      }



    },100)


  }) 
  
}();





// loop


function loop() {
  requestAnimationFrame(loop)
  refreshSize()



  lion.update()
  lion.particles.forEach( p => {

    p.update()
  })
  wind.forEach( w => w.update( wind ))
};loop();




