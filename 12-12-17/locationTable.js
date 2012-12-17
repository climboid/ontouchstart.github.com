(function () {
  var root = this;

  function run () {
    document.body.innerHTML = '';
    var log = document.createElement('pre');
    document.body.appendChild(log);
    var table = document.createElement('table');
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
          showTable();
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

    function showTable() {
      db.transaction(function(tx) {
        var sql = "SELECT * FROM location_table";
        log.innerHTML = sql;
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
           }
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

