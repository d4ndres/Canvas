// w 87
// s 83
// flecha arriba 38
// flecha abajo 40

const getDistanceComponent = ( a, b) => Math.sqrt( Math.pow( a - b, 2) ) 
const randomInt = ( min, max) => Math.floor( Math.random() * (max - min ) + min)

function randomDirection() {
  if ( Math.random() - 0.5 < 0 ){
    return -1
  } else {
    return 1
  }
}

var canvas = document.querySelector('canvas')
    canvas.width = innerWidth
    canvas.height = innerHeight
    canvas.style.background = '#000'

var c = canvas.getContext('2d')

class Court {
  draw(){
    this.bigRect()
    this.bigArcRight()
    this.bigArcLeft()
    this.middleLine()
    this.smallArc()
  }
  middleLine() {
    c.beginPath()
    c.moveTo( canvas.width / 2 , 0 )
    c.lineTo( canvas.width / 2 , canvas.height )
    c.strokeStyle = '#fff'
    c.stroke()
    c.closePath()
  }
  update(){
    this.draw()
  }
  bigRect() {
    c.beginPath()
    c.moveTo( 0 , 0 )
    c.lineTo( canvas.width  , 0 )
    c.moveTo( canvas.width  , canvas.height )
    c.lineTo( 0 , canvas.height )
    c.lineWidth = 2
    c.strokeStyle = '#fff'
    c.stroke()
    c.closePath()
  }
  smallArc() {
    c.beginPath()
    c.arc( canvas.width / 2, canvas.height / 2, canvas.height * 0.05, 0, Math.PI * 2, true)
    c.fillStyle = '#000'
    c.fill()
    c.strokeStyle = '#fff'
    c.stroke()
    c.closePath()
  }
  bigArcLeft() {
    c.beginPath()
    c.arc( canvas.width / 2, canvas.height / 2, canvas.height * 0.2, Math.PI *3/2 , Math.PI / 2 , true)
    c.fillStyle = '#000'
    c.fill()
    c.strokeStyle = '#fff'
    c.stroke()
    c.closePath()
  }
  bigArcRight() {
    c.beginPath()
    c.arc( canvas.width / 2, canvas.height / 2, canvas.height * 0.2, Math.PI / 2, Math.PI *3/2  , true)
    c.fillStyle = '#000'
    c.fill()
    c.strokeStyle = '#fff'
    c.stroke()
    c.closePath()
  }
}

class Player {
  constructor( x, y, keyCodeUp, keyCodeDown) {
    this.x = x
    this.y = y
    this.halfWidth = 10
    this.halfHeight = 100
    

    this.keyCodeUp = keyCodeUp || undefined
    this.keyCodeDown = keyCodeDown || undefined
    this.keyBoolUp = false
    this.keyBoolDown = false
    this.keyOn = undefined
    

    this.isMoving = false
    

    this.dy = 2
  }
  init() {

    this.draw()
    this.watchKeys()
  }
  watchKeys() {

    window.addEventListener('keydown', (ev) => {
      let keyCode = ev.keyCode

      if ( keyCode == this.keyCodeUp ) this.keyBoolUp = true
      if ( keyCode == this.keyCodeDown ) this.keyBoolDown = true
    })
    window.addEventListener('keyup', (ev) => {
      let keyCode = ev.keyCode
      if ( keyCode == this.keyCodeUp ) this.keyBoolUp = false
      if ( keyCode == this.keyCodeDown ) this.keyBoolDown = false
    })


  } 
  draw() {
    c.beginPath()
    c.fillStyle = '#fff'
    c.fillRect( this.x - this.halfWidth / 2, this.y - this.halfHeight / 2, this.halfWidth, this.halfHeight)
    c.closePath()
  }
  moving( thePlayers = [] ) {

    for ( let i = 0 ; i < thePlayers.length; i++ ) {
      if ( thePlayers === this ) continue

      if ( this.keyBoolUp ) {
        if ( ! (this.y - this.halfHeight / 2 < 0) )this.y += -this.dy

        if ( thePlayers[i].keyBoolUp ) 
        if ( ! (thePlayers[i].y - thePlayers[i].halfHeight / 2 < 0) ) thePlayers[i].y +=  -thePlayers[i].dy
        

        if ( thePlayers[i].keyBoolDown ) 
        if ( ! (thePlayers[i].y + thePlayers[i].halfHeight / 2 > canvas.height) ) thePlayers[i].y +=  thePlayers[i].dy
      }


      if ( this.keyBoolDown ) {
        if ( ! (this.y + this.halfHeight / 2 > canvas.height) )this.y += this.dy

        if ( thePlayers[i].keyBoolUp ) 
        if ( ! (thePlayers[i].y - thePlayers[i].halfHeight / 2 < 0) ) thePlayers[i].y +=  -thePlayers[i].dy
        

        if ( thePlayers[i].keyBoolDown ) 
        if ( ! (thePlayers[i].y + thePlayers[i].halfHeight / 2 > canvas.height) ) thePlayers[i].y +=  thePlayers[i].dy

      }
    }
  }
  update( thePlayers = [] ) {

    this.moving( thePlayers )



    this.draw()
  }
}

class Ball {
  constructor( x, y, radius, color) {
    this.x = x || canvas.width / 2
    this.y = y || canvas.height / 2
    this.radius = radius || 6
    this.color = color || '#fff'
    this.dy = (Math.random() - 0.5 ) * 4
    this.dx = randomDirection() * 4
  }
  draw() {
    c.beginPath()
    c.arc( this.x, this.y, this.radius, 0, Math.PI * 2, true)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }
  update( wall = [] ) {

    for (let i = 0; i < wall.length; i++) {
      let x = getDistanceComponent( this.x, wall[i].x)
      let y = getDistanceComponent( this.y, wall[i].y)


      if ( x - this.radius - wall[i].halfWidth / 2 <= 0 ) 
      if ( y - this.radius - wall[i].halfHeight / 2 <= 0 ) this.dx = -this.dx

      // lados con circulos


    }


    if ( this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy = -this.dy
    if ( this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx = -this.dx

    this.y += this.dy
    this.x += this.dx
    this.draw()
  }
}
class Counter {
  constructor( x, y) {
    this.x = x || canvas.width / 2
    this.y = y || 0
    this.pointsLeft = 0
    this.pointsRight = 0
  }
  draw() {
    this.size()
    this.counterLeft()
    this.counterRight()
  }
  update() {
    this.draw()
  }
  size(){
    c.beginPath()
    c.fillStyle = 'rgba( 255, 255, 255, .5)'
    c.fillRect( this.x - 100 , this.y, 200, 60)
    c.strokeStyle = '#fff'
    c.strokeRect( this.x - 100 , this.y, 200, 60)
    c.closePath()
  }
  counterLeft() {
    c.font = "40px Arial";
    c.fillStyle = '#000'
    c.fillText( `${this.pointsLeft}`, this.x - 70, this.y + 45);
  }
  counterRight() {
    c.font = "40px Arial";
    c.fillStyle = '#000'
    c.fillText( `${this.pointsLeft}`, this.x + 30, this.y + 45);
  }

}

class Game {
  constructor() {

    this.initOne = true
  }
  init(){


    this.start()
  }
  start() {

    document.body.style.cursor = 'pointer'
    addEventListener('click', () => {
      if ( this.initOne ) {
        animate() 
        document.body.style.cursor = 'default'
        this.initOne = false
      }

    })
    
  }
}

var game = new Game()
game.init()


var counter = new Counter()
var court = new Court()
var ball = new Ball()
var players = [
  new Player( 100 , canvas.height / 2, 87, 83),
  new Player( canvas.width - 100, canvas.height / 2, 38, 40)
]
players.forEach( p => p.init())
court.update()
counter.draw()
ball.draw( players )


function animate () {
  requestAnimationFrame( animate )
  c.clearRect( 0, 0, canvas.width, canvas.height)
  court.update()
  counter.update()
  players.forEach( p => p.update( players ))
  ball.update( players )
}



