export interface Recipe {
  recipe:{
    uri: string;
    label: string;
    image: string;
    images: {
      THUMBNAIL: ImageDetails;
      SMALL: ImageDetails;
      REGULAR: ImageDetails;
      LARGE: ImageDetails;
    };
    source: string;
    url: string;
    shareAs: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    ingredients: Ingredient[];
    calories: number;
    totalCO2Emissions: number;
    co2EmissionsClass: string;
    totalWeight: number;
    totalTime: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    totalNutrients: { [key: string]: Nutrient };
    totalDaily: { [key: string]: DailyNutrient };
    digest: Digest[];
  }
}

export interface ImageDetails {
  url: string;
  width: number;
  height: number;
}

export interface Ingredient {
  text: string;
  quantity: number;
  measure: string | null;
  food: string;
  weight: number;
  foodCategory?: string; // Optional
  foodId: string;
  image: string;
}

export interface Nutrient {
  label: string;
  quantity: number;
  unit: string;
}

export interface DailyNutrient {
  label: string;
  quantity: number;
  unit: string;
}

export interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: string | null;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub?: Digest[]; // Nested digest
}


export interface LocalFilters {
  ingredients: string[];
  excluded: string[];
  diet?: string[];
  health?: string[];
  cuisine?: string;
  mealType?: string;
  dishType?: string;
  calories?: string;
  time?: string;
}

export interface GeneratedRecipe{
  recipe:{
    Directions: string[],
    Ingredients:string[],
    Title:string
  }
}