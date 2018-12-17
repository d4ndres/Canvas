const randomInt = (min, max)  => Math.floor(Math.random() * ( max - min) + min )

function getDistance( ob1, ob2) {
  let x = ob1.x - ob2.x
  let y = ob1.y - ob2.y
  return Math.sqrt( x*x + y*y)
}

var canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight
canvas.style.background = '#000'

var c = canvas.getContext('2d')

class Particle {
  constructor( x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = 1
    this.color = color
    this.dx = (Math.random() - 0.5) 
    this.dy = (Math.random() - 0.5) 
  }
  draw() {
    c.beginPath()
    c.arc( this.x, this.y, this.radius, Math.PI * 2, 0, true)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }
  update( array ) {
    for ( let i = 0; i < array.length; i++) {
      let d = getDistance( this, array[i])
      if ( d < 70 ) {
        c.beginPath()
        c.moveTo( this.x, this.y)
        c.lineTo( array[i].x, array[i].y)
        c.lineWidth = .1
        c.strokeStyle = '#fff'
        c.stroke()
        c.closePath()
      }
    }
    
    if ( this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy = -this.dy
    if ( this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx = -this.dx

    this.y += this.dy
    this.x += this.dx
    this.draw()
  }
} 
 

var particles = []

function init() {
  for ( let i = 0; i < 150; i++) {
    let radius = 4
    let x = randomInt(0 + radius * 2, canvas.width - radius * 2)
    let y = randomInt(0 + radius * 2, canvas.height - radius * 2)
    let color = 'rgba(255,255,255, .4)'
    particles.push( new Particle( x, y, radius,color) )
  }
}
init()



function animate() {
  c.clearRect(0,0,canvas.width,canvas.height)
  
  particles.forEach( particle => particle.update( particles ) )

  requestAnimationFrame(animate)
}
animate()