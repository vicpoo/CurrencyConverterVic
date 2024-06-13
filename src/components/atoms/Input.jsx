import React from 'react';

const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
