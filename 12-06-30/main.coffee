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
  parent.appendChild div

window.load_event = (data) ->
  addDiv (linkify data.results[0].event_url), document.body
  addDiv data.results[0].description, document.body

window.load_comments = (data) ->
  for item in data.results
    dateTime = new Date item.time
    addDiv """
<h4>
#{item.member_name}
</h4>
#{dateTime}
<blockquote>
#{linkify item.comment}
</blockquote>
""", document.body

loadJsonp = (api, cb) ->
  script = document.createElement 'script'
  script.src= api
  script.onload = cb
  document.body.appendChild script

loadJsonp event_api, ->
  loadJsonp comments_api, ->
    document.title = 'Battle of the Braces'

