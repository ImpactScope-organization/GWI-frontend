import { useEditPromptCategory } from './useEditPromptCategory'
import { ROUTES } from '../../../routes'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { PromptCategoryForm } from '../components/PromptCategoryForm/PromptCategoryForm'
import { FormikProvider } from 'formik'
import { EditPromptSubCategoriesForm } from './components/EditPromptSubCategoriesForm/EditPromptSubCategoriesForm'
import { Divider } from 'antd'

export const EditPromptCategory = () => {
  const { promptCategory, editPromptCategoryFormik } = useEditPromptCategory()

  return (
    <TitleWithBackButton title={promptCategory?.name} to={ROUTES.promptCategories.index}>
      <FormikProvider value={editPromptCategoryFormik}>
        <PromptCategoryForm />
      </FormikProvider>
      {promptCategory?.isQuantitative && (
        <>
          <Divider className="my-6" />
          <EditPromptSubCategoriesForm />
        </>
      )}
    </TitleWithBackButton>
  )
}
