"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDataController = seedDataController;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const foodSchema_1 = __importDefault(require("../schema/foodSchema"));
const customisationSchema_1 = __importDefault(require("../schema/customisationSchema"));
const categorySchema_1 = __importDefault(require("../schema/categorySchema"));
const subCategory_1 = __importDefault(require("../schema/subCategory"));
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const environment = process.env.ENVIRONMENT;
if (!environment) {
    throw new Error("No ENVIRONMENT variable found in the .env");
}
const rootDir = environment == "dev" ? path_1.default.join(__dirname, "..") : path_1.default.join(__dirname, "..", "..");
function seedDataController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryData = yield JSON.parse(fs_1.default.readFileSync(path_1.default.join(rootDir, "json", "category.json"), "utf-8"));
        const subCategoryData = yield JSON.parse(fs_1.default.readFileSync(path_1.default.join(rootDir, "json", "subCategory.json"), "utf-8"));
        const customisationData = yield JSON.parse(fs_1.default.readFileSync(path_1.default.join(rootDir, "json", "customisation.json"), "utf-8"));
        const foodData = yield JSON.parse(fs_1.default.readFileSync(path_1.default.join(rootDir, "json", "food.json"), "utf-8"));
        if (!categoryData || categoryData.length == 0 || !subCategoryData || subCategoryData.length == 0 || !customisationData || customisationData.length == 0 || !foodData || foodData.length == 0) {
            throw new Error("Invalid JSON input");
        }
        const seededCategory = [];
        const seededSubCategory = [];
        const seededCustomisation = [];
        const seededFood = [];
        yield (0, mongoConnect_1.default)();
        try {
            console.log("seeding food categories");
            yield categorySchema_1.default.deleteMany();
            for (const category of categoryData) {
                const newCategory = yield categorySchema_1.default.create(category);
                seededCategory.push(newCategory);
                console.log(`category ${newCategory.name} seeded`);
            }
            console.log("seeding subcategories...");
            yield subCategory_1.default.deleteMany();
            for (const subcategory of subCategoryData) {
                const category = seededCategory.find((cat) => cat.name === subcategory.category);
                if (!category) {
                    throw new Error("no category found for this subcategory");
                }
                const payload = {
                    name: subcategory.name,
                    categoryId: category._id,
                    imageUrl: subcategory.imageUrl
                };
                const newSubcategory = yield subCategory_1.default.create(payload);
                seededSubCategory.push(newSubcategory);
                console.log(`subcategory ${newSubcategory.name} seeded`);
            }
            console.log("sub-categories seeded, seeding cutomisations");
            customisationSchema_1.default.deleteMany();
            for (const customisation of customisationData) {
                const newCustomisation = yield customisationSchema_1.default.create(customisation);
                seededCustomisation.push(newCustomisation);
                console.log(`customisation ${newCustomisation.name} seeded`);
            }
            console.log("seeding food...");
            foodSchema_1.default.deleteMany();
            for (const food of foodData) {
                const category = seededCategory.find((cat) => cat.name === food.category);
                const subCategory = seededSubCategory.find((sub) => sub.name === food.subCategory);
                if (!category || !subCategory)
                    throw new Error(`Missing category/subCategory for ${food.name}`);
                const customisationIds = [];
                if (food.customisations && food.customisations.length > 0) {
                    for (const c of food.customisations) {
                        const found = seededCustomisation.find((s) => s.name === c);
                        if (found)
                            customisationIds.push(found._id);
                    }
                }
                const payload = {
                    name: food.name,
                    price: food.price,
                    calories: food.calories,
                    imageUrl: food.imageUrl,
                    categoryId: category._id,
                    subCategoryId: subCategory._id,
                    customisationId: customisationIds,
                };
                const newFood = yield foodSchema_1.default.create(payload);
                seededFood.push(newFood);
                console.log(`${newFood.name} added to the menu`);
            }
            console.log("menu seeded successfully");
            res.status(200).json({ message: "menu seeded successfully", success: true, data: seededFood });
        }
        catch (error) {
            console.log("error seeding data", error);
            res.status(500).json({ message: `error seeding data : ${error instanceof Error ? error.message : ""}`, error, success: "false" });
        }
    });
}
