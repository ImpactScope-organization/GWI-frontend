export const ROUTES = {
  login: '/login',
  verifyEmail: '/verify-email',
  forgotPassword: '/forgot-password',
  setNewPassword: '/set-new-password',
  confirmPayment: '/confirm-payment',
  b2c: {
    index: '/b2c',
    register: '/b2c/register'
  },
  home: '/',
  prompts: {
    index: '/prompts',
    create: '/prompts/create',
    edit: '/prompts/:id/edit'
  },
  clients: {
    index: '/clients',
    create: '/clients/create',
    edit: '/clients/:clientId/edit'
  },
  companies: {
    index: '/companies',
    create: '/companies/create',
    edit: '/companies/:companyId/edit',
    reports: {
      internal: '/companies/:companyId/reports/internal',
      regulator: '/companies/:companyId/reports/regulator',
      processing: '/companies/:companyId/reports/processing',
      processingDetails: '/companies/:companyId/reports/processing/:reportQueueId',
      index: '/companies/:companyId/reports',
      create: {
        manual: '/companies/:companyId/reports/create/manual',
        document: '/companies/:companyId/reports/create/document'
      },
      report: {
        index: '/companies/:companyId/reports/:reportId',
        edit: '/companies/:companyId/reports/:reportId/edit'
      }
    }
  },
  promptCategories: {
    index: '/prompt-categories',
    create: '/prompt-categories/create',
    edit: '/prompt-categories/:id/edit'
  },
  notFound: '*'
}

export const getRouteWithId = (route, id) => {
  if (id) {
    return route.replace(':id', id)
  }
  return route
}

export const getRouteWithParams = (route, paramGroup) => {
  for (const key of Object.keys(paramGroup)) {
    route = route.replace(`:${key}`, paramGroup[key])
  }
  return route
}
