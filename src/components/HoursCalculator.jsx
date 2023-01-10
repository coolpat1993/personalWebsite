import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PDFJS from 'pdfjs-dist';


import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

console.log(PDFJS)


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
  const [pdfText, setPdfText] = useState('');

  function onFileChange(event) {
    setFile(event.target.files[0]);
    PDFJS.getDocument(file).promise.then(function (pdfDocument) {
      pdfDocument.getTextContent().then(function (textContent) {
        let text = "";
        textContent.items.forEach(function (item) {
          text += item.str + " ";
        });
        setPdfText(text);
      });
    });
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
        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>{' '}
            <input onChange={onFileChange} type="file" />
          </div>
          <div className="Example__container__document">
            <Document file={file} options={options}>
              {Array.from(new Array(1), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
              {console.log({ options })}
            </Document>
            <div>{pdfText}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HoursCalculator;
