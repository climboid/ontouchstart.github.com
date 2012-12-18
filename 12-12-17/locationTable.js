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

        function plot(container, x, y, t) {
          var x_min = x[0];
          var x_max = x[0];

          var y_min = y[0];
          var y_max = y[0];
         
          var t_min = t[0];
          var t_max = t[0];

          for(var i = 1; i < t.length; i++) {
            if(x[i] < x_min) { x_min = x[i]; }
            if(x[i] > x_max) { x_max = x[i]; }
            if(y[i] < y_min) { y_min = y[i]; }
            if(y[i] > y_max) { y_max = y[i]; }
            if(t[i] < t_min) { t_min = t[i]; }
            if(t[i] < t_max) { t_max = t[i]; }
          }

          var epsilon = 0.001;
          range_x = (x_max - x_min) > epsilon? (x_max - x_min) : epsilon;
          range_y = (y_max - y_min) > epsilon? (y_max - y_min) : epsilon;

          for(var i = 0; i < t.length; i++) {
            var dot = document.createElement('div');
            dot.innerHTML = '+';
            dot.style.position = 'absolute';
            dot.style.left = (x[i] - x_min) / range_x * 400 + 50 + 'px';
            dot.style.top = 450 - (y[i] - y_min) / range_y * 400 + 'px';
            container.appendChild(dot);            
          }

        }


        tx.executeSql(sql, [], function(tx, r) {
           log.innerHTML = sql;
           table.innerHTML = '';
           for(var i = 0; i < r.rows.length ; i++) {
             var item = r.rows.item(i);

             var tr = document.createElement('tr');

             var td_time = document.createElement('td');
             var td_latitude = document.createElement('td');
             var td_longitude = document.createElement('td');
             
             td_time.innerHTML = new Date(item.time);
             td_latitude.innerHTML = item.latitude;
             td_longitude.innerHTML = item.longitude;

             tr.appendChild(td_time);
             tr.appendChild(td_latitude);
             tr.appendChild(td_longitude);            

             table.appendChild(tr);

             t.push(item.time);
             x.push(item.longitude);
             y.push(item.latitude);
           }

           plot(pathContainer, x, y, t);
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

