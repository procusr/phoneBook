(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(2),o=n.n(r),i=n(14),u=n.n(i),a=n(4),s=n(3),d=n.n(s),j="/api/persons",b=function(){return d.a.get(j).then((function(e){return e.data}))},l=function(e){return d.a.post(j,e).then((function(e){return e.data}))},f=function(e){return d.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},h=function(e){var t=e.contacts,n=e.deleteContact;return Object(c.jsx)("ul",{children:t.map((function(e){return Object(c.jsxs)("li",{children:[e.name,", ",e.number,Object(c.jsx)("button",{onClick:function(){return n(e)},children:"delete"})]},e.name)}))})},O=function(e){var t=e.input,n=e.handler;return Object(c.jsx)("div",{children:Object(c.jsx)("input",{value:t,onChange:n})})},x={success:{color:"green",fontSize:16,borderWidth:1,innerWidth:200,borderColor:"red",padding:20,borderRadius:5,borderStyle:"solid"},failure:{color:"red",fontSize:30}},p=function(e){var t=Object(r.useState)([]),n=Object(a.a)(t,2),o=n[0],i=n[1],u=Object(r.useState)(""),s=Object(a.a)(u,2),d=s[0],j=s[1],p=Object(r.useState)(""),m=Object(a.a)(p,2),v=m[0],S=m[1],g=Object(r.useState)(""),k=Object(a.a)(g,2),y=k[0],C=k[1];Object(r.useEffect)((function(){b().then((function(e){i(e)}))}),[]);var w=function(){return Object(c.jsx)("div",{style:x.success,children:y})};return Object(c.jsxs)("div",{children:[y&&Object(c.jsx)(w,{}),Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsxs)("form",{children:["name:",Object(c.jsx)(O,{input:d,handler:function(e){j(e.target.value)}}),Object(c.jsx)("br",{}),"number:",Object(c.jsx)(O,{input:v,handler:function(e){S(e.target.value)}}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault();var t,n={name:d,number:v};t=d,o.find((function(e){return e.name===t}))?alert("".concat(d," already exists")):l(n).then((function(e){i(o.concat(e)),C("Successfully added ".concat(d," ")),setTimeout((function(){return C("")}),2e3),j(""),S("")}))},children:"Add"})})]}),Object(c.jsx)("h2",{style:x.header,children:"Numbers"}),Object(c.jsx)(h,{contacts:o,deleteContact:function(e){window.confirm("Delete ".concat(e.name," ?"))&&(f(e.id),i(o.filter((function(t){return t.id!==e.id}))))}})]})};n(37);u.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(p,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.c80e6561.chunk.js.map