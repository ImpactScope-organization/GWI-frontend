import { Form, useFormikContext } from 'formik'
import { InputText } from '../../../../../Components/Fields/InputText'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'

export const EditPromptCategoryForm = () => {
  const { submitForm } = useFormikContext()

  return (
    <div className="flex flex-col w-full gap-4 lg:flex-row">
      <Form className="flex flex-col gap-4 w-full">
        <div className="flex w-full gap-4">
          <InputText name="name" label="Name" />
        </div>

        <div className="flex w-full gap-4">
          <SuccessButton onClick={submitForm} icon={<CheckSquareFilled />}>
            Save prompt category
          </SuccessButton>
        </div>
      </Form>
    </div>
  )
}
