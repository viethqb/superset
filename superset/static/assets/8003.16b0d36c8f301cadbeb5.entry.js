"use strict";(globalThis.webpackChunksuperset=globalThis.webpackChunksuperset||[]).push([[8003],{893297:(e,t,r)=>{r.d(t,{$:()=>a});class n{constructor(e){if(this.cache=void 0,this.capacity=void 0,e<1)throw new Error("The capacity in LRU must be greater than 0.");this.capacity=e,this.cache=new Map}has(e){return this.cache.has(e)}get(e){if("string"!=typeof e)throw new TypeError("The LRUCache key must be string.");if(this.cache.has(e)){const t=this.cache.get(e);return this.cache.delete(e),this.cache.set(e,t),t}}set(e,t){if("string"!=typeof e)throw new TypeError("The LRUCache key must be string.");this.cache.size>=this.capacity&&this.cache.delete(this.cache.keys().next().value),this.cache.set(e,t)}clear(){this.cache.clear()}get size(){return this.cache.size}values(){return[...this.cache.values()]}}function a(e=100){return new n(e)}},229487:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(211965),a=r(404863),o=r(751995),i=r(313322),s=r(135944);function l(e){const{type:t="info",description:r,showIcon:l=!0,closable:d=!0,roomBelow:c=!1,children:p}=e,u=(0,o.Fg)(),{colors:h,typography:m,gridUnit:g}=u,{alert:b,error:f,info:v,success:y}=h;let $=v,x=i.Z.InfoSolid;return"error"===t?($=f,x=i.Z.ErrorSolid):"warning"===t?($=b,x=i.Z.AlertSolid):"success"===t&&($=y,x=i.Z.CircleCheckSolid),(0,s.tZ)(a.default,{role:"alert",showIcon:l,icon:(0,s.tZ)(x,{"aria-label":`${t} icon`}),closeText:d&&(0,s.tZ)(i.Z.XSmall,{"aria-label":"close icon"}),css:(0,n.iv)({marginBottom:c?4*g:0,padding:`${2*g}px ${3*g}px`,alignItems:"flex-start",border:0,backgroundColor:$.light2,"& .ant-alert-icon":{marginRight:2*g},"& .ant-alert-message":{color:$.dark2,fontSize:m.sizes.m,fontWeight:r?m.weights.bold:m.weights.normal},"& .ant-alert-description":{color:$.dark2,fontSize:m.sizes.m}},"",""),...e,children:p})}},749140:(e,t,r)=>{r.d(t,{Z5:()=>_,ry:()=>x,up:()=>v,Ad:()=>w,cE:()=>y,iO:()=>f,YH:()=>$,uh:()=>m});var n=r(667294),a=r(953239),o=r(967913),i=r(938325),s=r(400057),l=r(751995),d=r(211965),c=r(135944),p=r(214640),u=r(104715);const h=({title:e,icon:t,body:r,meta:n,footer:a})=>(0,c.BX)("div",{className:"tooltip-detail",children:[(0,c.BX)("div",{className:"tooltip-detail-head",children:[(0,c.BX)("div",{className:"tooltip-detail-title",children:[t,e]}),n&&(0,c.tZ)("span",{className:"tooltip-detail-meta",children:(0,c.tZ)(u.Vp,{color:"default",children:n})})]}),r&&(0,c.tZ)("div",{className:"tooltip-detail-body",children:null!=r?r:e}),a&&(0,c.tZ)("div",{className:"tooltip-detail-footer",children:a})]}),m=e=>`${(0,p.renderToStaticMarkup)((0,c.tZ)(h,{...e}))}`;a.config.setModuleUrl("ace/mode/css_worker",s);const g={"mode/sql":()=>r.e(8883).then(r.t.bind(r,248883,23)),"mode/markdown":()=>Promise.all([r.e(9794),r.e(5802),r.e(4832),r.e(6061)]).then(r.t.bind(r,866061,23)),"mode/css":()=>Promise.all([r.e(5802),r.e(4972)]).then(r.t.bind(r,994972,23)),"mode/json":()=>r.e(8750).then(r.t.bind(r,158750,23)),"mode/yaml":()=>r.e(741).then(r.t.bind(r,260741,23)),"mode/html":()=>Promise.all([r.e(9794),r.e(5802),r.e(4832),r.e(1258)]).then(r.t.bind(r,171258,23)),"mode/javascript":()=>Promise.all([r.e(9794),r.e(4579)]).then(r.t.bind(r,754579,23)),"theme/textmate":()=>r.e(2089).then(r.t.bind(r,302089,23)),"theme/github":()=>r.e(440).then(r.t.bind(r,550440,23)),"ext/language_tools":()=>r.e(5335).then(r.t.bind(r,375335,23)),"ext/searchbox":()=>r.e(8656).then(r.t.bind(r,468656,23))};function b(e,{defaultMode:t,defaultTheme:s,defaultTabSize:p=2,fontFamily:u="Menlo, Consolas, Courier New, Ubuntu Mono, source-code-pro, Lucida Console, monospace",placeholder:h}={}){return(0,o.Z)((async()=>{var o,h;const{default:m}=await Promise.resolve().then(r.bind(r,874981));await Promise.all(e.map((e=>g[e]())));const b=t||(null==(o=e.find((e=>e.startsWith("mode/"))))?void 0:o.replace("mode/","")),f=s||(null==(h=e.find((e=>e.startsWith("theme/"))))?void 0:h.replace("theme/",""));return(0,n.forwardRef)((function({keywords:e,mode:t=b,theme:r=f,tabSize:o=p,defaultValue:s="",...h},g){const v=(0,l.Fg)(),y=(0,a.acequire)("ace/ext/language_tools"),$=(0,i.Z)((e=>{const r={getCompletions:(r,n,a,o,i)=>{Number.isNaN(parseInt(o,10))&&n.getMode().$id===`ace/mode/${t}`&&i(null,e)}};y.setCompleters([r])}));return(0,n.useEffect)((()=>{e&&$(e)}),[e,$]),(0,c.BX)(c.HY,{children:[(0,c.tZ)(d.xB,{styles:d.iv`
                .ace_tooltip {
                  margin-left: ${2*v.gridUnit}px;
                  padding: 0px;
                  border: 1px solid ${v.colors.grayscale.light1};
                }

                & .tooltip-detail {
                  background-color: ${v.colors.grayscale.light5};
                  white-space: pre-wrap;
                  word-break: break-all;
                  min-width: ${50*v.gridUnit}px;
                  max-width: ${100*v.gridUnit}px;
                  & .tooltip-detail-head {
                    background-color: ${v.colors.grayscale.light4};
                    color: ${v.colors.grayscale.dark1};
                    display: flex;
                    column-gap: ${v.gridUnit}px;
                    align-items: baseline;
                    justify-content: space-between;
                  }
                  & .tooltip-detail-title {
                    display: flex;
                    column-gap: ${v.gridUnit}px;
                  }
                  & .tooltip-detail-body {
                    word-break: break-word;
                  }
                  & .tooltip-detail-head,
                  & .tooltip-detail-body {
                    padding: ${v.gridUnit}px
                      ${2*v.gridUnit}px;
                  }
                  & .tooltip-detail-footer {
                    border-top: 1px ${v.colors.grayscale.light2}
                      solid;
                    padding: 0 ${2*v.gridUnit}px;
                    color: ${v.colors.grayscale.dark1};
                    font-size: ${v.typography.sizes.xs}px;
                  }
                  & .tooltip-detail-meta {
                    & > .ant-tag {
                      margin-right: 0px;
                    }
                  }
                }
              `}),(0,c.tZ)(m,{ref:g,mode:t,theme:r,tabSize:o,defaultValue:s,setOptions:{fontFamily:u},...h})]})}))}),h)}const f=b(["mode/sql","theme/github","ext/language_tools","ext/searchbox"]),v=b(["mode/sql","theme/github","ext/language_tools","ext/searchbox"],{placeholder:()=>(0,c.BX)("div",{style:{height:"100%"},children:[(0,c.tZ)("div",{style:{width:41,height:"100%",background:"#e8e8e8"}}),(0,c.tZ)("div",{className:"ace_content"})]})}),y=b(["mode/markdown","theme/textmate"]),$=b(["mode/markdown","mode/sql","mode/json","mode/html","mode/javascript","theme/textmate"]),x=b(["mode/css","theme/github"]),w=b(["mode/json","theme/github"]),_=b(["mode/json","mode/yaml","theme/github"])},967913:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(667294),a=r(838703),o=r(135944);function i({width:e,height:t,showLoadingForImport:r=!1,placeholderStyle:n}){return t&&(0,o.tZ)("div",{style:{width:e,height:t,...n},children:r&&(0,o.tZ)(a.Z,{position:"floating"})},"async-asm-placeholder")||null}function s(e,t=i){let r,a;function s(){return r||(r=e instanceof Promise?e:e()),a||r.then((e=>{a=e.default||e})),r}const l=(0,n.forwardRef)((function(e,r){const[i,l]=(0,n.useState)(void 0!==a);(0,n.useEffect)((()=>{let e=!0;return i||s().then((()=>{e&&l(!0)})),()=>{e=!1}}));const d=a||t;return d?(0,o.tZ)(d,{ref:d===a?r:null,...e}):null}));return l.preload=s,l}},843700:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(751995),a=r(46445),o=r(135944);const i=Object.assign((0,n.iK)((({light:e,bigger:t,bold:r,animateArrows:n,...i})=>(0,o.tZ)(a.Z,{...i})))`
    .ant-collapse-item {
      .ant-collapse-header {
        font-weight: ${({bold:e,theme:t})=>e?t.typography.weights.bold:t.typography.weights.normal};
        font-size: ${({bigger:e,theme:t})=>e?4*t.gridUnit+"px":"inherit"};

        .ant-collapse-arrow svg {
          transition: ${({animateArrows:e})=>e?"transform 0.24s":"none"};
        }

        ${({expandIconPosition:e})=>e&&"right"===e&&"\n            .anticon.anticon-right.ant-collapse-arrow > svg {\n              transform: rotate(90deg) !important;\n            }\n          "}

        ${({light:e,theme:t})=>e&&`\n            color: ${t.colors.grayscale.light4};\n            .ant-collapse-arrow svg {\n              color: ${t.colors.grayscale.light4};\n            }\n          `}

        ${({ghost:e,bordered:t,theme:r})=>e&&t&&`\n            border-bottom: 1px solid ${r.colors.grayscale.light3};\n          `}
      }
      .ant-collapse-content {
        .ant-collapse-content-box {
          .loading.inline {
            margin: ${({theme:e})=>12*e.gridUnit}px auto;
            display: block;
          }
        }
      }
    }
    .ant-collapse-item-active {
      .ant-collapse-header {
        ${({expandIconPosition:e})=>e&&"right"===e&&"\n            .anticon.anticon-right.ant-collapse-arrow > svg {\n              transform: rotate(-90deg) !important;\n            }\n          "}
      }
    }
  `,{Panel:a.Z.Panel})},804591:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(897538);const a=(0,r(751995).iK)(n.Z.Item)`
  ${({theme:e})=>`\n    .ant-form-item-label {\n      padding-bottom: ${e.gridUnit}px;\n      & > label {\n        text-transform: uppercase;\n        font-size: ${e.typography.sizes.s}px;\n        color: ${e.colors.grayscale.base};\n\n        &.ant-form-item-required:not(.ant-form-item-required-mark-optional) {\n          &::before {\n            display: none;\n          }\n          &::after {\n            display: inline-block;\n            color: ${e.colors.error.base};\n            font-size: ${e.typography.sizes.s}px;\n            content: '*';\n          }\n        }\n      }\n    }\n  `}
`},902857:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(751995),a=r(135944);const o=n.iK.label`
  text-transform: uppercase;
  font-size: ${({theme:e})=>e.typography.sizes.s}px;
  color: ${({theme:e})=>e.colors.grayscale.base};
  margin-bottom: ${({theme:e})=>e.gridUnit}px;
`,i=n.iK.label`
  text-transform: uppercase;
  font-size: ${({theme:e})=>e.typography.sizes.s}px;
  color: ${({theme:e})=>e.colors.grayscale.base};
  margin-bottom: ${({theme:e})=>e.gridUnit}px;
  &::after {
    display: inline-block;
    margin-left: ${({theme:e})=>e.gridUnit}px;
    color: ${({theme:e})=>e.colors.error.base};
    font-size: ${({theme:e})=>e.typography.sizes.m}px;
    content: '*';
  }
`;function s({children:e,htmlFor:t,required:r=!1,className:n}){const s=r?i:o;return(0,a.tZ)(s,{htmlFor:t,className:n,children:e})}},73684:(e,t,r)=>{r.d(t,{Z:()=>k});var n,a=r(477808),o=r(931097),i=r(751995),s=r(211965),l=r(61988),d=r(608272),c=r(313322),p=r(835932),u=r(667294);function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},h.apply(null,arguments)}const m=({title:e,titleId:t,...r},a)=>u.createElement("svg",h({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",ref:a,"aria-labelledby":t},r),e?u.createElement("title",{id:t},e):null,n||(n=u.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M12 7a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1m0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9.71-7.44-5.27-5.27a1.05 1.05 0 0 0-.71-.29H8.27a1.05 1.05 0 0 0-.71.29L2.29 7.56a1.05 1.05 0 0 0-.29.71v7.46c.004.265.107.518.29.71l5.27 5.27c.192.183.445.286.71.29h7.46a1.05 1.05 0 0 0 .71-.29l5.27-5.27a1.05 1.05 0 0 0 .29-.71V8.27a1.05 1.05 0 0 0-.29-.71M20 15.31 15.31 20H8.69L4 15.31V8.69L8.69 4h6.62L20 8.69z",clipRule:"evenodd"}))),g=(0,u.forwardRef)(m);var b=r(804591),f=r(902857),v=r(135944);const y=(0,i.iK)(a.Z)`
  margin: ${({theme:e})=>`${e.gridUnit}px 0 ${2*e.gridUnit}px`};
`,$=(0,i.iK)(a.Z.Password)`
  margin: ${({theme:e})=>`${e.gridUnit}px 0 ${2*e.gridUnit}px`};
`,x=(0,i.iK)("div")`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  margin-bottom: ${({theme:e})=>3*e.gridUnit}px;
  .ant-form-item {
    margin-bottom: 0;
  }
`,w=i.iK.div`
  display: flex;
  align-items: center;
`,_=(0,i.iK)(f.Z)`
  margin-bottom: 0;
`,Z=s.iv`
  &.anticon > * {
    line-height: 0;
  }
`,k=({label:e,validationMethods:t,errorMessage:r,helpText:n,required:a=!1,hasTooltip:i=!1,tooltipText:u,id:h,className:m,visibilityToggle:f,get_url:k,description:S,...C})=>(0,v.BX)(x,{className:m,children:[(0,v.BX)(w,{children:[(0,v.tZ)(_,{htmlFor:h,required:a,children:e}),i&&(0,v.tZ)(d.Z,{tooltip:`${u}`})]}),(0,v.BX)(b.Z,{css:e=>((e,t)=>s.iv`
  .ant-form-item-children-icon {
    display: none;
  }
  ${t&&`.ant-form-item-control-input-content {\n      position: relative;\n      &:after {\n        content: ' ';\n        display: inline-block;\n        background: ${e.colors.error.base};\n        mask: url(${g});\n        mask-size: cover;\n        width: ${4*e.gridUnit}px;\n        height: ${4*e.gridUnit}px;\n        position: absolute;\n        right: ${1.25*e.gridUnit}px;\n        top: ${2.75*e.gridUnit}px;\n      }\n    }`}
`)(e,!!r),validateTrigger:Object.keys(t),validateStatus:r?"error":"success",help:r||n,hasFeedback:!!r,children:[f||"password"===C.name?(0,v.tZ)($,{...C,...t,iconRender:e=>e?(0,v.tZ)(o.Z,{title:(0,l.t)("Hide password."),children:(0,v.tZ)(c.Z.EyeInvisibleOutlined,{iconSize:"m",css:Z})}):(0,v.tZ)(o.Z,{title:(0,l.t)("Show password."),children:(0,v.tZ)(c.Z.EyeOutlined,{iconSize:"m",css:Z})}),role:"textbox"}):(0,v.tZ)(y,{...C,...t}),k&&S?(0,v.BX)(p.Z,{type:"link",htmlType:"button",buttonStyle:"default",onClick:()=>(window.open(k),!0),children:["Get ",S]}):(0,v.tZ)("br",{})]})]})},49238:(e,t,r)=>{r.d(t,{l0:()=>s,xJ:()=>l.Z,lX:()=>d.Z,QA:()=>c.Z});var n=r(897538),a=r(751995),o=r(135944);const i=(0,a.iK)(n.Z)`
  &.ant-form label {
    font-size: ${({theme:e})=>e.typography.sizes.s}px;
  }
  .ant-form-item {
    margin-bottom: ${({theme:e})=>4*e.gridUnit}px;
  }
`;function s(e){return(0,o.tZ)(i,{...e})}var l=r(804591),d=r(902857),c=r(73684)},685931:(e,t,r)=>{r.d(t,{m:()=>i});var n=r(473727),a=r(23525),o=r(135944);const i=({to:e,component:t,replace:r,innerRef:i,children:s,...l})=>"string"==typeof e&&(0,a.TO)(e)?(0,o.tZ)("a",{href:(0,a.en)(e),...l,children:s}):(0,o.tZ)(n.rU,{to:e,component:t,replace:r,innerRef:i,...l,children:s})},608272:(e,t,r)=>{r.d(t,{Z:()=>p});var n=r(751995),a=r(358593),o=r(313322),i=r(135944);const s=(0,n.iK)(a.u)`
  cursor: pointer;
`,l=n.iK.span`
  display: -webkit-box;
  -webkit-line-clamp: 20;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,d={fontSize:"12px",lineHeight:"16px"},c="rgba(0,0,0,0.9)";function p({tooltip:e,iconStyle:t={},placement:r="right",trigger:a="hover",overlayStyle:p=d,bgColor:u=c,viewBox:h="0 -1 24 24"}){const m=(0,n.Fg)(),g={...t,color:t.color||m.colors.grayscale.base};return(0,i.tZ)(s,{title:(0,i.tZ)(l,{children:e}),placement:r,trigger:a,overlayStyle:p,color:u,children:(0,i.tZ)(o.Z.InfoSolidSmall,{style:g,viewBox:h})})}},9875:(e,t,r)=>{r.d(t,{II:()=>i,Kx:()=>l,Rn:()=>s});var n=r(751995),a=r(477808),o=r(436795);const i=(0,n.iK)(a.Z)`
  border: 1px solid ${({theme:e})=>e.colors.secondary.light3};
  border-radius: ${({theme:e})=>e.borderRadius}px;
`,s=(0,n.iK)(o.Z)`
  border: 1px solid ${({theme:e})=>e.colors.secondary.light3};
  border-radius: ${({theme:e})=>e.borderRadius}px;
`,l=(0,n.iK)(a.Z.TextArea)`
  border: 1px solid ${({theme:e})=>e.colors.secondary.light3};
  border-radius: ${({theme:e})=>e.borderRadius}px;
`},737921:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(211965),a=r(104715),o=r(751995),i=r(135944);function s(e){const t=(0,o.Fg)(),{colors:r,transitionTiming:s}=t,{type:l="default",onClick:d,children:c,...p}=e,{alert:u,primary:h,secondary:m,grayscale:g,success:b,warning:f,error:v,info:y}=r;let $=g.light3,x=d?h.light2:g.light3,w=d?g.light2:"transparent",_=d?h.light1:"transparent",Z=g.dark1;if("default"!==l){let e;Z=g.light4,"alert"===l?(Z=g.dark1,e=u):e="success"===l?b:"warning"===l?f:"danger"===l?v:"info"===l?y:"secondary"===l?m:h,$=e.base,x=d?e.dark1:e.base,w=d?e.dark1:"transparent",_=d?e.dark2:"transparent"}return(0,i.tZ)(a.Vp,{onClick:d,role:d?"button":void 0,...p,css:(0,n.iv)({transition:`background-color ${s}s`,whiteSpace:"nowrap",cursor:d?"pointer":"default",overflow:"hidden",textOverflow:"ellipsis",backgroundColor:$,borderColor:w,borderRadius:21,padding:"0.35em 0.8em",lineHeight:1,color:Z,maxWidth:"100%","&:hover":{backgroundColor:x,borderColor:_,opacity:1}},"",""),children:c})}},683862:(e,t,r)=>{r.d(t,{MainNav:()=>m,Menu:()=>h,PI:()=>d,av:()=>i,ef:()=>l,fH:()=>n,xI:()=>s});var n,a=r(751995),o=r(743865);!function(e){e.MenuItem="menu-item",e.SubMenu="submenu",e.SubMenuItem="submenu-item"}(n||(n={}));const i=e=>{var t,r;return void 0!==(null==e||null==(t=e.current)||null==(r=t.props)?void 0:r.parentMenu)},s=e=>{var t;return"Styled(MenuItem)"===(null==e||null==(t=e.type)?void 0:t.displayName)},l=e=>{var t;return 1===(null==e||null==(t=e.type)?void 0:t.isSubMenu)},d=e=>e===n.SubMenu||e===n.SubMenuItem,c=(0,a.iK)(o.Z.Item)`
  > a {
    text-decoration: none;
  }

  &.ant-menu-item {
    height: ${({theme:e})=>8*e.gridUnit}px;
    line-height: ${({theme:e})=>8*e.gridUnit}px;
    a {
      border-bottom: none;
      transition: background-color ${({theme:e})=>e.transitionTiming}s;
      &:after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 50%;
        width: 0;
        height: 3px;
        opacity: 0;
        transform: translateX(-50%);
        transition: all ${({theme:e})=>e.transitionTiming}s;
        background-color: ${({theme:e})=>e.colors.primary.base};
      }
      &:focus {
        border-bottom: none;
        background-color: transparent;
        @media (max-width: 767px) {
          background-color: ${({theme:e})=>e.colors.primary.light5};
        }
      }
    }
  }

  &.ant-menu-item,
  &.ant-dropdown-menu-item {
    span[role='button'] {
      display: inline-block;
      width: 100%;
    }
    transition-duration: 0s;
  }
`,p=(0,a.iK)(o.Z)`
  line-height: 51px;
  border: none;

  & > .ant-menu-item,
  & > .ant-menu-submenu {
    vertical-align: inherit;
    &:hover {
      color: ${({theme:e})=>e.colors.grayscale.dark1};
    }
  }

  &:not(.ant-menu-dark) > .ant-menu-submenu,
  &:not(.ant-menu-dark) > .ant-menu-item {
    &:hover {
      border-bottom: none;
    }
  }

  &:not(.ant-menu-dark) > .ant-menu-submenu,
  &:not(.ant-menu-dark) > .ant-menu-item {
    margin: 0px;
  }

  & > .ant-menu-item > a {
    padding: ${({theme:e})=>4*e.gridUnit}px;
  }
`,u=(0,a.iK)(o.Z.SubMenu)`
  color: ${({theme:e})=>e.colors.grayscale.dark1};
  border-bottom: none;
  .ant-menu-submenu-open,
  .ant-menu-submenu-active {
    background-color: ${({theme:e})=>e.colors.primary.light5};
    .ant-menu-submenu-title {
      color: ${({theme:e})=>e.colors.grayscale.dark1};
      background-color: ${({theme:e})=>e.colors.primary.light5};
      border-bottom: none;
      margin: 0;
      &:after {
        opacity: 1;
        width: calc(100% - 1);
      }
    }
  }
  .ant-menu-submenu-title {
    position: relative;
    top: ${({theme:e})=>-e.gridUnit-3}px;
    &:after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 50%;
      width: 0;
      height: 3px;
      opacity: 0;
      transform: translateX(-50%);
      transition: all ${({theme:e})=>e.transitionTiming}s;
      background-color: ${({theme:e})=>e.colors.primary.base};
    }
  }
  .ant-menu-submenu-arrow {
    top: 67%;
  }
  & > .ant-menu-submenu-title {
    padding: 0 ${({theme:e})=>6*e.gridUnit}px 0
      ${({theme:e})=>3*e.gridUnit}px !important;
    span[role='img'] {
      position: absolute;
      right: ${({theme:e})=>-e.gridUnit-2}px;
      top: ${({theme:e})=>5.25*e.gridUnit}px;
      svg {
        font-size: ${({theme:e})=>6*e.gridUnit}px;
        color: ${({theme:e})=>e.colors.grayscale.base};
      }
    }
    & > span {
      position: relative;
      top: 7px;
    }
    &:hover {
      color: ${({theme:e})=>e.colors.primary.base};
    }
  }
`,h=Object.assign(o.Z,{Item:c}),m=Object.assign(p,{Item:c,SubMenu:u,Divider:o.Z.Divider,ItemGroup:o.Z.ItemGroup})},287183:(e,t,r)=>{r.d(t,{Y:()=>s});var n=r(751995),a=r(747933);const o=(0,n.iK)(a.ZP)`
  .ant-radio-inner {
    top: -1px;
    left: 2px;
    width: ${({theme:e})=>4*e.gridUnit}px;
    height: ${({theme:e})=>4*e.gridUnit}px;
    border-width: 2px;
    border-color: ${({theme:e})=>e.colors.grayscale.light2};
  }

  .ant-radio.ant-radio-checked {
    .ant-radio-inner {
      border-width: ${({theme:e})=>e.gridUnit+1}px;
      border-color: ${({theme:e})=>e.colors.primary.base};
    }

    .ant-radio-inner::after {
      background-color: ${({theme:e})=>e.colors.grayscale.light5};
      top: 0;
      left: 0;
      width: ${({theme:e})=>e.gridUnit+2}px;
      height: ${({theme:e})=>e.gridUnit+2}px;
    }
  }

  .ant-radio:hover,
  .ant-radio:focus {
    .ant-radio-inner {
      border-color: ${({theme:e})=>e.colors.primary.dark1};
    }
  }
`,i=(0,n.iK)(a.ZP.Group)`
  font-size: inherit;
`,s=Object.assign(o,{Group:i,Button:a.ZP.Button})},112441:(e,t,r)=>{r.d(t,{r:()=>s});var n=r(751995),a=r(840987),o=r(135944);const i=(0,n.iK)(a.Z)`
  .ant-switch-checked {
    background-color: ${({theme:e})=>e.colors.primary.base};
  }
`,s=e=>(0,o.tZ)(i,{...e})},171262:(e,t,r)=>{r.d(t,{Xv:()=>h,cl:()=>g,ZP:()=>b});var n=r(211965),a=r(751995),o=r(901350),i=r(313322),s=r(135944);const l=({animated:e=!1,fullWidth:t=!0,allowOverflow:r=!0,...a})=>(0,s.tZ)(o.Z,{animated:e,...a,css:e=>n.iv`
      overflow: ${r?"visible":"hidden"};

      .ant-tabs-content-holder {
        overflow: ${r?"visible":"auto"};
      }
      .ant-tabs-tab {
        flex: 1 1 auto;
        &.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: inherit;
        }
        &:hover {
          .anchor-link-container {
            cursor: pointer;
            .fa.fa-link {
              visibility: visible;
            }
          }
        }
        .short-link-trigger.btn {
          padding: 0 ${e.gridUnit}px;
          & > .fa.fa-link {
            top: 0;
          }
        }
      }
      ${t&&n.iv`
        .ant-tabs-nav-list {
          width: 100%;
        }
      `};

      .ant-tabs-tab-btn {
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        font-size: ${e.typography.sizes.s}px;
        text-align: center;
        text-transform: uppercase;
        user-select: none;
        .required {
          margin-left: ${e.gridUnit/2}px;
          color: ${e.colors.error.base};
        }
      }
      .ant-tabs-ink-bar {
        background: ${e.colors.secondary.base};
      }
    `}),d=(0,a.iK)(o.Z.TabPane)``,c=Object.assign(l,{TabPane:d}),p=(0,a.iK)(l)`
  ${({theme:e,fullWidth:t})=>`\n    .ant-tabs-content-holder {\n      background: ${e.colors.grayscale.light5};\n    }\n\n    & > .ant-tabs-nav {\n      margin-bottom: 0;\n    }\n\n    .ant-tabs-tab-remove {\n      padding-top: 0;\n      padding-bottom: 0;\n      height: ${6*e.gridUnit}px;\n    }\n\n    ${t?n.iv`
            .ant-tabs-nav-list {
              width: 100%;
            }
          `:""}\n  `}
`,u=(0,a.iK)(i.Z.CancelX)`
  color: ${({theme:e})=>e.colors.grayscale.base};
`,h=Object.assign(p,{TabPane:d});h.defaultProps={type:"editable-card",fullWidth:!1,animated:{inkBar:!0,tabPane:!1}},h.TabPane.defaultProps={closeIcon:(0,s.tZ)(u,{role:"button",tabIndex:0})};const m=(0,a.iK)(h)`
  &.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
    margin: 0 ${({theme:e})=>4*e.gridUnit}px;
    padding: ${({theme:e})=>`${3*e.gridUnit}px ${e.gridUnit}px`};
    background: transparent;
    border: none;
  }

  &.ant-tabs-card > .ant-tabs-nav .ant-tabs-ink-bar {
    visibility: visible;
  }

  .ant-tabs-tab-btn {
    font-size: ${({theme:e})=>e.typography.sizes.m}px;
  }

  .ant-tabs-tab-remove {
    margin-left: 0;
    padding-right: 0;
  }

  .ant-tabs-nav-add {
    min-width: unset !important;
    background: transparent !important;
    border: none !important;
  }
`,g=Object.assign(m,{TabPane:d}),b=c},418451:(e,t,r)=>{r.d(t,{c:()=>a});var n=r(828216);function a(){return(0,n.v9)((e=>{var t;return null==e||null==(t=e.common)?void 0:t.conf}))}},839589:(e,t,r)=>{var n,a;r.d(t,{Z:()=>a,g:()=>n}),function(e){e.Charts="CHARTS",e.Dashboards="DASHBOARDS",e.Recents="RECENTS",e.SavedQueries="SAVED_QUERIES"}(n||(n={})),function(e){e.GoogleSheets="gsheets",e.DbConnection="dbconnection",e.DatasetCreation="datasetCreation",e.CSVUpload="csvUpload",e.ExcelUpload="excelUpload",e.ColumnarUpload="columnarUpload"}(a||(a={}))},208911:(e,t,r)=>{r.d(t,{Z:()=>n});const n=(()=>{try{return r(Object(function(){var e=new Error("Cannot find module '../../../superset_text'");throw e.code="MODULE_NOT_FOUND",e}()))||{}}catch(e){return{}}})()},34858:(e,t,r)=>{r.d(t,{LE:()=>g,NE:()=>v,PW:()=>b,Yi:()=>m,_l:()=>U,bR:()=>$,cb:()=>k,fF:()=>y,h1:()=>C,jb:()=>w,rM:()=>x,xx:()=>Z,z:()=>_});var n=r(115926),a=r.n(n),o=r(667294),i=r(431069),s=r(61988),l=r(844818),d=r(522102),c=r(440768),p=r(710222),u=r(208911);const h=e=>"string"==typeof e?e:Object.entries(e).map((([e,t])=>Array.isArray(t)?`(${e}) ${t.join(", ")}`:`(${e}) ${t}`)).join("\n");function m(e,t,r,n=!0,l=[],d,p=!0,u){const[h,m]=(0,o.useState)({count:0,collection:l,loading:p,lastFetchDataConfig:null,permissions:[],bulkSelectEnabled:!1});function g(e){m((t=>({...t,...e})))}(0,o.useEffect)((()=>{n&&i.Z.get({endpoint:`/api/v1/${e}/_info?q=${a().encode({keys:["permissions"]})}`}).then((({json:e={}})=>{g({permissions:e.permissions})}),(0,c.v$)((e=>r((0,s.t)("An error occurred while fetching %s info: %s",t,e)))))}),[]);const b=(0,o.useCallback)((({pageIndex:n,pageSize:o,sortBy:l,filters:p})=>{g({lastFetchDataConfig:{filters:p,pageIndex:n,pageSize:o,sortBy:l},loading:!0});const h=(d||[]).concat(p).map((({id:e,operator:t,value:r})=>({col:e,opr:t,value:r&&"object"==typeof r&&"value"in r?r.value:r}))),m=a().encode_uri({order_column:l[0].id,order_direction:l[0].desc?"desc":"asc",page:n,page_size:o,...h.length?{filters:h}:{},...null!=u&&u.length?{select_columns:u}:{}});return i.Z.get({endpoint:`/api/v1/${e}/?q=${m}`}).then((({json:e={}})=>{g({collection:e.result,count:e.count,lastFetched:(new Date).toISOString()})}),(0,c.v$)((e=>r((0,s.t)("An error occurred while fetching %ss: %s",t,e))))).finally((()=>{g({loading:!1})}))}),[d]);return{state:{loading:h.loading,resourceCount:h.count,resourceCollection:h.collection,bulkSelectEnabled:h.bulkSelectEnabled,lastFetched:h.lastFetched},setResourceCollection:e=>g({collection:e}),hasPerm:function(e){return!!h.permissions.length&&Boolean(h.permissions.find((t=>t===e)))},fetchData:b,toggleBulkSelect:function(){g({bulkSelectEnabled:!h.bulkSelectEnabled})},refreshData:e=>h.lastFetchDataConfig?b(h.lastFetchDataConfig):e?b(e):null}}function g(e,t,r,n=""){const[a,l]=(0,o.useState)({loading:!1,resource:null,error:null});function d(e){l((t=>({...t,...e})))}return{state:a,setResource:e=>d({resource:e}),fetchResource:(0,o.useCallback)((a=>{d({loading:!0});const o=`/api/v1/${e}/${a}`,l=""!==n?`${o}/${n}`:o;return i.Z.get({endpoint:l}).then((({json:e={}})=>(d({resource:e.result,error:null}),e.result)),(0,c.v$)((e=>{r((0,s.t)("An error occurred while fetching %ss: %s",t,h(e))),d({error:e})}))).finally((()=>{d({loading:!1})}))}),[r,e,t]),createResource:(0,o.useCallback)(((n,a=!1)=>(d({loading:!0}),i.Z.post({endpoint:`/api/v1/${e}/`,body:JSON.stringify(n),headers:{"Content-Type":"application/json"}}).then((({json:e={}})=>(d({resource:{id:e.id,...e.result},error:null}),e.id)),(0,c.v$)((e=>{a||r((0,s.t)("An error occurred while creating %ss: %s",t,h(e))),d({error:e})}))).finally((()=>{d({loading:!1})})))),[r,e,t]),updateResource:(0,o.useCallback)(((n,a,o=!1,l=!0)=>(l&&d({loading:!0}),i.Z.put({endpoint:`/api/v1/${e}/${n}`,body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}).then((({json:e={}})=>(d({resource:{...e.result,id:e.id},error:null}),e.result)),(0,c.v$)((e=>(o||r((0,s.t)("An error occurred while fetching %ss: %s",t,JSON.stringify(e))),d({error:e}),e)))).finally((()=>{l&&d({loading:!1})})))),[r,e,t]),clearError:()=>d({error:null})}}function b(e,t,r){const[n,a]=(0,o.useState)({loading:!1,passwordsNeeded:[],alreadyExists:[],sshPasswordNeeded:[],sshPrivateKeyNeeded:[],sshPrivateKeyPasswordNeeded:[],failed:!1});function d(e){a((t=>({...t,...e})))}return{state:n,importResource:(0,o.useCallback)(((n,a={},o={},p={},u={},h=!1)=>{d({loading:!0,failed:!1});const m=new FormData;m.append("formData",n);const g=(0,s.t)("Please re-export your file and try importing again");return a&&m.append("passwords",JSON.stringify(a)),h&&m.append("overwrite","true"),o&&m.append("ssh_tunnel_passwords",JSON.stringify(o)),p&&m.append("ssh_tunnel_private_keys",JSON.stringify(p)),u&&m.append("ssh_tunnel_private_key_passwords",JSON.stringify(u)),i.Z.post({endpoint:`/api/v1/${e}/import/`,body:m,headers:{Accept:"application/json"}}).then((()=>(d({passwordsNeeded:[],alreadyExists:[],sshPasswordNeeded:[],sshPrivateKeyNeeded:[],sshPrivateKeyPasswordNeeded:[],failed:!1}),!0))).catch((e=>(0,l.O$)(e).then((e=>(d({failed:!0}),e.errors?((0,c.Er)(e.errors)?r((0,s.t)("An error occurred while importing %s: %s",t,[...e.errors.map((e=>e.message)),g].join(".\n"))):d({passwordsNeeded:(0,c.$u)(e.errors),sshPasswordNeeded:(0,c.dK)(e.errors),sshPrivateKeyNeeded:(0,c.ru)(e.errors),sshPrivateKeyPasswordNeeded:(0,c.z9)(e.errors),alreadyExists:(0,c.cE)(e.errors)}),!1):(r((0,s.t)("An error occurred while importing %s: %s",t,e.message||e.error)),!1)))))).finally((()=>{d({loading:!1})}))}),[])}}const f={chart:(0,d.Z)({requestType:"rison",method:"GET",endpoint:"/api/v1/chart/favorite_status/"}),dashboard:(0,d.Z)({requestType:"rison",method:"GET",endpoint:"/api/v1/dashboard/favorite_status/"}),tag:(0,d.Z)({requestType:"rison",method:"GET",endpoint:"/api/v1/tag/favorite_status/"})};function v(e,t,r){const[n,a]=(0,o.useState)({}),l=e=>a((t=>({...t,...e})));return(0,o.useEffect)((()=>{t.length&&f[e](t).then((({result:e})=>{const t=e.reduce(((e,t)=>(e[t.id]=t.value,e)),{});l(t)}),(0,c.v$)((e=>r((0,s.t)("There was an error fetching the favorite status: %s",e)))))}),[t,e,r]),[(0,o.useCallback)(((t,n)=>{const a=`/api/v1/${e}/${t}/favorites/`;(n?i.Z.delete({endpoint:a}):i.Z.post({endpoint:a})).then((()=>{l({[t]:!n})}),(0,c.v$)((e=>r((0,s.t)("There was an error saving the favorite status: %s",e)))))}),[e]),n]}const y=(e,t)=>{const[r,n]=(0,o.useState)(null);return{sliceCurrentlyEditing:r,handleChartUpdated:function(r){const n=t.map((e=>e.id===r.id?{...e,...r}:e));e(n)},openChartEditModal:function(e){n({slice_id:e.id,slice_name:e.slice_name,description:e.description,cache_timeout:e.cache_timeout,certified_by:e.certified_by,certification_details:e.certification_details,is_managed_externally:e.is_managed_externally})},closeChartEditModal:function(){n(null)}}},$=(e,t,r)=>{(0,p.Z)((()=>Promise.resolve(`${window.location.origin}/sqllab?savedQueryId=${e}`))).then((()=>{r((0,s.t)("Link Copied!"))})).catch((()=>{t((0,s.t)("Sorry, your browser does not support copying."))}))},x=()=>u.Z.DB_IMAGES,w=()=>u.Z.DB_CONNECTION_ALERTS,_=()=>u.Z.DB_CONNECTION_DOC_LINKS,Z=(e,t,r)=>{i.Z.post({endpoint:"api/v1/database/test_connection/",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((()=>{r((0,s.t)("Connection looks good!"))}),(0,c.v$)((e=>{t((0,s.t)("ERROR: %s",h(e)))})))};function k(){const[e,t]=(0,o.useState)(null);return[e,(0,o.useCallback)((()=>{i.Z.get({endpoint:"/api/v1/database/available/"}).then((({json:e})=>{t(e)}))}),[t])]}const S=e=>e&&Array.isArray(null==e?void 0:e.catalog)?{...e,catalog:Object.assign({},...e.catalog.map((e=>({[e.name]:e.value}))))}:e;function C(){const[e,t]=(0,o.useState)(null);return[e,(0,o.useCallback)(((e,r=!1)=>{var n;return null!=e&&null!=(n=e.parameters)&&n.ssh?(t(null),[]):i.Z.post({endpoint:"/api/v1/database/validate_parameters/",body:JSON.stringify(S(e)),headers:{"Content-Type":"application/json"}}).then((()=>{t(null)})).catch((e=>{if("function"==typeof e.json)return e.json().then((({errors:e=[]})=>{const n=e.filter((e=>!["CONNECTION_MISSING_PARAMETERS_ERROR","CONNECTION_ACCESS_DENIED_ERROR"].includes(e.error_type)||r)).reduce(((e,{error_type:t,extra:r,message:n})=>{var a,o;return r.catalog?r.catalog.name?{...e,error_type:t,[r.catalog.idx]:{name:n}}:r.catalog.url?{...e,error_type:t,[r.catalog.idx]:{url:n}}:{...e,error_type:t,[r.catalog.idx]:{name:n,url:n}}:r.invalid?{...e,[r.invalid[0]]:n,error_type:t}:r.missing?{...e,error_type:t,...Object.assign({},...r.missing.map((e=>({[e]:"This is a required field"}))))}:null!=(a=r.issue_codes)&&a.length?{...e,error_type:t,description:n||(null==(o=r.issue_codes[0])?void 0:o.message)}:e}),{});return t(n),n}));console.error(e)}))}),[t]),t]}const U=(e,t,r)=>{var n;return r?null==(n=e.reports[t])?void 0:n[r]:null}},400012:(e,t,r)=>{var n,a;r.d(t,{F:()=>n,J:()=>a}),function(e){e.Favorite="Favorite",e.Mine="Mine",e.Other="Other",e.Viewed="Viewed",e.Created="Created",e.Edited="Edited"}(n||(n={})),function(e){e.Id="id",e.ChangedOn="changed_on",e.ChangedBy="changed_by",e.Database="database",e.DatabaseName="database.database_name",e.Schema="schema",e.Sql="sql",e.ExecutedSql="executed_sql",e.SqlTables="sql_tables",e.Status="status",e.TabName="tab_name",e.User="user",e.UserFirstName="user.first_name",e.StartTime="start_time",e.EndTime="end_time",e.Rows="rows",e.TmpTableName="tmp_table_name",e.TrackingUrl="tracking_url"}(a||(a={}))},440768:(e,t,r)=>{r.d(t,{$u:()=>A,B1:()=>_,Er:()=>X,Gm:()=>U,IB:()=>N,IV:()=>$,Iu:()=>E,Ld:()=>w,Mc:()=>G,ZB:()=>R,_L:()=>j,cE:()=>L,dK:()=>F,eX:()=>v,if:()=>H,iv:()=>O,mq:()=>T,ru:()=>q,tm:()=>k,v$:()=>C,wk:()=>S,xF:()=>Z,xL:()=>I,z9:()=>B});var n=r(225325),a=r.n(n),o=r(751995),i=r(431069),s=r(61988),l=r(893297),d=r(844818),c=r(68492),p=r(211965),u=r(115926),h=r.n(u),m=r(208911),g=r(212617),b=r(839589),f=r(400012);(()=>{const e=h(),t=[];for(let e=0;e<16;e+=1)for(let r=0;r<16;r+=1){if(e+r===0)continue;const n=String.fromCharCode(16*e+r);/\w|[-_./~]/.test(n)||t.push(`\\u00${e.toString(16)}${r.toString(16)}`)}e.not_idchar=t.join(""),e.not_idstart="-0123456789";const r=`[^${e.not_idstart}${e.not_idchar}][^${e.not_idchar}]*`;e.id_ok=new RegExp(`^${r}$`),e.next_id=new RegExp(r,"g")})();const v=o.iK.div`
  color: ${({theme:e})=>e.colors.grayscale.base};
`,y=e=>(t,r,n,a)=>async(n="",o,s)=>{var l;const d=`/api/v1/${t}/${e}/${r}`,c=h().encode_uri({filter:n,page:o,page_size:s}),{json:p={}}=await i.Z.get({endpoint:`${d}?q=${c}`});let u=!1;const m=a?{label:`${a.firstName} ${a.lastName}`,value:a.userId}:void 0,g=[];return null==p||null==(l=p.result)||l.filter((({text:e})=>e.trim().length>0)).forEach((({text:e,value:t})=>{m&&t===m.value&&e===m.label?u=!0:g.push({label:e,value:t})})),!m||n&&!u||g.unshift(m),{data:g,totalCount:null==p?void 0:p.count}},$=5,x=(e,t)=>{const r={order_column:"changed_on_delta_humanized",order_direction:"desc",page:0,page_size:$,filters:e,select_columns:t};return e||delete r.filters,t||delete r.select_columns,h().encode(r)},w=e=>{const t={edited:[{col:"changed_by",opr:"rel_o_m",value:`${e}`}]},r=[i.Z.get({endpoint:`/api/v1/dashboard/?q=${x(t.edited)}`}),i.Z.get({endpoint:`/api/v1/chart/?q=${x(t.edited)}`})];return Promise.all(r).then((([e,t])=>{var r,n;return{editedDash:null==(r=t.json)?void 0:r.result.slice(0,3),editedChart:null==(n=e.json)?void 0:n.result.slice(0,3)}})).catch((e=>e))},_=(e,t,r=[{col:"owners",opr:"rel_m_m",value:`${e}`}],n)=>i.Z.get({endpoint:`/api/v1/${t}/?q=${x(r,n)}`}).then((e=>{var t;return null==(t=e.json)?void 0:t.result})),Z=(e,t,r,n)=>i.Z.get({endpoint:t}).then((e=>{const t={},a=(0,l.$)(6);return e.json.result.reverse().forEach((e=>{a.set(e.item_url,e)})),((e,t,r,n)=>{const a=[i.Z.get({endpoint:`/api/v1/chart/?q=${x(t,void 0)}`}),i.Z.get({endpoint:`/api/v1/dashboard/?q=${x(t,void 0)}`})];return Promise.all(a).then((([e,t])=>({other:[...e.json.result,...t.json.result]}))).catch((t=>(e((0,s.t)("There was an error fetching the filtered charts and dashboards:"),t),{other:[]})))})(r,n).then((({other:e})=>(t.other=e,t.viewed=a.values().reverse(),t)))})),k=y("related"),S=y("distinct");function C(e){return async t=>{const r=await(0,d.O$)(t),n=null==r?void 0:r.errors,a=await m.Z;null!=n&&n.length&&null!=a&&a.ERRORS&&n[0].error_type in a.ERRORS&&(r.message=a.ERRORS[n[0].error_type]),c.Z.error(t),e(r.message||r.error)}}function U({id:e,slice_name:t},r,n,a,o,l){const d={pageIndex:0,pageSize:$,sortBy:[{id:"changed_on_delta_humanized",desc:!0}],filters:[{id:"created_by",operator:"rel_o_m",value:`${l}`}]};i.Z.delete({endpoint:`/api/v1/chart/${e}`}).then((()=>{"Mine"===o?a(d):a(),r((0,s.t)("Deleted: %s",t))}),(()=>{n((0,s.t)("There was an issue deleting: %s",t))}))}function E({id:e,dashboard_title:t},r,n,a,o,l){return i.Z.delete({endpoint:`/api/v1/dashboard/${e}`}).then((()=>{"Mine"===o?r({pageIndex:0,pageSize:$,sortBy:[{id:"changed_on_delta_humanized",desc:!0}],filters:[{id:"owners",operator:"rel_m_m",value:`${l}`}]}):r(),n((0,s.t)("Deleted: %s",t))}),C((e=>a((0,s.t)("There was an issue deleting %s: %s",t,e)))))}function N(e,t){let r=e.split("\n");return r.length>=t&&(r=r.slice(0,t),r.push("...")),r.join("\n")}const O=5,T=[576,768,992,1200].map((e=>`@media (max-width: ${e}px)`)),j=o.iK.div`
  ${({showThumbnails:e,theme:t})=>`\n    overflow: hidden;\n    display: grid;\n    grid-gap: ${12*t.gridUnit}px ${4*t.gridUnit}px;\n    grid-template-columns: repeat(auto-fit, 300px);\n    max-height: ${e?"314":"148"}px;\n    margin-top: ${-6*t.gridUnit}px;\n    padding: ${e?`${8*t.gridUnit+3}px ${9*t.gridUnit}px`:`${8*t.gridUnit+1}px ${9*t.gridUnit}px`};\n  `}
`,R=o.iK.div`
  cursor: pointer;
  a {
    text-decoration: none;
  }
  .ant-card-cover > div {
    /* Height is calculated based on 300px width, to keep the same aspect ratio as the 800*450 thumbnails */
    height: 168px;
  }
`,I=e=>p.iv`
  margin: auto ${2*e.gridUnit}px auto 0;
  color: ${e.colors.grayscale.base};
`,z=e=>{var t;return"object"==typeof e&&Array.isArray(e._schema)&&!(null==(t=e._schema)||!t.find((e=>"Must provide a password for the database"===e)))},P=e=>{var t;return"object"==typeof e&&Array.isArray(e._schema)&&!(null==(t=e._schema)||!t.find((e=>"Must provide a password for the ssh tunnel"===e)))},M=e=>{var t;return"object"==typeof e&&Array.isArray(e._schema)&&!(null==(t=e._schema)||!t.find((e=>"Must provide a private key for the ssh tunnel"===e)))},K=e=>{var t;return"object"==typeof e&&Array.isArray(e._schema)&&!(null==(t=e._schema)||!t.find((e=>"Must provide a private key password for the ssh tunnel"===e)))},D=e=>"string"==typeof e&&e.includes("already exists and `overwrite=true` was not passed"),A=e=>e.map((e=>Object.entries(e.extra).filter((([,e])=>z(e))).map((([e])=>e)))).flat(),F=e=>e.map((e=>Object.entries(e.extra).filter((([,e])=>P(e))).map((([e])=>e)))).flat(),q=e=>e.map((e=>Object.entries(e.extra).filter((([,e])=>M(e))).map((([e])=>e)))).flat(),B=e=>e.map((e=>Object.entries(e.extra).filter((([,e])=>K(e))).map((([e])=>e)))).flat(),L=e=>e.map((e=>Object.entries(e.extra).filter((([,e])=>D(e))).map((([e])=>e)))).flat(),X=e=>e.some((e=>{const t=Object.entries(e.extra).filter((([e])=>"issue_codes"!==e));return 0===t.length||!t.every((([,e])=>z(e)||D(e)||P(e)||M(e)||K(e)))})),V=(e,t)=>void 0!==e&&a()(e,t).length>0,G=(e,t,r,n,a)=>{const o=(0,g.R)("can_csv_upload","Database",e)&&V(t,a),i=V(r,a)&&(0,g.R)("can_columnar_upload","Database",e),s=V(n,a)&&(0,g.R)("can_excel_upload","Database",e);return{canUploadCSV:o,canUploadColumnar:i,canUploadExcel:s,canUploadData:o||i||s}};function H(e,t,r,n){return e===f.F.Created||t===b.g.SavedQueries&&e===f.F.Mine?[{id:"created_by",operator:"rel_o_m",value:`${null==r?void 0:r.userId}`}]:t===b.g.SavedQueries&&e===f.F.Favorite?[{id:"id",operator:"saved_query_is_fav",value:!0}]:e===f.F.Mine&&r?[{id:"owners",operator:"rel_m_m",value:`${r.userId}`}]:e===f.F.Favorite&&[b.g.Dashboards,b.g.Charts].includes(t)?[{id:"id",operator:t===b.g.Dashboards?"dashboard_is_favorite":"chart_is_favorite",value:!0}]:e===f.F.Other?(n||[]).map((e=>({id:e.col,operator:e.opr,value:e.value}))):[]}}}]);
//# sourceMappingURL=8003.16b0d36c8f301cadbeb5.entry.js.map