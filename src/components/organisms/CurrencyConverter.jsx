import React, { useState } from 'react';
import CurrencyInput from '../molecules/CurrencyInput';
import Button from '../atoms/Button';
import '../organisms/CurrencyConvertes.css'; // Asegúrate de tener tus estilos CSS correctamente configurados
import Swal from 'sweetalert2';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [error, setError] = useState(null);
  const [favoriteCurrencies, setFavoriteCurrencies] = useState([]);

  const apiKey = 'fca_live_sMkbTax7HjHL8qLNYE2V24wDDsD4rUmUAlqrvV4O';
  const currencies = ['EUR', 'USD', 'CAD'];

  const handleConvert = async () => {
    setError(null);

    try {
      const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${toCurrency}`);
      
      if (!response.ok) {
        throw new Error('Error en la solicitud de conversión');
      }

      const result = await response.json();
      const rate = result.data[toCurrency];

      const convertedAmount = (amount * rate).toFixed(2);
      showConversionAlert(amount, fromCurrency, convertedAmount, toCurrency);
    } catch (error) {
      setError(error.message);
      showErrorAlert(error.message);
    }
  };

  const showConversionAlert = (amount, fromCurrency, convertedAmount, toCurrency) => {
    Swal.fire({
      title: 'Conversión Realizada',
      html: `<p>${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}</p>`,
      icon: 'success',
      timer: 4000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    });
  };

  const toggleFavoriteCurrency = (currency) => {
    if (favoriteCurrencies.includes(currency)) {
      // Remove from favorites
      setFavoriteCurrencies(favoriteCurrencies.filter(c => c !== currency));
    } else {
      // Add to favorites
      setFavoriteCurrencies([...favoriteCurrencies, currency]);
    }
  };

  const showFavorites = () => {
    Swal.fire({
      title: 'Monedas Favoritas',
      html: `<p>${favoriteCurrencies.join(', ')}</p>`,
      icon: 'info',
    });
  };

  return (
    <div className="currency-converter">
      <div className="converter-section">
        <h1>Conversor de Divisas</h1>
        <CurrencyInput
          label="Cantidad"
          value={amount}
          onChangeValue={(e) => setAmount(e.target.value)}
          currency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          options={currencies}
        />
        <div>
          <label htmlFor="to-currency">Convertir a:</label>
          <select
            id="to-currency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={handleConvert}>Convertir</Button>
        {error && <p className="error-message">Error: {error}</p>}
      </div>

      <div className="favorites-section">
        <h2>Monedas Favoritas</h2>
        <ul className="favorites-list">
          {currencies.map((currency) => (
            <li key={currency}>
              <label>
                <input
                  type="checkbox"
                  checked={favoriteCurrencies.includes(currency)}
                  onChange={() => toggleFavoriteCurrency(currency)}
                />
                {currency}
              </label>
            </li>
          ))}
        </ul>
        <Button onClick={showFavorites}>Ver Favoritos</Button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
