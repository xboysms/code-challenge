import { useMemo } from "react";
import classes from "./styles.module.css"; // Adjust the path as necessary
import WalletRow from "./WalletRow";
import useWalletBalances from "./UseWalletBallance";
import usePrices from "./UsePrice";
import { Link } from "react-router";

// Define supported blockchain types
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props {
  children?: React.ReactNode;
}

const priorityMap: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain): number =>
  priorityMap[blockchain] ?? -99;

interface Prices {
  [currency: string]: number;
}
const { prices }: { prices: Prices } = usePrices();
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances: { balances: any } = useWalletBalances();
  const { prices }: { prices: Prices } = usePrices();

  // Memoize sortedBalances
  const sortedBalances = useMemo(() => {
    return balances.balances
      .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)); // Single sort function
  }, [balances]);

  // Memoize formatted balances
  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: any) => ({
      ...balance,
      formatted: balance.amount.toFixed(2), // Ensure 2 decimal places
    }));
  }, [sortedBalances]);

  // Map to JSX elements
  const rows = useMemo(() => {
    return formattedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue: number = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency} // Use a stable unique key
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return (
    <div>
      {/* <div {...rest}>{rows}</div> */}
      <Link to="/" className="hover:text-amber-300">Go Back</Link>

      <h1 className="text-2xl font-semibold text-gray-800">Problem 5: A Crude Server</h1>
      <p className="mt-2 text-gray-600">Please run this server on a seperate project.</p>
    </div>
  );
};

export default WalletPage;