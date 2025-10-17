"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.OrderSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .required()
        .messages({
        'string.base': 'Name must be a text value',
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'any.required': 'Name is required'
    }),
    address: joi_1.default.string()
        .required()
        .messages({
        'string.base': 'Address must be a text value',
        'string.empty': 'Address is required',
        'any.required': 'Address is required'
    }),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required()
        .messages({
        'string.base': 'Email must be a text value',
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    phone_number: joi_1.default.string()
        .pattern(/^[+0-9]{7,15}$/)
        .required()
        .messages({
        'string.base': 'Phone number must be a text value',
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone number must contain only digits and may start with +',
        'any.required': 'Phone number is required'
    }),
    items: joi_1.default.array()
        .items(joi_1.default.object({
        _id: joi_1.default.string(),
        quantity: joi_1.default.number().integer(),
        totalPrice: joi_1.default.number().integer(),
        foodId: joi_1.default.object({
            name: joi_1.default.string(),
            imageUrl: joi_1.default.string()
        }).unknown(true)
    }))
        .required()
        .error(() => new Error('Malformed order'))
});
