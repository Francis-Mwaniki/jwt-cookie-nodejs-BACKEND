import{a as o,o as c,b as i,e,f as d,w as r,h as _,p,i as l,j as h}from"./entry.c4d07d3c.js";const u={data(){return{message:""}},async mounted(){await(await fetch("http://localhost:7000/user",{credentials:"include",headers:{"Content-type":"application/json"}})).json()}},s=t=>(p("data-v-cdb40167"),t=t(),l(),t),b={class:"top-banner-section"},m=s(()=>e("div",{class:"banner-image-div"},[e("img",{class:"banner-image",src:"https://plus.unsplash.com/premium_photo-1661678079655-10fe58ab8d30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",alt:"Banner Image"})],-1)),x=s(()=>e("div",{class:"banner-overlay-div"},null,-1)),f={class:"banner-text-div"},v={class:"banner-text"},g=s(()=>e("p",{class:"banner-h1-text"},"Remain relevant in today's technology-driven economy",-1)),w=s(()=>e("p",{class:"banner-body-text"}," Learn how agile can give you a competitive edge. Let Go.. ",-1)),y={class:"banner-btn"},B=h("Get started \u2192");function H(t,n,I,j,M,N){const a=_;return c(),i("section",b,[m,x,e("div",f,[e("span",v,[g,w,e("p",y,[d(a,{class:"banner-btn-item",to:"/register"},{default:r(()=>[B]),_:1})])])])])}const Z=o(u,[["render",H],["__scopeId","data-v-cdb40167"]]);export{Z as default};