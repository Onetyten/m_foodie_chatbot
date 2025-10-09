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

export interface cartType{
  foodId:string,
  quantity:number,
  customisation:{
    name:string
    type:string
    value:string
  }[]
}