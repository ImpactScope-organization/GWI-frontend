import { InfoButton } from '../../../../Components/Buttons/InfoButton'
import { CheckSquareOutlined } from '@ant-design/icons'
import React from 'react'
import { useEditPrompt } from '../../EditPrompt/context/EditPromptContext'
import { Tag } from 'antd'

export const SetAsCategoryDefaultPromptButton = () => {
  const { handleSetAsCategoryDefault, prompt } = useEditPrompt()

  return (
    <>
      {prompt?.isDefaultPrompt && (
        <div>
          <Tag className="p-4 gap-2 flex text-sm" color="success">
            <CheckSquareOutlined />
            Category default prompt
          </Tag>
        </div>
      )}
      {!prompt?.isDefaultPrompt && (
        <InfoButton icon={<CheckSquareOutlined />} onClick={handleSetAsCategoryDefault}>
          Set as category default prompt
        </InfoButton>
      )}
    </>
  )
}
