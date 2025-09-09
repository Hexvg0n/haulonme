import { ObjectId } from "mongodb";

export interface Product {
  _id?: ObjectId; // MongoDB's unique identifier
  name: string;
  description: string;
  image: string;
  images?: string[];
  affiliateLink: string;
  category: string;
  subCategory: string;
  keywords: string[];
  created: string;
  brand?: string;
  material?: string;
  fit?: string;
  season?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  rating?: string;
  justification?: string;
  review?: string;
  features?: string[];
  careInstructions?: string[];
  status?: "active" | "draft" | "archived";
}

export interface Category {
  _id?: ObjectId; // MongoDB's unique identifier
  name: string;
  key: string;
  description: string;
  productCount: number;
  created: string;
}

export interface PhotoRequest {
    _id: string;
    name: string;
    email: string;
    category: string;
    itemName: string;
    description: string;
    referenceLinks?: string;
    createdAt: Date;
}