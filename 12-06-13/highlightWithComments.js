function highlightWithComments (e) {
  var t = document.getSelection();
  var range = t.getRangeAt(0);
  if(range.collapsed) {
    return;
  }
  var s = document.createElement('span');
  s.style.background = '#FFFF00';
  s.innerText = t.toString();
  range.deleteContents();
  range.insertNode(s);
  var selected = document.getElementById('selected');;
  var h4 = document.createElement('h4');
  selected.appendChild(h4);
  var clone = s.cloneNode(true);
  clone.style.background = 'transparent';
  h4.appendChild(clone);
  var comment = document.createElement('textarea');
  comment.style.width = "90%";
  comment.rows = "6";
  selected.appendChild(comment);
}

var text = document.getElementById('text');
text.onmouseup = highlightWithComments;
text.ontouchstart = function () {
  text.onmouseup = null;
  text.ontouchstart = null;
  text.ontouchend = highlightWithComments;
}