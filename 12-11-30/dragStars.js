(function () {
  var root = this;

  function run () {
    document.body.innerHTML = '';
    var drag = d3.behavior.drag()
      .on("dragstart", dragstart)
      .on("drag", dragmove)
      .on("dragend", dragend);

    var svg = d3.select("body").append("svg");

    var stars = svg.selectAll("polygon")
        .data([0,1,2,3,4])
          .enter()
        .append("polygon")
        .datum(function(d) { 
           return {
             x0: 0,
             y0: 0,
             dx: 0,
             dy: 0,
             offsetX: -100,
             offsetY: -180 * d + 40
           }; 
        })
        .attr({
           "fill" : "blue",
           "points" : "350,75 379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161",
           "transform" : function(d) {
               return "translate(" + (d.dx - d.offsetX) + "," + (d.dy - d.offsetY) + ")";
           }     
      })
      .call(drag);

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
       var transform =  "translate(" + (d.dx - d.offsetX) + "," + (d.dy - d.offsetY) + ")";
       d3.select(this).attr(
         {"transform": transform}
       );
    }

    function dragend(d) {
      d3.select(this).attr("fill", "blue");  
      d.offsetX -= d.dx;
      d.offsetY -= d.dy;
      d.x0 = 0;
      d.y0 = 0;
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

    route("#dragStars", "Drag Stars");
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);


