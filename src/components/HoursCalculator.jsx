import React, { useState } from "react";
import pdfjs from 'pdfjs-dist/webpack';

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
  const [pdfText, setPdfText] = useState('');

  const handleFileInput = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const pdfData = new Uint8Array(e.target.result);
      const pdf = await pdfjs.getDocument(pdfData).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      setPdfText(textContent.items.map((item) => item.str).join(''));
    };
    reader.readAsArrayBuffer(file);
  };


  const [hoursString, setHoursString] = useState("");
  const [totalHours, setTotalHours] = useState(0);

  const handleChange = event => {
    setHoursString(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setTotalHours(calculateHours(hoursString));
  };
  console.log(pdfText)
  return (
    <>
      <input type="file" onChange={handleFileInput} accept="application/pdf" />
      <div>{pdfText}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your hours:
          <input type="text" value={hoursString} onChange={handleChange} />
        </label>
        <button type="submit">Calculate</button>
        <p>Total hours: {totalHours}</p>
      </form>
    </>
  );
}

export default HoursCalculator;
