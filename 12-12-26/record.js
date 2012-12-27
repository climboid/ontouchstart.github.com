(function () {
	var root = this;

	function run () {
		document.body.innerHTML = '';

		var mapContainer = document.createElement('div');
		mapContainer.style.height = '100%';
		mapContainer.style.width = '100%';
		document.body.appendChild(mapContainer);

		var db = openDatabase("db121226", "1.0", "db", 1024 * 1024);
		var start;
		var map;

		function setupMap(data) {
			var mapLatLng = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
			var mapOptions = {
					zoom: 12,
					center: mapLatLng,
					mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(mapContainer, mapOptions);
		}

		db.transaction(function(tx) {
			var sql = "CREATE TABLE IF NOT EXISTS ";
			sql += " geo_path(";
			sql += " start INTEGER,";
			sql += " time INTEGER,";
			sql += " latitude REAL,";
			sql += " longitude REAL";
			sql += ")";
			tx.executeSql(sql, [], function () {
				start = Date.parse(new Date());
				addLocation();
			});
		});

		function addPin(lat, lng) {
			var mapLatLng = new google.maps.LatLng(lat, lng);
			var marker = new google.maps.Marker({
				position: mapLatLng,
				map: map,
				title: 'here'
			});
		}

		function addLocation () {
			function update(data) {
				var now = Date.parse(new Date());
				var sql = "INSERT INTO geo_path(start, time,latitude,longitude) VALUES(";
				sql += start;
				sql += ',';
				sql += Date.parse(new Date());
				sql += ",";
				sql += data.coords.latitude;
				sql += ",";
				sql += data.coords.longitude;
				sql += ")";
				db.transaction(function(tx) {
					tx.executeSql(sql, [], function(tx, r) {
						addPin(data.coords.latitude, data.coords.longitude);
					});
				});
			}

			function error() {
				console.log("error");
			}
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(setupMap, error, {enableHighAccuracy: false});
				navigator.geolocation.watchPosition(update, error, {enableHighAccuracy: false});
			}
		} 	 
	}

	function load() {
		function route(hash, title) {
			if(document.location.hash === hash) {
				document.title = title;
				run();
			}
		}

		route("#record", "Record");
		
	}

	root.addEventListener("hashchange", load);
	root.addEventListener("load", load);

}).call(this);

