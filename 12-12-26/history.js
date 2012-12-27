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

			db.transaction(function(tx) {
				var sql = "SELECT * FROM geo_path";
				tx.executeSql(sql, [], function(tx, r) {
					for(var i = 0; i < r.rows.length ; i++) {
						var item = r.rows.item(i);
						addPin(item.latitude, item.longitude);
					}
				});
			});
		}

		function addPin(lat, lng) {
			var mapLatLng = new google.maps.LatLng(lat, lng);
			var marker = new google.maps.Marker({
				position: mapLatLng,
				map: map,
				title: 'here'
			});
		}


		function error() {
				console.log("error");
		}
			

		if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(setupMap, error);
		}

	}

	function load() {
		function route(hash, title) {
			if(document.location.hash === hash) {
				document.title = title;
				run();
			}
		}

		route("#history", "History");
		
	}

	root.addEventListener("hashchange", load);
	root.addEventListener("load", load);

}).call(this);

