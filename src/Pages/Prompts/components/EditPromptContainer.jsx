import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { DeleteOutlined } from '@ant-design/icons'

export const EditPromptContainer = ({ title, children, onDelete }) => (
  <PageContainer className="pb-10">
    <div className="flex">
      <div className="flex items-top w-full gap-8">
        <BackButtonLink to={ROUTES.prompts.index} />
        <h2 className="text-darkBlack font-bold text-3xl">{title}</h2>
      </div>
      <div>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded flex gap-2 items-center"
        >
          <DeleteOutlined /> Delete
        </button>
      </div>
    </div>
    {children}
  </PageContainer>
)
