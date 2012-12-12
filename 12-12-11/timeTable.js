(function () {
  var root = this;

  function run () {
    var db = openDatabase("db", "1.0", "db", 1024 * 1024);

    db.transaction(function(tx) {
      var sql = "CREATE TABLE IF NOT EXISTS ";
      sql += "time_table(ID INTEGER PRIMARY KEY ASC,";
      sql += "time DATETIME";
      sql += ")";
      tx.executeSql(sql, []);
    });

    function addTime() {
      db.transaction(function(tx) {
        var t = Date.parse(new Date());
        var sql = "INSERT INTO time_table(time) VALUES(?)";
        tx.executeSql(sql, [t], function(tx, r) {
          showTime();
        });
      });
    }

    function showTime() {
      db.transaction(function(tx) {
        var sql = "SELECT * FROM time_table";
        tx.executeSql(sql, [], function(tx, r) {
           document.body.innerHTML = '<pre>' + sql + '</pre>';
           document.body.innerHTML += '<dl>';
           for(var i = 0; i < r.rows.length ; i++) {
             var item = r.rows.item(i);
             document.body.innerHTML += '<dt>' + item.ID + '</dt>';
             document.body.innerHTML += '<dd>' + (new Date(item.time)) +'</dd>';
           }
           document.body.innerHTML += "</dl>";
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
