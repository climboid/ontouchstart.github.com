(function () {
  var svg = document.getElementsByTagName('svg')[0];
  var serializer = new XMLSerializer();
 
  var p = document.createElement('p');
  p.innerHTML = 'XML source';
  document.body.appendChild(p);
  var pre = document.createElement('pre');
  pre.style.padding = '1em';
  pre.style.margin = '1em';
  pre.innerText = serializer.serializeToString(svg);
  document.body.appendChild(pre);

  var textList = document.getElementsByTagName('text');
  function edit() {
    var text = this;  
    text.input = document.createElement('input');
    text.input.style.fontSize = '24px';
    text.input.style.width = "90%";
    text.input.style.marginLeft = "5%";
    document.body.appendChild(text.input);
    text.input.style.display = 'block';
    text.input.value = text.firstChild.nodeValue;
    text.input.focus();
    text.onclick = function () {
      if(text.input.style.display == 'block') {
         text.input.style.display = 'none';
      }
      else {
         text.input.style.display = 'block';
         text.input.focus();
      }
    }

    text.input.onkeyup = function () {
      text.firstChild.nodeValue = text.input.value;
      pre.innerText = serializer.serializeToString(svg);
    }
  }
  for(var i = 0; i < textList.length; i++) {
    textList[i].onclick = edit;
  }
})();
