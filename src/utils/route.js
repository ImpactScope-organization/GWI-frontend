export const getUrlWithParameters = (url, parameters) => {
  let urlWithParameters = url
  Object.keys(parameters).forEach((key) => {
    const regex = new RegExp(`:${key}`, 'g')
    urlWithParameters = urlWithParameters.replace(regex, parameters[key])
  })
  return urlWithParameters
}
