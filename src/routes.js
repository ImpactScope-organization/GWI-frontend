export const ROUTES = {
  reports: '/',
  create: '/create',
  settings: '/settings',
  specificReport: '/specific-report/:id'
}

export const getRouteWithId = (route, id) => {
  if (id) {
    return route.replace(':id', id)
  }
  return route
}
