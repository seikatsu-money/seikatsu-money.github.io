const yen=n=>Math.round(Number.isFinite(n)?n:0).toLocaleString('ja-JP')+'円';
const num=id=>Number(document.getElementById(id)?.value||0);
const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};
const pct=(id)=>num(id)/100;
function salaryDeduction(annual){if(annual<=1900000)return 650000;if(annual<=3600000)return annual*.3+80000;if(annual<=6600000)return annual*.2+440000;if(annual<=8500000)return annual*.1+1100000;return 1950000}
function incomeTax(t){if(t<=0)return 0;if(t<=1950000)return t*.05;if(t<=3300000)return t*.1-97500;if(t<=6950000)return t*.2-427500;if(t<=9000000)return t*.23-636000;if(t<=18000000)return t*.33-1536000;if(t<=40000000)return t*.4-2796000;return t*.45-4796000}
const calculators={
 takehome(){const m=num('gross'),bonus=num('bonus'),social=pct('social');const annual=m*12+bonus;const si=annual*social;const taxable=Math.max(0,annual-salaryDeduction(annual)-580000-si);const tax=incomeTax(taxable)*1.021;const resident=Math.max(0,taxable*.1+5000);const net=annual-si-tax-resident;set('main',yen(net/12));set('r1',yen(net));set('r2',yen(si));set('r3',yen(tax));set('r4',yen(resident));},
 rent(){const take=num('take'),ratio=pct('ratio');const rent=take*ratio;set('main',yen(rent));set('r1',yen(rent*12));set('r2',Math.round(ratio*100)+'%');set('r3',yen(take-rent));},
 solo(){const ids=['rent','food','utility','phone','transport','daily','fun','other'];const total=ids.reduce((s,id)=>s+num(id),0);set('main',yen(total));set('r1',yen(total*12));set('r2',yen(total-num('rent')));set('r3',yen(num('income')-total));},
 car(){const fuel=num('km')/Math.max(num('eff'),.1)*num('gas');const annual=num('loan')*12+num('parking')*12+num('insurance')+num('tax')+num('inspection')/2+fuel+num('maint');set('main',yen(annual));set('r1',yen(annual/12));set('r2',yen(fuel));set('r3',yen(num('loan')*12));},
 food(){const monthly=num('take')*pct('ratio');set('main',yen(monthly));set('r1',yen(monthly/30.4));set('r2',yen(monthly/4.345));set('r3',yen(monthly*12));},
 fixed(){const ids=['rent','phone','utility','insurance','subs','loan','parking','other'];const total=ids.reduce((s,id)=>s+num(id),0);set('main',yen(total));set('r1',yen(total*12));set('r2',yen(num('income')-total));const rate=num('income')?total/num('income')*100:0;set('r3',rate.toFixed(1)+'%');},
 savings(){const save=num('income')-num('fixed')-num('variable');set('main',yen(Math.max(save,0)));set('r1',yen(save*12));set('r2',(num('income')?save/num('income')*100:0).toFixed(1)+'%');set('r3',save>=0?'黒字':'赤字');},
 couple(){const ids=['rent','food','utility','phone','transport','insurance','fun','other'];const total=ids.reduce((s,id)=>s+num(id),0);const a=pct('share');set('main',yen(total));set('r1',yen(total*a));set('r2',yen(total*(1-a)));set('r3',yen(total*12));},
 child(){const ids=['school','food','clothes','medical','lesson','saving','other'];const total=ids.reduce((s,id)=>s+num(id),0);set('main',yen(total));set('r1',yen(total*12));set('r2',yen(total*18*12));},
 usable(){const annual=num('annual');const net=annual*pct('netrate');const monthly=net/12;const usable=monthly-num('saving')-num('fixed');set('main',yen(Math.max(usable,0)));set('r1',yen(monthly));set('r2',yen(num('saving')));set('r3',yen(num('fixed')));set('r4',yen(Math.max(usable,0)/30.4));}
};
function run(){const key=document.body.dataset.tool;if(calculators[key])calculators[key]()}
document.addEventListener('input',e=>{if(e.target.matches('input,select'))run()});document.addEventListener('DOMContentLoaded',run);