const PI = Math.PI
const randomInt = ( min, max) => Math.floor( Math.random() * (max - min) + min)
function getDistance( x1, y1, x2, y2) {
  let x = x2 - x1
  let y = y2 - y1
  return Math.sqrt( x*x + y*y )
}
function getSpeed(ob1, ob2) {
  let obs = {}
  obs.x = ob2.x - ob1.x
  obs.y = ob2.y - ob1.y
  obs.falseY = -ob2.y + ob1.y 
  obs.h = Math.sqrt( Math.pow( obs.x, 2) + Math.pow( obs.y, 2))
  obs.uX = obs.x / obs.h
  obs.uY = obs.y / obs.h
  obs.angle = Math.abs( Math.atan( obs.falseY / obs.x) )

  let vv = {}
  vv.cx = ob1.dx
  vv.cy = ob1.dy
  vv.h = Math.sqrt( Math.pow( vv.cx, 2) + Math.pow( vv.cy, 2))
  vv.angle = Math.abs( Math.atan( vv.cy / vv.cx) )
  vv.angle = Math.abs( vv.angle - obs.angle)
  vv.uX = vv.cx / vv.h
  vv.uY = vv.cy / vv.h
  vv.dx = obs.uX * vv.h
  vv.dy = obs.uY * vv.h
  return vv
}
var colors = [
  `rgba(255, 82, 82,1.0)`,
  `rgba(255, 177, 66,1.0)`,
  `rgba(33, 140, 116,1.0)`,
  `rgba(255, 218, 121,1.0)`
]


var canvas = document.querySelector( 'canvas')
canvas.style.background = '#000'

var _w, _h
function refreshSize() {
  _w = canvas.width = innerWidth
  _h = canvas.height = innerHeight
}; refreshSize();


var c = canvas.getContext( '2d')


class Particle {
  constructor( x, y, radius){
    this.x = x
    this.y = y
    this.radius = radius
    this.dx = randomInt( -5, 5)
    this.dy = randomInt( -5, 5)
    this.isImpact = false
    this.color = colors[ randomInt(0, colors.length)]
    this.opacity = 0
  }
  draw( d = 0) {
    c.beginPath()
    c.arc( this.x, this.y, this.radius, 0, PI * 2, true)
    c.save()
    c.globalAlpha = this.opacity
    c.fillStyle = this.color
    c.fill()
    c.restore()
    c.strokeStyle = this.color
    c.stroke()
    c.closePath()
  }
  move(){
    
    if ( this.x + this.radius + Math.abs (this.dx) > _w ||
         this.x - this.radius - Math.abs (this.dx) < 0) this.dx  = -this.dx 
    
    if ( this.y + this.radius + Math.abs (this.dy) > _h ||
         this.y - this.radius - Math.abs (this.dy) < 0) this.dy  = -this.dy 
    this.x += this.dx
    this.y += this.dy
  }
  impactWatcher( others ) {
    for ( let i = 0; i < others.length; i++) {
      
      if( others[i] === this) continue
      let d = getDistance( 
                          others[i].x + others[i].dx,
                          others[i].y + others[i].dy,
                          this.x + this.dx,
                          this.y + this.dy
                          )

      if ( this.isImpact ) {
        c.moveTo( this.x, this.y)
        c.lineTo( others[i].x, others[i].y)
        c.strokeStyle = 'red'
        c.stroke()
        c.closePath()
      }

      if ( d - this.radius * 2 < 0) {
        this.speedChange( others[i] )
      }
      
    }
  }
  speedChange( thing = {} ) {

    // this.isImpact = true 

    let vv = getSpeed(this, thing)
    thing.dx += vv.dx
    thing.dy += vv.dy

  }
  showVector() {
    c.beginPath()
    c.moveTo( this.x, this.y)
    c.lineTo( this.x + this.dx * 100, this.y + this.dy * 100)
    c.strokeStyle = 'blue'
    c.stroke()
    c.closePath()
  }
  fill() {
      let d = getDistance( this.x,this.y,
                           mouse.x ,mouse.y )
      if ( d < 100 ) {
        this.opacity += 0.03
      } else if ( this.opacity > 0) {
        this.opacity += -0.03
        
        this.opacity = Math.max( 0, this.opacity)
      }
  }
  update( array = [] ) {
    this.impactWatcher( array )
    if ( this.isImpact ) this.showVector()
    this.move()
    this.fill()
    this.draw()
  }
}


var particles = new Array()
!function init() {
  for ( let i = 0; i < 50; i++){
    let radius = 15
    let x = randomInt( radius , _w - radius )
    let y = randomInt( radius , _h - radius )
    particles.push( new Particle( x, y, radius))
    
    
    for ( let j = 0; j < particles.length; j++) {
      
      if( particles[i] === particles[j]) continue
      let d = getDistance( 
                          particles[i].x,
                          particles[i].y,
                          particles[j].x,
                          particles[j].y
                          )
      if ( d - radius * 2 < 0) {
        
        particles[i].x = randomInt( radius , _w - radius )
        particles[i].y = randomInt( radius , _h - radius )
        j = -1
      }
    }
  } 
  
  
}();

let mouse = {x : undefined, y: undefined}
canvas.addEventListener( 'mousemove', (ev) =>{
  mouse.x = ev.x
  mouse.y = ev.y
})




function loop() {
  requestAnimationFrame(loop)
  refreshSize()
  

  particles.forEach( p => p.update( particles ))
};loop();
