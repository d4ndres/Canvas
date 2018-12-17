var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


var c = canvas.getContext('2d')



// c.fillRect(x,y,width,height)
// c.fillStyle = 'some color RGB or # etc'
c.fillStyle = 'rgba(255,0,0,0.5)'
c.fillRect( 100, 100, 100, 100)


c.fillStyle = 'rgba(0,255,0,0.5)'
c.fillRect( 500, 100, 100, 100)

c.fillStyle = 'rgba(0,0,255,0.5)'
c.fillRect( 300, 200, 100, 100)


// line

c.beginPath();
c.moveTo( 150, 150)
c.lineTo( 350, 250)
c.strokeStyle = 'red'
c.stroke()


// point 

c.beginPath()
c.moveTo( 799, 300)
c.lineTo( 801, 300)
c.stroke()

// Arc / Circle
// c.arc( x: int, y: int, r: int, startAngle: flaot, endAngle: float, drawCointerClockwise: booleano)
c.beginPath()
c.arc( 800, 300, 100,  Math.PI * 2, 0 , true )
c.stroke()


// rand elements
for (let i = 0; i < 20; i++ ){
	c.beginPath()
	let x = Math.random() * canvas.width
	let y = Math.random() * canvas.height
	c.arc( x, y, 20,  Math.PI * 2, 0 , true )
	c.strokeStyle = 'blue'
	c.stroke()

}