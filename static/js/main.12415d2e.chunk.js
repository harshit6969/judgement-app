(this.webpackJsonpjudgement=this.webpackJsonpjudgement||[]).push([[0],{108:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),n=a(10),o=a.n(n);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=a(17),i=a(109),l=a(143),d=a(171),h=a(174),j=a(144),u=a(145),p=a(146),b=a(147),m=a(148),x=a(149),O=a(150),g=a(151),y=a(29),S=a(152),f=a(153),I=a(73),v=a(13);function C(e,t){console.log(t),localStorage.setItem(e,JSON.stringify(t))}var D=a.p+"static/media/Parmar.e4333bff.jpg",k=a.p+"static/media/Maadi.295369c5.jpg",P=a.p+"static/media/Harshit.6d6ba388.jpg",R=a.p+"static/media/Shanky.6a05c1a0.jpg",w=a.p+"static/media/Vikas.d6fcd5d4.jpg";var M=[{ID:0,Name:"Parmar",IsMF:!0,Profile:D,CurrentRoundScore:0,TotalScore:0,Scores:[],ColorCode:"#f06292"},{ID:1,Name:"Sanket",IsMF:!0,Profile:R,CurrentRoundScore:0,TotalScore:0,Scores:[],ColorCode:"#B89A43"},{ID:2,Name:"Harshit",IsMF:!1,Profile:P,CurrentRoundScore:0,TotalScore:0,Scores:[],ColorCode:"#1976d2"},{ID:3,Name:"Maadi",IsMF:!1,Profile:k,CurrentRoundScore:0,TotalScore:0,Scores:[],ColorCode:"#2e7d32"},{ID:6,Name:"Shivam",IsMF:!1,Profile:a.p+"static/media/Shivam.90d3ce73.jpeg",CurrentRoundScore:0,TotalScore:0,Scores:[],ColorCode:"#F205FF"},{ID:8,Name:"Vikas",IsMF:!1,Profile:w,CurrentRoundScore:0,TotalScore:0,Scores:[],ColorCode:"#581428"},{ID:9,Name:"Player 1",IsMF:!1,Profile:a.p+"static/media/Billu.beeb4659.jpeg",CurrentRoundScore:0,TotalScore:0,Scores:[],ColorCode:"#28B5CD"}],H=a(4);function N(e,t){return e.filter((e=>-1===t.indexOf(e)))}function T(e,t){return e.filter((e=>-1!==t.indexOf(e)))}var B=Object(v.f)((e=>{let{history:t}=e;const[a,r]=Object(s.useState)([]),[n,o]=Object(s.useState)(M),[c,v]=Object(s.useState)([]),D=Object(s.useCallback)((e=>{const t=a.indexOf(e),s=[...a];-1===t?s.push(e):s.splice(t,1),r(s)}),[a]),k=e=>T(a,e).length,P=e=>{var t,s;k(e)===e.length?r(N(a,e)):r((t=a,s=e,[...t,...N(s,t)]))},R=Object(s.useMemo)((()=>e=>e.map((e=>{const t="transfer-list-all-item-".concat(e.ID,"-label");return Object(H.jsxs)(i.a,{button:!0,onClick:()=>D(e),children:[Object(H.jsx)(l.a,{children:Object(H.jsx)(d.a,{checked:-1!==a.indexOf(e),disableRipple:!0,inputProps:{"aria-labelledby":t}})}),Object(H.jsx)(h.a,{src:e.Profile,alt:e.Name,style:{width:40,height:40,marginRight:"8px"}}),Object(H.jsx)(j.a,{id:t,primary:e.Name})]},e.ID)}))),[a,D]),w=(e,t)=>Object(H.jsxs)(u.a,{style:{display:"flex",flexDirection:"column",height:"100%"},children:[Object(H.jsx)(p.a,{avatar:Object(H.jsx)(d.a,{onClick:()=>P(t),checked:k(t)===t.length&&0!==t.length,indeterminate:k(t)!==t.length&&0!==k(t),disabled:0===t.length,inputProps:{"aria-label":"all items selected"}}),title:e,subheader:"".concat(k(t),"/").concat(t.length," selected")}),Object(H.jsx)(b.a,{}),Object(H.jsx)(m.a,{dense:!0,style:{flex:1,overflowY:"auto"},children:R(t)})]});return Object(H.jsxs)(x.a,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",style:{height:"95vh",display:"flex",flexDirection:"column"},children:[Object(H.jsx)(O.a,{position:"static",children:Object(H.jsx)(g.a,{children:Object(H.jsx)(y.a,{variant:"h6",children:"Home"})})}),Object(H.jsxs)(S.a,{style:{flex:1,paddingTop:"16px",display:"flex",flexDirection:"column"},children:[Object(H.jsxs)(x.a,{container:!0,spacing:2,justifyContent:"center",alignItems:"stretch",style:{flex:1},children:[Object(H.jsx)(x.a,{item:!0,xs:5,style:{height:"100%"},children:w("Available Players",n)}),Object(H.jsxs)(x.a,{item:!0,xs:2,style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[Object(H.jsx)(f.a,{variant:"outlined",size:"small",onClick:()=>{v(c.concat(T(a,n))),o(N(n,a)),r(N(a,a))},disabled:0===T(a,n).length,"aria-label":"move selected right",style:{marginBottom:"8px"},children:">"}),Object(H.jsx)(f.a,{variant:"outlined",size:"small",onClick:()=>{o(n.concat(T(a,c))),v(N(c,a)),r(N(a,a))},disabled:0===T(a,c).length,"aria-label":"move selected left",children:"<"})]}),Object(H.jsx)(x.a,{item:!0,xs:5,style:{height:"100%"},children:w("Selected Players",c)})]}),Object(H.jsx)(f.a,{variant:"contained",color:"primary",onClick:()=>{if(c.length>=4&&c.length<=10){const e=Object(I.v4)();C(e,{Players:c}),t.push("/judgement-app/".concat(e))}else alert("Player count not suitable for the game. Select between 4 and 10 players.")},disabled:c.length<4||c.length>10,style:{marginTop:"16px",alignSelf:"center",width:"50%"},children:"Start Game"})]})]})})),E=a(66),F=a(157),A=a(163),U=a(165),W=a(169),J=a(166),G=a(167),_=a(168),z=a(158),V=a(159),Y=a(160),q=a(175),K=a(172),L=a(155),$=a(156),Q=a(161),X=a(162);class Z extends r.a.Component{constructor(e){super(e),this.state={activeStep:0,players:this.props.players,IsPlaying:this.props.RoundInProgress,hasError:!1,errorInfo:null,TotalHands:0,MaxHands:parseInt(52/this.props.players.length)},this.handleBeforeRoundSubmit=this.handleBeforeRoundSubmit.bind(this),this.handleAfterRoundSubmit=this.handleAfterRoundSubmit.bind(this)}handleBeforeRoundSubmit(){try{let e=this.state.players,t=!0,a=0;for(let s of e){if(!this.state.hasOwnProperty(s.ID)){t=!1;break}s.CurrentRoundScore=parseInt(this.state[s.ID]),a+=this.state[s.ID]}t&&this.state.MaxHands!==parseInt(a)?this.props.handleScoreUpload(this.state):this.state.MaxHands===parseInt(a)?this.setState({hasError:!0,errorInfo:"Invalid hands:"+a.toString(),activeStep:0}):this.setState({hasError:!0,errorInfo:"Sabko bharne do",activeStep:0})}catch(e){this.setState({hasError:!0,errorInfo:"Bhakk"})}}handleAfterRoundSubmit(){let e=this.state.players,t=!0;for(let a of e)if(!this.state[a.ID]){t=!1;break}t?this.setState({hasError:!0,errorInfo:"Bhakk"}):this.props.handleScoreUpload(this.state)}componentDidMount(){this.state.IsPlaying&&this.state.players.forEach((e=>this.setState({[e.ID]:!0})))}getOrderedPlayers(){const{players:e}=this.state,{currentRounds:t}=this.props,a=t%e.length;return[...e.slice(a),...e.slice(0,a)]}render(){const e=this.getOrderedPlayers();return this.state.IsPlaying?Object(H.jsxs)(K.a,{open:!0,children:[Object(H.jsxs)(L.a,{children:["Results for Round: ",Object(H.jsx)("strong",{children:this.props.currentRounds+1})," "]}),Object(H.jsx)($.a,{children:Object(H.jsx)("form",{children:Object(H.jsxs)(F.a,{required:!0,component:"fieldset",children:[Object(H.jsx)(z.a,{component:"legend",children:"Unselect failures"}),Object(H.jsx)(V.a,{children:e.map(((e,t)=>Object(H.jsx)(Y.a,{control:Object(H.jsx)(d.a,{checked:this.state[e.ID],onChange:e=>this.setState({[e.target.value]:!this.state[e.target.value]}),value:e.ID}),label:"".concat(e.Name," - ").concat(e.CurrentRoundScore)},e.ID)))}),Object(H.jsx)(Q.a,{error:this.state.hasError,children:this.state.errorInfo})]})})}),Object(H.jsx)(X.a,{children:Object(H.jsxs)("div",{children:[Object(H.jsx)(f.a,{variant:"contained",color:"primary",onClick:this.handleAfterRoundSubmit,children:"Submit"}),Object(H.jsx)(f.a,{variant:"contained",color:"error",onClick:this.props.handleBack,children:"Back"})]})})]}):Object(H.jsxs)(K.a,{disableBackdropClick:!0,fullWidth:!0,maxWidth:"lg",disableEscapeKeyDown:!0,open:!0,style:{maxHeight:"90%",overflow:"hidden"},children:[Object(H.jsxs)(L.a,{children:["Round: ",Object(H.jsx)("strong",{children:this.props.currentRounds+1})," | Hands:"," ",this.state.TotalHands]}),Object(H.jsxs)($.a,{style:{display:"flex",flexDirection:"column",overflowY:"auto",height:"60vh"},children:[Object(H.jsx)(x.a,{container:!0,direction:"column",justifyContent:"space-between",alignItems:"stretch",spacing:1,style:{height:"100%",paddingTop:"5%"},children:e.map((e=>Object(H.jsxs)(x.a,{container:!0,direction:"row",justifyContent:"space-between",spacing:2,style:{color:e.ColorCode},children:[Object(H.jsx)(x.a,{item:!0,xs:12,sm:2,md:1,children:Object(H.jsx)(y.a,{variant:"subtitle1",children:e.Name})}),Object(H.jsx)(x.a,{item:!0,xs:12,sm:10,md:11,container:!0,direction:"row",justifyContent:"center",alignItems:"center",children:Object(H.jsx)(q.a,{value:this.state[e.ID],onChange:(t,a)=>{let s=this.state.players,r=a;for(let n of s)this.state.hasOwnProperty(n.ID)&&e.ID!==n.ID&&(r+=this.state[n.ID]);this.setState({[e.ID]:a,TotalHands:r})},min:0,max:this.state.MaxHands,step:1,marks:[...Array(this.state.MaxHands+1).keys()].map((e=>({value:e,label:e.toString()}))),valueLabelDisplay:void 0!==this.state[e.ID]?"on":"off",style:{width:"100%",color:e.ColorCode}})})]},e.ID)))}),Object(H.jsx)(Q.a,{error:this.state.hasError,children:this.state.errorInfo})]}),Object(H.jsxs)(X.a,{children:[Object(H.jsx)(f.a,{variant:"contained",color:"primary",onClick:this.handleBeforeRoundSubmit,children:"Submit"}),Object(H.jsx)(f.a,{variant:"contained",color:"warning",onClick:this.props.handleBack,children:"Back"})]})]})}}var ee=Z,te=a(164),ae=a(46);class se extends s.PureComponent{constructor(e){super(e),this.state={data:this.props.scores||[],chartData:[]}}componentDidMount(){this.prepareChartData()}componentDidUpdate(e){e.scores!==this.props.scores&&this.setState({data:this.props.scores},(()=>{this.prepareChartData()}))}prepareChartData(){const{data:e}=this.state;if(!e||0===e.length)return void this.setState({chartData:[]});const t=Math.max(...e.map((e=>{var t;return(null===(t=e.Scores)||void 0===t?void 0:t.length)||0})));let a=[],s={round:0};e.forEach((e=>{s[e.Name]=0})),a.push(s);for(let r=0;r<t;r++){let t={round:r+1};e.forEach((e=>{let a=0;e.Scores&&e.Scores.length>0&&(a=e.Scores.slice(0,r+1).reduce(((e,t)=>e+(void 0!==t&&null!==t?t:0)),0)),t[e.Name]=a})),a.push(t)}this.setState({chartData:a})}render(){const{chartData:e,data:t}=this.state,a=this.props.scores||[];return Object(H.jsxs)(x.a,{container:!0,spacing:2,children:[Object(H.jsx)(x.a,{item:!0,xs:12,sm:9,children:Object(H.jsx)("div",{style:{width:"100%",height:"100%"},children:e.length>0&&t.length>0&&Object(H.jsxs)(ae.b,{data:e,style:{height:"100%"},children:[Object(H.jsx)(ae.a,{}),Object(H.jsx)(ae.d,{}),t.map((e=>Object(H.jsx)(ae.c,{valueField:e.Name,argumentField:"round",name:e.Name,color:e.ColorCode},e.Name)))]})})}),Object(H.jsx)(x.a,{container:!0,item:!0,xs:12,sm:3,direction:"column",justifyContent:"space-evenly",style:{listStyleType:"none"},children:a.map((e=>Object(H.jsxs)(i.a,{children:[Object(H.jsx)(A.a,{children:Object(H.jsx)(h.a,{src:e.Profile})}),Object(H.jsx)(j.a,{primary:e.Name}),Object(H.jsx)(te.a,{children:Object(H.jsx)(A.a,{children:Object(H.jsx)(h.a,{style:{backgroundColor:e.ColorCode},children:e.TotalScore})})})]},e.Name)))})]})}}class re extends r.a.Component{constructor(e){super(e);let t=this.props.location.pathname.split("/");this.state={GameId:t[t.length-1],RoundInProgress:!1,openPlayerHandler:!1,Players:[],currentRounds:0,leaderboard:[],seconds:0},this.updateScorecard=this.updateScorecard.bind(this)}tick(){this.setState((e=>({seconds:e.seconds+1})))}componentDidMount(){try{this.interval=setInterval((()=>this.tick()),1e3);let t=(e=this.state.GameId,JSON.parse(localStorage.getItem(e)));t&&Object.keys(t).map((e=>this.setState({[e]:t[e]})))}catch(t){this.props.history.push("/")}var e}componentWillUnmount(){clearInterval(this.interval)}updateScorecard(e){let{Players:t,RoundInProgress:a,currentRounds:s,seconds:r,GameId:n}=this.state,o=[...t],c={};try{if(a){o.forEach((t=>{t.CurrentRoundScore=e[t.ID]?t.CurrentRoundScore+10:0,t.Scores.push(t.CurrentRoundScore),t.TotalScore+=t.CurrentRoundScore,t.CurrentRoundScore=0})),c={Players:o,currentRounds:s+1,RoundInProgress:!1,openPlayerHandler:!1,leaderboard:[...o].sort(((e,t)=>t.TotalScore-e.TotalScore)),seconds:r}}else{let t=0;o.forEach((a=>{a.CurrentRoundScore=e[a.ID],t+=e[a.ID]})),c={Players:o,RoundInProgress:!0,openPlayerHandler:!1,TotalRoundScore:t}}}finally{this.setState(c),C(n,Object(E.a)(Object(E.a)({},this.state),c))}}render(){return Object(H.jsxs)(x.a,{container:!0,direction:"row",alignItems:"center",children:[Object(H.jsx)(O.a,{position:"static",children:Object(H.jsx)(g.a,{children:Object(H.jsx)(S.a,{children:Object(H.jsxs)(x.a,{container:!0,direction:"row",justify:"space-between",alignItems:"center",children:[Object(H.jsx)(y.a,{variant:"h5",children:"Judgement"}),Object(H.jsx)(y.a,{variant:"h6",children:this.state.seconds.toString().toHHMMSS()})]})})})}),Object(H.jsxs)(x.a,{container:!0,spacing:2,alignItems:"center",children:[Object(H.jsx)(x.a,{item:!0,container:!0,xs:12,sm:8,justifyContent:"space-evenly",style:{paddingTop:"2%"},children:this.state.Players.map((e=>Object(H.jsx)(A.a,{children:Object(H.jsx)(U.a,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:Object(H.jsx)(h.a,{style:{height:"22px",width:"22px",backgroundColor:e.ColorCode},children:e.CurrentRoundScore}),children:Object(H.jsx)(h.a,{alt:e.Name,src:e.Profile,style:{height:"40px",width:"40px"}})})},e.ID)))}),Object(H.jsx)(x.a,{item:!0,xs:6,sm:2,children:Object(H.jsx)(F.a,{fullWidth:!0,children:Object(H.jsxs)(W.a,{value:this.state.trump_color||"",onChange:e=>this.setState({trump_color:e.target.value}),input:Object(H.jsx)(J.a,{}),displayEmpty:!0,children:[Object(H.jsx)(G.a,{value:"",disabled:!0,children:"Select Trump"}),Object(H.jsx)(G.a,{value:"black",style:{color:"black"},children:"\u0939\u0941\u0915\u0941\u092e"}),Object(H.jsx)(G.a,{value:"red",style:{color:"red"},children:"\u092a\u093e\u0928"}),Object(H.jsx)(G.a,{value:"black_chidi",style:{color:"black"},children:"\u091a\u093f\u0921\u0940"}),Object(H.jsx)(G.a,{value:"red_eint",style:{color:"red"},children:"\u0908\u0902\u091f"})]})})}),Object(H.jsx)(x.a,{item:!0,xs:6,sm:2,children:Object(H.jsx)(y.a,{component:"div",children:Object(H.jsxs)(x.a,{container:!0,alignItems:"center",spacing:1,children:[Object(H.jsx)(x.a,{item:!0,children:"End"}),Object(H.jsx)(x.a,{item:!0,children:Object(H.jsx)(_.a,{checked:this.state.RoundInProgress,onChange:()=>this.setState({openPlayerHandler:!0}),value:"Start"})}),Object(H.jsx)(x.a,{item:!0,children:"Start"})]})})})]}),Object(H.jsx)(se,{scores:this.state.leaderboard}),this.state.openPlayerHandler?Object(H.jsx)(ee,{handleScoreUpload:this.updateScorecard,players:this.state.Players,RoundInProgress:this.state.RoundInProgress,handleBack:()=>this.setState({openPlayerHandler:!1}),currentRounds:this.state.currentRounds}):null]})}}var ne=Object(v.f)(re),oe=a(52);String.prototype.toHHMMSS=function(){var e=parseInt(this,10),t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),s=e-3600*t-60*a;return t<10&&(t="0"+t),a<10&&(a="0"+a),s<10&&(s="0"+s),t+":"+a+":"+s};const ce=Object(c.a)();o.a.render(Object(H.jsx)(oe.a,{history:ce,children:Object(H.jsxs)(v.c,{children:[Object(H.jsx)(v.a,{path:"/judgement-app/:id",children:Object(H.jsx)(ne,{})}),Object(H.jsx)(v.a,{path:"*",children:Object(H.jsx)(B,{})})]})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((e=>{e.unregister()}))}},[[108,1,2]]]);
//# sourceMappingURL=main.12415d2e.chunk.js.map