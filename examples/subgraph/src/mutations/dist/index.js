!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Resolvers=r():e.Resolvers=r()}(window,(function(){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var a in e)t.d(n,a,function(r){return e[r]}.bind(null,a));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=3)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,a,u=(n=["\n  {\n    gravatar(owner: ",") {\n      id\n      owner\n      displayName\n      imageUrl\n    }\n  }"],a=["\n  {\n    gravatar(owner: ",") {\n      id\n      owner\n      displayName\n      imageUrl\n    }\n  }"],Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(a)}}))),i=s(t(0)),o=t(1),c=s(t(2));function s(e){return e&&e.__esModule?e:{default:e}}var d=function(e,r,t,n){return new(t||(t=Promise))((function(a,u){function i(e){try{c(n.next(e))}catch(e){u(e)}}function o(e){try{c(n.throw(e))}catch(e){u(e)}}function c(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(i,o)}c((n=n.apply(e,r||[])).next())}))};function f(e){return d(this,void 0,void 0,regeneratorRuntime.mark((function r(){var t,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.client,n=e.thegraph.config.ethereum,r.next=4,t.query((0,i.default)(u,n.eth.defaultAccount));case 4:return r.abrupt("return",r.sent);case 5:case"end":return r.stop()}}),r,this)})))}function v(e,r,t){return d(this,void 0,void 0,regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=t.thegraph.mutationState,n.prev=1,n.next=4,e;case 4:return e=n.sent,a.addTransaction(e.hash),n.next=8,e.wait();case 8:n.next=14;break;case 10:throw n.prev=10,n.t0=n.catch(1),a.addError(n.t0),new Error('Failed while sending "'+r+'"');case 14:case"end":return n.stop()}}),n,this,[[1,10]])})))}function p(e){var r=e.thegraph.config.ethereum,t=e.thegraph.dataSources.Gravity,n=new o.ethers.Contract(t.address,t.abi,r);return n.connect(r),n}var h={Mutations:{createGravatar:function(e,r,t){var n=r.options;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a,u,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.displayName,a=n.imageUrl,u=p(t),i=u.createGravatar(r,a),e.next=5,v(i,"Creating Gravatar",t);case 5:return e.next=7,f(t);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e,this)})))},updateGravatarName:function(e,r,t){var n=r.displayName;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(t),a=r.updateGravatarName(n),e.next=4,v(a,"Updating Gravatar Name",t);case 4:return e.next=6,f(t);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e,this)})))},updateGravatarImage:function(e,r,t){var n=r.imageUrl;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(t),a=r.updateGravatarImage(n),t.thegraph.mutationState.addData("imageUrl",n),e.next=5,v(a,"Updating Gravatar Image",t);case 5:return e.next=7,f(t);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e,this)})))}}},m={ethereum:function(e){return new o.ethers.providers.Web3Provider(e)},ipfs:function(e){return(0,c.default)(e)},property:{a:function(e){},b:function(e){}}};r.default={resolvers:h,config:m}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,a,u=(n=["\n  {\n    gravatar(owner: ",") {\n      id\n      owner\n      displayName\n      imageUrl\n    }\n  }"],a=["\n  {\n    gravatar(owner: ",") {\n      id\n      owner\n      displayName\n      imageUrl\n    }\n  }"],Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(a)}}))),i=s(t(0)),o=t(1),c=s(t(2));function s(e){return e&&e.__esModule?e:{default:e}}var d=function(e,r,t,n){return new(t||(t=Promise))((function(a,u){function i(e){try{c(n.next(e))}catch(e){u(e)}}function o(e){try{c(n.throw(e))}catch(e){u(e)}}function c(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(i,o)}c((n=n.apply(e,r||[])).next())}))};function f(e){return d(this,void 0,void 0,regeneratorRuntime.mark((function r(){var t,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.client,n=e.thegraph.config.ethereum,r.next=4,t.query((0,i.default)(u,n.eth.defaultAccount));case 4:return r.abrupt("return",r.sent);case 5:case"end":return r.stop()}}),r,this)})))}function v(e,r,t){return d(this,void 0,void 0,regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=t.thegraph.mutationState,n.prev=1,n.next=4,e;case 4:return e=n.sent,a.addTransaction(e.hash),n.next=8,e.wait();case 8:n.next=14;break;case 10:throw n.prev=10,n.t0=n.catch(1),a.addError(n.t0),new Error('Failed while sending "'+r+'"');case 14:case"end":return n.stop()}}),n,this,[[1,10]])})))}function p(e){var r=e.thegraph.config.ethereum,t=e.thegraph.dataSources.Gravity,n=new o.ethers.Contract(t.address,t.abi,r);return n.connect(r),n}var h={Mutations:{createGravatar:function(e,r,t){var n=r.options;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a,u,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.displayName,a=n.imageUrl,u=p(t),i=u.createGravatar(r,a),e.next=5,v(i,"Creating Gravatar",t);case 5:return e.next=7,f(t);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e,this)})))},updateGravatarName:function(e,r,t){var n=r.displayName;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(t),a=r.updateGravatarName(n),e.next=4,v(a,"Updating Gravatar Name",t);case 4:return e.next=6,f(t);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e,this)})))},updateGravatarImage:function(e,r,t){var n=r.imageUrl;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(t),a=r.updateGravatarImage(n),t.thegraph.mutationState.addData("imageUrl",n),e.next=5,v(a,"Updating Gravatar Image",t);case 5:return e.next=7,f(t);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e,this)})))}}},m={ethereum:function(e){return new o.ethers.providers.Web3Provider(e)},ipfs:function(e){return(0,c.default)(e)},property:{a:function(e){},b:function(e){}}};r.default={resolvers:h,config:m}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,a,u=(n=["\n  {\n    gravatar(owner: ",") {\n      id\n      owner\n      displayName\n      imageUrl\n    }\n  }"],a=["\n  {\n    gravatar(owner: ",") {\n      id\n      owner\n      displayName\n      imageUrl\n    }\n  }"],Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(a)}}))),i=s(t(0)),o=t(1),c=s(t(2));function s(e){return e&&e.__esModule?e:{default:e}}var d=function(e,r,t,n){return new(t||(t=Promise))((function(a,u){function i(e){try{c(n.next(e))}catch(e){u(e)}}function o(e){try{c(n.throw(e))}catch(e){u(e)}}function c(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(i,o)}c((n=n.apply(e,r||[])).next())}))};function f(e){return d(this,void 0,void 0,regeneratorRuntime.mark((function r(){var t,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.client,n=e.thegraph.config.ethereum,r.next=4,t.query((0,i.default)(u,n.eth.defaultAccount));case 4:return r.abrupt("return",r.sent);case 5:case"end":return r.stop()}}),r,this)})))}function v(e,r,t){return d(this,void 0,void 0,regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=t.thegraph.mutationState,n.prev=1,n.next=4,e;case 4:return e=n.sent,a.addTransaction(e.hash),n.next=8,e.wait();case 8:n.next=14;break;case 10:throw n.prev=10,n.t0=n.catch(1),a.addError(n.t0),new Error('Failed while sending "'+r+'"');case 14:case"end":return n.stop()}}),n,this,[[1,10]])})))}function p(e){var r=e.thegraph.config.ethereum,t=e.thegraph.dataSources.Gravity,n=new o.ethers.Contract(t.address,t.abi,r);return n.connect(r),n}var h={Mutations:{createGravatar:function(e,r,t){var n=r.options;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a,u,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.displayName,a=n.imageUrl,u=p(t),i=u.createGravatar(r,a),e.next=5,v(i,"Creating Gravatar",t);case 5:return e.next=7,f(t);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e,this)})))},updateGravatarName:function(e,r,t){var n=r.displayName;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(t),a=r.updateGravatarName(n),e.next=4,v(a,"Updating Gravatar Name",t);case 4:return e.next=6,f(t);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e,this)})))},updateGravatarImage:function(e,r,t){var n=r.imageUrl;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(t),a=r.updateGravatarImage(n),t.thegraph.mutationState.addData("imageUrl",n),e.next=5,v(a,"Updating Gravatar Image",t);case 5:return e.next=7,f(t);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e,this)})))}}},m={ethereum:function(e){return new o.ethers.providers.Web3Provider(e)},ipfs:function(e){return(0,c.default)(e)},property:{a:function(e){},b:function(e){}}};r.default={resolvers:h,config:m}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,a,u=(n=["\n  {\n    gravatar(owner: ",") {\n      id\n      owner\n      displayName\n      imageUrl\n    }\n  }"],a=["\n  {\n    gravatar(owner: ",") {\n      id\n      owner\n      displayName\n      imageUrl\n    }\n  }"],Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(a)}}))),i=s(t(0)),o=t(1),c=s(t(2));function s(e){return e&&e.__esModule?e:{default:e}}var d=function(e,r,t,n){return new(t||(t=Promise))((function(a,u){function i(e){try{c(n.next(e))}catch(e){u(e)}}function o(e){try{c(n.throw(e))}catch(e){u(e)}}function c(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(i,o)}c((n=n.apply(e,r||[])).next())}))};function f(e){return d(this,void 0,void 0,regeneratorRuntime.mark((function r(){var t,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.client,n=e.thegraph.config.ethereum,r.next=4,t.query((0,i.default)(u,n.eth.defaultAccount));case 4:return r.abrupt("return",r.sent);case 5:case"end":return r.stop()}}),r,this)})))}function v(e,r,t){return d(this,void 0,void 0,regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=t.thegraph.mutationState,n.prev=1,n.next=4,e;case 4:return e=n.sent,a.addTransaction(e.hash),n.next=8,e.wait();case 8:n.next=14;break;case 10:throw n.prev=10,n.t0=n.catch(1),a.addError(n.t0),new Error('Failed while sending "'+r+'"');case 14:case"end":return n.stop()}}),n,this,[[1,10]])})))}function p(e){var r=e.thegraph.config.ethereum,t=e.thegraph.dataSources.Gravity,n=new o.ethers.Contract(t.address,t.abi,r);return n.connect(r),n}var h={Mutations:{createGravatar:function(e,r,t){var n=r.options;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a,u,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.displayName,a=n.imageUrl,u=p(t),i=u.createGravatar(r,a),e.next=5,v(i,"Creating Gravatar",t);case 5:return e.next=7,f(t);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e,this)})))},updateGravatarName:function(e,r,t){var n=r.displayName;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(t),a=r.updateGravatarName(n),e.next=4,v(a,"Updating Gravatar Name",t);case 4:return e.next=6,f(t);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e,this)})))},updateGravatarImage:function(e,r,t){var n=r.imageUrl;return d(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(t),a=r.updateGravatarImage(n),t.thegraph.mutationState.addData("imageUrl",n),e.next=5,v(a,"Updating Gravatar Image",t);case 5:return e.next=7,f(t);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e,this)})))}}},m={ethereum:function(e){return new o.ethers.providers.Web3Provider(e)},ipfs:function(e){return(0,c.default)(e)},property:{a:function(e){},b:function(e){}}};r.default={resolvers:h,config:m}}])}));