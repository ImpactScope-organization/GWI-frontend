import { ROUTES } from '../../../routes'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { PromptCategoryForm } from '../components/PromptCategoryForm/PromptCategoryForm'
import { FormikProvider } from 'formik'
import { useCreatePromptCategory } from '../components/PromptCategoryForm/useCreatePromptCategory'

export const CreatePromptCategory = () => {
  const { createPromptCategoryFormik } = useCreatePromptCategory()

  return (
    <TitleWithBackButton title="New Prompt Category" to={ROUTES.promptCategories.index}>
      <FormikProvider value={createPromptCategoryFormik}>
        <PromptCategoryForm />
      </FormikProvider>
    </TitleWithBackButton>
  )
}
