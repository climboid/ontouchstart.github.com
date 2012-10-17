(function () {
  var root = this;

  function randomData(n, m) {
    var output = [];
    for(var i = 0; i < n; i++) {
      output.push({
        "x" : i, 
        "y" : Math.floor(Math.random() * m)
      });
    }
    return output;
  }

  function run () {
    document.body.innerHTML = "";
    var w = root.innerWidth-100;
    var h = root.innerHeight/2;
    var n = 12;
    var data = randomData(n, h);

    var container = d3.select("body").append("div");
    container.style({
      position: "relative",
      margin: "auto",
      height: h
    });

    container.selectAll("div")
      .data(data)
      .enter()
      .append("div");

    container.selectAll("div")
      .style({
         background: "blue",
         width: w/n-2,
         position: "absolute",
         left: function(d) { return (d.x * w/n); },
         bottom: 0,
         height: function(d) { return (d.y); }
      });

    var ol = d3.select("body").append("ol");
    ol.selectAll("li")
      .data(data)
      .enter()
      .append("li");

    ol.selectAll("li").text(function(d) { return d.y; })

  }

  function load() {
    function route(hash, title) {
      if(document.location.hash === hash) {
        document.title = title;
        if(typeof d3 === "undefined") {
          var js = document.createElement("script");
          js.src = "d3.v2.js";
          js.onload = run;
          document.body.appendChild(js);
        }
        else {
          run();
        }
      }
    }

    route("#barchart", "Bar Chart");
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);

