window.setCanvas = ->
  document.title = "Touch to draw"
  c = el document.body, 'canvas'
  c.style.position = 'absolute'
  c.width = 1024
  c.height = 1024
  ctx = c.getContext '2d'
  Xmax = 0
  Ymax = 0
  Xmin = 1024
  Ymin = 1024

  dataArray = []

  document.addEventListener 'superTouch', (e) -> 
    document.title = "Rotate to save"
    r = Math.floor (Math.random() * 255)
    g = Math.floor (Math.random() * 255)
    b = Math.floor (Math.random() * 255)
    a = Math.random() * 0.5 + 0.5
    color = "rgba(#{r},#{g},#{b},#{a})"
    Xmax = e.x if e.x > Xmax
    Ymax = e.y if e.y > Ymax
    Xmin = e.x if e.x < Xmin
    Ymin = e.y if e.y < Ymin
    data = {}
    data.x = e.x
    data.y = e.y
    data.color = color
   
    dataArray.push data

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc e.x, e.y, 5, 0, Math.PI*2, true
    ctx.closePath()
    ctx.fill()

  window.onorientationchange = ->
    ctx.save()
    
    c.width = Xmax - Xmin + 100
    c.height = Ymax - Ymin + 100
    for i in [0..dataArray.length-1]
      data = dataArray[i]
      x = data.x - Xmin + 50
      y = data.y - Ymin + 50
      color = data.color 

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc x, y, 5, 0, Math.PI*2, true
      ctx.closePath()
      ctx.fill()       
    document.location = c.toDataURL()

