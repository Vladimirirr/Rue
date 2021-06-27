import {parsePath} from '../apis/utils.js'
import {Dep, pushTarget, popTarget} from './Dep.js'

// 有渲染watcher和普通watcher
// 普通watcher是通用的watcher，数据变化时执行回调函数
// 渲染watcher接收一个渲染函数而不是依赖表达式，形式：new Watcher(target, renderFn)，当数据变化时自动执行渲染函数

export class Watcher{
	constructor(target, exp, cb){
		this.target = target;
		if (typeof exp == 'function'){ // 说明是一个渲染watcher
			this.getter = exp;
		}else{
			this.getter = parsePath(exp); // expression就是依赖
		}
		this.cb = cb;
		
		// this.deps = [];
		// this.depIds = new Set();
		// this.newDeps = [];
		// this.newDepIds = new Set();

		this.value = this.get({init: true}); // 初始化watcher时立刻订阅依赖
	}
	get({init}){
		Dep.target = init && this; // 把此watcher（即this）放在全局的某个位置
		// JS单线程机制保证了同一时间只有一个watcher在实例化
		var value = this.getter(this.target); // 触发依赖收集，依赖的每个父层都会收集此watcher
		Dep.target = null;
		return value;
	}
	update(){
		var value = this.get({init: false}); // 不要再触发依赖收集
		// 如果getter是渲染函数，那么value和this.value都是undefined（渲染函数不返回值），不进入if语句
		// 对于数组，由于是引用类型，value != this.value肯定不成立，所以要修正它
		if (value != this.value || typeof value == 'object'){
			var oldValue = this.value;
			var newValue = value;
			this.value = newValue;
			this.cb.call(this.target, oldValue, newValue);
		}
	}
	addDep(dep){
		dep.add(this);
		// var id = dep.id;
		// if (!this.newDepIds.has(id)){ // 自己还没被对应的dep收集过，就收集自己，避免了重复收集依赖
		// 	this.newDepIds.add(id);
		// 	this.newDeps.push(dep);
		// 	if (!this.depIds.has(id)){
		// 		dep.add(this);
		// 	}
		// }
	}
	cleanUpDeps(){
    // 交换
  }
}
