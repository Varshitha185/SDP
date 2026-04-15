const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.80,
  JPY: 153.22,
  INR: 83.40,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.92,
  KRW: 1350,
  SGD: 1.34,
  RUB: 90,
};

const currencies = Object.keys(rates);
const converterForm = document.getElementById('converterForm');
const amountInput = document.getElementById('amountInput');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultCard = document.getElementById('resultCard');
const resultText = document.getElementById('resultText');
const errorMessage = document.getElementById('errorMessage');

function populateCurrencyOptions() {
  currencies.forEach((currency) => {
    const optionA = document.createElement('option');
    optionA.value = currency;
    optionA.textContent = currency;

    const optionB = document.createElement('option');
    optionB.value = currency;
    optionB.textContent = currency;

    fromCurrency.appendChild(optionA);
    toCurrency.appendChild(optionB);
  });

  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
}

function convertCurrency(amount, from, to) {
  const fromRate = rates[from];
  const toRate = rates[to];
  return (amount / fromRate) * toRate;
}

function formatAmount(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function showResult(amount, from, to, converted) {
  resultText.textContent = `${formatAmount(amount, from)} → ${formatAmount(converted, to)}`;
  resultCard.classList.remove('hidden');
  errorMessage.textContent = '';
}

function showError(message) {
  errorMessage.textContent = message;
  resultCard.classList.add('hidden');
}

converterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    showError('Enter an amount greater than 0.');
    return;
  }

  if (from === to) {
    showError('Choose two different currencies.');
    return;
  }

  const converted = convertCurrency(amount, from, to);
  showResult(amount, from, to, converted);
});

populateCurrencyOptions();
