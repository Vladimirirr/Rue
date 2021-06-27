import {defineReactive} from './defineReactive.js'
import {arrayMutation} from './arrayMutation.js'
import {observe} from './observe.js'
import {Dep} from './Dep.js'

export class Observer{
	constructor(value){
		this.value = value;
		this.dep = new Dep();
		Object.defineProperty(value, '__ob__', { // 把Observer实例放在对象身上
			enumerable: false,
			configurable: true,
			writable: true,
			value: this
		});
		if (value instanceof Array){ // or Array.isArray(value)
			this.walkArray(value);
			value.__proto__ = arrayMutation;
		}else{
			this.walk(value);
		}
	}
	walk(data){
		for (let x in data){
			defineReactive(data, x);
		}
	}
	walkArray(data){
		for (let x = 0; x < data.length; x++){
			observe(data[x]);
		}
	}
}
