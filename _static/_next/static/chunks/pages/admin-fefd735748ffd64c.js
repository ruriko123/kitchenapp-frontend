(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[964],{577:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin",function(){return n(5771)}])},5819:function(e,t,n){"use strict";var r=n(5893);n(7294);var o=n(1664),i=n.n(o),a=n(2177),s=n(1163);t.Z=function(){let e=(0,s.useRouter)(),t=()=>{a.Z.post("/adminLogout").then(t=>{e.push("/login")}).catch(e=>{console.log(e)})};return(0,r.jsxs)("div",{className:"fixed-top navbar navbar-default d-flex justify-content-end ",children:[(0,r.jsx)("div",{className:"profile",children:(0,r.jsx)(i(),{href:"/profile",children:(0,r.jsx)("button",{type:"button",className:"py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",children:"Home"})})}),(0,r.jsx)("div",{className:"logout",children:(0,r.jsx)("button",{type:"button",onClick:t,className:"text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",children:"Logout"})})]})}},2177:function(e,t,n){"use strict";var r=n(6154);let o=r.Z.create({baseURL:"http://localhost:5000",timeout:2e4,withCredentials:!0});t.Z=o},3019:function(e,t,n){"use strict";var r=n(2177);let o=async()=>{console.log("here");try{var e;let t=await r.Z.get("/checkAdminLogin");return(null==t?void 0:null===(e=t.data)||void 0===e?void 0:e.status)||void 0}catch(e){return console.log(e),!1}};t.Z=o},5771:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(5893),o=n(7294),i=n(1163),a=n(1664),s=n.n(a),c=n(3019),d=n(2177),l=n(5819);function u(){let e=(0,i.useRouter)();o.useEffect(()=>{let t=async()=>{let t=await (0,c.Z)();t&&!1!==t||await e.push("/login")};t()},[]);let t=(e,t)=>{},n=()=>{d.Z.post("/adminLogout").then(t=>{e.push("/login")}).catch(e=>{console.log(e)})};return(0,r.jsxs)("div",{className:"Adminpage",children:[(0,r.jsx)(l.Z,{}),(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)("div",{className:"mt-3 btn-group-vertical d-flex align-content-center align-items-center",role:"group","aria-label":"Basic example",children:[(0,r.jsxs)(s(),{href:"/admin/addAdmin",children:[" ",(0,r.jsx)("button",{type:"button",onClick:e=>t(e,"/admin/addAdmin"),className:"text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",children:"Add Admin"})," "]}),(0,r.jsxs)(s(),{href:"/admin/viewAllAdmin",children:[" ",(0,r.jsx)("button",{type:"button",onClick:e=>t(e,"/admin/viewAllAdmin"),className:"text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",children:"View Admins"})," "]}),(0,r.jsxs)(s(),{href:"/operatingLocations",children:[" ",(0,r.jsx)("button",{type:"button",onClick:e=>t(e,"/operatingLocations"),className:"text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",children:"Operating Locations"})," "]})]}),(0,r.jsx)("div",{className:"mt-3 btn-group-vertical d-flex align-content-center align-items-center",role:"group","aria-label":"Basic example",children:(0,r.jsx)("button",{type:"button",className:"m-5",onClick:n,children:"Sign Out"})})]})]})}}},function(e){e.O(0,[827,664,774,888,179],function(){return e(e.s=577)}),_N_E=e.O()}]);