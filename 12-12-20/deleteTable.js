(function () {
	var root = this;

	function run () {
		document.body.innerHTML = '';

		var db = openDatabase("db121220", "1.0", "db", 1024 * 1024);

		db.transaction(function(tx) {
			var sql = "DROP TABLE ";
			sql += " geo_path";
			tx.executeSql(sql, [], function () {
				alert("geo_path table has been deleted!");
			});
		}); 	 
	}

	function load() {
		function route(hash, title) {
			if(document.location.hash === hash) {
				document.title = title;
				run();
			}
		}
		route("#deleteTable", "Delete Table");	 
	}

	root.addEventListener("hashchange", load);
	root.addEventListener("load", load);

}).call(this);

