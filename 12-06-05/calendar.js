(function () {
  var svg = document.getElementsByTagName('svg')[0];
  svg.style.border = '1px solid';

  var today = new Date();
  function setMonth(svg, offset, limit, month) {
    var dateList = svg.getElementsByClassName('date');
    function setDate(i, date) {
      dateList[i].firstChild.nodeValue = date;
      if(date == today.getDate() && month == today.getMonth()) {
        dateList[i].setAttribute('text-decoration', 'underline');
      }    
    }
 
    for(var i = 0; i < 35; i++) {
      var date = i - offset + 1;
      if(date < 1 || date > limit) {
        setDate(i, '');
      }
      else {
        setDate(i, date);
      }
    }
    console.log("last day = " + limit);
    if(limit + offset > 35) {
       dateList[28].setAttribute('font-size', '12');
       setDate(28, (29-offset) + '/' + limit);
       if(limit + offset > 36) {
         dateList[29].setAttribute('font-size', '12');
         setDate(28, (29-offset) + '/' + (limit-1));
         setDate(29, (30-offset) + '/' + limit);
       }
    }
  }

  function calendar(year, month) {    
    var firstDayThisMonth = new Date(year, month, 1);
    var secondDayThisMonth= new Date(year, month, 2);
    var oneDay = secondDayThisMonth - firstDayThisMonth;
    
    if(month < 12) {
      var firstDayNextMonth = new Date(year, month+1, 1);
    }
    else {
      var firstDayNextMonth = new Date(year+1, 0, 1);
    }
    
    lastDayThisMonth = Math.round( (firstDayNextMonth - firstDayThisMonth)/oneDay );
    
    var offset = firstDayThisMonth.getDay();
    
    var h1 = document.createElement('h1');
    var monthName = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    h1.innerHTML = monthName[month] + ' ' + year;
    document.body.appendChild(h1);
    console.log(h1.innerHTML);
    var cell = svg.cloneNode(true);
    setMonth(cell, offset, lastDayThisMonth, month);
    document.body.appendChild(cell);
  }

  var today = new Date();
  var thisYear = today.getFullYear();

  for(var month = 0; month < 12; month++) {
    calendar(thisYear, month);
  }
  svg.style.display = 'none';
  document.title = thisYear + " Calendar";
})();
