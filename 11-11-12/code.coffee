window.el = (parent, tag) ->
  element = document.createElement tag
  parent.appendChild element
  return element

window.loadJS = (src, cbk, err) ->
  js = document.createElement 'script'
  js.src = src
  js.onload = cbk
  js.onerror = err
  document.body.appendChild js

window.print = (message) ->
  $output = el document.body, 'div'
  $output.className = 'output'
  $output.innerHTML = message

window.input = (code) -> 
  $input = el document.body, 'textarea'
  $input.style.webkitUserSelect = 'text'
  $input.style.width = '100%'
  $input.style.fontFamily = 'Courier New'
  $input.style.fontSize = '14px'
  $input.style.margin = '0em'
  $input.style.padding = '1em'
  $input.style.marginTop ='0.5em'
  $input.style.marginBottom ='0.5em'
  lines = code.split '\n'
  loc = lines.length
  $input.rows = loc
  $input.value = code

  $jsBlock = el document.body, 'pre'
  
  $jsBlock.ontouchstart = () ->
    $jsBlock.innerText = CoffeeScript.compile $input.value
    $input.blur()
    $input.style.display = 'none'

    $jsBlock.ontouchstart = (e) ->
      js = document.createElement 'script'
      js.innerText = $jsBlock.innerText
      document.body.appendChild js

      $jsBlock.style.display = 'none'

codeArray = document.getElementsByTagName 'pre'
loadCode = (i) =>
  code = codeArray[i]
  js = document.createElement 'script'
  js.innerText = CoffeeScript.compile code.innerText

  code.style.webkitTransitionDelay = i * 100 + 'ms'
  code.style.padding = '0'
  code.style.width = '0'
  code.style.height = '0'
  code.style.overflow = 'hidden'

  code.addEventListener 'webkitTransitionEnd', () ->
    code.ontouchstart = null
    code.style.display = 'none'
    document.body.appendChild js
  
code = (i) ->
  return () =>
    for j in [0..i]
      loadCode j

for i in [0..codeArray.length-1] 
  codeArray[i].ontouchstart = code i

