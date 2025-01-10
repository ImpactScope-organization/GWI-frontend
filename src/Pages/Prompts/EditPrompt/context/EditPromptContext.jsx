import React, { createContext, useContext } from 'react'
import { useEditPromptValues as useEditPromptHook } from './useEditPromptValues'

const EditPromptContext = createContext({
  output: '',
  handleTest: () => {},
  formik: {},
  isFormikFilled: false,
  handleDelete: () => {},
  modalContent: '',
  handleSetAsCategoryDefault: () => {}
})

export const EditPromptProvider = ({ children }) => {
  const editPrompt = useEditPromptHook()
  return <EditPromptContext.Provider value={editPrompt}>{children}</EditPromptContext.Provider>
}

export const useEditPrompt = () => {
  return useContext(EditPromptContext)
}
