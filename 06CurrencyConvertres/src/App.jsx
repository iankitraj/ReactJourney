import { useEffect, useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";


function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: currencyInfo, loading, error } = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  // Recalculate automatically whenever amount / to / rates change
  useEffect(() => {
    if (!currencyInfo || !currencyInfo[to]) {
      setConvertedAmount(0);
      return;
    }
    const result = Number(amount) * Number(currencyInfo[to]);
    // limit to 4 decimals for display
    setConvertedAmount(Number.isFinite(result) ? +result.toFixed(4) : 0);
  }, [amount, to, currencyInfo]);

  const swap = () => {
    // swap currencies and the amounts shown
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // no-op, conversion happens automatically via useEffect
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)} // ✅ fix
                selectCurrency={from} // ✅ correct
                onAmountChange={(val) => setAmount(val)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
                disabled={loading || options.length === 0}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to} // ✅ was `from` before
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg disabled:opacity-60"
              disabled={loading || options.length === 0}
            >
              {loading
                ? "Loading rates…"
                : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
            </button>

            {error && (
              <p className="mt-2 text-red-700 text-sm">
                Failed to load rates: {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
