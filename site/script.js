// Vanilla JS, no build step: runs as-is on github.io.
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

// reveal + counters + wave draw
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('in');io.unobserve(e.target);
}),{threshold:.15}):null;
$$('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));

const cio='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target,t=+el.dataset.count;let n=0;
  const id=setInterval(()=>{el.textContent=++n;if(n>=t)clearInterval(id)},180);
  cio.unobserve(el);
})):null;
$$('[data-count]').forEach(el=>cio?cio.observe(el):el.textContent=el.dataset.count);

// progress, section counter, wave drawing, glow
const secs=$$('[data-sec]'),count=$('#count'),prog=$('#progress'),wave=$('#wavepath'),tens=$('#tensions');
const onScroll=()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  prog.style.width=(scrollY/max*100)+'%';
  const y=scrollY+innerHeight/2;let i=0;
  secs.forEach((s,n)=>{if(s.offsetTop<=y)i=n});
  count.textContent='['+(i+1)+'/'+secs.length+']';
  if(wave){const r=tens.getBoundingClientRect();
    const p=Math.min(1,Math.max(0,(innerHeight-r.top)/(r.height+innerHeight*.4)));
    wave.style.strokeDashoffset=3000*(1-Math.min(1,p*1.6));}
};
addEventListener('scroll',onScroll,{passive:true});onScroll();
const glow=$('#glow');
addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});

// title scramble
const t=$('#title');
if(t&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const final=t.innerHTML,chars='█▓▒░<>/+*#',plain=t.textContent;let f=0;
  const run=setInterval(()=>{
    f++;const out=[...plain].map((c,i)=>c==='\n'||c===' '?c:(i<f/2?c:chars[Math.random()*chars.length|0])).join('');
    t.innerHTML=out.replace('PORTRAIT','PORTRAIT<br>').replace('PORTRAIT<br>CULTUREL','PORTRAIT<br>CULTUREL');
    if(f/2>plain.length){t.innerHTML=final;clearInterval(run)}
  },35);
}

// value filter
const sec=$('.agents-sec'),agents=$$('.agent');
$$('#values button').forEach(b=>{
  const on=()=>{sec.classList.add('filtering');b.classList.add('on');
    agents.forEach(a=>a.classList.toggle('hit',a.dataset.vals.split(' ').includes(b.dataset.v)))};
  const off=()=>{sec.classList.remove('filtering');b.classList.remove('on')};
  b.addEventListener('mouseenter',on);b.addEventListener('mouseleave',off);
  b.addEventListener('focus',on);b.addEventListener('blur',off);
});
