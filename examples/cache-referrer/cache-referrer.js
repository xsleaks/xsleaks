(async ()=>{
  const urlParams = new URLSearchParams(window.location.search);
  const withimage = ( urlParams.get('img') == 'no'? 'no' : 'yes' );

  let url = 'img.jpg';
  // Evict this from the cache (force an error).
  history.replaceState(1,1,Array(7e4));
  await fetch(url, {cache: 'reload', mode: 'no-cors'}).catch(e=>console.error(e));
  // Load the other page (you can also use <link rel=prerender>)
  // Note that index.html must have <img src=logo.jpg>
  history.replaceState(1,1,'cache.html');
  if(withimage == 'yes')
  	winbg.src = 'with_image.html';
  else
  	winbg.src = 'without_image.html';

  await new Promise(r=>{winbg.onload=r;});
  // Check if the image was loaded.
  // For better accuracy, use a service worker with {cache: 'force-cache'}
  history.replaceState(1,1,Array(7e4));
  let img = new Image();
  img.src = url;
  try {
    await new Promise((r, e)=>{img.onerror=e;img.onload=r;});
    alert('Resource was cached'); // Otherwise it would have errored out
  } catch(e) {
    alert('Resource was not cached'); // Otherwise it would have loaded
  }
  history.replaceState(1,1,`cache.html?img=${withimage}`);
})();
