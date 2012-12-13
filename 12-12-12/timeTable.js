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

    function angleToPath(angle) {
      var x = 50 + 50 * Math.sin(angle);
      var y = 50 - 50 * Math.cos(angle);
      if(angle > Math.PI) {
         return "M50,50 v-50 A50,50 0 1,1 " + x + "," + y + " Z";
      }
      else {
        return "M50,50 v-50 A50,50 0 0,1 " + x + "," + y + " Z";
      }
    }

    function pieClock(h,m,s) {
      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns,'svg');
      
      svg.style.width = '100px';
      svg.style.height = '100px';

      var h_pie = document.createElementNS(ns, 'path');
      var m_pie = document.createElementNS(ns, 'path');
      var s_pie = document.createElementNS(ns, 'path');

      var h_angle = (h * Math.PI / 6) % (2 * Math.PI);
      var m_angle = (m * Math.PI / 30);
      var s_angle = (s * Math.PI / 30);

      h_pie.setAttribute('d', angleToPath(h_angle));
      h_pie.setAttribute('fill', 'green');
      h_pie.setAttribute('opacity', 0.5);

      m_pie.setAttribute('d', angleToPath(m_angle));
      m_pie.setAttribute('fill', 'blue');
      m_pie.setAttribute('opacity', 0.5);

      s_pie.setAttribute('d', angleToPath(s_angle));
      s_pie.setAttribute('fill', 'red');
      s_pie.setAttribute('opacity', 0.5);

      svg.appendChild(s_pie);
      svg.appendChild(m_pie);
      svg.appendChild(h_pie);

      return svg;
    }

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
        var sql = "SELECT id, duration, time FROM time_table";
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
             var td_pie = document.createElement('td');
             var td_duration = document.createElement('td');
             var td_time = document.createElement('td');

             td_id.innerHTML = item.id;
             td_pie.appendChild(pieClock(t/3600,(t - h * 3600)/60,s));
             td_duration.innerHTML = duration;
             td_time.innerHTML = (new Date(item.time));

             tr.appendChild(td_id);
             tr.appendChild(td_pie);
             tr.appendChild(td_duration);
             tr.appendChild(td_time);             

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
