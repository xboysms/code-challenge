import { useState } from "react";
import { Link } from "react-router";

const SumToN: React.FC = () => {
  const [n, setN] = useState<number | "">("");
  const [loopResult, setLoopResult] = useState<number | null>(null);
  const [formulaResult, setFormulaResult] = useState<number | null>(null);
  const [recursiveResult, setRecursiveResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Method 1: Iterative Loop
  const sumToNLoop = (num: number): number => {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
      sum += i;
    }
    return sum;
  };

  // Method 2: Mathematical Formula
  const sumToNFormula = (num: number): number => {
    return (num * (num + 1)) / 2;
  };

  // Method 3: Recursive Function
  const sumToNRecursive = (num: number): number => {
    if (num === 1) return 1;
    return num + sumToNRecursive(num - 1);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(Number(value)) && Number(value) > 0)) {
      setN(value === "" ? "" : Number(value));
      setError(""); // Clear error if valid input
    } else {
      setError("⚠️ Please enter a positive number.");
    }
  };

  // Compute sum when button is clicked
  const handleCalculate = () => {
    if (typeof n === "number" && n > 0) {
      setLoopResult(sumToNLoop(n));
      setFormulaResult(sumToNFormula(n));
      setRecursiveResult(sumToNRecursive(n));
    } else {
      setError("⚠️ Please enter a valid positive integer.");
      setLoopResult(null);
      setFormulaResult(null);
      setRecursiveResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex w-full justify-start">
        <Link to="/">Go Back</Link>
      </div>

      <h2 className="text-xl font-bold mb-4">Sum to N Calculator</h2>
      <input
        type="number"
        placeholder="Enter a positive number"
        value={n}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleCalculate}
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        Calculate Sum
      </button>

      {loopResult !== null && formulaResult !== null && recursiveResult !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Results:</h3>
          <p>🔹 <strong>sum_to_n_a Method:</strong> {loopResult}</p>
          <p>🔹 <strong>sum_to_n_b Method:</strong> {formulaResult}</p>
          <p>🔹 <strong>sum_to_n_C Method:</strong> {recursiveResult}</p>
        </div>
      )}
    </div>
  );
};

export default SumToN;