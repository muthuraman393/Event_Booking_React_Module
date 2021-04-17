import { useState, useEffect } from "react";
import cache from "../../cache";
const useFetch = (url, opts) => {
  console.log("useFetch called");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (cache[url]) {
      console.log("loaded from cache", cache);
      const data = cache[url];
      setResponse(data);
      setLoading(false);
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setResponse(result.events);
          cache[url] = result.events;
          setLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false);
        });
    }
  }, [url]);
  return [response, loading, hasError, setResponse];
};
export default useFetch;
