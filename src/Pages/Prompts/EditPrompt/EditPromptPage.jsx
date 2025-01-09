import React from 'react'
import { EditPrompt } from './EditPrompt'
import { EditPromptProvider } from './context/EditPromptContext'

export const EditPromptPage = () => (
  <EditPromptProvider>
    <EditPrompt />
  </EditPromptProvider>
)
