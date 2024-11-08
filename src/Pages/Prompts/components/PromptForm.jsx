import { Form, useFormikContext } from 'formik'
import { InputText } from '../../../Components/Fields/InputText'
import { CategorySelect } from './CategorySelect/CategorySelect'
import { InputTextarea } from '../../../Components/Fields/InputTextarea/InputTextarea'
import { FileInput } from '../../../Components/Fields/FileInput'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled, ExperimentOutlined } from '@ant-design/icons'
import { InfoButton } from '../../../Components/Buttons/InfoButton'
import { PromptOutput } from './PromptOutput'
import React from 'react'
import { UnEditableFileInput } from '../../../Components/Fields/UnEditableFileInput'

export const PromptForm = ({ handleTest, output, edit = false }) => {
  const { submitForm, values } = useFormikContext()

  return (
    <div className="flex flex-col w-full gap-4 lg:flex-row">
      <Form className="flex flex-col gap-4 w-full">
        <div className="flex w-full gap-4">
          <InputText name="name" label="Name" />
          <CategorySelect name="category" />
        </div>
        <InputTextarea name="prompt" label="Prompt" />
        {edit ? <UnEditableFileInput name="file" /> : <FileInput name="file" />}

        <div className="flex w-full gap-4">
          <SuccessButton onClick={submitForm} icon={<CheckSquareFilled />}>
            Save prompt
          </SuccessButton>
          <InfoButton
            icon={<ExperimentOutlined />}
            onClick={async () => {
              await handleTest(values)
            }}
          >
            Test prompt
          </InfoButton>
        </div>
      </Form>
      <PromptOutput output={output} />
    </div>
  )
}
