export const ROUTES = {
  reports: '/',
  create: '/create',
  settings: '/settings',
  specificReport: {
    index: '/specific-report/:id',
    edit: '/specific-report/:id/edit'
  }
}

export const getRouteWithId = (route, id) => {
  if (id) {
    return route.replace(':id', id)
  }
  return route
}
