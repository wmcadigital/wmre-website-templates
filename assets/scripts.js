var trans = document.currentScript.hasAttribute('trans');
var show = document.currentScript.hasAttribute('show');

(async () => {
  document.body.insertAdjacentHTML('afterbegin', await (await fetch('nav.html')).text());
  document.body.insertAdjacentHTML('beforeend', await (await fetch('footer.html')).text());
  
  if(trans)document.querySelector('nav').setAttribute('trans','true');
  if(show)document.querySelector('.inv-strat').style.display = 'block';
  
})();
