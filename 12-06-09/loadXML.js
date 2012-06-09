function loadXML(fn) {
  var xhr = new XMLHttpRequest();
  var path = document.location.href.replace("/index.html", '/');
  var xml = path + '/' + fn + '.xml';
  var js = path + '/' + fn + '.js';

  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
      try {
        var headers = xhr.getAllResponseHeaders();
        console.log(JSON.stringify(headers));  
        var svgList = xhr.responseXML.getElementsByTagName('svg');
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