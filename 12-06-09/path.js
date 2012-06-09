(function () {
  var path = document.location.href.replace("/index.html", '/');
  var fn = 'path';
  var xml = path + '/' + fn + '.xml';
  var container = document.getElementById(xml);
  var svg = container.getElementsByTagName('svg')[0];
  svg.style.display = 'block';
  svg.style.border = '1px solid';

  var G = document.getElementById(path + '/G.xml');
  var Gpath = G.getElementsByTagName('glyph')[0].getAttribute('d');
 
  container.ontouchstart = function () {
    var path = this.getElementsByTagName('path')[0];    
    path.setAttribute('d', Gpath);
    console.log('update path to ' + path.getAttribute('d'));
    this.ontouchstart = function() {
      path.parentNode.setAttribute('transform', 'translate(0, 300) scale(1,-1)');
      console.log('flip');
      this.ontouchstart = null;
    }
  }
  
})();
