window.loadXML = (fn, cb) ->
  srcRoot = document.location.href.replace '/index.html', '/'
  xhr = new XMLHttpRequest
  xml = "#{srcRoot}#{fn}"
  
  xhr.onreadystatechange = ->
    if xhr.readyState is 4
      try
        parser = new DOMParser
        dom = parser.parseFromString xhr.responseText, 'text/xml'
        console.log "#{xml} is loaded"
        cb xml, dom
      catch err
        console.log err
  xhr.open 'get', xml
  do xhr.send
