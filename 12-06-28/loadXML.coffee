window.loadXML = (fn) ->
  srcRoot = document.location.href.replace '/index.html', '/'
  xhr = new XMLHttpRequest
  xml = "#{srcRoot}#{fn}"
  
  xhr.onreadystatechange = ->
    if xhr.readyState is 4
      try
        parser = new DOMParser
        dom = parser.parseFromString xhr.responseText, 'text/xml'
        console.log dom
        root = (dom.getElementsByTagName 'svg')[0].cloneNode true
        root.style.border = '1px solid'
        root.style.width = '100%'
        document.body.appendChild root
        colorPicker root

        a = document.createElement 'a'
        a.href = xml
        a.innerHTML = xml
        a.style.display = 'block'
        a.style.margin = '1em'
        document.body.appendChild a
      catch err
        console.log err
  xhr.open "get", xml
  do xhr.send
