import React, { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <select value={selectedOption} onChange={handleSelect}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;