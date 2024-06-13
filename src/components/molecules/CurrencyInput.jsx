import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

const CurrencyInput = ({ label, value, onChangeValue, currency, onChangeCurrency, options }) => {
  return (
    <div>
      <Label text={label} />
      <Input value={value} onChange={onChangeValue} placeholder="Ingrese la cantidad" />
      <Select options={options} value={currency} onChange={onChangeCurrency} />
    </div>
  );
};

export default CurrencyInput;
