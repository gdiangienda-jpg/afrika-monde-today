const menuToggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);document.body.classList.toggle('menu-open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuToggle.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open')}))}const observer=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));const progress=document.querySelector('.progress-bar');function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%'}addEventListener('scroll',updateProgress,{passive:true});updateProgress();document.getElementById('year').textContent=new Date().getFullYear();
/* Le lien du direct est chargé depuis la configuration publique en base Supabase. */
(async function loadConfiguredLive(){
 const frame=document.querySelector('.video-frame');if(!frame)return;
 const cfg=window.AMT_SUPABASE_CONFIG||{};
 if(!window.supabase||!cfg.url||!cfg.anonKey||cfg.url.includes('YOUR_')||cfg.anonKey.includes('YOUR_'))return;
 try{
  const client=window.supabase.createClient(cfg.url,cfg.anonKey);
  const {data,error}=await client.from('site_settings').select('live_url,live_title').eq('id',1).maybeSingle();
  if(error||!data?.live_url)return;
  const raw=data.live_url.trim();let id='';
  try{const u=new URL(raw);if(u.hostname==='youtu.be')id=u.pathname.split('/').filter(Boolean)[0]||'';else if(u.hostname.endsWith('youtube.com'))id=u.searchParams.get('v')||((u.pathname.includes('/live/')||u.pathname.includes('/embed/'))?u.pathname.split('/').filter(Boolean).pop():'');}catch(e){return;}
  if(!id)return;
  const player=document.createElement('iframe');player.title=data.live_title||'AFRIKA MONDE TODAY — Direct';player.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?rel=0';player.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';player.allowFullscreen=true;player.loading='lazy';player.style.cssText='position:absolute;inset:0;width:100%;height:100%;min-height:380px;border:0';
  frame.innerHTML='';frame.appendChild(player);
  const tag=document.createElement('div');tag.className='video-tag';tag.innerHTML='<i class="live-dot"></i> DIRECT YOUTUBE';frame.appendChild(tag);
 }catch(e){/* Keep the fallback design if Supabase is not configured yet. */}
})();
