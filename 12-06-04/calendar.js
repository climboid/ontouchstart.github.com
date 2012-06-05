(function () {
  var svg = document.getElementsByTagName('svg')[0];
  svg.style.border = '1px solid';

  function setMonth(svg, offset, limit) {
    var dateList = svg.getElementsByTagName('text');
    function setDate(i, date) {
      dateList[i+6].firstChild.nodeValue = date;    
    }
 
    for(var i = 1; i < 36; i++) {
      var date = i - offset;
      if(date < 1 || date > limit) {
        setDate(i, '');
      }
      else {
        setDate(i, date);
      }
    }
    console.log(limit + offset);
    if(limit + offset > 35) {
       dateList[35].setAttribute('font-size', '12');
       setDate(29, (29-offset) + '/' + limit);
       if(limit + offset > 36) {
         dateList[36].setAttribute('font-size', '12');
         setDate(29, (29-offset) + '/' + (limit-1));
         setDate(30, (30-offset) + '/' + limit);
       }
    }
  }

  var h1 = document.createElement('h1');
  h1.innerHTML = "Five-week calendar layout patterns";
  document.title = h1.innerHTML;
  
  document.body.appendChild(h1);

  for(var i = 0; i < 7; i++ ) {
    for(var j = 28; j < 32; j++) {
      var month = svg.cloneNode(true);
      setMonth(month, i, j);
      document.body.appendChild(month);
    }
  }

})();
