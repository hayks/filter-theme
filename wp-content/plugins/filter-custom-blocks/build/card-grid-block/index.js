(()=>{"use strict";var e,t={230:()=>{const e=window.wp.blocks,t=window.wp.i18n,a=window.wp.blockEditor,l=window.wp.components,c=window.wp.element,r={"calendar-star":React.createElement("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M6 6V40H42V6H6ZM38 36H10V16H38V36ZM38 12H10V10H38V12ZM14 20H20V26H14V20ZM14 30H20V36H14V30ZM24 20H30V26H24V20ZM24 30H30V36H24V30ZM36 20H34V22H36V20ZM36 26H34V28H36V26ZM36 32H34V34H36V32Z",fill:"currentColor"})),"truck-delivery":React.createElement("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M46 18H42V8H2V34H6C6 35.6 6.6 37 7.8 38.2C9 39.4 10.4 40 12 40C13.6 40 15 39.4 16.2 38.2C17.4 37 18 35.6 18 34H30C30 35.6 30.6 37 31.8 38.2C33 39.4 34.4 40 36 40C37.6 40 39 39.4 40.2 38.2C41.4 37 42 35.6 42 34H46V26L46 18ZM12 36C11.2 36 10.5 35.7 10 35.2C9.5 34.7 9.2 34 9.2 33.2C9.2 32.4 9.5 31.7 10 31.2C10.5 30.7 11.2 30.4 12 30.4C12.8 30.4 13.5 30.7 14 31.2C14.5 31.7 14.8 32.4 14.8 33.2C14.8 34 14.5 34.7 14 35.2C13.5 35.7 12.8 36 12 36ZM38 22V26H42V30H41.8C41.6 29.2 41.2 28.4 40.4 27.8C39.6 27.2 38.8 26.8 37.8 26.8C36.8 26.8 36 27.2 35.2 27.8C34.4 28.4 34 29.2 33.8 30H30V12H38V22ZM36 36C35.2 36 34.5 35.7 34 35.2C33.5 34.7 33.2 34 33.2 33.2C33.2 32.4 33.5 31.7 34 31.2C34.5 30.7 35.2 30.4 36 30.4C36.8 30.4 37.5 30.7 38 31.2C38.5 31.7 38.8 32.4 38.8 33.2C38.8 34 38.5 34.7 38 35.2C37.5 35.7 36.8 36 36 36Z",fill:"currentColor"})),creation:React.createElement("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M24 2C12 2 2 12 2 24C2 36 12 46 24 46C36 46 46 36 46 24C46 12 36 2 24 2ZM24 6C27.9 6 31.5 7.4 34.4 9.6L9.6 34.4C7.4 31.5 6 27.9 6 24C6 14.1 14.1 6 24 6ZM24 42C20.1 42 16.5 40.6 13.6 38.4L38.4 13.6C40.6 16.5 42 20.1 42 24C42 33.9 33.9 42 24 42Z",fill:"currentColor"})),sprout:React.createElement("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M24 44H28V31.9C34.3 31.4 39.5 26.7 40 21V12H30V10H26V21.2C26 24.8 24.1 28.3 20.9 30.3L16 33.4V18H12C8.4 18 4.9 19.9 2.9 23.1L0 28V44H4V36H20V44H24ZM36 16V21C36 22.9 35.2 24.6 33.9 25.9C32.6 27.2 30.9 28 29 28C27.1 28 25.4 27.2 24.1 25.9C23.8 25.6 23.6 25.3 23.4 24.9C26.5 23.6 28.9 20.7 29.7 17H36V16ZM4 32V30.3L5.4 28C6.6 26.1 8.8 25 11.1 25H12V30.6L8.8 28.1L5.9 32H4Z",fill:"currentColor"})),"brightness-percent":React.createElement("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M14 26C15.1046 26 16 25.1046 16 24C16 22.8954 15.1046 22 14 22C12.8954 22 12 22.8954 12 24C12 25.1046 12.8954 26 14 26Z",fill:"currentColor"}),React.createElement("path",{d:"M34 22C32.8954 22 32 22.8954 32 24C32 25.1046 32.8954 26 34 26C35.1046 26 36 25.1046 36 24C36 22.8954 35.1046 22 34 22Z",fill:"currentColor"}),React.createElement("path",{d:"M24 4V12H28V4H24Z",fill:"currentColor"}),React.createElement("path",{d:"M36 12.34L41.66 6.68L38.82 3.84L33.16 9.5L36 12.34Z",fill:"currentColor"}),React.createElement("path",{d:"M44 24V20H36V24H44Z",fill:"currentColor"}),React.createElement("path",{d:"M38.82 44.16L41.66 41.32L36 35.66L33.16 38.5L38.82 44.16Z",fill:"currentColor"}),React.createElement("path",{d:"M24 36V44H28V36H24Z",fill:"currentColor"}),React.createElement("path",{d:"M12 36.16L6.34 41.82L9.18 44.66L14.84 39L12 36.16Z",fill:"currentColor"}),React.createElement("path",{d:"M12 20H4V24H12V20Z",fill:"currentColor"}),React.createElement("path",{d:"M9.18 3.34L6.34 6.18L12 11.84L14.84 9L9.18 3.34Z",fill:"currentColor"}),React.createElement("path",{d:"M20.9 29.1L29.1 20.9C29.6 20.4 29.6 19.6 29.1 19.1C28.6 18.6 27.8 18.6 27.3 19.1L19.1 27.3C18.6 27.8 18.6 28.6 19.1 29.1C19.6 29.6 20.4 29.6 20.9 29.1Z",fill:"currentColor"})),"clipboard-arrow-left":React.createElement("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M18 34H30V30H18V34Z",fill:"currentColor"}),React.createElement("path",{d:"M16 6H14C12.9 6 12 6.9 12 8V40C12 41.1 12.9 42 14 42H34C35.1 42 36 41.1 36 40V8C36 6.9 35.1 6 34 6H32V10H16V6ZM16 2H24H32C32 3.1 31.1 4 30 4H18C16.9 4 16 3.1 16 2Z",fill:"currentColor"}),React.createElement("path",{d:"M18 26H30V22H18V26Z",fill:"currentColor"}),React.createElement("path",{d:"M27.2 13.2L23.4 9.4L16.8 16L23.4 22.6L27.2 18.8L24.4 16L27.2 13.2Z",fill:"currentColor"}))},n=JSON.parse('{"UU":"block-development-examples/card-grid-block"}');(0,e.registerBlockType)(n.UU,{edit:function({attributes:e,setAttributes:n}){const{cards:o,cardBackgroundColor:i,cardTextColor:m,borderRadius:s,cardStyle:d,style2Cards:p}=e,[C,g]=(0,c.useState)(null),[v,R]=(0,c.useState)(0),u=(0,a.useBlockProps)(),E=(e,t,a)=>{const l=[...o];l[e]={...l[e],[t]:a},n({cards:l}),R((e=>e+1))};return React.createElement(React.Fragment,null,React.createElement(a.InspectorControls,null,React.createElement(l.PanelBody,{title:(0,t.__)("Card Grid Settings","block-development-examples")},React.createElement(l.SelectControl,{label:(0,t.__)("Card Style","block-development-examples"),value:d,options:[{label:"Style 1 (Image Cards)",value:"style1"},{label:"Style 2 (Icon Cards)",value:"style2"}],onChange:e=>n({cardStyle:e})}),React.createElement(l.RangeControl,{label:(0,t.__)("Border Radius","block-development-examples"),value:s,onChange:e=>n({borderRadius:e}),min:0,max:50}),React.createElement("div",{className:"color-picker-control"},React.createElement("p",null,(0,t.__)("Card Background Color","block-development-examples")),React.createElement(l.ColorPicker,{color:i,onChange:e=>n({cardBackgroundColor:e}),enableAlpha:!0})),React.createElement("div",{className:"color-picker-control"},React.createElement("p",null,(0,t.__)("Card Text Color","block-development-examples")),React.createElement(l.ColorPicker,{color:m,onChange:e=>n({cardTextColor:e}),enableAlpha:!0}))),"style1"===d&&null!==C&&React.createElement(l.PanelBody,{title:(0,t.__)("Card Settings","block-development-examples")},React.createElement(l.TextControl,{label:(0,t.__)("Title","block-development-examples"),value:o[C].title,onChange:e=>E(C,"title",e)}),React.createElement(l.TextareaControl,{label:(0,t.__)("Description","block-development-examples"),value:o[C].description,onChange:e=>E(C,"description",e)}),React.createElement("div",{className:"components-base-control"},React.createElement("label",{className:"components-base-control__label"},(0,t.__)("Image","block-development-examples")),React.createElement(a.MediaUploadCheck,null,React.createElement(a.MediaUpload,{onSelect:e=>((e,t)=>{if(!t||!t.url)return;E(e,"imageUrl",t.url),E(e,"imageId",t.id),E(e,"imageAlt",t.alt||"");const a=[...o];a[e]={...a[e],imageUrl:t.url,imageId:t.id,imageAlt:t.alt||""},n({cards:a}),R((e=>e+1))})(C,e),allowedTypes:["image"],value:o[C].imageId,render:({open:e})=>React.createElement("div",null,o[C].imageUrl?React.createElement("div",null,React.createElement("img",{src:o[C].imageUrl,alt:o[C].imageAlt||"",className:"edit-card-image-preview"}),React.createElement("div",{className:"edit-card-image-buttons"},React.createElement(l.Button,{onClick:e,variant:"secondary",className:"edit-card-replace-image"},(0,t.__)("Replace Image","block-development-examples")),React.createElement(l.Button,{onClick:()=>{return E(e=C,"imageUrl",""),E(e,"imageId",0),E(e,"imageAlt",""),void R((e=>e+1));var e},variant:"tertiary",className:"edit-card-remove-image"},(0,t.__)("Remove Image","block-development-examples")))):React.createElement(l.Button,{onClick:e,variant:"primary",className:"editor-post-featured-image__toggle"},(0,t.__)("Select Image","block-development-examples")))})))),"style2"===d&&null!==C&&React.createElement(l.PanelBody,{title:(0,t.__)("Icon Card Settings","block-development-examples")},React.createElement(l.TextControl,{label:(0,t.__)("Title","block-development-examples"),value:p[C].title,onChange:e=>((e,t,a)=>{const l=JSON.parse(JSON.stringify(p));l[e]={...l[e],[t]:a},n({style2Cards:l}),R((e=>e+1))})(C,"title",e)}),React.createElement("div",{className:"components-base-control"},React.createElement("label",{className:"components-base-control__label"},(0,t.__)("Icon Image","block-development-examples")),React.createElement(a.MediaUploadCheck,null,React.createElement(a.MediaUpload,{onSelect:e=>((e,t)=>{if(!t||!t.url)return;const a=[...p];a[e]={...a[e],imageUrl:t.url,imageId:t.id,imageAlt:t.alt||""},n({style2Cards:a}),R((e=>e+1))})(C,e),allowedTypes:["image"],value:p[C].imageId,render:({open:e})=>React.createElement("div",null,p[C].imageUrl?React.createElement("div",null,React.createElement("img",{src:p[C].imageUrl,alt:p[C].imageAlt||"",className:"edit-card-image-preview edit-icon-image-preview"}),React.createElement("div",{className:"edit-card-image-buttons"},React.createElement(l.Button,{onClick:e,variant:"secondary",className:"edit-card-replace-image"},(0,t.__)("Replace Icon","block-development-examples")),React.createElement(l.Button,{onClick:()=>(e=>{const t=[...p];t[e]={...t[e],imageUrl:"",imageId:0,imageAlt:""},n({style2Cards:t}),R((e=>e+1))})(C),variant:"tertiary",className:"edit-card-remove-image"},(0,t.__)("Remove Icon","block-development-examples")))):React.createElement(l.Button,{onClick:e,variant:"primary",className:"editor-post-featured-image__toggle"},(0,t.__)("Select Icon Image","block-development-examples")))}))))),React.createElement("div",u,"style1"===d?React.createElement("div",{className:"card-grid"},o.map(((e,a)=>React.createElement("div",{key:e.id,className:"card-grid-item "+(C===a?"is-selected":""),style:{backgroundColor:i,borderRadius:`${s}px`},onClick:()=>g(a)},React.createElement("div",{className:"card-inner"},e.imageUrl?React.createElement("div",{className:"card-image-container",style:{borderRadius:s/8+"px"}},React.createElement("img",{src:e.imageUrl,alt:e.imageAlt||"",className:"card-image"})):React.createElement("div",{className:"card-image-placeholder",style:{borderRadius:s/8+"px"}},React.createElement("span",null,(0,t.__)("Select an image","block-development-examples"))),React.createElement("h3",{className:"card-title",style:{color:m}},e.title),React.createElement("p",{className:"card-description",style:{color:m}},e.description)))))):React.createElement("div",{className:"card-grid-style2"},p.map(((e,t)=>React.createElement("div",{key:e.id,className:"card-grid-item-style2 "+(C===t?"is-selected":""),"data-id":e.id,style:{backgroundColor:i,borderRadius:`${s}px`},onClick:()=>g(t)},React.createElement("div",{className:"card-icon"},e.imageUrl?React.createElement("img",{src:e.imageUrl,alt:e.imageAlt||"",className:"card-icon-image"}):r[Object.keys(r)[t%Object.keys(r).length]]||React.createElement("div",{className:"card-icon-placeholder"})),React.createElement("h3",{className:"card-title-style2",style:{color:m}},e.title)))))))},save:function({attributes:e}){const{cards:t,cardBackgroundColor:l,cardTextColor:c,borderRadius:r,cardStyle:n,style2Cards:o}=e,i=a.useBlockProps.save();return React.createElement("div",i,"style1"===n?React.createElement("div",{className:"card-grid"},t.map((e=>React.createElement("div",{key:e.id,className:"card-grid-item",style:{backgroundColor:l,borderRadius:`${r}px`}},React.createElement("div",{className:"card-inner"},e.imageUrl&&React.createElement("div",{className:"card-image-container",style:{borderRadius:r/8+"px"}},React.createElement("img",{src:e.imageUrl,alt:e.imageAlt||"",className:"card-image",loading:"lazy"})),React.createElement("h3",{className:"card-title",style:{color:c}},e.title),React.createElement("p",{className:"card-description",style:{color:c}},e.description)))))):React.createElement("div",{className:"card-grid-style2"},o.map((e=>React.createElement("div",{key:e.id,className:"card-grid-item-style2","data-id":e.id,style:{backgroundColor:l,borderRadius:`${r}px`}},React.createElement("div",{className:"card-icon"},e.imageUrl?React.createElement("img",{src:e.imageUrl,alt:e.imageAlt||"",className:"card-icon-image",width:"48",height:"48",loading:"lazy"}):React.createElement("div",{className:"card-icon-placeholder"})),React.createElement("h3",{className:"card-title-style2",style:{color:c}},e.title))))))}})}},a={};function l(e){var c=a[e];if(void 0!==c)return c.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,l),r.exports}l.m=t,e=[],l.O=(t,a,c,r)=>{if(!a){var n=1/0;for(s=0;s<e.length;s++){for(var[a,c,r]=e[s],o=!0,i=0;i<a.length;i++)(!1&r||n>=r)&&Object.keys(l.O).every((e=>l.O[e](a[i])))?a.splice(i--,1):(o=!1,r<n&&(n=r));if(o){e.splice(s--,1);var m=c();void 0!==m&&(t=m)}}return t}r=r||0;for(var s=e.length;s>0&&e[s-1][2]>r;s--)e[s]=e[s-1];e[s]=[a,c,r]},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={411:0,483:0};l.O.j=t=>0===e[t];var t=(t,a)=>{var c,r,[n,o,i]=a,m=0;if(n.some((t=>0!==e[t]))){for(c in o)l.o(o,c)&&(l.m[c]=o[c]);if(i)var s=i(l)}for(t&&t(a);m<n.length;m++)r=n[m],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(s)},a=globalThis.webpackChunkfilter_custom_blocks=globalThis.webpackChunkfilter_custom_blocks||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var c=l.O(void 0,[483],(()=>l(230)));c=l.O(c)})();