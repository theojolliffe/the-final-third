import{S as he,i as pe,s as me,e as h,t as I,j as O,c as p,a as g,g as V,d as u,l as R,b as E,J as ve,f as T,H as a,h as N,v as ge,w as ye,x as be,p as Ee,n as De,A as Ie,K as Ve,L as ke,M as de}from"../chunks/vendor-51c0b828.js";import{H as $e,t as z,a as Se,p as we}from"../chunks/tweets-bd113b17.js";function ue(s,e,t){const n=s.slice();return n[1]=e[t].data,n[4]=e[t].misc,n[6]=t,n}function Oe(s){let e,t,n=s[4].result[0]+"",r,m,y,l=s[4].result[1]+"",f;return{c(){e=h("div"),t=h("span"),r=I(n),m=I("-"),y=h("strong"),f=I(l),this.h()},l(o){e=p(o,"DIV",{});var v=g(e);t=p(v,"SPAN",{style:!0});var _=g(t);r=V(_,n),m=V(_,"-"),_.forEach(u),y=p(v,"STRONG",{});var i=g(y);f=V(i,l),i.forEach(u),v.forEach(u),this.h()},h(){de(t,"color","#686868")},m(o,v){T(o,e,v),a(e,t),a(t,r),a(t,m),a(e,y),a(y,f)},p(o,v){v&2&&n!==(n=o[4].result[0]+"")&&N(r,n),v&2&&l!==(l=o[4].result[1]+"")&&N(f,l)},d(o){o&&u(e)}}}function Re(s){let e,t,n=s[4].result[0]+"",r,m,y,l=s[4].result[1]+"",f;return{c(){e=h("div"),t=h("strong"),r=I(n),m=h("span"),y=I("-"),f=I(l),this.h()},l(o){e=p(o,"DIV",{});var v=g(e);t=p(v,"STRONG",{});var _=g(t);r=V(_,n),_.forEach(u),m=p(v,"SPAN",{style:!0});var i=g(m);y=V(i,"-"),f=V(i,l),i.forEach(u),v.forEach(u),this.h()},h(){de(m,"color","#686868")},m(o,v){T(o,e,v),a(e,t),a(t,r),a(e,m),a(m,y),a(m,f)},p(o,v){v&2&&n!==(n=o[4].result[0]+"")&&N(r,n),v&2&&l!==(l=o[4].result[1]+"")&&N(f,l)},d(o){o&&u(e)}}}function fe(s){let e,t,n,r=_e(s[4].story_id)+"",m,y,l,f=s[4].team+"",o,v,_,i,d,D,c,$=s[4].opponent+"",A,F,j,P,Q,U,W,H,L,X,x,B,G=s[4].date+"",q,C,J;function ee(b,k){return b[4].home=="home"?Re:Oe}let K=ee(s),S=K(s);function te(...b){return s[2](s[4],...b)}function se(...b){return s[3](s[4],...b)}return{c(){e=h("a"),t=h("div"),n=h("div"),m=I(r),y=O(),l=h("div"),o=I(f),v=O(),_=h("div"),i=h("div"),d=I("Opponent"),D=O(),c=h("div"),A=I($),F=O(),j=h("div"),P=h("div"),Q=I("Result"),U=O(),S.c(),W=O(),H=h("div"),L=h("div"),X=I("Date"),x=O(),B=h("div"),q=I(G),J=O(),this.h()},l(b){e=p(b,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var k=g(e);t=p(k,"DIV",{class:!0});var w=g(t);n=p(w,"DIV",{class:!0});var ae=g(n);m=V(ae,r),ae.forEach(u),y=R(w),l=p(w,"DIV",{class:!0});var le=g(l);o=V(le,f),le.forEach(u),v=R(w),_=p(w,"DIV",{class:!0});var M=g(_);i=p(M,"DIV",{class:!0});var re=g(i);d=V(re,"Opponent"),re.forEach(u),D=R(M),c=p(M,"DIV",{});var ne=g(c);A=V(ne,$),ne.forEach(u),M.forEach(u),F=R(w),j=p(w,"DIV",{class:!0});var Y=g(j);P=p(Y,"DIV",{class:!0});var oe=g(P);Q=V(oe,"Result"),oe.forEach(u),U=R(Y),S.l(Y),Y.forEach(u),W=R(w),H=p(w,"DIV",{class:!0});var Z=g(H);L=p(Z,"DIV",{class:!0});var ie=g(L);X=V(ie,"Date"),ie.forEach(u),x=R(Z),B=p(Z,"DIV",{});var ce=g(B);q=V(ce,G),ce.forEach(u),Z.forEach(u),w.forEach(u),k.forEach(u),J=R(b),this.h()},h(){E(n,"class","row number svelte-1sa3ipy"),E(l,"class","row name svelte-1sa3ipy"),E(i,"class","col1 svelte-1sa3ipy"),E(_,"class","row text svelte-1sa3ipy"),E(P,"class","col1 svelte-1sa3ipy"),E(j,"class","row text svelte-1sa3ipy"),E(L,"class","col1 svelte-1sa3ipy"),E(H,"class","row text last svelte-1sa3ipy"),E(t,"class","team-div svelte-1sa3ipy"),ve(t,"active",s[0].url.pathname==="/"+z.find(te).id),E(e,"sveltekit:prefetch",""),E(e,"href",C="/team/"+z.find(se).id),E(e,"class","svelte-1sa3ipy")},m(b,k){T(b,e,k),a(e,t),a(t,n),a(n,m),a(t,y),a(t,l),a(l,o),a(t,v),a(t,_),a(_,i),a(i,d),a(_,D),a(_,c),a(c,A),a(t,F),a(t,j),a(j,P),a(P,Q),a(j,U),S.m(j,null),a(t,W),a(t,H),a(H,L),a(L,X),a(H,x),a(H,B),a(B,q),T(b,J,k)},p(b,k){s=b,k&2&&r!==(r=_e(s[4].story_id)+"")&&N(m,r),k&2&&f!==(f=s[4].team+"")&&N(o,f),k&2&&$!==($=s[4].opponent+"")&&N(A,$),K===(K=ee(s))&&S?S.p(s,k):(S.d(1),S=K(s),S&&(S.c(),S.m(j,null))),k&2&&G!==(G=s[4].date+"")&&N(q,G),k&3&&ve(t,"active",s[0].url.pathname==="/"+z.find(te).id),k&2&&C!==(C="/team/"+z.find(se).id)&&E(e,"href",C)},d(b){b&&u(e),S.d(),b&&u(J)}}}function je(s){let e,t,n,r,m,y,l,f,o,v;t=new $e({});let _=s[1],i=[];for(let d=0;d<_.length;d+=1)i[d]=fe(ue(s,_,d));return{c(){e=h("body"),ge(t.$$.fragment),n=O(),r=h("h2"),m=I("Premier League"),y=h("br"),l=I("Statistics"),f=O(),o=h("div");for(let d=0;d<i.length;d+=1)i[d].c();this.h()},l(d){e=p(d,"BODY",{class:!0});var D=g(e);ye(t.$$.fragment,D),n=R(D),r=p(D,"H2",{class:!0});var c=g(r);m=V(c,"Premier League"),y=p(c,"BR",{}),l=V(c,"Statistics"),c.forEach(u),f=R(D),o=p(D,"DIV",{class:!0});var $=g(o);for(let A=0;A<i.length;A+=1)i[A].l($);$.forEach(u),D.forEach(u),this.h()},h(){E(r,"class","svelte-1sa3ipy"),E(o,"class","grid-container svelte-1sa3ipy"),E(e,"class","body2 svelte-1sa3ipy")},m(d,D){T(d,e,D),be(t,e,null),a(e,n),a(e,r),a(r,m),a(r,y),a(r,l),a(e,f),a(e,o);for(let c=0;c<i.length;c+=1)i[c].m(o,null);v=!0},p(d,[D]){if(D&3){_=d[1];let c;for(c=0;c<_.length;c+=1){const $=ue(d,_,c);i[c]?i[c].p($,D):(i[c]=fe($),i[c].c(),i[c].m(o,null))}for(;c<i.length;c+=1)i[c].d(1);i.length=_.length}},i(d){v||(Ee(t.$$.fragment,d),v=!0)},o(d){De(t.$$.fragment,d),v=!1},d(d){d&&u(e),Ie(t),Ve(i,d)}}}function _e(s){return String(s).length<3&&(s="0"+s),String(s).length<3&&(s="0"+s),s}function Ae(s,e,t){let n;ke(s,we,l=>t(0,n=l));let r=Se;return r=Object.keys(r).map(l=>r[l]),r.sort(function(l,f){return f.misc.story_id-l.misc.story_id}),console.log("data",r),[n,r,(l,f)=>f.name==l.team,(l,f)=>f.name==l.team]}class Pe extends he{constructor(e){super();pe(this,e,Ae,je,me,{})}}export{Pe as default};
