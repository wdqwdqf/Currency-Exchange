document.addEventListener('DOMContentLoaded', function() {
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
    const form = document.getElementById('exchange-form');

    function fetchCurrencies() {
      const apiKey = 'YOUR_API_KEY';
      axios.get(`https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`)
        .then(response => {
          const currencies = response.data;
          for (const currency in currencies) {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = `${currency} - ${currencies[currency]}`;
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option.cloneNode(true));
          }
        })
        .catch(error => console.error('Error fetching currencies:', error));
    }

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;
      const amount = parseFloat(amountInput.value);
      if (!isNaN(amount)) {
        axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
          .then(response => {
            const exchangeRates = response.data.rates;
            const exchangeRate = exchangeRates[toCurrency];
            const convertedAmount = amount * exchangeRate;
            resultDiv.textContent = `${amount} ${fromCurrency} equals ${convertedAmount.toFixed(2)} ${toCurrency}`;
          })
          .catch(error => console.error('Error fetching exchange rates:', error));
      } else {
        alert('Please enter a valid amount.');
      }
    });
    fetchCurrencies();
  });
  