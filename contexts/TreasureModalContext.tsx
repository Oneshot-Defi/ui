import { createContext, useState } from 'react'

const OneshotModalContext = createContext({
  isShowing: false,
  toggle: () => {},
})

export const OneshotModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false)

  const toggle = () => {
    setIsShowing(!isShowing)
  }

  return (
    <OneshotModalContext.Provider value={{ isShowing, toggle }}>
      {children}
    </OneshotModalContext.Provider>
  )
}

export { OneshotModalContext }
