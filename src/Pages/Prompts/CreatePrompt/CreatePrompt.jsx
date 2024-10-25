import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { useCreatePrompt } from './useCreatePrompt'
import { InputText } from '../../../Components/Fields/InputText'
import { InputTextarea } from '../../../Components/Fields/InputTextarea'
import { CategorySelect } from './components/CategorySelect/CategorySelect'

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

        <div>
          <label htmlFor="file">File</label>
          <input
            id="file"
            name="file"
            type="file"
            multiple={false}
            onChange={(event) => {
              formik.setFieldValue('file', event.currentTarget.files[0])
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.file && formik.errors.file ? <div>{formik.errors.file}</div> : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </PageContainer>
  )
}
