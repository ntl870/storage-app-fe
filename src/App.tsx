import "./App.css";
import { useState } from "react";
import { useLoginMutation } from "./generated/schemas";
import "antd/dist/reset.css";

function App() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();
  return (
    <div className="App">
      <div>
        <input
          placeholder="Email"
          onChange={(e) => {
            setState({
              ...state,
              email: e.target.value,
            });
          }}
        />

        <input
          placeholder="Password"
          onChange={(e) => {
            setState({
              ...state,
              password: e.target.value,
            });
          }}
        />

        <button
          onClick={async () => {
            const { data } = await login({
              variables: state,
            });
            localStorage.setItem("token", String(data?.login));
          }}
        >
          login
        </button>
      </div>
    </div>
  );
}

export default App;
