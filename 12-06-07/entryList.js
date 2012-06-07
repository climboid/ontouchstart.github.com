(function () {
  var entryListSVG = document.getElementById('entryListSVG');
  
  function edit() {
    var text = this;  
    
    input.style.display = 'block';
    input.value = text.firstChild.nodeValue;
    input.focus();
    text.onclick = function () {
      if(input.style.display == 'block') {
         input.style.display = 'none';
      }
      else {
         input.style.display = 'block';
         input.focus();
      }
    }

    input.onkeyup = function () {
      text.firstChild.nodeValue = input.value;
    }
 
    input.onblur = function () {
      text.firstChild.nodeValue = input.value;
      this.style.display = 'none';
    }
  }

  var cellList = document.getElementsByClassName('cell');
  var input = document.createElement('input');
  input.style.fontSize = '24px';
  input.style.width = "90%";
  input.style.left = "0";
  input.style.top = "0";
  input.style.position = "absolute";
  input.style.display = 'none';
  document.body.appendChild(input);
  for(var i = 0; i < cellList.length; i++) {
    var entryListCell = entryListSVG.cloneNode(true);
    
    var entryList = entryListCell.childNodes[5].childNodes;
    for(var j = 0; j < entryList.length; j++) {
      console.log(j + entryList[j]);
      entryList[j].lastChild.onclick = edit;
    }

    entryListCell.style.display = 'inline';
    entryListCell.style.marginTop = '-300px';
    
    cellList[i].appendChild(entryListCell);
    cellList[i].childNodes[1].style.display = 'inline';
    cellList[i].childNodes[1].style.marginLeft = '300px';
  }
})();