import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

export function useLg() {
  return breakpoints.greaterOrEqual('lg')
}