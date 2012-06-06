(function () {
  var svg = document.getElementsByTagName('svg')[0];

  var today = new Date();
  function setMonth(svg, offset, limit, month) {
    var dateList = svg.getElementsByTagName('text');
    function setDate(i, date) {
      dateList[i+6].firstChild.nodeValue = date;
      if(date == today.getDate() && month == today.getMonth()) {
        dateList[i+6].setAttribute('text-decoration', 'underline');
      }    
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
    console.log("last day = " + limit);
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
    
    lastDayThisMonth = Math.floor( (firstDayNextMonth - firstDayThisMonth)/oneDay );
    
    var offset = firstDayThisMonth.getDay();
    
    var h1 = document.createElement('h1');
    var monthName = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    h1.innerHTML = monthName[month] + ' ' + year;
    h1.style.fontFamily = 'American Typewriter';
    h1.style.textAlign = 'center';
    h1.style.margin = '0';
    h1.style.padding = '0.5em';
    h1.style.borderBottom = '1px solid';
    
    var cell = svg.cloneNode(true);
    cell.style.border = '1px soild';
    setMonth(cell, offset, lastDayThisMonth, month);

    var div = document.createElement('div');
    div.style.width = '600px';
    div.style.border = '1px solid';
    div.style.margin = '1em';

    div.appendChild(h1);
    var photo = document.createElement('img');
    photo.width = 300;
    photo.height = 300;
    var size = 300 + Math.floor(Math.random () * 100);
    
    photo.src = 'http://placekitten.com/' + size + '/' + size;
    div.appendChild(photo);
    div.appendChild(cell);
    document.body.appendChild(div);
  }

  var today = new Date();
  var thisYear = today.getFullYear();

  for(var month = 0; month < 12; month++) {
    calendar(thisYear, month);
  }
  svg.style.display = 'none';
  document.title = thisYear + " Calendar";
})();
