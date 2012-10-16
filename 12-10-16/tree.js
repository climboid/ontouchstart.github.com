(function () {

 var _root = this;
 function run () {
 var width = _root.innerWidth,
 height = _root.innerHeight / 3,
 root = {},
 data = [root],
 tree = d3.layout.tree().size([width - 20, height - 20]),
 diagonal = d3.svg.diagonal(),
 duration = 350,
 timer = setInterval(update, duration);

 var vis = d3.select("body").append("svg")
 .attr("width", width)
 .attr("height", height)
 .append("g")
 .attr("transform", "translate(0, 10)");

 vis.selectAll("circle")
 .data(tree(root))
 .enter().append("circle")
 .attr("class", "node")
 .attr("r", 3.5)
 .attr("cx", width/2)
 .attr("cy", height/2);

 function update() {
   if (data.length > 1024) return clearInterval(timer);

   var d = {id: data.length}, parent;

   if(_root.mode === "random" ) {
     parent = data[~~(Math.random() * data.length)];
   }

   if(_root.mode === "binary" ) {
     parent = data[~~(data.length/2)];
   }

   if (parent.children) {
     parent.children.push(d); 
   }
   else {
     parent.children = [d];
   }
   data.push(d);

   // Compute the new tree layout. We'll stash the old layout in the data.
   var nodes = tree.nodes(root);

   // Update the nodes
   var node = vis.selectAll("circle.node")
     .data(nodes, function(d) { return d.id; });

   // Enter any new nodes at the parent's previous position.
   node.enter().append("circle")
     .attr("class", "node")
     .attr("r", 3.5)
     .attr("cx", function(d) { return d.parent.x0; })
     .attr("cy", function(d) { return d.parent.y0; });

   // Transition nodes to their new position.
   node.transition()
     .duration(duration)
     .attr("cx", x)
     .attr("cy", y);

   // Update the links
   var link = vis.selectAll("path.link")
     .attr("fill", "none")
     .attr("stroke", "#000")
     .data(tree.links(nodes), function(d) { return d.target.id; });

   // Enter any new links at the parent's previous position.
   if(data.length > 2) {
     link.enter().insert("path", "circle")
       .attr("class", "link")
       .attr("fill", "none")
       .attr("stroke", "#000")
       .attr("d", function(d) {
           var o = {x: d.source.x0, y: d.source.y0};
           return diagonal({source: o, target: o});
           });
   }

   // Transition links to their new position.
   link.transition()
     .duration(duration)
     .attr("d", diagonal);
 }

 function x(d) {
   return d.x0 = d.x;
 }

 function y(d) {
   return d.y0 = d.y;
 }
 };


 function load() {
   function route(hash, mode, title) {
     if(document.location.hash === hash) {
       document.title = title;
       _root.mode = mode;
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

   route("#binarytree", "binary", "Binary Tree");
   route("#randomtree", "random", "Random Tree");
 }


 _root.addEventListener("hashchange", load);
 _root.addEventListener("load", load);

}).call(this);

