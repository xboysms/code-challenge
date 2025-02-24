import { useState, useEffect } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

// Mock API URL - Replace with the actual endpoint
const API_URL = "https://api.example.com/wallet-balances";

const useWalletBalances = () => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch wallet balances");

        const data: WalletBalance[] = await response.json();
        setBalances(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  return { balances, loading, error };
};

export default useWalletBalances;
