!function(){"use strict";var t,e={331:function(t,e,a){var i=a(471),s={},r=a(656),n=(0,r.A)(s,(function(){this._self._c;return this._m(0)}),[function(){var t=this._self._c;return t("div",{staticClass:"position-fixed top-0 start-0 w-100 h-100",attrs:{id:"love_loading"}},[t("ul",{staticClass:"m-0 p-0"},[t("li"),t("li"),t("li"),t("li"),t("li"),t("li"),t("li"),t("li"),t("li")])])}],!1,null,"c2886f2e",null).exports,o={props:{JavDBDataList:{type:Object,required:!0}},computed:{isShowJavDBDataList(){return Object.keys(this.JavDBDataList).length>0}}},l=(0,r.A)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"w-100 py-3 rounded container overflow-y-scroll",attrs:{id:"JavDB-dataList"}},[e("ul",{staticClass:"p-0 m-0 w-100 h-100"},[t.isShowJavDBDataList?t._l(t.JavDBDataList,(function(a,i){return e("li",{key:i},[e("h2",{staticClass:"fw-bolder fs-3 text-red my-2 text-center"},[t._v(t._s(i)+"：")]),e("ul",{staticClass:"p-0 m-0"},t._l(a,(function(a,i){return e("li",{key:i},[a.fanhao?[e("h3",[t._v(t._s(a.fanhao))]),e("div",{staticClass:"clearfix"},[e("p",[t._v(t._s(a.title))])]),e("hr")]:[e("h3",{staticClass:"my-2"},[t._v(t._s(a.content))]),e("hr")]],2)})),0)])})):[e("h2",{staticClass:"text-center"},[t._v("暂无数据")])]],2)])}),[],!1,null,"60de3d8b",null).exports,c={data(){return{JavDBDataList:{search:""}}},methods:{focusInput(){this.$refs.searchInput.focus()},handleSearch(){this.$emit("searchEvent",this.JavDBDataList.search)}},computed:{searchStyle(){return{"--computed-width":document.body.offsetWidth-32+"px"}}}},u=(0,r.A)(c,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-box my-3 mx-3"},[e("div",{staticClass:"input-wrapper"},[e("button",{staticClass:"icon",on:{click:t.focusInput}},[e("svg",{attrs:{width:"25px",height:"25px",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z",stroke:"#fff","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}}),e("path",{attrs:{d:"M22 22L20 20",stroke:"#fff","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}})])]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.JavDBDataList.search,expression:"JavDBDataList.search",modifiers:{trim:!0}}],ref:"searchInput",staticClass:"input",style:t.searchStyle,attrs:{type:"text",name:"text",placeholder:"搜索数据"},domProps:{value:t.JavDBDataList.search},on:{input:[function(e){e.target.composing||t.$set(t.JavDBDataList,"search",e.target.value.trim())},t.handleSearch],blur:function(e){return t.$forceUpdate()}}})])])}),[],!1,null,"ef08b882",null).exports,h={data(){return{title:"JavDB番号收藏数据库",JavDBDataList:{},JavDBDataListHeight:"auto",isShowSearchBar:!1,SearchBar:{search:""}}},components:{DataView:l,SearchBar:u},mounted(){setTimeout((()=>{this.$emit("loadingEvent",!1)}),2500)},updated(){this.isShowJavDBDataList&&(this.isShowSearchBar=!0)},methods:{queryData(t){this.$emit("loadingEvent",!0),fetch(t).then((t=>t.json())).then((t=>{this.JavDBDataList=t,this.$nextTick((()=>{this.adjustDataListHeight(),window.addEventListener("resize",this.adjustDataListHeight)}))})).catch((t=>{})).finally((()=>{setTimeout((()=>{this.$emit("loadingEvent",!1)}),1e3)}))},adjustDataListHeight(){const t=this.$refs.JavDBHead.offsetHeight,e=document.body.offsetHeight;this.JavDBDataListHeight=e>t?e-t-50+"px":"auto"},handleSearchEvent(t){this.SearchBar.search=t}},computed:{isShowJavDBDataList(){return Object.keys(this.JavDBDataList).length>0},renderSearchData(){const t=this.SearchBar.search.toLowerCase().toString(),e={};return Object.keys(this.JavDBDataList).forEach((a=>{const i=this.JavDBDataList[a].filter((e=>{const a=(e.fanhao||"").toLowerCase().toString(),i=(e.title||"").toLowerCase().toString(),s=(e.content||"").toLowerCase().toString();return a.includes(t)||i.includes(t)||s.includes(t)}));i.length>0&&(e[a]=i)})),e}},beforeDestroy(){window.removeEventListener("resize",this.adjustDataListHeight)}},d=(0,r.A)(h,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-white position-relative z-3 d-flex w-100 h-100"},[e("div",{staticClass:"w-100 h-100 container py-2 d-flex flex-column justify-content-around m-auto"},[e("div",{ref:"JavDBHead",staticClass:"rounded w-100",attrs:{id:"JavDB-head"}},[e("h1",{staticClass:"w-100 text-center py-2 px-2 border-bottom fw-bolder"},[t._v(t._s(t.title))]),e("div",{staticClass:"option-box my-2 py-2 text-lg-start text-center"},[e("a",{staticClass:"item my-lg-0 my-2 btn btn-primary",attrs:{href:"javascript: void (0);"},on:{click:function(e){return t.queryData("https://slowfever-ding.github.io/javdbnumberdatabase/db/JavDB.json")}}},[t._v("番号清单")]),e("a",{staticClass:"item my-lg-0 my-2 btn btn-primary",attrs:{href:"javascript: void (0);"},on:{click:function(e){return t.queryData("https://slowfever-ding.github.io/javdbnumberdatabase/db/series.json")}}},[t._v("系列清单")])])]),t.isShowJavDBDataList?e("DataView",{style:{height:t.JavDBDataListHeight},attrs:{JavDBDataList:t.renderSearchData}}):t._e(),t.isShowSearchBar?e("SearchBar",{on:{searchEvent:t.handleSearchEvent}}):t._e()],1)])}),[],!1,null,"4384c866",null).exports,v={data(){return{loveLoading:!0}},components:{JavdbLoading:n,HomeView:d},methods:{handleLoadingEvent(t){this.loveLoading=t}}},f=(0,r.A)(v,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"w-100 h-100",attrs:{id:"app"}},[t.loveLoading?e("JavdbLoading"):t._e(),e("HomeView",{on:{loadingEvent:t.handleLoadingEvent}})],1)}),[],!1,null,null,null).exports,p=a(413),m=a(625);a(313);i.default.use(p.vGs),i.default.use(m.YS),i.default.config.productionTip=!1,new i.default({render:t=>t(f)}).$mount("#app")}},a={};function i(t){var s=a[t];if(void 0!==s)return s.exports;var r=a[t]={exports:{}};return e[t](r,r.exports,i),r.exports}i.m=e,t=[],i.O=function(e,a,s,r){if(!a){var n=1/0;for(u=0;u<t.length;u++){a=t[u][0],s=t[u][1],r=t[u][2];for(var o=!0,l=0;l<a.length;l++)(!1&r||n>=r)&&Object.keys(i.O).every((function(t){return i.O[t](a[l])}))?a.splice(l--,1):(o=!1,r<n&&(n=r));if(o){t.splice(u--,1);var c=s();void 0!==c&&(e=c)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[a,s,r]},i.d=function(t,e){for(var a in e)i.o(e,a)&&!i.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},function(){var t={524:0};i.O.j=function(e){return 0===t[e]};var e=function(e,a){var s,r,n=a[0],o=a[1],l=a[2],c=0;if(n.some((function(e){return 0!==t[e]}))){for(s in o)i.o(o,s)&&(i.m[s]=o[s]);if(l)var u=l(i)}for(e&&e(a);c<n.length;c++)r=n[c],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(u)},a=self.webpackChunkjavdb_number_database=self.webpackChunkjavdb_number_database||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var s=i.O(void 0,[504],(function(){return i(331)}));s=i.O(s)}();
//# sourceMappingURL=app.58a7f1af.js.map