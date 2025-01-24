export const ROUTES = {
  login: '/login',
  home: '/',
  prompts: {
    index: '/prompts',
    create: '/prompts/create',
    edit: '/prompts/:id/edit'
  },
  promptCategories: {
    index: '/prompt-categories',
    create: '/prompt-categories/create',
    edit: '/prompt-categories/:id/edit'
  },
  reports: {
    internal: '/reports/internal',
    regulator: '/reports/regulator',
    processing: '/reports/processing',
    processingDetails: '/reports/processing/:id',
    index: '/reports',
    create: '/reports/create'
  },
  specificReport: {
    index: '/specific-report/:id',
    edit: '/specific-report/:id/edit'
  },
  notFound: '*'
}

export const getRouteWithId = (route, id) => {
  if (id) {
    return route.replace(':id', id)
  }
  return route
}
