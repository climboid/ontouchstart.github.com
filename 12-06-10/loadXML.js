var srcRoot = document.location.href.replace("/index.html", '');

function loadXML(fn) {
  var xhr = new XMLHttpRequest();

  var xml = srcRoot + '/' + fn + '.xml';
  var js = srcRoot + '/' + fn + '.js';

  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
      try {
        var headers = xhr.getAllResponseHeaders();
        console.log(JSON.stringify(headers));
        var parser = new DOMParser();
        var dom = parser.parseFromString(xhr.responseText, 'text/xml');  
        var svgList = dom.getElementsByTagName('svg');
        var container = document.createElement('div');
        container.id = xml;
        for(var i = 0; i < svgList.length; i++) {
          var svg = svgList[i].cloneNode(true);
          console.log(svg);
          svg.style.display = 'none';
          try {
            container.appendChild(svg);
          }
          catch(err) {
            console.log(err);
          }
        }
        document.body.appendChild(container);
        var script = document.createElement('script');
        script.src = js;
        document.body.appendChild(script);
      }
      catch (err) {
        console.log(err);
      }
    }
  };
  xhr.open("get", xml);
  xhr.send();
}