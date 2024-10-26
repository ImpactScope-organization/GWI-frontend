import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { useCreatePrompt } from './useCreatePrompt'
import { InputText } from '../../../Components/Fields/InputText'
import { InputTextarea } from '../../../Components/Fields/InputTextarea'
import { CategorySelect } from './components/CategorySelect/CategorySelect'
import { FileInput } from '../../../Components/Fields/FileInput'
import { CheckSquareFilled, ExperimentOutlined } from '@ant-design/icons'
import { InfoButton } from '../../../Components/Buttons/InfoButton'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { PromptOutput } from './components/PromptOutput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

export const CreatePrompt = () => {
  const { output, handleSubmit, handleTest } = useCreatePrompt()

  return (
    <PageContainer className="pb-10">
      <div className="flex items-top w-full gap-8">
        <BackButtonLink to={ROUTES.reports.internal} />
        <h2 className="text-darkBlack font-bold text-3xl">Create new prompt</h2>
      </div>
      <Formik
        initialValues={{
          name: '',
          category: '',
          prompt: '',
          file: null
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          category: Yup.string().required('Category is required'),
          prompt: Yup.string().required('Prompt is required'),
          file: Yup.mixed().required('File is required')
        })}
        onSubmit={async (values) => {
          await handleSubmit(values)
        }}
      >
        {({ submitForm, values }) => (
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            <Form className="flex flex-col gap-4 w-full">
              <div className="flex w-full gap-4">
                <InputText name="name" label="Name" />
                <CategorySelect name="category" />
              </div>
              <InputTextarea name="prompt" label="Prompt" />
              <FileInput name="file" />

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
        )}
      </Formik>
    </PageContainer>
  )
}
