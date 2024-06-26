import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const captureScreen = (id = "report-container") => {
  const input = document.getElementById(id); // Replace 'capture' with your element ID to capture

  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Get the screenshot data as a base64 encoded image

      const pdf = new jsPDF();
      const imgWidth = 210; // Width of the PDF document (A4 size)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height based on aspect ratio
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Report.pdf"); // Save the PDF with a specific name

      // Optionally, you can also open the PDF in a new tab:
      // pdf.output('dataurlnewwindow');

      // For demo purposes, you can also append the image to the document:
      // document.body.appendChild(canvas);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const transformArrayOfObjects = (arr) => {
  return arr.map((obj) => {
    const transformedObj = {};

    Object.keys(obj).forEach((key) => {
      const trimmedKey = key.trim(); // Trim whitespace from key
      const lowerCaseKey = trimmedKey.toLowerCase(); // Convert key to lowercase
      transformedObj[lowerCaseKey] = obj[key];
    });

    return transformedObj;
  });
};

export const isValidData = (data) => {
  // Check if the data is a parseable JSON string
  let parsedData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    return false; // Not parseable
  }

  // Check if the parsed data is either an array or an object
  return (
    Array.isArray(parsedData) ||
    (typeof parsedData === "object" && parsedData !== null)
  );
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
