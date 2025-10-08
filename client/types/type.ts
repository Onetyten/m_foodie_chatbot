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
    content:string[]
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
