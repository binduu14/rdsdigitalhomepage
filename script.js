// RDS Digital homepage behaviour: service tabs, ticker, mobile menu, counters, form validation
const GROUPS={
 "Digital":[["SEO","E-commerce, local, link building and content."],["Influencer marketing","YouTube, Instagram, LinkedIn and UGC video."],["Paid media","Google, Meta, LinkedIn, TikTok and programmatic."],["Digital transformation","AI/ML, IoT, big data and business change."],["Reputation","Social management and crisis response."],["Development","Websites, apps, ERP, SaaS and cloud."]],
 "Offline":[["ATL marketing","Mass-reach campaigns that support digital."],["Event marketing","Corporate events and exhibition setups."],["Public relations","Press releases, conferences and retainers."]],
 "Creative":[["Brand strategy","Identity, packaging and communication."],["Design","UI, UX, motion, 3D and AR/VR."],["Video production","Explainers, corporate, product and live action."]],
 "Marketplaces":[["Amazon","Account management."],["Flipkart","Account management."],["eBay and Snapdeal","Account management."]]
};
const tabs=document.getElementById("tabs"),svc=document.getElementById("svc");
const ICONS=["<circle cx='11' cy='11' r='6'/><path d='M16 16l5 5'/>","<path d='M3 11v3l12 5V6zM15 9c3 0 5 1 5 3s-2 3-5 3'/><path d='M6 14l1 5h3l-1-4'/>","<path d='M3 20h18M6 16v-5M11 16V7M16 16v-8M21 4l-5 5'/>","<rect x='6' y='6' width='12' height='12' rx='2'/><path d='M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4'/>","<path d='M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z'/><path d='M8.5 12l2.5 2.5L16 9'/>","<path d='M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16'/>","<path d='M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z'/><circle cx='12' cy='10' r='2.5'/>","<path d='M4 4h16v12H9l-5 4z'/>","<path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'/>","<path d='M12 3a9 9 0 100 18c2 0 2-2 1-3s0-3 2-3h3a3 3 0 003-3c0-5-4-9-9-9z'/><circle cx='8' cy='10' r='1'/><circle cx='12' cy='7' r='1'/><circle cx='16' cy='10' r='1'/>","<rect x='3' y='5' width='18' height='14' rx='3'/><path d='M10 9l5 3-5 3z'/>","<path d='M3 4h3l3 12h10l2-8H7'/><circle cx='10' cy='20' r='1.5'/><circle cx='18' cy='20' r='1.5'/>"];
const COLS=["#FFB21E","#FF9DB0","#B8F0DC","#C9C0FF","#BFD6FF"];
let ic=0;
function show(g){
  [...tabs.children].forEach(b=>b.setAttribute("aria-selected",b.dataset.g===g));
  svc.innerHTML=GROUPS[g].map(([t,d],i)=>{const k=(Object.keys(GROUPS).indexOf(g)*3+i)%12,c=COLS[k%5];return `<div class="svc" style="--c:${c}"><div class="ico" style="background:${c}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg></div><h3>${t}</h3><p>${d}</p></div>`}).join("");
}
Object.keys(GROUPS).forEach(g=>{const b=document.createElement("button");b.className="tab";b.role="tab";b.dataset.g=g;b.textContent=g;b.onclick=()=>show(g);tabs.append(b)});
show("Digital");

const words=["SEO","Paid media","Branding","Web development","Video","PR","Influencers","Design"];
document.getElementById("track").innerHTML=[...words,...words,...words,...words].map(w=>`<span>${w}</span>`).join("");

const nav=document.getElementById("nav"),mb=document.querySelector(".menu-btn");
mb.onclick=()=>{const o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>{nav.classList.remove("open");mb.setAttribute("aria-expanded",false)});

const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;io.unobserve(e.target);
  const el=e.target,n=+el.dataset.n,s=el.dataset.s;
  if(reduce){el.textContent=n+s;return}
  const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(t0);
}),{threshold:.6});
document.querySelectorAll("[data-n]").forEach(el=>io.observe(el));

document.getElementById("form").addEventListener("submit",e=>{
  e.preventDefault();const f=e.target,m=document.getElementById("msg");
  if(!f.name.value.trim()||!/\S+@\S+\.\S+/.test(f.email.value)){m.textContent="Enter your name and a valid email to continue.";return}
  m.textContent="Thanks, "+f.name.value.trim()+". We'll email you to set up the call.";f.reset();
});
