import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { useCreatePrompt } from './useCreatePrompt'
import { InputText } from '../../../Components/Fields/InputText'
import { InputTextarea } from '../../../Components/Fields/InputTextarea'
import { CategorySelect } from '../../../Components/Fields/CategorySelect'
import { FileInput } from '../../../Components/Fields/FileInput'

export const CreatePrompt = () => {
  const { formik } = useCreatePrompt()

  return (
    <PageContainer className="pb-10">
      <div className="flex items-top w-full gap-8">
        <BackButtonLink to={ROUTES.reports.internal} />
        <h2 className="text-darkBlack font-bold text-3xl">Create new prompt</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex w-full gap-2">
          <InputText formik={formik} name="name" label="Name" />
          <CategorySelect formik={formik} name="category" />
        </div>
        <InputTextarea formik={formik} name="prompt" label="Prompt" />
        <FileInput formik={formik} name="file" />

        <button type="submit">Submit</button>
      </form>
    </PageContainer>
  )
}
