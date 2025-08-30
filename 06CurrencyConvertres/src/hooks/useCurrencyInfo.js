import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!baseCurrency) return;

        setLoading(true);
        setError(null);

        fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                if (json.result === "success") {
                    setData(json.rates);
                } else {
                    throw new Error(json["error-type"] || "API Error");
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [baseCurrency]);

    return { data, loading, error };
}

export default useCurrencyInfo;
