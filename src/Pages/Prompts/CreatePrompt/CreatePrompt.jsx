import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { useCreatePrompt } from './useCreatePrompt'

export const CreatePrompt = () => {
  const { formik } = useCreatePrompt()

  return (
    <PageContainer className="pb-10">
      <div className="flex items-top w-full gap-8">
        <BackButtonLink to={ROUTES.reports.internal} />
        <h2 className="text-darkBlack font-bold text-3xl">Create new prompt</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="" label="Select category" />
            <option value="example1@example.com" label="example1@example.com" />
            <option value="example2@example.com" label="example2@example.com" />
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div>{formik.errors.category}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="prompt">Prompt</label>
          <textarea
            id="prompt"
            name="prompt"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.prompt}
          />
          {formik.touched.prompt && formik.errors.prompt ? <div>{formik.errors.prompt}</div> : null}
        </div>

        <div>
          <label htmlFor="file">File</label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={(event) => {
              formik.setFieldValue('file', event.currentTarget.files[0])
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.file && formik.errors.file ? <div>{formik.errors.file}</div> : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </PageContainer>
  )
}
