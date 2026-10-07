import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Page badalda sadhai page ko suruwat (mathi) bata dekhaune
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}