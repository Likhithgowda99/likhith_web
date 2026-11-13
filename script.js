(function(){
  document.querySelectorAll(".copy").forEach(function(btn){
    btn.addEventListener("click",function(){
      var old=btn.textContent;
      function say(m){btn.textContent=m;setTimeout(function(){btn.textContent=old},1400)}
      function fallback(){
        var el=document.getElementById(btn.dataset.target);
        if(el){var r=document.createRange();r.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(r)}
        say("Selected");
      }
      try{navigator.clipboard.writeText(btn.dataset.copy).then(function(){say("Copied")},fallback)}catch(e){fallback()}
    });
  });
})();

(function(){
  var names=["home","resume","bio-data"],views={},links=document.querySelectorAll("nav a"),main=document.querySelector("main");
  names.forEach(function(n){views[n]=document.getElementById("view-"+n)});
  function show(h){
    if(!views[h])h="home";
    names.forEach(function(n){views[n].hidden=(n!==h)});
    links.forEach(function(a){if(a.dataset.view===h)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
    document.title=h==="home"?"Likhith Resume":"Likhith | "+(h==="resume"?"Resume":"Bio data");
    document.querySelector(".stage").setAttribute("data-view",h);
    main.scrollTop=0;window.scrollTo(0,0);
  }
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');
    if(!a)return;
    var h=a.getAttribute("href").slice(1);
    if(!views[h])return;
    e.preventDefault();show(h);
    try{history.replaceState(null,"","#"+h)}catch(x){}
  });
  window.addEventListener("hashchange",function(){show(location.hash.slice(1))});
  show(location.hash.slice(1));
})();
