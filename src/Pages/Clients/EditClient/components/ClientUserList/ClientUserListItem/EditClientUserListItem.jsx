import React from 'react'
import { InputPassword } from '../../../../../../Components/Fields/InputPassword'
import { useEditClientUserListItem } from './useEditClientUserListItem'
import { Form, FormikProvider } from 'formik'
import { SuccessButton } from '../../../../../../Components/Buttons/SuccessButton'
import { DangerButton } from '../../../../../../Components/Buttons/DangerButton'
import { LabelledText } from '../../../../../../Components/Text/LabelledText'

export const EditClientUserListItem = ({ clientUser }) => {
  const { editClientUserListItemFormik, handleRemoveClientUser, modalContent } =
    useEditClientUserListItem({
      clientUser
    })
  return (
    <FormikProvider value={editClientUserListItemFormik}>
      <Form>
        <div className="flex flex-row gap-4 mb-4">
          <LabelledText label="E-Mail">{editClientUserListItemFormik.values.email}</LabelledText>
          <InputPassword name="password" label="Password" />
          <InputPassword name="passwordAgain" label="Confirm Password" />

          <div className="mt-7 flex gap-4">
            <SuccessButton type="submit">Save</SuccessButton>
            <DangerButton onClick={handleRemoveClientUser}>Remove</DangerButton>
          </div>
        </div>
        {modalContent}
      </Form>
    </FormikProvider>
  )
}
