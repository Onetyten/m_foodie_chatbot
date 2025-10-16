export interface subCategoryType {
  _id: string
  name: string
  categoryId: string
  imageUrl: string
  v: number
}

export interface messageListType{
     type:string,
    sender:string,
    next:()=>void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content:any[]
}

export interface FoodType {
  _id: string;
  __v: number;
  available: boolean;
  calories: number;
  categoryId: string;
  customisationId: string[];
  imageUrl: string;
  name: string;
  price: number;
  subCategoryId: string;
}

export interface optionType{
  label: string,
  extraPrice: number
}

export interface customisationType{
    name:string,
    type:string,
    options: optionType[],
    quantity:{
        min:number,
        max:number,
        size:number
    }
}
export interface tweakType{
  name:string,
  type:string,
  value:string,
  price:number
}

export interface cartType{
  foodId:string
  quantity:number
  customisation:tweakType[],
  totalPrice:number
}

export interface cartListType
{
    _id:string,
    quantity: number,
    totalPrice: number,
    foodId: {
      name: string,
      imageUrl:string,
    }
}

export interface orderType{
  name:string,
  address:string,
  city:string,
  country:string,
  phone_number:string,
  items:cartListType[]
}

export interface countryCodeType {
    flag: string,
    val: string,
}