import{S as Z,i as x,s as ee,e as w,t as L,j as D,c as N,a as B,g as W,d as k,l as I,b as S,N as F,f as U,H as c,O as te,h as K,p as G,v as j,w as H,x as T,n as R,A as q,o as Q,P as J,K as se,L as ae,T as re,R as le,W as ne,Q as oe,U as ie,m as Y}from"../../chunks/vendor-37473da7.js";import{H as ue,s as fe,t as me,a as ce,p as he}from"../../chunks/tweets-95f2cf6c.js";function z(t,e,s){const n=t.slice();return n[6]=e[s].id,n[7]=e[s].text,n[9]=s,n}function M(t){let e,s,n,i,v,u,d,p,o;return s=new re({props:{class:"share-button",text:t[7],url:"https://twitter.com/_Numbers_Game/status/"+t[6]}}),i=new le({props:{class:"share-button",text:t[7],url:"https://twitter.com/_Numbers_Game/status/"+t[6]}}),u=new ne({props:{class:"share-button",text:""+(t[7]+" url="+("https://twitter.com/_Numbers_Game/status/"+t[6]))}}),p=new oe({props:{class:"share-button",quote:t[7],url:"https://twitter.com/_Numbers_Game/status/"+t[6]}}),{c(){e=w("div"),j(s.$$.fragment),n=D(),j(i.$$.fragment),v=D(),j(u.$$.fragment),d=D(),j(p.$$.fragment),this.h()},l(a){e=N(a,"DIV",{class:!0});var f=B(e);H(s.$$.fragment,f),n=I(f),H(i.$$.fragment,f),v=I(f),H(u.$$.fragment,f),d=I(f),H(p.$$.fragment,f),f.forEach(k),this.h()},h(){S(e,"class","share-cont svelte-17edxr4")},m(a,f){U(a,e,f),T(s,e,null),c(e,n),T(i,e,null),c(e,v),T(u,e,null),c(e,d),T(p,e,null),o=!0},p(a,f){const y={};f&1&&(y.text=a[7]),f&1&&(y.url="https://twitter.com/_Numbers_Game/status/"+a[6]),s.$set(y);const b={};f&1&&(b.text=a[7]),f&1&&(b.url="https://twitter.com/_Numbers_Game/status/"+a[6]),i.$set(b);const E={};f&1&&(E.text=""+(a[7]+" url="+("https://twitter.com/_Numbers_Game/status/"+a[6]))),u.$set(E);const V={};f&1&&(V.quote=a[7]),f&1&&(V.url="https://twitter.com/_Numbers_Game/status/"+a[6]),p.$set(V)},i(a){o||(G(s.$$.fragment,a),G(i.$$.fragment,a),G(u.$$.fragment,a),G(p.$$.fragment,a),o=!0)},o(a){R(s.$$.fragment,a),R(i.$$.fragment,a),R(u.$$.fragment,a),R(p.$$.fragment,a),o=!1},d(a){a&&k(e),q(s),q(i),q(u),q(p)}}}function X(t){let e,s,n,i=t[7]+"",v,u,d,p,o,a,f,y,b,E,V,l=t[2]==t[6]&&M(t);return{c(){e=w("div"),s=w("div"),n=w("span"),v=L(i),u=D(),d=w("br"),p=D(),l&&l.c(),o=D(),a=w("br"),f=D(),this.h()},l($){e=N($,"DIV",{class:!0});var g=B(e);s=N(g,"DIV",{});var r=B(s);n=N(r,"SPAN",{class:!0});var A=B(n);v=W(A,i),A.forEach(k),u=I(r),d=N(r,"BR",{}),p=I(r),l&&l.l(r),o=I(r),a=N(r,"BR",{}),r.forEach(k),f=I(g),g.forEach(k),this.h()},h(){S(n,"class","tweets svelte-17edxr4"),S(e,"class",y=""+(F(t[2]==t[6]?"selectedtweet":"unselectedtweet")+" svelte-17edxr4"))},m($,g){U($,e,g),c(e,s),c(s,n),c(n,v),c(s,u),c(s,d),c(s,p),l&&l.m(s,null),c(s,o),c(s,a),c(e,f),b=!0,E||(V=te(n,"click",function(){ie(t[3](t[6]))&&t[3](t[6]).apply(this,arguments)}),E=!0)},p($,g){t=$,(!b||g&1)&&i!==(i=t[7]+"")&&K(v,i),t[2]==t[6]?l?(l.p(t,g),g&5&&G(l,1)):(l=M(t),l.c(),G(l,1),l.m(s,o)):l&&(Y(),R(l,1,1,()=>{l=null}),Q()),(!b||g&5&&y!==(y=""+(F(t[2]==t[6]?"selectedtweet":"unselectedtweet")+" svelte-17edxr4")))&&S(e,"class",y)},i($){b||(G(l),b=!0)},o($){R(l),b=!1},d($){$&&k(e),l&&l.d(),E=!1,V()}}}function de(t){let e,s,n,i,v,u,d,p,o,a,f,y,b,E,V,l,$;s=new ue({});let g=t[0],r=[];for(let m=0;m<g.length;m+=1)r[m]=X(z(t,g,m));const A=m=>R(r[m],1,1,()=>{r[m]=null});return{c(){e=w("body"),j(s.$$.fragment),n=D(),i=w("div"),v=D(),u=w("div"),d=w("h2"),p=L("Latest "),o=L(t[1]),a=D(),f=w("br"),y=L(" match report"),b=D(),E=w("div"),V=D(),l=w("div");for(let m=0;m<r.length;m+=1)r[m].c();this.h()},l(m){e=N(m,"BODY",{class:!0});var h=B(e);H(s.$$.fragment,h),n=I(h),i=N(h,"DIV",{style:!0}),B(i).forEach(k),v=I(h),u=N(h,"DIV",{id:!0,class:!0});var _=B(u);d=N(_,"H2",{class:!0});var O=B(d);p=W(O,"Latest "),o=W(O,t[1]),a=I(O),f=N(O,"BR",{}),y=W(O," match report"),O.forEach(k),_.forEach(k),b=I(h),E=N(h,"DIV",{style:!0}),B(E).forEach(k),V=I(h),l=N(h,"DIV",{id:!0,style:!0,class:!0});var C=B(l);for(let P=0;P<r.length;P+=1)r[P].l(C);C.forEach(k),h.forEach(k),this.h()},h(){J(i,"height","50px"),S(d,"class","svelte-17edxr4"),S(u,"id","head-cont"),S(u,"class","svelte-17edxr4"),J(E,"height","50px"),S(l,"id","tweet-cont"),J(l,"width","640px"),J(l,"margin","0 auto"),S(l,"class","svelte-17edxr4"),S(e,"class","body2 svelte-17edxr4")},m(m,h){U(m,e,h),T(s,e,null),c(e,n),c(e,i),c(e,v),c(e,u),c(u,d),c(d,p),c(d,o),c(d,a),c(d,f),c(d,y),c(e,b),c(e,E),c(e,V),c(e,l);for(let _=0;_<r.length;_+=1)r[_].m(l,null);$=!0},p(m,[h]){if((!$||h&2)&&K(o,m[1]),h&13){g=m[0];let _;for(_=0;_<g.length;_+=1){const O=z(m,g,_);r[_]?(r[_].p(O,h),G(r[_],1)):(r[_]=X(O),r[_].c(),G(r[_],1),r[_].m(l,null))}for(Y(),_=g.length;_<r.length;_+=1)A(_);Q()}},i(m){if(!$){G(s.$$.fragment,m);for(let h=0;h<g.length;h+=1)G(r[h]);$=!0}},o(m){R(s.$$.fragment,m),r=r.filter(Boolean);for(let h=0;h<r.length;h+=1)R(r[h]);$=!1},d(m){m&&k(e),q(s),se(r,m)}}}function _e(t,e,s){let n,i,v;ae(t,he,o=>s(5,v=o)),console.log("someJSON",fe);let u=ce;u=Object.keys(u).map(o=>u[o]);let d;function p(o){d==o?s(2,d=null):s(2,d=o)}return t.$$.update=()=>{t.$$.dirty&32&&s(1,n=v.params.teamName),t.$$.dirty&2&&s(1,n=me.find(o=>o.id==n).name),t.$$.dirty&2&&console.log("teamName",n),t.$$.dirty&18&&s(0,i=u.find(o=>o.misc.team==n).data),t.$$.dirty&1&&s(0,i=i.sort(function(o,a){return parseInt(o.id)-parseInt(a.id)})),t.$$.dirty&1&&console.log("TWEETS",i)},[i,n,d,p,u,v]}class ve extends Z{constructor(e){super();x(this,e,_e,de,ee,{})}}export{ve as default};