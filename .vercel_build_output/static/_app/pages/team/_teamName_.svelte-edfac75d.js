import{S as ee,i as te,s as se,e as y,t as P,j as G,c as N,a as V,g as T,d as k,l as R,b as D,O as M,f as C,H as o,P as ae,h as Q,p as B,v as S,w as q,x as L,n as H,A as O,o as Y,M as U,K as re,L as le,T as ne,R as oe,W as ie,Q as ue,U as ce,m as z}from"../../chunks/vendor-51c0b828.js";import{H as fe,t as me,a as he,p as de}from"../../chunks/tweets-bd113b17.js";function J(t,e,s){const l=t.slice();return l[6]=e[s].id,l[7]=e[s].text,l[9]=s,l}function X(t){let e,s,l,f,g,n,d,v,r;return s=new ne({props:{class:"share-button",text:t[7],url:"https://twitter.com/_Numbers_Game/status/"+t[6]}}),f=new oe({props:{class:"share-button",text:"Read this tweet from the latest "+t[0]+" match",url:"https://twitter.com/_Numbers_Game/status/"+t[6]}}),n=new ie({props:{class:"share-button",text:""+(t[7]+" url="+("https://twitter.com/_Numbers_Game/status/"+t[6]))}}),v=new ue({props:{class:"share-button",quote:t[7],url:"https://twitter.com/_Numbers_Game/status/"+t[6]}}),{c(){e=y("div"),S(s.$$.fragment),l=G(),S(f.$$.fragment),g=G(),S(n.$$.fragment),d=G(),S(v.$$.fragment),this.h()},l(a){e=N(a,"DIV",{class:!0});var i=V(e);q(s.$$.fragment,i),l=R(i),q(f.$$.fragment,i),g=R(i),q(n.$$.fragment,i),d=R(i),q(v.$$.fragment,i),i.forEach(k),this.h()},h(){D(e,"class","share-cont svelte-1asy2nv")},m(a,i){C(a,e,i),L(s,e,null),o(e,l),L(f,e,null),o(e,g),L(n,e,null),o(e,d),L(v,e,null),r=!0},p(a,i){const I={};i&2&&(I.text=a[7]),i&2&&(I.url="https://twitter.com/_Numbers_Game/status/"+a[6]),s.$set(I);const w={};i&1&&(w.text="Read this tweet from the latest "+a[0]+" match"),i&2&&(w.url="https://twitter.com/_Numbers_Game/status/"+a[6]),f.$set(w);const j={};i&2&&(j.text=""+(a[7]+" url="+("https://twitter.com/_Numbers_Game/status/"+a[6]))),n.$set(j);const E={};i&2&&(E.quote=a[7]),i&2&&(E.url="https://twitter.com/_Numbers_Game/status/"+a[6]),v.$set(E)},i(a){r||(B(s.$$.fragment,a),B(f.$$.fragment,a),B(n.$$.fragment,a),B(v.$$.fragment,a),r=!0)},o(a){H(s.$$.fragment,a),H(f.$$.fragment,a),H(n.$$.fragment,a),H(v.$$.fragment,a),r=!1},d(a){a&&k(e),O(s),O(f),O(n),O(v)}}}function Z(t){let e,s,l,f=t[7]+"",g,n,d,v,r,a,i,I,w,j,E,m=t[2]==t[6]&&X(t);return{c(){e=y("div"),s=y("div"),l=y("span"),g=P(f),n=G(),d=y("br"),v=G(),m&&m.c(),r=G(),a=y("br"),i=G(),this.h()},l(p){e=N(p,"DIV",{class:!0});var b=V(e);s=N(b,"DIV",{});var $=V(s);l=N($,"SPAN",{class:!0});var u=V(l);g=T(u,f),u.forEach(k),n=R($),d=N($,"BR",{}),v=R($),m&&m.l($),r=R($),a=N($,"BR",{}),$.forEach(k),i=R(b),b.forEach(k),this.h()},h(){D(l,"class","tweets svelte-1asy2nv"),D(e,"class",I=""+(M(t[2]==t[6]?"selectedtweet":"unselectedtweet")+" svelte-1asy2nv"))},m(p,b){C(p,e,b),o(e,s),o(s,l),o(l,g),o(s,n),o(s,d),o(s,v),m&&m.m(s,null),o(s,r),o(s,a),o(e,i),w=!0,j||(E=ae(l,"click",function(){ce(t[3](t[6]))&&t[3](t[6]).apply(this,arguments)}),j=!0)},p(p,b){t=p,(!w||b&2)&&f!==(f=t[7]+"")&&Q(g,f),t[2]==t[6]?m?(m.p(t,b),b&6&&B(m,1)):(m=X(t),m.c(),B(m,1),m.m(s,r)):m&&(z(),H(m,1,1,()=>{m=null}),Y()),(!w||b&6&&I!==(I=""+(M(t[2]==t[6]?"selectedtweet":"unselectedtweet")+" svelte-1asy2nv")))&&D(e,"class",I)},i(p){w||(B(m),w=!0)},o(p){H(m),w=!1},d(p){p&&k(e),m&&m.d(),j=!1,E()}}}function _e(t){let e,s,l,f,g,n,d,v,r,a,i,I,w,j,E,m,p,b;s=new fe({});let $=t[1],u=[];for(let c=0;c<$.length;c+=1)u[c]=Z(J(t,$,c));const x=c=>H(u[c],1,1,()=>{u[c]=null});return{c(){e=y("body"),S(s.$$.fragment),l=G(),f=y("div"),g=G(),n=y("div"),d=y("h2"),v=P("Latest "),r=y("span"),a=P(t[0]),i=G(),I=y("br"),w=P(" match report"),j=G(),E=y("div"),m=G(),p=y("div");for(let c=0;c<u.length;c+=1)u[c].c();this.h()},l(c){e=N(c,"BODY",{class:!0});var h=V(e);q(s.$$.fragment,h),l=R(h),f=N(h,"DIV",{style:!0}),V(f).forEach(k),g=R(h),n=N(h,"DIV",{id:!0,class:!0});var _=V(n);d=N(_,"H2",{class:!0});var A=V(d);v=T(A,"Latest "),r=N(A,"SPAN",{style:!0,class:!0});var F=V(r);a=T(F,t[0]),F.forEach(k),i=R(A),I=N(A,"BR",{}),w=T(A," match report"),A.forEach(k),_.forEach(k),j=R(h),E=N(h,"DIV",{id:!0,class:!0}),V(E).forEach(k),m=R(h),p=N(h,"DIV",{id:!0,style:!0,class:!0});var K=V(p);for(let W=0;W<u.length;W+=1)u[W].l(K);K.forEach(k),h.forEach(k),this.h()},h(){U(f,"height","50px"),U(r,"white-space","nowrap"),D(r,"class","svelte-1asy2nv"),D(d,"class","svelte-1asy2nv"),D(n,"id","head-cont"),D(n,"class","svelte-1asy2nv"),D(E,"id","text-top"),D(E,"class","svelte-1asy2nv"),D(p,"id","tweet-cont"),U(p,"width","640px"),U(p,"margin","0 auto"),D(p,"class","svelte-1asy2nv"),D(e,"class","body2 svelte-1asy2nv")},m(c,h){C(c,e,h),L(s,e,null),o(e,l),o(e,f),o(e,g),o(e,n),o(n,d),o(d,v),o(d,r),o(r,a),o(d,i),o(d,I),o(d,w),o(e,j),o(e,E),o(e,m),o(e,p);for(let _=0;_<u.length;_+=1)u[_].m(p,null);b=!0},p(c,[h]){if((!b||h&1)&&Q(a,c[0]),h&15){$=c[1];let _;for(_=0;_<$.length;_+=1){const A=J(c,$,_);u[_]?(u[_].p(A,h),B(u[_],1)):(u[_]=Z(A),u[_].c(),B(u[_],1),u[_].m(p,null))}for(z(),_=$.length;_<u.length;_+=1)x(_);Y()}},i(c){if(!b){B(s.$$.fragment,c);for(let h=0;h<$.length;h+=1)B(u[h]);b=!0}},o(c){H(s.$$.fragment,c),u=u.filter(Boolean);for(let h=0;h<u.length;h+=1)H(u[h]);b=!1},d(c){c&&k(e),O(s),re(u,c)}}}function pe(t,e,s){let l,f,g;le(t,de,r=>s(5,g=r));let n=he;n=Object.keys(n).map(r=>n[r]);let d;function v(r){d==r?s(2,d=null):s(2,d=r)}return t.$$.update=()=>{t.$$.dirty&32&&s(0,l=g.params.teamName),t.$$.dirty&1&&s(0,l=me.find(r=>r.id==l).name),t.$$.dirty&17&&s(1,f=n.find(r=>r.misc.team==l).data),t.$$.dirty&2&&s(1,f=f.sort(function(r,a){return parseInt(r.id)-parseInt(a.id)})),t.$$.dirty&17&&console.log(l,n.find(r=>r.misc.team==l))},[l,f,d,v,n,g]}class be extends ee{constructor(e){super();te(this,e,pe,_e,se,{})}}export{be as default};
