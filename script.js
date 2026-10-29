const menuToggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);document.body.classList.toggle('menu-open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuToggle.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open')}))}const observer=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));const progress=document.querySelector('.progress-bar');function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%'}addEventListener('scroll',updateProgress,{passive:true});updateProgress();document.getElementById('year').textContent=new Date().getFullYear();
/* AFRIKA MONDE TODAY: le direct peut être défini dans l'espace d'administration. */
(async function loadLiveStream(){
 const frame=document.querySelector('#live-player');
 if(!frame) return;
 try{
  const response=await fetch('site-settings.json',{cache:'no-store'});
  if(!response.ok) return;
  const settings=await response.json();
  const raw=(settings.liveUrl||'').trim();
  if(!raw) return;
  let videoId='';
  try{
   const url=new URL(raw);
   if(url.hostname.includes('youtu.be')) videoId=url.pathname.split('/').filter(Boolean)[0]||'';
   else if(url.hostname.includes('youtube.com')) videoId=url.searchParams.get('v')||((url.pathname.includes('/live/')||url.pathname.includes('/embed/'))?url.pathname.split('/').filter(Boolean).pop():'');
  }catch(e){return;}
  if(!videoId) return;
  const player=document.createElement('iframe');
  player.title='Direct AFRIKA MONDE TODAY';
  player.src='https://www.youtube.com/embed/'+encodeURIComponent(videoId)+'?autoplay=0&rel=0';
  player.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  player.allowFullscreen=true;
  player.loading='lazy';
  player.style.cssText='width:100%;height:100%;min-height:380px;border:0;position:absolute;inset:0';
  frame.innerHTML='';
  frame.appendChild(player);
 }catch(error){/* Le site reste utilisable si aucun flux n'est configuré. */}
})();
