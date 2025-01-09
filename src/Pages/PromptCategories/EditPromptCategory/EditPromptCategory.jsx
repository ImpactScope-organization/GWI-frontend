import { useEditPromptCategory } from './useEditPromptCategory'
import { ROUTES } from '../../../routes'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { EditPromptCategoryForm } from './components/EditPromptCategoryForm/EditPromptCategoryForm'
import { FormikProvider } from 'formik'
import { EditPromptCategoriesChildrenForm } from './components/EditPromptCategoriesChildrenForm/EditPromptCategoriesChildrenForm'
import { Divider } from 'antd'

export const EditPromptCategory = () => {
  const { promptCategory, editPromptCategoryFormik } = useEditPromptCategory()

  return (
    <div>
      <TitleWithBackButton title={promptCategory?.name} to={ROUTES.promptCategories.index}>
        <FormikProvider value={editPromptCategoryFormik}>
          <EditPromptCategoryForm />
        </FormikProvider>
        {promptCategory?.isQuantitative && (
          <>
            <Divider className="my-6" />
            <EditPromptCategoriesChildrenForm />
          </>
        )}
      </TitleWithBackButton>
    </div>
  )
}
