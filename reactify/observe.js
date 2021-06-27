import {Observer} from './Observer.js'

export function observe(value){
	if (!(value instanceof Object)) return;
	// if (value.__ob__){
	// 	return value.__ob__;
	// }else{
	// 	return new Observer(value);
	// }
	return new Observer(value);
}
