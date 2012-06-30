event_api = 'http://api.meetup.com/2/events/?status=upcoming&event_id=60476932&order=time&desc=false&offset=0&format=json&page=20&fields=&sig_id=13137081&sig=bda44d45dc030ecff34b76c40dfc57aedb3080e9&callback=load_event'

comments_api = 'http://api.meetup.com/2/event_comments/?event_id=60476932&order=time&show_diffs=True&desc=True&offset=0&format=json&page=200&sig_id=13137081&sig=2a251953648acd1adff446b63eb17c7fdd38374c&callback=load_comments'

addLink = (url) ->
  """
<a href="#{url}">#{url}</a>
"""

linkify = (text) ->
  output = ''
  for token in text.split /\s+/g
    if token.match /^(http|https):\/\//
      output += addLink token
    else
      output += token
    output += ' '
  return output

addDiv = (text, parent) ->
  div = document.createElement 'div'
  div.innerHTML = text
  div.style.display = 'none'
  div.style.opacity = '0'
  parent.appendChild div
  return div

show = (el, duration, delay) ->
  el.style.webkitTransitionDuration = "#{duration}ms"
  el.style.webkitTransitionDelay = "#{delay}ms"
  el.style.display = 'block'
  setTimeout ->  
               el.style.opacity = '1'
             , delay

window.load_event = (data) ->
  show (addDiv (linkify data.results[0].event_url), document.body), 0, 0
  show (addDiv data.results[0].description, document.body), 0, 0

window.load_comments = (data) ->
  readButton = addDiv """
<button>
Read comments
</button>
""", document.body

  show readButton, 0, 0

  comments = {}
  t = []
  for item in data.results.reverse()
    t.push item.time
    dateTime = new Date item.time
    comments["#{item.time}"] = addDiv """
<h4>
#{item.member_name}
</h4>
#{dateTime}
<blockquote>
#{linkify item.comment}
</blockquote>
""", document.body  
  minT = t[0]
  maxT = t[t.length - 1]

  showComments = ->
    readButton.style.display = 'none'
    for own k, v of comments  
      show v, 100, 10000 * (k - minT) / (maxT - minT)

  readButton.onclick = showComments

loadJsonp = (api, cb) ->
  script = document.createElement 'script'
  script.src= api
  script.onload = cb
  document.body.appendChild script

loadJsonp event_api, ->
  loadJsonp comments_api, ->
    document.title = 'Battle of the Braces'

