import { useEffect, useRef } from 'react'

export default (eventName: string, handler: any, ref: any) => {
  const handlerRef = useRef()
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const node = ref.current
    // @ts-ignore
    const eventListener = (event: any) => handlerRef.current(event)
    if (node) {
      node.addEventListener(eventName, eventListener)
    }
    return () => {
      if (node) {
        node.removeEventListener(eventName, eventListener)
      }
    }
  }, [eventName, ref, handlerRef])
}
