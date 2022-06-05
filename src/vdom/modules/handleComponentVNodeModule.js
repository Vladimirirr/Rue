export default {
  pre(){
    console.log('patch begin')
  },
  create(emptyVNode, VNode){
    console.log('create', emptyVNode, VNode)
  },
  update(oldVNode, VNode){
    console.log('update', oldVNode, VNode)
  },
  destroy(VNode){
    console.log('destroy', VNode)
  },
  remove(VNode, removeCallback){
    console.log('remove', VNode, removeCallback)
  },
  post(){
    console.log('patch done')
  }
}