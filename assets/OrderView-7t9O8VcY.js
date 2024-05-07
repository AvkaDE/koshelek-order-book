import{u as k,s as d,a as g,b as S}from"./rootStore-_b5zxavL.js";import{d as w,c,u as F,o as N,_ as B,r as u,a as D,b as V,w as t,e as s,f as l,g as p,t as m}from"./index-I3X5j-Dr.js";const b=e=>Array.from(e.entries()).map(o=>({price:Number(o[0]).toFixed(2),quantity:Number(o[1]).toFixed(5),total:Number(o[0])*Number(o[1])})),A=w({name:"OrderView",setup(){const e=k(),o=c(()=>b(d.result.asks).sort((r,a)=>+r.price-+a.price)),_=c(()=>b(d.result.bids).sort((r,a)=>+a.price-+r.price)),f=F(),h=c(()=>[{title:"Price",key:"price"},{title:"Quantity",key:"quantity"},...f.xs.value?[]:[{title:"Total",key:"total",value:r=>r.total.toFixed(5)}]]);return N(async()=>{d.snapshotLoaded||(g(e.selectedPair),await S(e.selectedPair))}),{rootStore:e,asks:o,bids:_,headers:h}}}),C={class:"ask"},P={class:"bid"};function $(e,o,_,f,h,r){const a=u("v-col"),n=u("v-row"),v=u("v-data-table"),y=u("v-container");return D(),V(y,{fluid:""},{default:t(()=>[s(n,null,{default:t(()=>[s(a,{md:"3"},{default:t(()=>[l(" Текущая выбранная валютная пара: "),p("b",null,m(e.rootStore.selectedPair),1)]),_:1})]),_:1}),s(n,null,{default:t(()=>[s(a,{md:"6"},{default:t(()=>[l(" ASKS: ")]),_:1}),s(a,{md:"6"},{default:t(()=>[l(" BIDS: ")]),_:1})]),_:1}),s(n,null,{default:t(()=>[s(a,{md:"6"},{default:t(()=>[s(v,{headers:e.headers,"fixed-header":!0,items:e.asks,"items-per-page":100,"items-per-page-options":[100,500,1e3],height:"70vh"},{"item.price":t(({value:i})=>[p("span",C,m(i),1)]),_:2},1032,["headers","items"])]),_:1}),s(a,{md:"6"},{default:t(()=>[s(v,{headers:e.headers,"fixed-header":!0,items:e.bids,"items-per-page":100,"items-per-page-options":[100,500,1e3],height:"70vh"},{"item.price":t(({value:i})=>[p("span",P,m(i),1)]),_:2},1032,["headers","items"])]),_:1})]),_:1})]),_:1})}const T=B(A,[["render",$],["__scopeId","data-v-ae280c7d"]]);export{T as default};
