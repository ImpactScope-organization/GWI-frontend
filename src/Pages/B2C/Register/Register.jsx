import { AuthPageContainer } from '../../../Components/Page/AuthPageContainer/AuthPageContainer'
import { useRegister } from './useRegister'
import { InputText } from '../../../Components/Fields/InputText'
import { Form, FormikProvider } from 'formik'
import { InputPassword } from '../../../Components/Fields/InputPassword'
import { FilledSuccessButton } from '../../../Components/Buttons/FilledSuccessButton'
import { InputB2CRole } from '../../../Components/Fields/InputB2CRole/InputB2CRole'

export const Register = () => {
  const { registerFormik, isLoading } = useRegister()

  return (
    <AuthPageContainer subTitle="Sign up and let's get started">
      <FormikProvider value={registerFormik}>
        <Form>
          <div className="w-full mt-5 space-y-5">
            <InputText name="name" label="Name" />
            <InputText name="email" label="E-mail" />
            <InputPassword name="password" label="Password" />
            <InputPassword name="passwordAgain" label="Password Again" />
            <InputB2CRole name="b2cRole" />
            <FilledSuccessButton type="submit" isLoading={isLoading}>
              Sign up
            </FilledSuccessButton>
          </div>
        </Form>
      </FormikProvider>
    </AuthPageContainer>
  )
}
