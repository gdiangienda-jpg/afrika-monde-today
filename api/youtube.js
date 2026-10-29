// Vercel serverless function. Configure YOUTUBE_API_KEY in Vercel Environment Variables.
const BASE='https://www.googleapis.com/youtube/v3';
async function yt(path,params){const u=new URL(BASE+'/'+path);Object.entries({...params,key:process.env.YOUTUBE_API_KEY}).forEach(([k,v])=>{if(v!==undefined&&v!==null&&v!=='')u.searchParams.set(k,v)});const r=await fetch(u);const d=await r.json();if(!r.ok)throw new Error(d.error?.message||'YouTube API request failed');return d;}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=600');
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 if(!process.env.YOUTUBE_API_KEY)return res.status(503).json({error:'YouTube API is not configured'});
 try{
  const c=await yt('channels',{part:'snippet,contentDetails',forHandle:'@AfrikaMondeToday',maxResults:1});const ch=c.items?.[0];
  if(!ch)return res.status(404).json({error:'Channel not found; verify the channel handle'});
  const type=['videos','playlists','live'].includes(req.query.type)?req.query.type:'videos',token=req.query.pageToken||undefined;let items=[],nextPageToken='';
  if(type==='playlists'){const d=await yt('playlists',{part:'snippet,contentDetails',channelId:ch.id,maxResults:50,pageToken:token});items=(d.items||[]).map(x=>({id:x.id,title:x.snippet.title,description:x.snippet.description,publishedAt:x.snippet.publishedAt,thumbnail:x.snippet.thumbnails?.high?.url||x.snippet.thumbnails?.medium?.url||x.snippet.thumbnails?.default?.url,url:'https://www.youtube.com/playlist?list='+x.id,itemCount:x.contentDetails?.itemCount||0}));nextPageToken=d.nextPageToken||'';}
  else if(type==='live'){const d=await yt('search',{part:'snippet',channelId:ch.id,type:'video',eventType:'live',maxResults:50,pageToken:token,order:'date'});items=(d.items||[]).map(x=>({id:x.id.videoId,title:x.snippet.title,description:x.snippet.description,publishedAt:x.snippet.publishedAt,thumbnail:x.snippet.thumbnails?.high?.url||x.snippet.thumbnails?.medium?.url||x.snippet.thumbnails?.default?.url,url:'https://www.youtube.com/watch?v='+x.id.videoId}));nextPageToken=d.nextPageToken||'';}
  else{const uploads=ch.contentDetails?.relatedPlaylists?.uploads;if(!uploads)return res.status(502).json({error:'Uploads playlist unavailable'});const d=await yt('playlistItems',{part:'snippet,contentDetails',playlistId:uploads,maxResults:50,pageToken:token});items=(d.items||[]).filter(x=>x.snippet?.resourceId?.videoId).map(x=>({id:x.snippet.resourceId.videoId,title:x.snippet.title,description:x.snippet.description,publishedAt:x.snippet.publishedAt,thumbnail:x.snippet.thumbnails?.high?.url||x.snippet.thumbnails?.medium?.url||x.snippet.thumbnails?.default?.url,url:'https://www.youtube.com/watch?v='+x.snippet.resourceId.videoId}));nextPageToken=d.nextPageToken||'';}
  return res.status(200).json({channelTitle:ch.snippet.title,channelId:ch.id,type,items,nextPageToken});
 }catch(e){return res.status(502).json({error:'Unable to load YouTube content',details:process.env.NODE_ENV==='development'?e.message:undefined});}
};