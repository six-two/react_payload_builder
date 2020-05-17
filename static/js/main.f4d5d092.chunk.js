(this.webpackJsonpreact_payload_builder=this.webpackJsonpreact_payload_builder||[]).push([[0],{102:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(49),i=n.n(o),s=(n(62),n(1)),u=n(2),l=n(4),c=n(3),p=(n(63),n(22)),h=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("select",{onChange:function(t){e.props.onChange(t.target.value)},value:this.props.value},r.a.createElement("option",{value:"",key:-1,disabled:!0,hidden:!0},this.props.prompt?this.props.prompt:"Choose a option"),this.props.options.map((function(e,t){return r.a.createElement("option",{value:e,key:t},e)})))}}],[{key:"defaultValue",value:function(){return""}}]),n}(r.a.Component);function v(e){if(""===e)return!0;var t=Number(e);return!isNaN(t)&&t>0&&t<=99999}var d=["Repeat "," up to index "],g=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onNumberChange=function(t){v(t.target.value)&&e.onChange({paddToLength:t.target.value})},e.onPatternChange=function(t){e.onChange({pattern:t.target.value})},e}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"edit-container"},d[0],r.a.createElement("input",{className:"input-string",type:"text",value:this.props.values.pattern,onChange:this.onPatternChange}),d[1],r.a.createElement("input",{className:"input-count",type:"text",value:this.props.values.paddToLength,onChange:this.onNumberChange}))}},{key:"onChange",value:function(e){this.props.onChange(Object.assign({},this.props.values,e))}}]),n}(r.a.Component),f=/\x[0-9a-fA-F]{2}/,m=function(){function e(t){Object(s.a)(this,e),this.str=void 0,this.bytes=void 0,this.bytes=[];for(var n=0;n<t.length;){var a=t.slice(n,n+4);if(a.match(f))this.bytes.push(a),n+=4;else{var r="\\"!==t[n]?t[n]:"\\x5c";this.bytes.push(r),n+=1}}this.str=this.bytes.join("")}return Object(u.a)(e,[{key:"getReversed",value:function(){for(var t="",n=this.bytes.length-1;n>=0;n--)t+=this.bytes[n];return new e(t)}}],[{key:"fromHex",value:function(t){if(t.length%2===1)throw new Error("Hex has odd length");for(var n="",a=0;a<t.length;a+=2)n+="\\x"+t.slice(a,a+2);return new e(n)}}]),e}(),y=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"defaultValues",value:function(){return{pattern:"A",paddToLength:1,type:"Padding"}}},{key:"paddingToBytes",value:function(e,t){for(var n=0,a=0;a<t.length;a++)n+=t[a].bytes.length;var r=e.paddToLength-n;r<0&&w("Padding should be applied up to index ".concat(e.paddToLength,", but the string is already longer than that (length=").concat(n,")")),e.pattern||w("Padding can not be empty");var o=new m(e.pattern?e.pattern:"?"),i=Math.floor(r/o.bytes.length),s=r-i*o.bytes.length,u=o.str.repeat(i),l=o.bytes.slice(0,s).join("");return new m(u+l)}}]),e}(),b=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"defaultValues",value:function(){return{pattern:"A",repeatCount:1,type:"String"}}},{key:"stringToBytes",value:function(e){var t=e.repeatCount,n=e.pattern.repeat(t);return new m(n)}}]),e}(),C=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"defaultValues",value:function(){return{pattern:"A",repeatCount:1,type:"String (reversed)"}}},{key:"stringToBytes",value:function(e){var t=e.repeatCount,n=new m(e.pattern).getReversed().str.repeat(t);return new m(n)}}]),e}(),E={key:-1,data:new m("Error: Please check your inputs. @dev: This message should not be shown")};function w(e){var t=new Error(e||"Something went wrong. Please check your inputs");throw t.name="BadInputError",t}var k=function(){function e(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(s.a)(this,e),this.littleEndian=void 0,this.littleEndian=t}return Object(u.a)(e,[{key:"getBytesStrings",value:function(e){var t=0;try{var n=[],a=[];for(t=0;t<e.length;t++){var r=this.toBytes(e[t].data,a),o={key:e[t].key,data:r};a.push(r),n.push(o)}return{byteStrings:n}}catch(i){if("BadInputError"===i.name)return{errorMessage:"Error in input ".concat(t+1,": ").concat(i.message),byteStrings:[E]};throw i}}},{key:"toBytes",value:function(e,t){switch(e.type){case"Padding":return y.paddingToBytes(e,t);case O:return S.integerToBytes(e,this.littleEndian);case"String":return b.stringToBytes(e);case"String (reversed)":return C.stringToBytes(e);default:return new m("<Unknown type>")}}}]),e}(),O="Integer",j=new Map;j.set("8 bit",0xffn),j.set("16 bit",0xffffn),j.set("32 bit",0xffffffffn),j.set("64 bit",0xffffffffffffffffn);var x=new Map;x.set("8 bit",1),x.set("16 bit",2),x.set("32 bit",4),x.set("64 bit",8);var S=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"defaultValues",value:function(){return{numberString:"0x41414141",numberType:"32 bit",type:O}}},{key:"getErrorMessage",value:function(t){try{var n=e.parseNumber(t.numberString),a=t.numberType,r=j.get(a);if(!r)throw new Error("Unknown number type: ".concat(a));var o=r;if(n>o)return"Number to big for '".concat(a,"'");if(n<0n&&n<(o+1n)/BigInt(-2))return"Number to big for '".concat(a,"'")}catch(i){return"Parsing integer failed"}}},{key:"parseNumber",value:function(e){return e=e.replace(/[\s_]+/g,""),BigInt(e)}},{key:"integerToBytes",value:function(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=e.getErrorMessage(t);a&&w(a);var r=e.parseNumber(t.numberString),o=j.get(t.numberType),i=x.get(t.numberType);if(!o||!i)throw new Error("Unknown number type: ".concat(t.numberType));r<0n&&(r+=o+1n);var s=r.toString(16),u=2*i-s.length;s="0".repeat(u)+s;var l=m.fromHex(s);return n?l.getReversed():l}}]),e}(),I=["8 bit","16 bit","32 bit","64 bit"],T=[" as "," integer"],N=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onTypeChange=function(t){e.onChange({numberType:t})},e.onValueChange=function(t){var n=t.target.value;/^([0-9a-fA-Fxo]*)$/.test(n)&&e.onChange({numberString:n})},e}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"edit-container"},r.a.createElement("input",{type:"text",value:this.props.values.numberString,onChange:this.onValueChange}),T[0],r.a.createElement(h,{value:this.props.values.numberType,onChange:this.onTypeChange,options:I}),T[1])}},{key:"onChange",value:function(e){this.props.onChange(Object.assign({},this.props.values,e))}}]),n}(r.a.Component),V=["Repeat "," exactly "," time(s)"],B=["Reverse "," and repeat it "," time(s)"],L=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onNumberChange=function(t){v(t.target.value)&&e.onChange({repeatCount:t.target.value})},e.onPatternChange=function(t){e.onChange({pattern:t.target.value})},e}return Object(u.a)(n,[{key:"render",value:function(){var e="String (reversed)"===this.props.values.type?B:V;return r.a.createElement("div",{className:"edit-container"},e[0],r.a.createElement("input",{className:"input-string",type:"text",value:this.props.values.pattern,onChange:this.onPatternChange}),e[1],r.a.createElement("input",{className:"input-count",type:"text",value:this.props.values.repeatCount,onChange:this.onNumberChange}),e[2])}},{key:"onChange",value:function(e){this.props.onChange(Object.assign({},this.props.values,e))}}]),n}(r.a.Component),M=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onMoveUp=function(){e.props.index>0&&e.props.onItemsSwap(e.props.index,e.props.index-1)},e.onMoveDown=function(){e.props.isLast||e.props.onItemsSwap(e.props.index,e.props.index+1)},e.onDelete=function(){e.props.onItemDelete(e.props.index)},e}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"list-item-controls"},r.a.createElement("input",{type:"button",value:"Up",onClick:this.onMoveUp,disabled:0===this.props.index}),r.a.createElement("input",{type:"button",value:"Down",onClick:this.onMoveDown,disabled:this.props.isLast}),r.a.createElement("input",{type:"button",value:"Delete",onClick:this.onDelete}))}}]),n}(r.a.Component),A=new Map;A.set(O,{defaultValues:S.defaultValues,viewClass:N}),A.set("String",{defaultValues:b.defaultValues,viewClass:L}),A.set("String (reversed)",{defaultValues:C.defaultValues,viewClass:L}),A.set("Padding",{defaultValues:y.defaultValues,viewClass:g});var D=Object(p.a)(A.keys());function P(e){var t=A.get(e);if(!t)throw Error("Unknown type: ".concat(e));return t}var U=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onTypeChange=function(t){e.onChange(t,P(t).defaultValues())},e.onChildChange=function(t){e.onChange(e.props.data.type,t)},e}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("tr",{className:"list-item multi-colored"},r.a.createElement("td",null,r.a.createElement(h,{value:this.props.data.type,options:D,onChange:this.onTypeChange})),r.a.createElement("td",null,this.renderChild(this.props.data.type)),r.a.createElement("td",null,r.a.createElement(M,{index:this.props.index,isLast:this.props.isLast,onItemsSwap:this.props.onItemsSwap,onItemDelete:this.props.onItemDelete})))}},{key:"onChange",value:function(e,t){var n=Object.assign(t,{type:e});this.props.onChange(this.props.index,n)}},{key:"renderChild",value:function(e){var t=P(e).viewClass,n={onChange:this.onChildChange,values:this.props.data};return r.a.createElement(t,n)}},{key:"typeToClass",value:function(e){var t,n=null===(t=A.get(e))||void 0===t?void 0:t.viewClass;if(!n)throw Error("Unknown type: ".concat(e));return n}}]),n}(r.a.Component),R=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(e){var a,r;Object(s.a)(this,n),(r=t.call(this,e)).onItemAdd=function(){var e=r.state.entries.slice(),t=r.props.newItemData(e.length),n={key:r.state.nextId,data:t};e.push(n),r.onChange(e,r.state.nextId+1)},r.onItemChange=function(e,t){var n=r.state.entries.slice(),a={key:n[e].key,data:t};n[e]=a,r.onChange(n,r.state.nextId)},r.onItemSwapped=function(e,t){var n=r.state.entries.slice(),a=n[e];n[e]=n[t],n[t]=a,r.onChange(n,r.state.nextId)},r.onItemDeleted=function(e){var t=r.state.entries.slice();t.splice(e,1),r.onChange(t,r.state.nextId)};var o=(null!==(a=e.initialValues)&&void 0!==a?a:[]).map((function(e,t){return{key:t,data:e}}));return r.state={entries:o,nextId:o.length},e.onChange(o),r}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h2",null,"Hex builder"),r.a.createElement("table",{className:"list"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Type"),r.a.createElement("th",null,"Configuration"),r.a.createElement("th",null,"Actions"))),r.a.createElement("tbody",null,this.state.entries.map((function(t,n){return r.a.createElement(U,{index:n,key:t.key,isLast:n+1===e.state.entries.length,onItemDelete:e.onItemDeleted,onItemsSwap:e.onItemSwapped,onChange:e.onItemChange,data:t.data})})),r.a.createElement("tr",{key:-1},r.a.createElement("td",null),r.a.createElement("td",null,r.a.createElement("input",{type:"button",style:{width:"100%"},value:"Add new element",onClick:this.onItemAdd})),r.a.createElement("td",null)))))}},{key:"onChange",value:function(e,t){this.setState({entries:e,nextId:t}),this.props.onChange(e)}}]),n}(r.a.Component),_=n(50),F=n(56),H=n.n(F),J=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).onClick=function(e){var t=a.props.text;H()(t),a.setState({copiedText:t})},a.state={copiedText:null},a}return Object(u.a)(n,[{key:"render",value:function(){var e=this.props.text===this.state.copiedText?"Copied":"Copy";return r.a.createElement("button",{onClick:this.onClick},e)}}]),n}(r.a.Component),W=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(e){var a;Object(s.a)(this,n),(a=t.call(this,e)).onTypeChange=function(e){if(e!==a.props.values.option){var t;if(a.isCustom(e))t=a.state.lastCustomValue;else if(a.isCustom()&&a.setState({lastCustomValue:a.props.values.value}),void 0===(t=a.props.options.get(e)))throw new Error("[BUG] Type has no value mapped");var n={option:e,value:t};a.props.onChange(n)}},a.onValueChange=function(e){if(a.isCustom()){var t={option:a.props.values.option,value:e.target.value};a.props.onChange(t)}};var r=e.options.get(e.customOption);if(void 0===r)throw new Error("Initial value for customOption is not suppplied");return a.state={lastCustomValue:r},a}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,this.props.label,r.a.createElement(h,{value:this.props.values.option,onChange:this.onTypeChange,options:Object(p.a)(this.props.options.keys())}),this.isCustom()?r.a.createElement("input",{type:"text",value:this.props.values.value,onChange:this.onValueChange}):null)}},{key:"isCustom",value:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;return(t=null!==(e=t)&&void 0!==e?e:this.props.values.option)===this.props.customOption}}]),n}(r.a.Component),$=new Map;$.set("python","python -c 'print(\"%s\")'"),$.set("printf","printf '%s'"),$.set("raw","%s"),$.set("custom","your_command --flags '%s'");var q=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(e){var a,r;Object(s.a)(this,n),(r=t.call(this,e)).onFormatChange=function(e){r.setState({format:e})},r.onEndianChange=function(e){r.setState({isLittleEndian:e.target.checked})};var o=null!==(a=$.get("raw"))&&void 0!==a?a:"%s";return r.state={format:{option:"raw",value:o},isLittleEndian:!0},r}return Object(u.a)(n,[{key:"render",value:function(){var e,t=this.state.format.value.split("%s");2!==t.length&&(e='Format has to contain exactly one "%s" (without the quotes)');var n=[],a=new k(this.state.isLittleEndian).getBytesStrings(this.props.blueprints);a.errorMessage?e=a.errorMessage:n=a.byteStrings.map((function(e){var t;return{key:e.key,str:(t=e.data.str,t.replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/ /g,"\\x20"))}}));var o=n.map((function(e){return e.str})).join("");return o=t[0]+o+t[1],r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement(_.a,{checked:this.state.isLittleEndian,onChange:this.onEndianChange}),"use little endian"),r.a.createElement(W,{options:$,values:this.state.format,customOption:"custom",onChange:this.onFormatChange,label:"Output format: "}),r.a.createElement("br",null),e?r.a.createElement("span",{className:"err-msg"},e):r.a.createElement("div",{className:"byteOutput"},r.a.createElement(J,{text:o}),r.a.createElement("br",null),t[0],r.a.createElement("span",null,n.map((function(e){return r.a.createElement("span",{className:"multi-colored",key:e.key},e.str)}))),t[1]))}}]),n}(r.a.Component),G=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(e){var a;Object(s.a)(this,n),(a=t.call(this,e)).onListChange=function(e){a.setState({blueprints:e})};var r=[{type:"String",pattern:"Build your own attack string",repeatCount:1},{type:"String",pattern:"Input non ascii chars like this: \\x11\\x22\\x33\\x44",repeatCount:1},{type:"String",pattern:"Backslashes are escaped. So use '\\x0a' instead of '\\n'!",repeatCount:1},{type:"Padding",pattern:"\\x90",paddToLength:128},{type:"String",pattern:"You can put an address into memory like below:",repeatCount:1},{type:"Integer",numberType:"32 bit",numberString:"0x12345678"}];return a.state={initialValues:r,blueprints:[]},a}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"app-root"},r.a.createElement(R,{initialValues:this.state.initialValues,onChange:this.onListChange,entryClass:U,newItemData:function(e){var t=b.defaultValues();return t.repeatCount=e+1,t}}),r.a.createElement(q,{blueprints:this.state.blueprints}))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},57:function(e,t,n){e.exports=n(102)},62:function(e,t,n){},63:function(e,t,n){}},[[57,1,2]]]);
//# sourceMappingURL=main.f4d5d092.chunk.js.map