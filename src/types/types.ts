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


export type TOrder = {
    _id: string;
    status: string;
    name: string;
    number: string;
    createdAt: string;
    updatedAt: string;
    ingredients: Array<string>;
}

export type TRequestOptions = {
    method: string;
    headers: {
        [header: string]: string;
    };
    body?: string;
}

export type TFormData = {
    username?: string;
    email?: string;
    password?: string;
    token?: string
}


export type TBun = TIngredient & { 
    type: 'bun'
}


