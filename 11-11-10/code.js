(function () {
var codeArray = document.getElementsByTagName('pre');
  function loadCode(i) {
    var code = codeArray[i];
    var js = document.createElement('script');
    js.innerText = CoffeeScript.compile(code.innerText);

    code.style.webkitTransitionDelay = i * 100 + 'ms';
    code.style.padding = '0';
    code.style.width = '0';
    code.style.height = '0';
    
    code.style.overflow = 'hidden';

    code.addEventListener('webkitTransitionEnd', function () {
      code.ontouchstart = null;
      code.style.display = 'none';
      document.body.appendChild(js);
    });
  }
  
  function code(i) {
    return function () {
      for( var j = 0; j <= i; j++) {
        loadCode(j);
      }
    };
  }

  for (var i = 0; i < codeArray.length; i++) {
    codeArray[i].ontouchstart = code(i);
  }

})();

