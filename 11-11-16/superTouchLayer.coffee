superTouch = document.createEvent "Events" 
superTouch.initEvent 'superTouch', false, true

message = (obj) ->
  xy = obj.message[1].split ','
  superTouch.x = xy[0]
  superTouch.y = xy[1]
  window.parent.document.dispatchEvent superTouch

document.ontouchstart = (e) ->
  superTouch.x = e.touches[0].pageX
  superTouch.y = e.touches[0].pageY
  message { message: ['self', superTouch.x + ',' + superTouch.y] }

document.ontouchmove = (e) ->
  e.preventDefault()
  superTouch.x = e.touches[0].pageX
  superTouch.y = e.touches[0].pageY
  message { message: ['self', superTouch.x + ',' + superTouch.y] }
