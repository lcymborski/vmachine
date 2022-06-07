import { useState, useEffect } from 'react'

interface DelayedInterface {
  delay?: number
  children?: React.ReactNode
}

const Delayed = ({ delay = 500, children }: DelayedInterface) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (delay && !visible) {
    return null
  }

  return <>{children}</>
}

export default Delayed
