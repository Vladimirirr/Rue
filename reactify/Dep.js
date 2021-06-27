var uuid = 0; // 防止重复收集依赖
// <b>{{name}} - {{name}}</b>
// 会进行两次name的依赖收集，当name改变时触发了两次相同的watcher#update

export class Dep{
	constructor(){
		this.subs = []; // 订阅者
		this.id = uuid++;
	}
	add(watcher){
		this.subs.push(watcher);
	}
	depend(){
		// this.add(Dep.target); // 最早的版本，没有考虑重复收集依赖的情况
		Dep.target.addDep(this); // 让watcher自己决定是否要被收集，避免重复收集依赖
	}
	notify(){
		this.subs.forEach(watcher => watcher.update(...arguments));
	}
}

Dep.target = null; // 当前默认target

var targetStack = [];

export function pushTarget(_target) {
  targetStack.push(Dep.target) // 压入当前target
  Dep.target = _target // 替换当前target
}

export function popTarget() {
  Dep.target = targetStack.pop() // 恢复当前target
}
