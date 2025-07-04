import React from 'react'
import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'
import { Comment } from './components/Comment'
import { DynamicTextarea } from '../../../SpecificReportEdit/components/DynamicTextarea/DynamicTextarea'
import { useCaseCommentary } from './useCaseCommentary'
import { Form, FormikProvider } from 'formik'
import { SuccessButton } from '../../../../../../../Components/Buttons/SuccessButton'

export const CaseCommentary = () => {
  const { comments, caseCommentaryFormik } = useCaseCommentary()

  return (
    <ReportDetailsCard title="Case Commentary">
      <div className="flex gap-4 flex-col">
        <div className="flex gap-2 flex-col bg-gray-50 rounded-md p-2">
          {comments && comments.length > 0 ? (
            comments.map((comment) => <Comment key={comment._id} comment={comment} />)
          ) : (
            <div className="text-gray-500">No comments added yet.</div>
          )}
        </div>

        <FormikProvider value={caseCommentaryFormik}>
          <Form>
            <div className="flex gap-4 flex-col">
              <DynamicTextarea label="Comment" name="comment" />
              <SuccessButton isLoading={caseCommentaryFormik.isSubmitting} type="submit">
                Add Comment
              </SuccessButton>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </ReportDetailsCard>
  )
}
