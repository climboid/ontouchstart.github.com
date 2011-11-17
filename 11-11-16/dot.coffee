dot = (x,y) ->
  el = document.createElement 'div'
  el.style.position = 'absolute'
  el.style.width = '10px'
  el.style.height = '10px'
  el.style.borderRadius = '10px'
  el.x = x
  el.y = y
  r = Math.floor (Math.random() * 255)
  g = Math.floor (Math.random() * 255)
  b = Math.floor (Math.random() * 255)
  a = Math.random() * 0.5 + 0.5
  el.style.backgroundColor = "rgba(#{r},#{g},#{b},#{a})"
  el.style.left = "#{x - 5}px"
  el.style.top = "#{y - 5}px"
  document.body.appendChild el

document.addEventListener 'superTouch', (e) -> 
  dot e.x, e.y