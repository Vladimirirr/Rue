import {Dep} from './Dep.js'
import {observe} from './observe.js'

var uuid = 0;

function dependArray(arr){
	for (let e of arr){
		e && e.__ob__ && e.__ob__.dep.depend();
		if (Array.isArray(e)){
			dependArray(e);
		}
	}
}

export function defineReactive(data, key){
	var dep = new Dep(); // 每个值（依赖）都有自己的订阅列表
	var value = data[key];
	var childOb = observe(value); // childOb = value.__ob__ = data[key].__ob__
	// childOb用于实现数组的依赖触发（以及类似于Vue.set或Vue.delete的方法触发更新），因为childOb就是数组value.__ob__
	// 当value是对象时，value闭包的dep和value.__ob__.dep保存的是同一份的watcher
	// 比如data[key]是数组，在闭包中保存的dep是用于确保整个data[key]被覆盖时可以被setter监听到从而继续保持响应式
	// childOb其实就是data[key]上的__ob__，watcher实例初始化时的getter同时也把watcher收集到了data[key]上的__ob__.dep，此__ob__.dep就是用来在arrayMutation方法内部触发依赖的
	// __ob__是为了解决数组响应式而提出的

	// 下面用于测试
	window.uuid = uuid;
	window['dep'+uuid] = {dep, childOb, id: `${JSON.stringify(data)}[${key}]`};
	uuid++;

	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get(){
			if (Dep.target){
				dep.depend();
				if (childOb){
					childOb.dep.depend();
					// 监听数组就是监听它的全部子孙
					if (Array.isArray(value)){
						dependArray(value);
					}
				}
			}
			return value;
		},
		set(newValue){
			if (newValue !== value){
				value = newValue;
				childOb = observe(newValue);
				dep.notify();
			}
		}
	});
}
