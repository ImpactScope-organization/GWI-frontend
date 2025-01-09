import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons'
import { DangerButton } from '../../../Components/Buttons/DangerButton'
import { InfoButton } from '../../../Components/Buttons/InfoButton'
import { useEditPrompt } from '../EditPrompt/context/EditPromptContext'

export const EditPromptContainer = ({ children }) => {
  const { formik, handleDelete, handleSetAsCategoryDefault } = useEditPrompt()

  return (
    <PageContainer className="pb-10">
      <div className="flex">
        <div className="flex items-top w-full gap-8">
          <BackButtonLink to={ROUTES.prompts.index} />
          <h2 className="text-darkBlack font-bold text-3xl">{formik.values?.name}</h2>
        </div>
        <div className="flex gap-2">
          <InfoButton onClick={handleSetAsCategoryDefault}>
            <CheckSquareOutlined /> Set as category default
          </InfoButton>
          <DangerButton onClick={handleDelete}>
            <DeleteOutlined /> Delete
          </DangerButton>
        </div>
      </div>
      {children}
    </PageContainer>
  )
}
