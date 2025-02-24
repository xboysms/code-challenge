import { useState } from "react";

const CurrencySwapForm = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState("");

  // Mock exchange rates (you can replace this with an API call)
  const exchangeRates: { [key: string]: { [key: string]: number } } = { 
    USD: { EUR: 0.92, GBP: 0.79 }, 
    EUR: { USD: 1.09, GBP: 0.86 }, 
    GBP: { USD: 1.26, EUR: 1.16 } 
  };

  const validateInput = (value: any) => {
    if (!value) {
      setError("Amount is required.");
      return false;
    }
    if (isNaN(value) || value <= 0) {
      setError("Please enter a valid positive number.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAmountChange = (e: any) => {
    const value = e.target.value;
    setAmount(value);
    validateInput(value);
  };

  const handleSwap = () => {
    if (!validateInput(amount)) return;
    
    const rate = exchangeRates[fromCurrency][toCurrency] || 1;
    setConvertedAmount(parseFloat((parseFloat(amount) * rate).toFixed(2)));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Currency Swap</h2>

      {/* Currency Selectors */}
      <div className="flex items-center mb-3">
        <select 
          value={fromCurrency} 
          onChange={(e) => setFromCurrency(e.target.value)} 
          className="border p-2 rounded w-1/2"
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span className="mx-2 text-gray-600">➡</span>
        <select 
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)} 
          className="border p-2 rounded w-1/2"
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <input 
        type="number" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={handleAmountChange} 
        className={`border p-2 rounded w-full mb-2 ${error ? "border-red-500" : "border-gray-300"}`} 
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Swap Button */}
      <button 
        onClick={handleSwap} 
        className={`w-full py-2 rounded-lg text-white ${
          error || !amount ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={!!error || !amount}
      >
        Swap
      </button>

      {/* Converted Amount Display */}
      {convertedAmount > 0 && (
        <p className="mt-3 text-center text-lg font-semibold">
          Converted Amount: {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencySwapForm;
