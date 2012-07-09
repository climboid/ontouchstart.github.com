(function () {

var svgAttrEvt = document.createEvent('Events');
svgAttrEvt.initEvent('svgAttr', false, false);

function svgEl(parent, tag) {
var ns = "http://www.w3.org/2000/svg";
var el = document.createElementNS(ns, tag);
el.addEventListener('svgAttr', function(e) {
e.target.setAttribute(e.name, e.value);
});
parent.appendChild(el);
return el;
}

var svg = svgEl(document.body, 'svg');
svgAttrEvt.name = 'width';
svgAttrEvt.value = '500';
svg.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'height';
svgAttrEvt.value = '500';
svg.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'viewbox';
svgAttrEvt.value = '0 0 500 500';
svg.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M312 112L296 108L289 108L283 108L277 109L266 111L260 113L250 116L237 120L228 125L218 131L208 137L199 145L188 154L182 162L176 169L169 180L166 189L162 197L159 206L157 214L155 226L155 233L155 243L155 251L155 260L157 268L158 274L162 282L164 287L167 293L172 298L174 305L180 310L182 315L186 320L190 325L194 328L199 330L204 334L209 337L213 339L218 342L223 343L229 344L236 347L242 348L248 348L256 348L266 348L273 348L282 348L289 345L298 343L305 342L312 338L320 335L329 330L335 326L342 322L347 317L352 312L358 306L362 300L367 294L371 288L375 282L379 275L381 269L384 261L385 254L385 246L385 240L385 231L385 223L384 214L381 206L379 197L376 189L372 180L367 171L363 162L358 154L353 148L349 141L344 136L340 131L335 126L331 125L329 121L325 120L322 120L322 118L321 118L321 116';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M217 204L205 210L205 214L203 219L203 223L203 227L204 232L205 236L209 240L213 243L218 245L223 246L229 247L234 248L238 248L242 248L246 248L250 245L254 241L256 237L259 232L260 227L260 222L261 217L261 211L261 206L260 203L256 200L254 196L248 194L245 192L240 192L236 192L231 192L229 192L225 194L225 196';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M331 199L322 196L321 196L319 196L317 196L316 197L314 199L311 200L310 204L306 206L303 210L301 213L297 218L296 220L293 226L292 227L292 231L292 232L292 233L292 234L292 237L293 237L294 238L297 240L298 241L301 242L303 243L306 243L308 243L310 245L312 246L315 246L316 246L317 246L320 246L322 246L324 246L326 246L329 246L330 246L333 246L335 245L336 243L339 243L342 241L343 238L345 238L347 237L347 236L347 234L347 233L347 232L348 229L348 227L348 224L348 220L348 218L348 215L348 214L348 213L348 211L347 209L347 206L344 206L343 204L342 203L339 200L336 199L334 197L331 195L329 195L329 194';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M352 210L359 205L361 205L363 204L366 203L367 201L368 200L370 200L371 200L372 200L374 200';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M268 219L280 215L284 215L287 215L289 217L292 218L292 219L292 220L292 222';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M171 196L173 192L178 192L185 194L191 194L199 196L204 199L206 200L210 203L211 205L213 206L214 209L214 210L214 211L215 213L217 213';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M248 277L246 287L246 291L246 293L247 297L250 300L252 301L255 303L260 305L262 306L266 306L273 307L277 307L280 307L284 307L287 307L291 307L292 306L297 306L299 302L303 300L306 298L310 296L310 293L312 292L314 289L314 287L315 287';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M277 246L284 245L285 246L287 248L288 251L289 255L289 257L289 260L289 263L288 264L285 265L284 266L283 266L280 266L279 266L279 265L278 264L277 263';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M393 203L396 191L400 190L404 189L407 187L409 186L411 186L413 186L416 186L417 186L419 187L421 189L422 189L422 190L423 192L423 195L425 197L426 200L427 201L428 204L428 206L428 208L428 210L428 213L428 217L428 219L428 220L428 224L428 226L427 229L426 232L425 234L423 237L422 238L422 240L421 241L419 242L418 243L417 243L416 243L413 243L412 243L409 243L407 243L405 243L403 243';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M153 197L149 191L149 189L148 185L145 182L144 180L143 177L141 176L139 176L136 176L135 176L132 176L130 177L127 181L126 183L123 189L122 192L121 197L120 201L120 206L118 210L118 214L118 219L118 222L118 226L118 227L120 229L121 231L122 232L123 233L126 237L129 238L130 240L132 242L135 243L136 245L136 246L137 247L139 248L140 248L141 248L143 248L144 247L145 246L145 245L146 245L146 243L148 243L149 242L149 241';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M197 60L199 63L205 69L210 75L215 83L220 88L225 94L229 97L232 102L234 107L236 109L237 111L238 112L240 113L241 113';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M284 30L283 33L283 40L283 48L282 57L280 65L280 72L279 77L278 81L277 85L277 89L275 92L275 93';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M391 34L385 46L379 57L372 67L366 75L361 83L356 90L353 95L351 100L348 103L347 106L347 107';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M187 347L185 352L178 362L167 376L155 390L143 404L130 417L121 428L113 439L107 448L104 455L102 459';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M343 349L352 358L354 362L359 368L366 375L372 381L377 389L385 397L390 403L396 412L403 418L408 423L413 430L417 435L421 439L425 442L427 446L430 449L431 450L432 453L432 455';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'none';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M222 385L223 393L223 399L224 405L229 414L232 421L236 427L240 432L243 437L248 441L254 442L260 445L266 446L274 446L279 446L285 446L292 442L298 437L303 431L310 423L315 417L319 408L322 403L325 395L326 390L328 385L329 381L329 379L329 376L329 374L329 371';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M237 210L229 218L229 219L229 220L229 222L229 223L229 224L231 224L232 224L234 226L236 226L237 226L238 226L240 226L241 224L242 223L242 222L242 220L242 219L242 218L242 217L242 215';
path.dispatchEvent(svgAttrEvt);

var path = svgEl(svg, 'path');
svgAttrEvt.name = 'stroke';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'fill';
svgAttrEvt.value = 'rgb(0,0,0)';
path.dispatchEvent(svgAttrEvt);

svgAttrEvt.name = 'd';
svgAttrEvt.value = 'M333 214L321 218L321 219L321 220L321 222L321 223L321 224L321 226L322 226L324 226L325 226L326 226L328 226L329 226L330 226L331 226L333 226L333 224L333 223L333 222L331 220';
path.dispatchEvent(svgAttrEvt);

})();