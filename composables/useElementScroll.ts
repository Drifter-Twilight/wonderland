export function useElementScroll(el: string, callback: () => void) {
  onMounted(() => {
    const liContainer = document.querySelector<HTMLElement>(el)
    const scroll = useScroll(shallowRef(liContainer), {
      offset: { bottom: 800 }
    })

    watchEffect(() => {
      if (scroll.arrivedState.bottom && callback) {
        callback()
      }
    })
  })
}