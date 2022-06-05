import __patch from './patchGenerator.js'

export const patch = (...args) => {
  return __patch(...args)
}
