import jsPDF from 'jspdf'

export const captureScreen = (id = 'report-container', title = '') => {
  const input = document.getElementById(id)
  const doc = new jsPDF({
    unit: 'pt', // Points, to match CSS pixels
    format: 'a4', // Standard page format
    orientation: 'portrait' // or 'landscape' if needed
  })

  doc.html(input, {
    callback: function (doc) {
      if (!title) {
        doc.save('output.pdf')
      } else {
        doc.save(`${title}.pdf`)
      }
    },
    x: 10, // Left margin
    y: 10, // Top margin
    html2canvas: {
      scale: 0.8 // Scale down if the content is too large
    },
    autoPaging: 'text', // Automatically add new pages if content exceeds
    width: 500 // Limit width of content (adjust based on your needs)
  })
}

export const transformArrayOfObjects = (arr) => {
  return arr.map((obj) => {
    const transformedObj = {}

    Object.keys(obj).forEach((key) => {
      const trimmedKey = key.trim() // Trim whitespace from key
      const lowerCaseKey = trimmedKey.toLowerCase() // Convert key to lowercase
      transformedObj[lowerCaseKey] = obj[key]
    })

    return transformedObj
  })
}

export const isValidData = (data) => {
  // Check if the data is a parseable JSON string
  let parsedData
  try {
    parsedData = JSON.parse(data)
  } catch (error) {
    return false // Not parseable
  }

  // Check if the parsed data is either an array or an object
  return Array.isArray(parsedData) || (typeof parsedData === 'object' && parsedData !== null)
}

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
