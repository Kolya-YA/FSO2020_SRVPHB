(this["webpackJsonppart02.06-02.10"]=this["webpackJsonppart02.06-02.10"]||[]).push([[0],{14:function(e,t,n){e.exports=n(36)},36:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(13),l=n.n(o),c=n(2),u=function(e){var t=e.filter,n=e.setFilter;return a.a.createElement("form",null,a.a.createElement("label",null,"Filter\xa0",a.a.createElement("input",{type:"text",value:t,onChange:function(e){n(e.target.value)}})))},i=function(e){var t=e.persons,n=e.filter,r=e.delPerson,o=n?t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})):t;return a.a.createElement(a.a.Fragment,null,a.a.createElement("h3",null,"Numbers"),a.a.createElement("ul",null,o.map((function(e){return a.a.createElement("li",{key:e.id},e.name," \u2014 ",e.number,"\xa0",a.a.createElement("button",{onClick:function(){return r(e)}},"Delete"))}))))},m=function(e){var t=e.newName,n=e.newPhone,r=e.addNewPerson,o=e.handleNewName,l=e.handleNewPhone;return a.a.createElement(a.a.Fragment,null,a.a.createElement("h3",null,"Add a new person"),a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,a.a.createElement("label",null,"Name\xa0",a.a.createElement("input",{type:"text",value:t,onChange:o})),a.a.createElement("br",null),a.a.createElement("label",null,"Phone\xa0",a.a.createElement("input",{type:"tel",value:n,onChange:l}))),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"Add"))))},d=function(e){var t=e.msg,n=e.err;if(!t)return null;var r={background:"lightgrey",fontSize:"20px",borderColor:n?"red":"green",borderStyle:"solid",borderRadius:"5px",padding:"12px 15px",marginBottom:"10px"};return a.a.createElement("div",{style:r},t)},f=n(3),s=n.n(f),p=function(){return s.a.get("/api/persons").then((function(e){return e.data}))},h=function(e){return s.a.post("/api/persons",e).then((function(e){return e.data}))},b=function(e,t){return console.log(e,t),s.a.put("".concat("/api/persons","/").concat(t),e).then((function(e){return e.data}))},E=function(e){return s.a.delete("".concat("/api/persons","/").concat(e))},v=function(){var e=Object(r.useState)([]),t=Object(c.a)(e,2),n=t[0],o=t[1],l=Object(r.useState)(""),f=Object(c.a)(l,2),s=f[0],v=f[1],g=Object(r.useState)(""),w=Object(c.a)(g,2),N=w[0],j=w[1],y=Object(r.useState)(""),O=Object(c.a)(y,2),P=O[0],x=O[1],S=Object(r.useState)({error:0,msg:""}),k=Object(c.a)(S,2),C=k[0],F=k[1];Object(r.useEffect)((function(){p().then((function(e){return o(e)})).catch((function(e){return alert(e)}))}),[]);var A=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;F({msg:e,error:t}),setTimeout((function(){return F({msg:"",error:0})}),n)};return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(d,{msg:C.msg,err:C.error}),a.a.createElement(u,{filter:s,setFilter:v}),a.a.createElement(m,{newName:N,newPhone:P,addNewPerson:function(e){e.preventDefault();var t=n.find((function(e){return e.name===N}));if(!t||window.confirm("".concat(N," is already added to phonebook, replace the old number with a new one?"))){var r={name:N,number:P};t?b(r,t.id).then((function(e){o(n.map((function(t){return t.id!==e.id?t:e})))})).catch((function(){return A("Information of ".concat(r.name," has already removed from server."),1,1e4)})):h(r).then((function(e){A("Added ".concat(e.name,".")),o(n.concat(e))})).catch((function(e){return alert(e)})),j(""),x(""),v("")}},handleNewName:function(e){j(e.target.value)},handleNewPhone:function(e){x(e.target.value)}}),a.a.createElement(i,{persons:n,filter:s,delPerson:function(e){if(window.confirm("Delete ".concat(e.name,"?"))){if(e.id<5)return void alert("Imposible!");E(e.id).then(o(n.filter((function(t){return t.id!==e.id})))).catch((function(e){return alert(e)}))}}}))};l.a.render(a.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.03976bfb.chunk.js.map