(function () {
  var root = this;

  function run () {
    document.body.innerHTML = '';
    var drag = d3.behavior.drag()
      .on("dragstart", dragstart)
      .on("drag", dragmove)
      .on("dragend", dragend);

    var svg = d3.select("body").append("svg")
     .attr( { "width" : 1024, "height": 1024 });

    d3.json("us-states.json", function(json) {
      var path = d3.geo.path();

      svg.append("g")
      .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr({
          "d" : path,
          "fill" : "#0000FF",
          "stroke" : "#FFFFFF",
          "transform" : function(d) {
            d.x0 = 0;
            d.y0 = 0;
            d.dx = 0;
            d.dy = 0;
            d.offsetX = 0;
            d.offsetY = 0;
            return "translate(" + (d.dx - d.offsetX) + "," + (d.dy - d.offsetY) + ")";
          } 
      }).call(drag);
});

    function dragstart(d) {
      d3.select(this).attr("fill", "red");
    }

    function dragmove(d) {
       if(d.x0 == 0 && d.y0 == 0) {
         d.x0 = d3.event.x;
         d.y0 = d3.event.y;
       }
       d.dx = d3.event.x - d.x0;
       d.dy = d3.event.y - d.y0;
       d3.select(this).attr({
         "transform": function (d) {
          return "translate(" + (d.dx - d.offsetX) + "," + (d.dy - d.offsetY) + ")";
         }
         });
    }

    function dragend(d) {
      d.offsetX -= d.dx;
      d.offsetY -= d.dy;
      d.x0 = 0;
      d.y0 = 0;
      var delta = 10;
      if(d.offsetX < delta && d.offsetX > - delta && d.offsetY < delta && d.offsetY > - delta) { 
          d.offsetX = 0;
          d.offsetY = 0;
          d3.select(this).attr({
              "fill" : "blue",
              "transform" : "translate(0,0)"
              });
      }
      else {
          d3.select(this).attr("fill", "red");  
      }
    }
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

    route("#dragUSMap", "Drag US Map");
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);
