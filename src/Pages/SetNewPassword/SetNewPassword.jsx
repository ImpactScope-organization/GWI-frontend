import { AuthPageContainer } from '../../Components/Page/AuthPageContainer/AuthPageContainer'
import { Form, FormikProvider } from 'formik'
import { FilledSuccessButton } from '../../Components/Buttons/FilledSuccessButton'
import { useSetNewPassword } from './useSetNewPassword'
import { InputPassword } from '../../Components/Fields/InputPassword'

export const SetNewPassword = () => {
  const { setNewPasswordFormik, isLoading } = useSetNewPassword()

  return (
    <AuthPageContainer subTitle="Type your new password below">
      <FormikProvider value={setNewPasswordFormik}>
        <Form>
          <div className="w-full mt-5 space-y-5">
            <InputPassword name="password" label="Password" />
            <InputPassword name="passwordAgain" label="Confirm Password" />
            <FilledSuccessButton type="submit" isLoading={isLoading}>
              Set New Password
            </FilledSuccessButton>
          </div>
        </Form>
      </FormikProvider>
    </AuthPageContainer>
  )
}
