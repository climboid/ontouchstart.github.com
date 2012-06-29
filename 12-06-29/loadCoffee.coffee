window.loadCoffee = (fn, cb) ->
  srcRoot = document.location.href.replace '/index.html', '/'
  xhr = new XMLHttpRequest
  coffee = "#{srcRoot}#{fn}"
  
  xhr.onreadystatechange = ->
    if xhr.readyState is 4
      try
        js = CoffeeScript.compile xhr.responseText        
        script = document.createElement 'script'
        script.innerText = js
        document.body.appendChild script
        console.log "#{coffee} is loaded"
        do cb
      catch err
        console.log err
  xhr.open "get", coffee
  do xhr.send
