import{k as l,l as p}from"./index-I3X5j-Dr.js";const h="https://api.binance.com/api/v3/";function b(e){return fetch(h+`depth?symbol=${e}`).then(t=>t.json())}const s=l({socket:null,snapshotLoaded:!1,buffer:[],result:{asks:new Map,bids:new Map},lastUpdateId:0}),m="wss://stream.binance.com:9443/ws/",U=async e=>{if(s.snapshotLoaded===!0)return;const t=new WebSocket(m+e.toLowerCase()+"@depth");t.onmessage=function(n){const a=JSON.parse(n.data);if(!s.snapshotLoaded)s.buffer.push(a);else{if(a.u<=s.lastUpdateId)return;r("asks",a.a),r("bids",a.b),s.lastUpdateId=a.u}},t.onclose=function(){s.snapshotLoaded=!1},s.socket=t},r=(e,t)=>{for(const n of t){const[a,c]=n;s.result[e].has(a)?Number(c)===0?s.result[e].delete(a):s.result[e].set(a,c):Number(c)!==0&&s.result[e].set(a,c)}},I=async e=>{if(s.snapshotLoaded)return;const t=await b(e),n=t.lastUpdateId,a=(f,i)=>i.filter(o=>o.u>n).sort((o,d)=>o.u-d.u).map(o=>o[f]).reduce((o,d)=>o.concat(d),[]),c=[...t.asks,...a("a",s.buffer)],u=[...t.bids,...a("b",s.buffer)];r("asks",c),r("bids",u),s.buffer.length?s.lastUpdateId=s.buffer[s.buffer.length-1].u:s.lastUpdateId=t.lastUpdateId,s.snapshotLoaded=!0},S=p("rootStore",{state:()=>({selectedPair:"BTCUSDT",changelog:[]}),actions:{async changePair(e,t){this.selectedPair=e;const n={old:t,new:e,timestamp:new Date};this.changelog.push(n)}}});export{U as a,I as b,s,S as u};
