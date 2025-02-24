import { useState, useEffect } from "react";
import { Link } from "react-router";

const CurrencySwapForm: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [amountError, setAmountError] = useState(""); // Separate error for input validation

  // Fetch exchange rates from API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch("https://interview.switcheo.com/prices.json");
        if (!response.ok) throw new Error("Failed to fetch exchange rates");
        const data = await response.json();

        // Transform API response into a dictionary format
        const rates: Record<string, number> = {};
        data.forEach(({ currency, price }: { currency: string; price: number }) => {
          rates[currency] = price;
        });

        setExchangeRates(rates);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  // Validate input amount
  const validateInput = (value: string) => {
    if (!value) return "⚠️ Amount is required.";
    if (isNaN(Number(value)) || Number(value) <= 0) return "⚠️ Enter a valid positive number.";
    return "";
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setAmountError(validateInput(value)); // Update inline validation message
  };

  // Handle Swap
  const handleSwap = () => {
    const validationError = validateInput(amount);
    if (validationError) {
      setAmountError(validationError);
      return;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setError("⚠️ Exchange rates not available. Try again later.");
      return;
    }

    // Calculate conversion
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const conversionRate = toRate / fromRate;
    setConvertedAmount(Number(amount) * conversionRate);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex w-full justify-start">
        <Link to="/" className="hover:text-amber-300">Go Back</Link>
      </div>

      <h2 className="text-xl font-bold mb-4">Currency Swap</h2>
      {loading && <p className="text-blue-500">Loading exchange rates...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
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
            className={`border p-2 rounded w-full mb-1 ${
              amountError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {amountError && <p className="text-red-500 text-sm mb-2">{amountError}</p>}

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className={`w-full py-2 rounded-lg text-white ${
              amountError || !amount ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={!!amountError || !amount}
          >
            Swap
          </button>

          {/* Converted Amount Display */}
          {convertedAmount !== null && (
            <p className="mt-3 text-center text-lg font-semibold">
              Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CurrencySwapForm;
