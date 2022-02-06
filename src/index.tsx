import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {Data, DataIngredients} from "./utils/data"

function Main() {
  const [items, setItems] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);
  return(
    <DataIngredients.Provider value={{ingredients, setIngredients}}>
      <Data.Provider value={{items, setItems}}>
      <App />
    </Data.Provider>
    </DataIngredients.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
