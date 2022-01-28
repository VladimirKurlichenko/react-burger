import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const App = () => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  
  const ApiUrl = "https://norma.nomoreparties.space/api/ingredients" 
  React.useEffect(() => {
    fetch(ApiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          console.log(items)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="app">
        <AppHeader/>
        <main className='main'>
            <div className='BurgerIngredients'>
              <BurgerIngredients items={items}/>
            </div>
            <div className='BurgerConstructor'>
              <BurgerConstructor items={items}/>
            </div>
          </main>
      </div>
    );
  }
}

export default App;
