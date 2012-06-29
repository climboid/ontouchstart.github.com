window.selectedClass = false
window.colorPicker = (node) ->
  if node.tagName
    if node.tagName is 'path'
      node.ontouchend = (e) ->
        do e.preventDefault
  
      node.ontouchstart = (e) ->
        p = node.parentNode
        console.log (p.getAttribute 'id')
        if (p.getAttribute 'id') isnt 'color-pattern-1'
          if window.selectedClass
            node.setAttribute 'class', selectedClass
        else
          for child in p.childNodes
            if child.tagName is 'path'
              child.setAttribute 'opacity', '1'
          node.setAttribute 'opacity', '0'
          window.selectedClass = node.getAttribute 'class'
        console.log window.selectedClass
    else
      for child in node.childNodes
        colorPicker child