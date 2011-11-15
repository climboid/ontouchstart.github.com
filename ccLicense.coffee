window.ccLicense = () ->
  license = el document.body, 'div'
  license.style.margin = '0'
  license.style.padding = '1em'
  license.style.fontFamily = 'Helvetica'
  license.style.borderBottom = '2px solid #123'
  license.ontouchmove = (e) ->
    e.preventDefault()
    license.style.display = 'none'
  license.innerHTML = '''
<span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">ontouchstart</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/ontouchstart/ontouchstart.github.com" property="cc:attributionName" rel="cc:attributionURL">Sam Liu</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.
'''