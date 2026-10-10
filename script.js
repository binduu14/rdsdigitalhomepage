// RDS Digital homepage behaviour: service tabs, ticker, mobile menu, counters, form validation
const IMG_BASE="https://rdsdigital.in/wp-content/uploads/";
const PIC={
 seo:"2024/12/Paid-Media-Services-1024x1024.png",
 influencer:"2024/10/Influencer-Marketing-1024x1024.png",
 paid:"2024/12/Paid-Media-Services-1024x1024.png",
 transform:"2024/12/Digital-Transformation-1024x1024.png",
 reputation:"2024/10/Online-Reputation-Management-1-1024x1024.png",
 dev:"2024/10/Development-1024x1024.png",
 event:"2024/12/Event-Marketing-1024x1024.png",
 pr:"2024/12/PR-1024x1024.png",
 design:"2024/10/Design-Services-1024x1024.png",
 video:"2024/10/Video-Production-1024x1024.png",
 account:"2024/11/Account-Management-1024x1024.png"
};
const GROUPS={
 "Digital":[["SEO","E-commerce, local, link building and content.","seo"],["Influencer marketing","YouTube, Instagram, LinkedIn and UGC video.","influencer"],["Paid media","Google, Meta, LinkedIn, TikTok and programmatic.","paid"],["Digital transformation","AI/ML, IoT, big data and business change.","transform"],["Reputation","Social management and crisis response.","reputation"],["Development","Websites, apps, ERP, SaaS and cloud.","dev"]],
 "Offline":[["ATL marketing","Mass-reach campaigns that support digital.","event"],["Event marketing","Corporate events and exhibition setups.","event"],["Public relations","Press releases, conferences and retainers.","pr"]],
 "Creative":[["Brand strategy","Identity, packaging and communication.","design"],["Design","UI, UX, motion, 3D and AR/VR.","design"],["Video production","Explainers, corporate, product and live action.","video"]],
 "Marketplaces":[["Account management","Amazon, Flipkart, eBay and Snapdeal.","account"]]
};
const tabs=document.getElementById("tabs"),svc=document.getElementById("svc");
function show(g){
  [...tabs.children].forEach(b=>b.setAttribute("aria-selected",b.dataset.g===g));
  svc.innerHTML=GROUPS[g].map(([t,d,k])=>`<div class="svc"><img src="${IMG_BASE}${PIC[k]}" alt="${t}" loading="lazy" referrerpolicy="no-referrer"><h3>${t}</h3><p>${d}</p></div>`).join("");
}
Object.keys(GROUPS).forEach(g=>{const b=document.createElement("button");b.className="tab";b.role="tab";b.dataset.g=g;b.textContent=g;b.onclick=()=>show(g);tabs.append(b)});
show("Digital");


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

if(matchMedia("(prefers-reduced-motion:reduce)").matches)document.querySelectorAll("video").forEach(v=>{v.removeAttribute("autoplay");v.pause()});
