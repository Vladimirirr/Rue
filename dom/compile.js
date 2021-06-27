import {getChainValue, setChainValue} from '../apis/utils.js'
import {Watcher} from '../reactify/index.js'

var updaterElementFns = { // 指令具体的更新方法集
	text(node, exp, vm){
		node.innerText = getChainValue(exp, vm.$data);
	}
	,html(node, exp, vm){
		node.innerHTML = getChainValue(exp, vm.$data);
	}
	,model(node, exp, vm){
		node.value = getChainValue(exp, vm.$data);
	}
	,on(node, exp, vm){
		var [eventName, eventFn] = exp.split(':'); // r-on="click:fn"
		node.addEventListener(eventName, vm.$methods[eventFn].bind(vm));
	}
};

var compileElementFns = { // 指令方法集
	text(node, exp, vm){
		// 还需要判断是 JavaScript表达式 还是 变量
		// 如果是JavaScript表达式，包装`eval(`(function(){return ${exp};})();`)`
		// console.log(eval(`(function(){return ${exp};})();`));
		updaterElementFns.text(node, exp, vm);
		new Watcher(vm.$data, exp, ()=>{
			// console.log(exp);
			updaterElementFns.text(node, exp, vm);
		});
	}
	,html(node, exp, vm){
		updaterElementFns.html(node, exp, vm);
		new Watcher(vm.$data, exp, ()=>{
			updaterElementFns.html(node, exp, vm);
		});
	}
	,model(node, exp, vm){
		updaterElementFns.model(node, exp, vm);
		// 目前model指令只对具有input事件的input元素
		node.addEventListener('input', function(){
			setChainValue(exp, vm.$data, node.value);
		});
		new Watcher(vm.$data, exp, ()=>{
			updaterElementFns.model(node, exp, vm);
		});
	}
	,on(node, exp, vm){
		updaterElementFns.on(node, exp, vm);
	}
};

export function compile(el, vm){
	var el = window.document.querySelector(el);
	var vm = vm;
	var fragment = node2Fragment(el);
	compile(fragment);
	el.append(fragment);
		
	function node2Fragment(node){
		var fragment = window.document.createDocumentFragment();
		var nowNode;
		while(nowNode = node.firstChild){
			fragment.append(nowNode);
		}
		return fragment;
	}
	function compile(node){
		var childNodes = node.childNodes;
		childNodes.forEach(item => {
			if (item.nodeType == 3){
				// 文本节点
				// console.log('文本', item);
				compileText(item);
			}else if(item.nodeType == 1){
				// 元素节点
				// console.log('元素', item);
				compileElement(item);
				compile(item);
			}
		});
	}
	function compileText(node){
		var data = vm.$data;
		var originExp = node.textContent;
		var mustacheReg = /\{\{(.+?)\}\}/g;
		node.textContent = originExp.replace(mustacheReg, function(){
			var exp = arguments[1];
			new Watcher(data, exp, ()=>{
				node.textContent = originExp.replace(mustacheReg, function(){
					var exp = arguments[1];
					return getChainValue(exp, data);
				});
			});
			return getChainValue(exp, data);
		});
	}
	function compileElement(node){
		var directives = ['text', 'html', 'model', 'on']; // 支持的指令
		var node_directives = []; // 节点带有的指令
		for (let x of node.attributes){
			if (x.name.startsWith('r-')){
				let directiveName = x.name.slice(2);
				if (directives.includes(directiveName)){
					node_directives.push({
						name: directiveName,
						value: x.value
					});
				}
			}
		}
		node_directives.forEach(directive=>{
			// 处理指令
			compileElementFns[directive.name](node, directive.value, vm);
			// 删除指令
			node.removeAttribute('y-'+directive.name);
		});
	}
}
