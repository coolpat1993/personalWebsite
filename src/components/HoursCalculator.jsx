import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

function calculateHours(hoursString) {
  let hours = hoursString.trim().split(" ");
  hours = hours.slice(1); // remove the name from the beginning of the array
  if (hours.length % 2 !== 0) {
    return "Invalid input: please enter an even number of hours.";
  }
  let totalHours = 0;
  for (let i = 0; i < hours.length; i += 2) {
    totalHours += parseInt(hours[i + 1]) - parseInt(hours[i]);
  }
  return totalHours;
}


function HoursCalculator() {
  const [file, setFile] = useState('./sample.pdf');
  const [numPages, setNumPages] = useState(null);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const [hoursString, setHoursString] = useState("");
  const [totalHours, setTotalHours] = useState(0);

  const handleChange = event => {
    setHoursString(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setTotalHours(calculateHours(hoursString));
  };
  return (
    <>
      {/* <input type="file" accept="application/pdf" onChange={handleFileChange} /> */}

      <form onSubmit={handleSubmit}>
        <label>
          Enter your hours:
          <input type="text" value={hoursString} onChange={handleChange} />
        </label>
        <button type="submit">Calculate</button>
        <p>Total hours: {totalHours}</p>
      </form>
      <div className="Example">
        <header>
          <h1>react-pdf sample page</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>{' '}
            <input onChange={onFileChange} type="file" />
          </div>
          <div className="Example__container__document">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </>
  );
}

export default HoursCalculator;
