(function () {
  var root = this;

  function run () {
    document.body.innerHTML = '';
    var log = document.createElement('pre');
    document.body.appendChild(log);
    var table = document.createElement('table');
    document.body.appendChild(table);
    var db = openDatabase("db121212", "1.0", "db", 1024 * 1024);
    var now = Date.parse(new Date());
    db.transaction(function(tx) {
      var sql = "CREATE TABLE IF NOT EXISTS ";
      sql += " time_table(id INTEGER PRIMARY KEY ASC,";
      sql += " time INTEGER,";
      sql += " duration INTEGER";
      sql += ")";
      tx.executeSql(sql, []);
    });

    function addTime() {
      db.transaction(function(tx) {
        var sql = "INSERT INTO time_table(time,duration) VALUES(?,?)";
        tx.executeSql(sql, [now,0], function(tx, r) {
          showTime();
          setInterval(updateDuration, 1000);
        });
      });
    }

    function updateDuration() {
      db.transaction(function(tx) {
        var sql = "UPDATE time_table";
        sql += " SET duration=" + (Date.parse(new Date) - now);
        sql += " WHERE time=" + now;
        tx.executeSql(sql, [], function(tx, r) {
          showTime();
        });
      });
    }

    function showTime() {
      db.transaction(function(tx) {
        var sql = "SELECT id, time, duration FROM time_table";
        sql += " ORDER BY time DESC";
        tx.executeSql(sql, [], function(tx, r) {
           log.innerHTML = sql;
           table.innerHTML = '';
           for(var i = 0; i < r.rows.length ; i++) {
             var item = r.rows.item(i);
             var t = item.duration/1000;
             var h = Math.floor(t/3600);
             var m = Math.floor((t - h * 3600)/60);
             var s = t - h * 3600 - m * 60;
             if(h < 10) {
               h = '0' + h;
             }
             if(m < 10) {
               m = '0' + m;
             }
             if(s < 10) {
               s = '0' + s;
             }
             var duration = h + ':' + m + ':' + s;
             var tr = document.createElement('tr');
             var td_id = document.createElement('td');
             var td_time = document.createElement('td');
             var td_duration = document.createElement('td');

             td_id.innerHTML = item.id;
             td_time.innerHTML = (new Date(item.time));
             td_duration.innerHTML = duration;

             tr.appendChild(td_id);
             tr.appendChild(td_time);
             tr.appendChild(td_duration);

             table.appendChild(tr);
           }
        });
      });
    }
    addTime();
  }

  function load() {
    function route(hash, title) {
      if(document.location.hash === hash) {
        document.title = title;
        run();
      }
    }

    route("#timeTable", "Time Table");
    
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);
