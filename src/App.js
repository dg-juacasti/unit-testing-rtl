import { useCallback, useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [data, setData] = useState(null);
  const refetch = useFetch();
  const onFetchDataClick = useCallback(async () => {
    const data = await refetch();
    setData(data);
  }, []);

  return (
    <div className="App">
      <div className="App-container">
        <h1>Unit testing rtl</h1>

        <div className="button-container">
          <button onClick={onFetchDataClick} className="button">
            Fetch data
          </button>
        </div>
        {data && (
          <div>
            <img
              width="150"
              src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"
            />
            <p>{data.value}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
