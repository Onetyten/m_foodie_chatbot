import dotenv from 'dotenv'
dotenv.config()
import Food, { FoodType } from "../schema/foodSchema";
import Customisation, { customisationType } from "../schema/customisationSchema";
import Category, { categoryType } from "../schema/categorySchema";
import subCategory, { subCategoryType } from "../schema/subCategory";
import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import fs from "fs"
import path from "path";
import { seedCategoryType, seedCustomisationType, seedFoodType, seedSubCategoryType } from '../types/jsonTypes';

const environment = process.env.ENVIRONMENT
if (!environment){
    throw new Error("No ENVIRONMENT variable found in the .env")
}
const rootDir = environment == "dev" ?path.join(__dirname,".."):path.join(__dirname,"..","..")

export async function seedDataController(req:Request,res:Response){
    const categoryData:seedCategoryType[] = await JSON.parse(fs.readFileSync(path.join(rootDir,"json","category.json"),"utf-8"))
    const subCategoryData:seedSubCategoryType[] = await JSON.parse(fs.readFileSync(path.join(rootDir,"json","subCategory.json"),"utf-8"))
    const customisationData:seedCustomisationType[] = await JSON.parse(fs.readFileSync(path.join(rootDir,"json","customisation.json"),"utf-8"))
    const foodData:seedFoodType[] = await JSON.parse(fs.readFileSync(path.join(rootDir,"json","food.json"),"utf-8"))
    if (!categoryData || categoryData.length == 0 || !subCategoryData || subCategoryData.length == 0 || !customisationData|| customisationData.length == 0 || !foodData || foodData.length == 0 ){
        throw new Error("Invalid JSON input")
    }
    const seededCategory:categoryType[] = []
    const seededSubCategory:subCategoryType[] = []
    const seededCustomisation:customisationType[] = []
    const seededFood:FoodType[] = []

    await mongoConnect()
    try {
        console.log("seeding food categories")
        await Category.deleteMany()
        for (const category of categoryData) {
            const newCategory = await Category.create(category)
            seededCategory.push(newCategory)
            console.log(`category ${newCategory.name} seeded`)
        }

        console.log("seeding subcategories...")
        await subCategory.deleteMany()

        for (const subcategory of subCategoryData){
            const category = seededCategory.find((cat)=>cat.name === subcategory.category)
            if (!category){
                throw new Error("no category found for this subcategory")
            }
            const payload = {
                name:subcategory.name,
                categoryId:category._id,
                imageUrl:subcategory.imageUrl
            }
            const newSubcategory = await subCategory.create(payload)
            seededSubCategory.push(newSubcategory)
            console.log(`subcategory ${newSubcategory.name} seeded`)
        }
        console.log("sub-categories seeded, seeding cutomisations")
        Customisation.deleteMany()
        for (const customisation of customisationData){
            const newCustomisation = await Customisation.create(customisation)
            seededCustomisation.push(newCustomisation)
            console.log(`customisation ${newCustomisation.name} seeded`)
        }
        console.log("seeding food...")

        Food.deleteMany()
        for (const food of foodData){
            const category = seededCategory.find((cat)=>cat.name === food.category)
            const subCategory = seededSubCategory.find((sub)=>sub.name === food.subCategory)
            if (!category || !subCategory) throw new Error(`Missing category/subCategory for ${food.name}`);
            const customisationIds = [];
            if (food.customisations && food.customisations.length > 0) {
                for (const c of food.customisations) {
                const found = seededCustomisation.find((s) => s.name === c);
                if (found) customisationIds.push(found._id);
                }
            }
            const payload =  {
              name: food.name,
              price: food.price,
              calories: food.calories,
              imageUrl: food.imageUrl,
              categoryId: category._id,
              subCategoryId: subCategory._id,
              customisationId: customisationIds,
            }
            const newFood = await Food.create(payload)
            seededFood.push(newFood)
            console.log(`${newFood.name} added to the menu`)
        }
        console.log("menu seeded successfully")
        res.status(200).json({message:"menu seeded successfully",success:true, data:seededFood})
    }
    catch (error) {
        console.log("error seeding data",error)
        res.status(500).json({message:`error seeding data : ${error instanceof Error?error.message:""}`,error,success:false})
    }
}