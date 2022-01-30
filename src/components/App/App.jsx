import React from 'react';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const App = () => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  function checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка ${result.status}`);
    
  }
  
  const ApiUrl = "https://norma.nomoreparties.space/api/ingredients" 
  React.useEffect(() => {
    fetch(ApiUrl)
      .then(checkResponse)
      .then((result) => {    
        setIsLoaded(true);
        setItems(result.data);})
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      })
  }, [])

  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className={style.app}>
        <AppHeader/>
        <main className={style.main}>
            <div className={style.burgerIngredients}>
              <BurgerIngredients items={items}/>
            </div>
            <div className={style.burgerConstructor}>
              <BurgerConstructor items={items}/>
            </div>
          </main>
      </div>
    );
  }
}

export default App;
