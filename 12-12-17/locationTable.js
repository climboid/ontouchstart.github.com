(function () {
  var root = this;

  function run () {
    document.body.innerHTML = '';
    var log = document.createElement('pre');
    document.body.appendChild(log);
    var pathContainer = document.createElement('div');
    pathContainer.style.position = 'relative';
    pathContainer.style.margin = 'auto';
    pathContainer.style.width = '500px';
    pathContainer.style.height = '500px';
    pathContainer.style.border = '1px solid';
    document.body.appendChild(pathContainer);

    var table = document.createElement('table');
    table.style.margin = '20px auto';
    document.body.appendChild(table);
    var db = openDatabase("db121217", "1.0", "db", 1024 * 1024);

    db.transaction(function(tx) {
      var sql = "CREATE TABLE IF NOT EXISTS ";
      sql += " location_table(";
      sql += " time INTEGER,";
      sql += " latitude REAL,";
      sql += " longitude REAL";
      sql += ")";
      tx.executeSql(sql, []);
    });

    function addLocation () {
      function success(data) {
        var now = Date.parse(new Date());
        var sql = "INSERT INTO location_table(time,latitude,longitude) VALUES(";
        sql += Date.parse(new Date());
        sql += ",";
        sql += data.coords.latitude;
        sql += ",";
        sql += data.coords.longitude;
        sql += ")";
        db.transaction(function(tx) {
          tx.executeSql(sql, [], function(tx, r) {
            show();
          });
        });
      }

      function error() {
        console.log("error");
      }
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }    

    function show() {
      db.transaction(function(tx) {
        var sql = "SELECT * FROM location_table";
        log.innerHTML = sql;
        var t = [];
        var x = [];
        var y = [];

        function plot(container, x, y) {
          container.innerHTML = '';
          var ns = 'http://www.w3.org/2000/svg';
          var svg = document.createElementNS(ns,'svg');
      
          svg.style.width = '500px';
          svg.style.height = '500px';
          container.appendChild(svg);

          var path = document.createElementNS(ns, 'path');
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', 'red');

          svg.appendChild(path);

          var x_min = x[0];
          var x_max = x[0];

          var y_min = y[0];
          var y_max = y[0];

          for(var i = 1; i < x.length; i++) {
            if(x[i] < x_min) { x_min = x[i]; }
            if(x[i] > x_max) { x_max = x[i]; }
            if(y[i] < y_min) { y_min = y[i]; }
            if(y[i] > y_max) { y_max = y[i]; }
          }

          var epsilon = 0.001;
          range_x = (x_max - x_min) > epsilon? (x_max - x_min) : epsilon;
          range_y = (y_max - y_min) > epsilon? (y_max - y_min) : epsilon;
          var d = 'M ';
          for(var i = 0; i < x.length; i++) {
            if(i > 0) { d += 'L'; }
            d += (x[i] - x_min) / range_x * 400 + 50 + ' ';
            d += 450 - (y[i] - y_min) / range_y * 400;
          }
          path.setAttribute('d', d);
        }

        tx.executeSql(sql, [], function(tx, r) {
           log.innerHTML = sql;
           table.innerHTML = '';
           for(var i = 0; i < r.rows.length ; i++) {
             var item = r.rows.item(i);

             var tr = document.createElement('tr');
             var td_del = document.createElement('td');
             td_del.style.color = '#FF0000';
             var td_time = document.createElement('td');
             var td_latitude = document.createElement('td');
             var td_longitude = document.createElement('td');
             
             td_del.innerHTML = '&#10008;';
             td_del.time = item.time;
             td_time.innerHTML = new Date(item.time);
             td_latitude.innerHTML = item.latitude;
             td_longitude.innerHTML = item.longitude;

             tr.appendChild(td_del);
             tr.appendChild(td_time);
             tr.appendChild(td_latitude);
             tr.appendChild(td_longitude);

             td_del.onclick = function () {
               var sql = 'DELETE FROM location_table WHERE time = ' + this.time;
               db.transaction(function(tx) {
                 tx.executeSql(sql, [], show);
               });

             };             

             table.appendChild(tr);
             x.push(item.longitude);
             y.push(item.latitude);
           }

           plot(pathContainer, x, y);
        });
      });
    }
    addLocation();
  }

  function load() {
    function route(hash, title) {
      if(document.location.hash === hash) {
        document.title = title;
        run();
      }
    }

    route("#locationTable", "Location Table");
    
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);

