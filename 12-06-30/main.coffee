event_api = 'http://api.meetup.com/2/events/?status=upcoming&event_id=60476932&order=time&desc=false&offset=0&format=json&page=20&fields=&sig_id=13137081&sig=bda44d45dc030ecff34b76c40dfc57aedb3080e9&callback=load_event'

comments_api = 'http://api.meetup.com/2/event_comments/?event_id=60476932&order=time&show_diffs=True&desc=True&offset=0&format=json&page=200&sig_id=13137081&sig=2a251953648acd1adff446b63eb17c7fdd38374c&callback=load_comments'

addDiv = (text, parent) ->
  div = document.createElement 'div'
  div.innerHTML = text
  div.style.opacity = 0
  parent.appendChild div
  return div

show = (el, delay) ->
  if delay > 0
    setTimeout (-> el.style.opacity = 1), delay
  else
    el.style.opacity = 1

window.load_event = (data) ->
  show (addDiv (linkify data.results[0].event_url), document.body)
  show (addDiv data.results[0].description, document.body)

window.load_comments = (data) ->  
  comments = {}
  tList = []
  for item in data.results.reverse()
    tList.push item.time
    dateTime = new Date item.time
    comments["#{item.time}"] = addDiv """
<h4>
#{item.member_name}
</h4>
<blockquote>
#{linkify item.comment}
</blockquote>
<div style="color:#00cc00;font:10px monospace;">#{dateTime}</div>
""", document.body  
  minT = tList[0]
  maxT = tList[tList.length - 1]

  progress = (t) ->
    return (t - minT) / (maxT - minT)

  k0 = minT
  for own k, v of comments
    show (addDiv """
<div style="width:#{(progress k0) * 100}%; height:5px; background:#0000cc;"></div>
<div style="width:#{(progress k) * 100}%; height:5px; background:#00cc00;"></div>
<div style="width:100%; height:5px; background:#cc0000;"></div>
""", v), 0
    show v, 60 * 1000 * (progress k)
    k0 = k

loadJsonp = (api, cb) ->
  script = document.createElement 'script'
  script.src= api
  script.onload = cb
  document.body.appendChild script

loadJsonp event_api, ->
  document.title = 'Battle of the Braces'

  show (commentsButton = addDiv """
<button>
Read comments
</button>
""", document.body)

  commentsButton.onclick = ->
    this.style.display = 'none'
    show (addDiv """
<h1>
Comments
</h1>
""", document.body)
    loadJsonp comments_api, ->
      console.log 'Done'

