export const ROUTES = {
  login: '/login',
  create: '/create',
  home: '/',
  prompts: {
    index: '/prompts',
    create: '/prompts/create',
    edit: '/prompts/:id/edit'
  },
  reports: {
    internal: '/reports/internal',
    regulator: '/reports/regulator',
    index: '/reports'
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
