(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[753],{4181:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/outlet/addOutlet",function(){return r(3587)}])},5819:function(e,t,r){"use strict";var o=r(5893);r(7294);var n=r(1664),a=r.n(n),s=r(2177),l=r(1163);t.Z=function(){let e=(0,l.useRouter)(),t=()=>{s.Z.post("/adminLogout").then(t=>{e.push("/login")}).catch(e=>{console.log(e)})};return(0,o.jsxs)("div",{className:"fixed-top navbar navbar-default d-flex justify-content-end ",children:[(0,o.jsx)("div",{className:"profile",children:(0,o.jsx)(a(),{href:"/profile",children:(0,o.jsx)("button",{type:"button",className:"py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",children:"Home"})})}),(0,o.jsx)("div",{className:"logout",children:(0,o.jsx)("button",{type:"button",onClick:t,className:"text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",children:"Logout"})})]})}},2177:function(e,t,r){"use strict";var o=r(6154);let n=o.Z.create({baseURL:"http://localhost:5000",timeout:2e4,withCredentials:!0});t.Z=n},3019:function(e,t,r){"use strict";var o=r(2177);let n=async()=>{console.log("here");try{var e;let t=await o.Z.get("/checkAdminLogin");return(null==t?void 0:null===(e=t.data)||void 0===e?void 0:e.status)||void 0}catch(e){return console.log(e),!1}};t.Z=n},3587:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var o=r(5893),n=r(7294),a=r(1163),s=r(5301),l=r.n(s),i=r(2177),d=r(3019),u=r(5678);r(1399);var c=r(5819);function h(){let e=e=>u.Am.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}),t=e=>u.Am.success(e,{position:"top-right",autoClose:3500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"});(0,n.useEffect)(()=>{let e=async()=>{let e=await (0,d.Z)();e&&!1!==e||await r.push("/login")};e()},[]);let r=(0,a.useRouter)(),[s,h]=(0,n.useState)(""),[m,g]=(0,n.useState)(""),[p,v]=(0,n.useState)(""),[f,x]=(0,n.useState)(""),[j,b]=(0,n.useState)(""),N=e=>{var t;h(null===(t=e.target)||void 0===t?void 0:t.value)},k=e=>{var t;g(null===(t=e.target)||void 0===t?void 0:t.value)},y=e=>{var t;v(null===(t=e.target)||void 0===t?void 0:t.value)},w=e=>{var t;x(null===(t=e.target)||void 0===t?void 0:t.value)},C=e=>{var t;b(null===(t=e.target)||void 0===t?void 0:t.value)},_=async r=>{r.preventDefault(),i.Z.post("/addRestaurant",{Outlet_Name:f,Address:p,Phone:j,Email:m,baseURL:s}).then(e=>{var r;t(null==e?void 0:null===(r=e.data)||void 0===r?void 0:r.success)}).catch(t=>{var r,o;e(null==t?void 0:null===(r=t.response)||void 0===r?void 0:null===(o=r.data)||void 0===o?void 0:o.error)})};return(0,o.jsxs)("div",{className:"container-fluid d-flex justify-content-center align-items-center align-content-center mt-auto",children:[(0,o.jsx)(l(),{}),(0,o.jsx)(c.Z,{}),(0,o.jsx)(u.Ix,{}),(0,o.jsx)("div",{className:"container-fluid container",children:(0,o.jsxs)("form",{children:[(0,o.jsx)("div",{className:"d-flex justify-content-center align-items-center align-content-center mt-auto",children:(0,o.jsx)("span",{children:"Register Restaurant"})}),(0,o.jsxs)("div",{className:"form-group",children:[(0,o.jsx)("label",{htmlFor:"exampleInputEmail1",children:"Name"}),(0,o.jsx)("input",{type:"text",className:"form-control ",placeholder:"Enter Name",onChange:e=>w(e),required:!0})]}),(0,o.jsxs)("div",{className:"form-group ",children:[(0,o.jsx)("label",{htmlFor:"exampleInputPassword1",children:"Address"}),(0,o.jsx)("input",{type:"text",className:"form-control ",placeholder:"Address",onChange:e=>y(e),required:!0})]}),(0,o.jsxs)("div",{className:"form-group ",children:[(0,o.jsx)("label",{htmlFor:"exampleInputPassword1",children:"Phone"}),(0,o.jsx)("input",{type:"Phone",className:"form-control",placeholder:"Phone",onChange:e=>C(e),required:!0})]}),(0,o.jsxs)("div",{className:"form-group",children:[(0,o.jsx)("label",{htmlFor:"exampleInputPassword1",children:"Email"}),(0,o.jsx)("input",{type:"email",className:"form-control",placeholder:"email",onChange:e=>k(e),required:!0})]}),(0,o.jsxs)("div",{className:"form-group ",children:[(0,o.jsx)("label",{htmlFor:"exampleInputPassword1",children:"BaseURL"}),(0,o.jsx)("input",{type:"url",className:"form-control ",placeholder:"BaseURL",onChange:e=>N(e),required:!0})]}),(0,o.jsx)("div",{className:"form-group ",children:(0,o.jsx)("button",{onClick:_,className:"loginBtn form-control mt-3",children:"Submit"})})]})})]})}}},function(e){e.O(0,[827,664,477,774,888,179],function(){return e(e.s=4181)}),_N_E=e.O()}]);