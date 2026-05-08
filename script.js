/* LOADER */
window.addEventListener('load', () => { setTimeout(() => { document.getElementById('loader').classList.add('hidden'); }, 2600); });

/* CURSOR */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mX=0,mY=0,rX=0,rY=0;
document.addEventListener('mousemove', e => {
  mX=e.clientX; mY=e.clientY;
  dot.style.transform=`translate(${mX}px,${mY}px) translate(-50%,-50%)`;
});
(function ar(){rX+=(mX-rX)*0.12;rY+=(mY-rY)*0.12;ring.style.transform=`translate(${rX}px,${rY}px) translate(-50%,-50%)`;requestAnimationFrame(ar);})();
document.querySelectorAll('a,button,.service-card,.gallery-item,.team-card,.product-card,.location-item,.ba-tab,.ba-slider-wrap,.gc-amount-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hovered'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hovered'));
});

/* MOBILE MENU */
function toggleMobileMenu(){
  const m=document.getElementById('mobileMenu'),h=document.getElementById('hamburger');
  const o=m.classList.toggle('open');h.classList.toggle('open');
  document.body.style.overflow=o?'hidden':'';
}
function closeMobileMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow='';
}

/* NAVBAR */
window.addEventListener('scroll',()=>{document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);});

/* REVEAL */
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>obs.observe(el));

/* PARTICLES */
const pc=document.getElementById('particles');
for(let i=0;i<30;i++){
  const p=document.createElement('div');p.classList.add('particle');
  p.style.setProperty('--dur',`${6+Math.random()*10}s`);
  p.style.setProperty('--delay',`${Math.random()*10}s`);
  p.style.left=`${Math.random()*100}%`;
  const s=`${1+Math.random()*3}px`;p.style.width=p.style.height=s;
  p.style.background=Math.random()>0.5?'#c9a567':'#f5e6a3';
  pc.appendChild(p);
}

/* VIDEO */
const hv=document.getElementById('heroVideo');
if(hv)hv.addEventListener('canplay',()=>hv.classList.add('loaded'));

/* TESTIMONIALS */
const tt=document.getElementById('testimonialTrack');
const td=document.querySelectorAll('.dot');
let tc=0;
function goTo(i){tc=(i+3)%3;tt.style.transform=`translateX(-${tc*100}%)`;td.forEach((d,j)=>d.classList.toggle('active',j===tc));}
document.getElementById('nextBtn').addEventListener('click',()=>goTo(tc+1));
document.querySelectorAll('.dot').forEach(d=>d.addEventListener('click',()=>goTo(parseInt(d.dataset.index))));
setInterval(()=>goTo(tc+1),5500);

/* FLIP CARDS */
document.querySelectorAll('.transform-card').forEach(card=>{
  card.addEventListener('click',()=>card.classList.toggle('flipped'));
});

/* GIFT CARD */
function selectGCAmount(btn,val){
  document.querySelectorAll('.gc-amount-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('gcValue').textContent=val>=1000?'1,000':val;
}

/* LOCATION SWITCHER */
const LD=[
  {name:'Haussmann Flagship',addr:'14 Boulevard Haussmann, Paris',src:'src1'},
  {name:'Sloane Square Atelier',addr:'3 Sloane Square', src:'src2'},
  {name:'Fifth Avenue Studio',addr:'680 Fifth Avenue',src:'src3'}
];
function switchLocation(el,idx){
  document.querySelectorAll('.location-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
}

/* BOOKING */
function handleBooking(btn){
  const s=btn.querySelector('span');s.textContent='Sending...';btn.disabled=true;
  setTimeout(()=>{s.textContent='Reservation Requested!';},1500);
}

/* STAT COUNTERS */
const so=new IntersectionObserver(es=>{es.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,orig=el.textContent,num=parseFloat(orig.replace(/[^0-9.]/g,''));
  let v=0;const step=num/60;
  const iv=setInterval(()=>{v+=step;if(v>=num){clearInterval(iv);el.textContent=orig;return;}el.textContent=Math.floor(v)+(orig.includes('K')?'K+':orig.includes('%')?'%':'');},25);
  so.unobserve(el);
});},{threshold:0.8});
document.querySelectorAll('.stat-num').forEach(el=>so.observe(el));

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'});}
  });
});