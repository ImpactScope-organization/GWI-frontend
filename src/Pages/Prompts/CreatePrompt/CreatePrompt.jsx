import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { useCreatePrompt } from './useCreatePrompt'
import { InputText } from '../../../Components/Fields/InputText'
import { InputTextarea } from '../../../Components/Fields/InputTextarea'
import { CategorySelect } from '../../../Components/Fields/CategorySelect'
import { FileInput } from '../../../Components/Fields/FileInput'
import { CheckSquareFilled, ExperimentOutlined } from '@ant-design/icons'
import { InfoButton } from '../../../Components/Buttons/InfoButton'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { PromptOutput } from './PromptOutput'

export const CreatePrompt = () => {
  const { formik, output } = useCreatePrompt()

  return (
    <PageContainer className="pb-10">
      <div className="flex items-top w-full gap-8">
        <BackButtonLink to={ROUTES.reports.internal} />
        <h2 className="text-darkBlack font-bold text-3xl">Create new prompt</h2>
      </div>
      <div className="flex flex-col w-full gap-4 lg:flex-row">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex w-full gap-4">
            <InputText formik={formik} name="name" label="Name" />
            <CategorySelect formik={formik} name="category" />
          </div>
          <InputTextarea formik={formik} name="prompt" label="Prompt" />
          <FileInput formik={formik} name="file" />

          <div className="flex w-full gap-4">
            <SuccessButton onClick={formik.submitForm} icon={<CheckSquareFilled />}>
              Save prompt
            </SuccessButton>
            <InfoButton icon={<ExperimentOutlined />}>Test prompt</InfoButton>
          </div>
        </form>
        <PromptOutput output={output} />
      </div>
    </PageContainer>
  )
}
