(function () {
  var imageSVG = document.getElementById('imageSVG');

  var cellList = document.getElementsByClassName('cell');
  for(var i = 0; i < cellList.length; i++) {
    var imageCell = imageSVG.cloneNode(true);
    var size = 300 + Math.floor(Math.random () * 100);

    imageCell.getElementsByTagName('image')[0].setAttributeNS('http://www.w3.org/1999/xlink' ,'xlink:href', 'http://placekitten.com/' + size + '/' + size);
    imageCell.style.display = 'inline';
    imageCell.style.marginTop = '-300px';   
    
    cellList[i].appendChild(imageCell);
    cellList[i].childNodes[1].style.display = 'inline';
    cellList[i].childNodes[1].style.marginLeft = '300px';
  }
})();