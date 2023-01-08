import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Enter your hours:
        <input type="text" value={hoursString} onChange={handleChange} />
      </label>
      <button type="submit">Calculate</button>
      <p>Total hours: {totalHours}</p>
    </form>
  );
}

export default HoursCalculator;
