import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

interface TransitionInterface {
  nodeRef: any
  show: any
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
  appear?: boolean
  children?: React.ReactNode
}

const addClasses = (node: any, classes: string) => {
  if (typeof classes === 'string') {
    node.classList.add(...classes.split(' ').filter((s) => s.length))
  }
}

const removeClasses = (node: any, classes: string) => {
  if (typeof classes === 'string') {
    node.classList.remove(...classes.split(' ').filter((s) => s.length))
  }
}

const Transition = ({
  nodeRef,
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear = false,
  children,
}: TransitionInterface) => (
  <ReactCSSTransition
    nodeRef={nodeRef}
    appear={appear}
    unmountOnExit
    in={show}
    addEndListener={(done: any) => {
      nodeRef.current.addEventListener('transitionend', done, false)
    }}
    onEnter={() => {
      addClasses(nodeRef.current, `${enter} ${enterFrom}`)
    }}
    onEntering={() => {
      removeClasses(nodeRef.current, enterFrom)
      addClasses(nodeRef.current, enterTo)
    }}
    onEntered={() => {
      removeClasses(nodeRef.current, `${enterTo} ${enter}`)
    }}
    onExit={() => {
      addClasses(nodeRef.current, `${leave} ${leaveFrom}`)
    }}
    onExiting={() => {
      removeClasses(nodeRef.current, leaveFrom)
      addClasses(nodeRef.current, leaveTo)
    }}
    onExited={() => {
      removeClasses(nodeRef.current, `${leaveTo} ${leave}`)
    }}
  >
    {children}
  </ReactCSSTransition>
)

export default Transition
