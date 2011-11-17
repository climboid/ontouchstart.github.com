superTouch = document.createEvent "Events" 
superTouch.initEvent 'superTouch', false, true

document.ontouchstart = (e) ->
  superTouch.x = e.touches[0].pageX
  superTouch.y = e.touches[0].pageY
  window.parent.document.dispatchEvent superTouch

document.ontouchmove = (e) ->
  e.preventDefault()
  superTouch.x = e.touches[0].pageX
  superTouch.y = e.touches[0].pageY
  window.parent.document.dispatchEvent superTouch