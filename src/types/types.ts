export type TButtonProps = {
    icon: String;
    text: String;
  }

export type TBurgerConstructorProps = {
    openOrderDetails: () => void;
  }

export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    key?: string,
    }

export type TIngredientsIDs = Array<string>;