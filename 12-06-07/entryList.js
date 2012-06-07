(function () {
  var entryListSVG = document.getElementById('entryListSVG');

  var cellList = document.getElementsByClassName('cell');
  for(var i = 0; i < cellList.length; i++) {
    var entryListCell = entryListSVG.cloneNode(true);
    var size = 300 + Math.floor(Math.random () * 100);

    entryListCell.style.display = 'inline';
    entryListCell.style.marginTop = '-300px';
    
    cellList[i].appendChild(entryListCell);
    cellList[i].childNodes[1].style.display = 'inline';
    cellList[i].childNodes[1].style.marginLeft = '300px';
  }
})();