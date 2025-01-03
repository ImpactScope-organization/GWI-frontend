import { useEditPromptCategory } from './useEditPromptCategory'
import { ROUTES } from '../../../routes'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { EditPromptCategoryForm } from './components/EditPromptCategoryForm/EditPromptCategoryForm'
import { FormikProvider } from 'formik'

export const EditPromptCategory = () => {
  const { promptCategory, editPromptCategoryFormik } = useEditPromptCategory()

  return (
    <div>
      <TitleWithBackButton title={promptCategory?.name} to={ROUTES.promptCategories.index}>
        <FormikProvider value={editPromptCategoryFormik}>
          <EditPromptCategoryForm />
        </FormikProvider>
      </TitleWithBackButton>
    </div>
  )
}
