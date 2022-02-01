import { useContext } from 'react'
import { OneshotModalContext } from '../contexts/OneshotModalContext'

const useOneshotModal = () => useContext(OneshotModalContext)

export default useOneshotModal
