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
import { Button } from 'antd'
import { InfoButton } from '../../../Components/Buttons/InfoButton'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'

export const CreatePrompt = () => {
  const { formik } = useCreatePrompt()

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
              Create prompt
            </SuccessButton>
            <InfoButton icon={<ExperimentOutlined />}>Test prompt</InfoButton>
          </div>
        </form>
        <div className="w-full">
          <span className="text-md text-darkBlack mb-1 font-semibold block">Output</span>
          <div className="w-full h-full bg-[#f5f4f4] rounded-md border border-[#d9d9d9] p-4 overflow-y-scroll">
            Run a test to have output
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
