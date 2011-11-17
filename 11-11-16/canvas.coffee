window.setCanvas = ->
  document.title = "Touch to draw"
  c = el document.body, 'canvas'
  c.style.position = 'absolute'
  c.width = 1024
  c.height = 1024
  ctx = c.getContext '2d'

  document.addEventListener 'superTouch', (e) -> 
    document.title = "Rotate to save"
    r = Math.floor (Math.random() * 255)
    g = Math.floor (Math.random() * 255)
    b = Math.floor (Math.random() * 255)
    a = Math.random() * 0.5 + 0.5
    ctx.fillStyle = "rgba(#{r},#{g},#{b},#{a})"
    ctx.beginPath()
    ctx.arc e.x, e.y, 5, 0, Math.PI*2, true
    ctx.closePath()
    ctx.fill()

  window.onorientationchange = ->
    ctx.save()
    document.location = c.toDataURL()
