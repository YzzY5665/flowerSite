var DEMO=3,reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,land=matchMedia("(orientation: landscape)");
document.querySelectorAll(".car").forEach(function(el,idx){
var list=PHOTOS[el.dataset.key]||[],n=list.length||DEMO,label=el.dataset.label,cur=0,slides=[],dotEls=[],paused=false;
var track=document.createElement("div");track.className="track";
for(var i=0;i<n;i++){(function(i){var s=document.createElement("div");s.className="slide";
function ph(){s.innerHTML="";var t=document.createElement("span");t.innerHTML="REPLACE PHOTO "+(i+1)+"<br>"+label;s.appendChild(t)}
if(list.length){var im=new Image();im.src=list[i];im.alt=label+" photo "+(i+1);im.onerror=ph;s.appendChild(im)}else ph();
track.appendChild(s);slides.push(s)})(i)}
el.appendChild(track);
function layout(){track.style.transform=el.dataset.mode==="slide"?"translateX(-"+cur*100+"%)":"none";
slides.forEach(function(s,i){s.dataset.pos=Math.min((i-cur+n)%n,3);s.setAttribute("aria-hidden",i!==cur)});
dotEls.forEach(function(d,i){d.classList.toggle("on",i===cur)})}
function go(d){if(el.dataset.mode==="shuffle"&&d>0){var old=slides[cur];old.classList.add("fly");setTimeout(function(){old.style.transition="none";old.classList.remove("fly");void old.offsetWidth;old.style.transition=""},420)}
cur=(cur+d+n)%n;layout()}
function setMode(){el.dataset.mode=land.matches?"slide":"shuffle";layout()}
if(n>1){
["l","r"].forEach(function(side){var b=document.createElement("button");b.className="cbtn "+side;b.type="button";b.textContent=side==="l"?"\u2039":"\u203A";b.setAttribute("aria-label",side==="l"?"Previous photo":"Next photo");b.onclick=function(){go(side==="l"?-1:1)};el.appendChild(b)});
var dots=document.createElement("div");dots.className="dots";
for(var j=0;j<n;j++){(function(j){var d=document.createElement("button");d.type="button";d.setAttribute("aria-label","Photo "+(j+1));d.onclick=function(){cur=j;layout()};dots.appendChild(d);dotEls.push(d)})(j)}
el.appendChild(dots);
var x0=null;el.addEventListener("touchstart",function(e){x0=e.touches[0].clientX;paused=true},{passive:true});
el.addEventListener("touchend",function(e){var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(dx<0?1:-1);setTimeout(function(){paused=false},6000)},{passive:true});
el.addEventListener("mouseenter",function(){paused=true});el.addEventListener("mouseleave",function(){paused=false});
if(!reduce)setInterval(function(){if(!paused&&!document.hidden)go(1)},4500+idx*400)}
land.addEventListener("change",setMode);setMode();
});
