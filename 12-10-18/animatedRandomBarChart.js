(function () {
  var root = this;

  function randomData(n, m) {
    var output = [];
    for(var i = 0; i < n; i++) {
      output.push({
        "x" : i, 
        "y" : ~~(Math.random() * m)
      });
    }
    return output;
  }

  function mean (data) {
    return d3.mean(data, function(d) { return d.y; });
  }

  function median (data) {
    return d3.median(data, function(d) { return d.y; });
  }

  function run () {
    var body = d3.select("body");
    body.html("");
    var w = root.innerWidth/2;
    var h = root.innerHeight/2;
    var n = 12;
    var data = randomData(n, h);

    var container = body.append("div");
    container.style({
      position: "relative",
      margin: "auto",
      width: w,
      height: h,
      border: "1px solid #abc"
    });

    container.selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style({
         background: "blue",
         width: w/n-2,
         position: "absolute",
         left: function(d) { return (d.x * w/n + 1); },
         bottom: 0,
         height: 0
      })

    var ol = body.append("ol");
    ol.selectAll("li")
      .data(data)
      .enter()
      .append("li");

    var stats = body.append("dl");
    stats.append("dt").text("mean")
      .append("dd");
    stats.append("dt").text("medium")
      .append("dd");

    function update() {
      var data = randomData(n, h);
      container.selectAll("div")
        .data(data)
        .transition()
        .ease("bounce")
        .duration(1000)
        .style({
          height: function(d) { return (d.y); }
        });

      setTimeout(function () {
         ol.selectAll("li")
          .data(data)
          .text(function(d) { return d.y; });
         stats.selectAll("dd")
          .data([mean(data), median(data)])
          .text(function(d) { return d; });
        }, 1000);
    }
    setInterval(update, 5000);
    update();
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

    route("#animatedRandomBarChart", "Animated Random Bar Chart");
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);


