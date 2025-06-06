import { useFormik } from 'formik'
import { loginModalScehma } from '../../validation-schema'
import { toast } from 'react-toastify'
import RequestLoader from './RequestLoader'
import { useAuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { useState } from 'react'
import { getApi } from '../../utils/api'

export const Login = () => {
  const [requestLoading, setRequestLoading] = useState(false)

  const { login } = useAuthContext()

  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: ''
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginModalScehma,

    onSubmit: async (values) => {
      try {
        setRequestLoading(true)

        await (await getApi()).post(`/api/auth/login`, values).then(({ data }) => {
          setRequestLoading(false)
          toast.success('Logged in Successfully')

          login(data?.result)
          navigate(ROUTES.companies.index)
        })
      } catch (err) {
        toast.error(err?.response?.data?.message)
        setRequestLoading(false)
      }
    }
  })

  return (
    <div className="fixed z-20 left-0 top-0 right-0 w-full  overflow-x-hidden overflow-y-auto  h-full bg-white">
      <div className="flex justify-between w-full h-full">
        <div className="hidden md:flex  flex-col bg-[#E3F2DA] w-1/2 gap-4 p-4 ">
          <div className="flex flex-col gap-6 lg:flex-row w-full justify-between h-12">
            <div className="flex gap-x-4">
              <div
                className="flex justify-center items-center px-1 cursor-pointer"
                onClick={() => {
                  window.open('https://astar.network/solutions', '_blank')
                }}
              >
                <img src="./assets/GFIN.svg" alt="logo" className=" " />
              </div>

              <div
                className="flex justify-center items-center px-1 cursor-pointer"
                onClick={() => {
                  window.open('https://astar.network/solutions', '_blank')
                }}
              >
                <img src="./assets/AstrLogo.svg" alt="logo" className=" " />
              </div>
            </div>
            <div
              className="flex flex-col w-32 lg:w-auto cursor-pointer"
              onClick={() => {
                window.open('https://www.insg.ai', '_blank')
              }}
            >
              <img src="./assets/AILogo.svg" alt="logo" className=" " />
            </div>
          </div>
          <div className="flex  w-full h-full p-20">
            <img src="./assets/login_sideImage.png" alt="logo" className="" />
          </div>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/2 h-full">
          <div
            //   onSubmit={handleSubmit}
            className="w-[70%] "
          >
            <div className="">
              <div className="flex justify-center items-center ">
                <img src="./assets/__logo.png" alt="logo" className="w-[80px]" />
                <div className="ml-[10px]">
                  <h1 className="text-lg font-bold leading-5">
                    Greenwashing <br /> Identifier
                  </h1>
                  <p className="text-sm text-reportGrey ">By ImpactScope</p>
                </div>
              </div>
              <h3 className="text-darkblue mt-8 text-2xl sm:text-3xl md:text-4xl font-[700] text-center leading-[48px]">
                Welcome to GWI Admin
              </h3>

              <p className="font-BalsamiqSans text-center text-reportGrey text-lg mt-3 ">
                Sign in to get started
              </p>
              {/* <div className="flex flex-col h-20 rounded-xl p-4  bg-[#FFF9D9] mt-10">
             <p className="text-base text-[#181E2F]">Login:<span className="font-bold"> Demo</span></p> 
             <p className="text-base text-[#181E2F]">Password:<span className="font-bold"> Demo</span></p>
            </div> */}
            </div>

            <form onSubmit={handleSubmit} className="w-full mt-5 space-y-3">
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                className="p-4 bg-[#f5f4f4] rounded-lg border-none focus:outline-none w-full"
              />

              {errors.email && touched.email ? (
                <p className="text-sm text-[#ff0000]">{errors.email}</p>
              ) : null}

              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                className="p-4 bg-[#f5f4f4] border-none rounded-lg focus:outline-none w-full"
              />
              {errors.password && touched.password ? (
                <p className="text-sm  text-[#ff0000]">{errors.password}</p>
              ) : null}

              <div className="!mt-10">
                <button
                  type="submit"
                  //   onClick={openToggle === false ? onClick : null}
                  //   disabled={loading}
                  // disabled={loading}
                  className="bg-primary cursor-pointer w-full relative h-[64px]  text-white text-center  rounded-md  py-3 text-lg font-medium"
                >
                  {requestLoading ? <RequestLoader /> : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  )
}
