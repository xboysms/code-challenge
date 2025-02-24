import { useState, useEffect } from "react";

interface Prices {
  [currency: string]: number; // Example: { "USD": 1, "ETH": 3500 }
}

// Mock API URL - Replace with the actual endpoint
const API_URL = "https://api.example.com/prices";

const usePrices = () => {
  const [prices, setPrices] = useState<Prices>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch prices");

        const data: { currency: string; price: number }[] = await response.json();
        const priceMap: Prices = {};

        // Transform API response into a dictionary format
        data.forEach(({ currency, price }) => {
          priceMap[currency] = price;
        });

        setPrices(priceMap);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { prices, loading, error };
};

export default usePrices;
