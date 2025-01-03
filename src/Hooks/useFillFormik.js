import { useCallback, useEffect, useRef, useState } from 'react'

export const useFillFormik = (formik, query) => {
  const [isFormikFilled, setIsFormikFilled] = useState(false)

  const formikRef = useRef(formik)

  useEffect(() => {
    if (query && !isFormikFilled) {
      formikRef.current.setValues(query)

      setIsFormikFilled(true)
    }
  }, [formikRef, isFormikFilled, query])

  const resetFormikFilled = useCallback(() => {
    setIsFormikFilled(false)
  }, [])

  return {
    resetFormikFilled,
    isFormikFilled
  }
}
