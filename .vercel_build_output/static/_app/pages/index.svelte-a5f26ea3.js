import{S as C,i as J,s as L,e as m,t as E,c as k,a as g,g as S,d as o,b as V,J as $,f as b,H as d,j as y,l as A,I as D,K as P,L as R}from"../chunks/vendor-d72d44f7.js";import{t as H,p as w}from"../chunks/fb-utils-27109c40.js";function W(c,t,l){const s=c.slice();return s[1]=t[l].id,s[2]=t[l].name,s[4]=l,s}function q(c){let t,l,s=c[2]+"",f,_;return{c(){t=m("div"),l=m("a"),f=E(s),this.h()},l(i){t=k(i,"DIV",{class:!0});var h=g(t);l=k(h,"A",{"sveltekit:prefetch":!0,href:!0});var u=g(l);f=S(u,s),u.forEach(o),h.forEach(o),this.h()},h(){V(l,"sveltekit:prefetch",""),V(l,"href",_="/team/"+c[1]),V(t,"class","team-div"),$(t,"active",c[0].url.pathname==="/"+c[1])},m(i,h){b(i,t,h),d(t,l),d(l,f)},p(i,h){h&1&&$(t,"active",i[0].url.pathname==="/"+i[1])},d(i){i&&o(t)}}}function z(c){let t,l,s,f,_,i,h,u,j,x,p=H,r=[];for(let e=0;e<p.length;e+=1)r[e]=q(W(c,p,e));return{c(){t=m("div");for(let e=0;e<r.length;e+=1)r[e].c();l=y(),s=m("h1"),f=E("Welcome to SvelteKit"),_=y(),i=m("p"),h=E("Visit "),u=m("a"),j=E("kit.svelte.dev"),x=E(" to read the documentation"),this.h()},l(e){t=k(e,"DIV",{class:!0});var n=g(t);for(let I=0;I<r.length;I+=1)r[I].l(n);n.forEach(o),l=A(e),s=k(e,"H1",{});var a=g(s);f=S(a,"Welcome to SvelteKit"),a.forEach(o),_=A(e),i=k(e,"P",{});var v=g(i);h=S(v,"Visit "),u=k(v,"A",{href:!0});var K=g(u);j=S(K,"kit.svelte.dev"),K.forEach(o),x=S(v," to read the documentation"),v.forEach(o),this.h()},h(){V(t,"class","grid-container"),V(u,"href","https://kit.svelte.dev")},m(e,n){b(e,t,n);for(let a=0;a<r.length;a+=1)r[a].m(t,null);b(e,l,n),b(e,s,n),d(s,f),b(e,_,n),b(e,i,n),d(i,h),d(i,u),d(u,j),d(i,x)},p(e,[n]){if(n&1){p=H;let a;for(a=0;a<p.length;a+=1){const v=W(e,p,a);r[a]?r[a].p(v,n):(r[a]=q(v),r[a].c(),r[a].m(t,null))}for(;a<r.length;a+=1)r[a].d(1);r.length=p.length}},i:D,o:D,d(e){e&&o(t),P(r,e),e&&o(l),e&&o(s),e&&o(_),e&&o(i)}}}function B(c,t,l){let s;return R(c,w,f=>l(0,s=f)),[s]}class M extends C{constructor(t){super();J(this,t,B,z,L,{})}}export{M as default};
