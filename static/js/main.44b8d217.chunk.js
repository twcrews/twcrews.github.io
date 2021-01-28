(this["webpackJsonpportfolio-app"]=this["webpackJsonpportfolio-app"]||[]).push([[0],{25:function(e,t,a){},42:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var r=a(2),i=a(0),s=a.n(i),n=a(12),o=a.n(n),c=(a(42),a(25),a(23)),l=a(88),p=a(83),d=a(84),m=a(87),h=a(85),j=a(29),b=a(30),g=a.n(b),f=a(8);var u=function(){var e=Object(i.useState)(!1),t=Object(c.a)(e,2),a=t[0],n=t[1],o=Object(i.useState)(0),b=Object(c.a)(o,2),u=b[0],w=b[1];return Object(j.useScrollPosition)((function(e){e._prevPos;var t=e.currPos.y<0;t!==a&&n(t)}),[a]),Object(i.useEffect)((function(){var e=setInterval((function(){u<f.Header.SubtitleItems.length-1?w(u+1):w(0)}),2e3);return function(){return clearInterval(e)}})),Object(r.jsxs)(s.a.Fragment,{children:[Object(r.jsx)("div",{id:"top",className:"Top"}),Object(r.jsx)(l.a,{id:"nav",elevation:a?3:0,className:"AppBar",position:"sticky",children:Object(r.jsxs)(p.a,{className:"NavBar",children:[Object(r.jsxs)("span",{className:"NavItems",children:[Object(r.jsx)("img",{className:"NavLogo",alt:"Logo",src:f.Meta.Logo}),Object(r.jsx)(d.a,{className:"NavTitle",variant:"h6",children:f.Meta.Owner})]}),Object(r.jsx)("span",{className:"NavItems",children:Object(r.jsx)("span",{className:"AnchorButtons",children:f.Meta.Anchors.map((function(e){return Object(r.jsx)(m.a,{variant:e.Variant,color:e.Color,onClick:function(){return document.getElementById(e.Link).scrollIntoView()},children:e.Name},e.Name)}))})})]})}),Object(r.jsxs)("div",{className:"AboutSection",children:[Object(r.jsx)(d.a,{variant:"h1",paragraph:!0,className:"Header",children:f.Header.Title}),Object(r.jsxs)(d.a,{variant:"h4",className:"Subtitle",children:[f.Header.SubtitlePrefix,Object(r.jsx)(g.a,{text:f.Header.SubtitleItems[u],inline:!0})]}),Object(r.jsx)("div",{className:"HeaderSpacer"})]}),Object(r.jsx)("div",{className:"AttributesSection",children:Object(r.jsx)("div",{className:"Attributes",children:f.Attributes.map((function(e){return Object(r.jsxs)("div",{className:"AttributeTile",children:[Object(r.jsxs)("span",{className:"BigIcon",children:[Object(r.jsx)(h.a,{fontSize:"inherit",color:"primary",children:e.Icon}),Object(r.jsx)(d.a,{variant:"h5",children:e.Name})]}),Object(r.jsxs)("div",{className:"Multiline GrayText",children:[Object(r.jsx)(d.a,{color:"inherit",children:e.Description}),Object(r.jsx)(d.a,{variant:"h6",paragraph:!0}),e.Sections.map((function(e){return Object(r.jsxs)(s.a.Fragment,{children:[Object(r.jsx)(d.a,{variant:"h6",children:e.Title}),e.Content.map((function(e){return Object(r.jsx)(d.a,{children:e})})),Object(r.jsx)(d.a,{variant:"h6",paragraph:!0})]})}))]})]})}))})}),Object(r.jsxs)("div",{className:"PortfolioSection",id:"portfolio",children:[Object(r.jsx)(d.a,{variant:"h3",paragraph:!0,children:f.Portfolio.Title}),Object(r.jsx)("span",{className:"GrayText",children:Object(r.jsx)(d.a,{variant:"subtitle1",paragraph:!0,children:f.Portfolio.Description})}),Object(r.jsx)("div",{className:"PortfolioTiles",children:f.Portfolio.Projects.map((function(e){return Object(r.jsx)("div",{className:"PortfolioProject",style:{background:"linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("+e.Image+"), #00b9ff",backgroundSize:"cover"},children:Object(r.jsxs)("div",{className:"ProjectTypography",children:[Object(r.jsx)(d.a,{variant:"h6",children:e.Title}),Object(r.jsx)(d.a,{variant:"subtitle2",style:{opacity:.8},children:e.Description})]})})}))})]})]})},w=a(35),v=a(86),O=Object(w.a)(f.Meta.Theme);o.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(v.a,{theme:O,children:Object(r.jsx)(u,{})})}),document.getElementById("root"))},8:function(e){e.exports=JSON.parse('{"Meta":{"Theme":{"palette":{"primary":{"light":"#6aebff","main":"#00b9ff","dark":"#0089cb","contrastText":"#fff"},"secondary":{"main":"#f50057"}}},"Logo":"128_fill.png","Owner":"Tommy Crews","Anchors":[{"Name":"About","Link":"top","Color":"inherit"},{"Name":"Portfolio","Link":"portfolio","Color":"inherit"},{"Name":"Contact","Link":"contact","Variant":"contained","Color":"secondary"}]},"Header":{"Title":"Hello, world!","SubtitlePrefix":"I engineer ","SubtitleItems":["full stack software.","desktop applications.","websites.","databases.","software solutions.","graphics.","video productions.","collaborative projects.","strong teamwork.","professional products.","lasting relationships.","delicious coffee."]},"Attributes":[{"Name":"Software","Icon":"code","Description":"I\'ve been honing my development skills for over ten years.","Sections":[{"Title":"Back end languages","Content":["C#","Python","PHP","VB.NET","SQL"]},{"Title":"Front end languages","Content":["Javascript","JSX","HTML","CSS","X(A)ML"]}]},{"Name":"Design","Icon":"palette","Description":"I take pride in my attention to detail and artistic aptitudes.","Sections":[{"Title":"My specialties","Content":["Graphics","Video effects","Web/UX design","Photo editing"]},{"Title":"Favorite tools","Content":["Photoshop","GIMP","Illustrator","Premiere Pro","After Effects","InDesign","Adobe XD"]}]},{"Name":"Experience","Icon":"work-outline","Description":"I\'ve been working to improve these skills for most of my life.","Sections":[{"Title":"Who I\'ve worked for","Content":["NASA","SWOSU","Paycom Software","Darlington Schools"]},{"Title":"Freelance contracts","Content":["Growing Wellness, LLC","Kirch\'s Korner","ACTS Community Church","Bloom Counseling","Quail Springs Baptist Church"]}]}],"Portfolio":{"Title":"Project Portfolio","Description":"These are some projects I\'ve worked on. Some are works in progress.","Projects":[{"Title":"R\xe9sum\xe9","Year":"2021","Description":"An interactive r\xe9sum\xe9 built with React.","Image":"projects/resume.png","Link":"https://www.crews.dev/resume","Enabled":false,"FullWidth":true},{"Title":"Paycom Data Management","Year":"2020","Description":"A web application for safely and effectively executing data fixes.","Image":"projects/data-management.png","Link":"https://www.crews.dev/pcm-data-management","Enabled":false},{"Title":"bCards","Year":"2020","Description":"An offline React app alternative to online flash card services.","Image":"projects/b-cards.png","Link":"https://www.crews.dev/b-cards","Enabled":false},{"Title":"MarkIt","Year":"Coming Soon","Description":"A multi-platform desktop app for quickly watermarking images.","Image":"projects/markit.png","Link":"https://www.crews.dev/markit","Enabled":false},{"Title":"PDF2IMG","Year":"2020","Description":"A Windows app that converts a PDF document to an image or images.","Image":"projects/pdf2img.png","Link":"https://www.crews.dev/pdf2img","Enabled":false},{"Title":"TgaSharp","Year":"2020","Description":"A port of TgaSharpLib to .NET Core.","Image":"projects/tgasharp.png","Link":"https://www.crews.dev/tgasharp","Enabled":false},{"Title":"Sight Word Cards","Year":"2020","Description":"A Windows app for editing and presenting short strings on cards.","Image":"projects/sight-word-cards.png","Link":"https://www.crews.dev/sight-word-cards","Enabled":false},{"Title":"MAESTRO (NASA)","Year":"2017","Description":"An automated lab management tool that configures and controls rocket simulations.","Image":"projects/maestro.png","Link":"https://www.crews.dev/maestro","Enabled":false},{"Title":"MAESTRO (NASA)","Year":"2017","Description":"An automated lab management tool that configures and controls rocket simulations.","Image":"projects/maestro.png","Link":"https://www.crews.dev/maestro","Enabled":false},{"Title":"MAPSS (NASA)","Year":"2016","Description":"","Image":"projects/mapss.png","Link":"https://www.crews.dev/mapss","Enabled":false}]}}')}},[[64,1,2]]]);
//# sourceMappingURL=main.44b8d217.chunk.js.map