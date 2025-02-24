interface WalletRowProps {
    amount: number;
    usdValue: number;
    formattedAmount: string;
    className?: string;
  }
  
  const WalletRow: React.FC<WalletRowProps> = ({ amount, usdValue, formattedAmount, className }) => {
    return (
      <div className={`flex justify-between items-center p-3 border-b ${className}`}>
        <span className="font-medium">{formattedAmount}</span>
        <span className="text-gray-500">${usdValue.toFixed(2)}</span>
      </div>
    );
  };
  
  export default WalletRow;  