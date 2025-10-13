export interface seedCategoryType {
    name: string,
    description: string,
    imageUrl: string
}
export interface seedSubCategoryType {
    name:string ,
    category:string,
    imageUrl:string 
}

export interface seedCustomisationType{
    name:string,
    type:string,
    options: [{ label: string, extraPrice: number }],
    quantity?:{
        min:number,
        max:number,
        size:number
    }
}
export interface seedFoodType{
    name:string,
    price:number,
    calories:number,
    imageUrl: string,
    category:string,
    subCategory:string,
    customisations: string[]
}

export interface tweakType{
  name:string,
  type:string,
  value:string,
  price:number
}