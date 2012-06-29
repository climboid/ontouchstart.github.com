loadXML 'color-blanket.svg', (xml, dom) ->
  root = (dom.getElementsByTagName 'svg')[0].cloneNode true
  root.style.border = '1px solid'
  root.style.width = '100%'
  document.body.appendChild root

  a = document.createElement 'a'
  a.href = xml
  a.innerHTML = xml
  a.style.display = 'block'
  a.style.margin = '1em'
  document.body.appendChild a
  loadCoffee 'color-blanket.coffee', ->
    window.colorPicker root