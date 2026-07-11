export interface MenuItem {
  name: string;
  price: number;
  description: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isHalal: boolean;
  allergens: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  emoji: string;
  rating: number;
  distance: number; // in meters
  walkingTime: number; // in minutes
  queueTime: number; // in minutes
  isOpen: boolean;
  priceRange: '$' | '$$' | '$$$';
  prepTime: number; // in minutes
  popularItems: MenuItem[];
  crowdStatus: 'Low' | 'Moderate' | 'Heavy';
  categories: string[];
  isVegetarian: boolean;
  isHalal: boolean;
}

export const FOOD_CATEGORIES = [
  'Burgers',
  'Pizza',
  'Drinks',
  'Coffee',
  'Desserts',
  'Mexican',
  'Healthy',
  'Vegetarian',
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'food-b',
    name: 'Concession Stand B (American Grill)',
    cuisine: 'Burgers & Fries',
    emoji: '🍔',
    rating: 4.2,
    distance: 150,
    walkingTime: 2,
    queueTime: 12,
    isOpen: true,
    priceRange: '$$',
    prepTime: 5,
    crowdStatus: 'Heavy',
    categories: ['Burgers', 'Drinks'],
    isVegetarian: false,
    isHalal: true,
    popularItems: [
      {
        name: 'Classic Cheeseburger',
        price: 12.99,
        description: 'Prime beef patty, melted cheddar, lettuce, tomato, house sauce.',
        isVegetarian: false,
        isVegan: false,
        isHalal: true,
        allergens: ['Wheat', 'Dairy', 'Gluten'],
      },
      {
        name: 'Crispy French Fries',
        price: 5.49,
        description: 'Golden potato fries seasoned with sea salt.',
        isVegetarian: true,
        isVegan: true,
        isHalal: true,
        allergens: [],
      },
      {
        name: 'Draft Bud Light',
        price: 8.99,
        description: 'Cold refreshing draft beer.',
        isVegetarian: true,
        isVegan: true,
        isHalal: true,
        allergens: ['Gluten'],
      },
    ],
  },
  {
    id: 'food-taco',
    name: 'Taco Hub',
    cuisine: 'Mexican Street Food',
    emoji: '🌮',
    rating: 4.5,
    distance: 210,
    walkingTime: 3,
    queueTime: 5,
    isOpen: true,
    priceRange: '$',
    prepTime: 4,
    crowdStatus: 'Moderate',
    categories: ['Mexican', 'Vegetarian', 'Drinks'],
    isVegetarian: true,
    isHalal: true,
    popularItems: [
      {
        name: 'Birria Taco Box',
        price: 14.49,
        description: 'Three slow-cooked beef birria tacos with consome, cilantro, and onion.',
        isVegetarian: false,
        isVegan: false,
        isHalal: true,
        allergens: ['Corn'],
      },
      {
        name: 'Guacamole & Fresh Chips',
        price: 6.99,
        description: 'Hand-mashed avocado, lime, tomato, served with crispy corn chips.',
        isVegetarian: true,
        isVegan: true,
        isHalal: true,
        allergens: [],
      },
      {
        name: 'Vegetarian Quesadilla',
        price: 10.99,
        description: 'Melted Monterey Jack cheese, black beans, roasted corn in a flour tortilla.',
        isVegetarian: true,
        isVegan: false,
        isHalal: true,
        allergens: ['Wheat', 'Dairy'],
      },
    ],
  },
  {
    id: 'food-leaning',
    name: 'Leaning Tower Pizza',
    cuisine: 'Stone Oven Pizza',
    emoji: '🍕',
    rating: 4.0,
    distance: 320,
    walkingTime: 5,
    queueTime: 18,
    isOpen: true,
    priceRange: '$$',
    prepTime: 8,
    crowdStatus: 'Heavy',
    categories: ['Pizza', 'Vegetarian'],
    isVegetarian: true,
    isHalal: false,
    popularItems: [
      {
        name: 'Double Pepperoni Slice',
        price: 6.49,
        description: 'Large slice topped with double pepperoni and mozzarella cheese.',
        isVegetarian: false,
        isVegan: false,
        isHalal: false,
        allergens: ['Wheat', 'Dairy', 'Gluten'],
      },
      {
        name: 'Margherita Pizza Slice',
        price: 5.99,
        description: 'Classic slice with marinara sauce, fresh mozzarella, and basil.',
        isVegetarian: true,
        isVegan: false,
        isHalal: true,
        allergens: ['Wheat', 'Dairy', 'Gluten'],
      },
      {
        name: 'Garlic Knots (4pcs)',
        price: 4.99,
        description: 'Baked dough knots brushed with garlic butter and parsley.',
        isVegetarian: true,
        isVegan: false,
        isHalal: true,
        allergens: ['Wheat', 'Dairy'],
      },
    ],
  },
  {
    id: 'food-healthy',
    name: 'Green Garden Bowls',
    cuisine: 'Healthy & Organic',
    emoji: '🥗',
    rating: 4.8,
    distance: 90,
    walkingTime: 1,
    queueTime: 2,
    isOpen: true,
    priceRange: '$$$',
    prepTime: 3,
    crowdStatus: 'Low',
    categories: ['Healthy', 'Vegetarian'],
    isVegetarian: true,
    isHalal: true,
    popularItems: [
      {
        name: 'Avocado Quinoa Salad',
        price: 15.99,
        description: 'Fresh organic greens, avocado, quinoa, cherry tomatoes, citrus dressing.',
        isVegetarian: true,
        isVegan: true,
        isHalal: true,
        allergens: [],
      },
      {
        name: 'Acai Berry Power Bowl',
        price: 11.99,
        description: 'Pure acai puree topped with organic granola, banana, strawberries, and honey.',
        isVegetarian: true,
        isVegan: false,
        isHalal: true,
        allergens: ['Nuts', 'Gluten'],
      },
      {
        name: 'Cold Pressed Green Juice',
        price: 7.99,
        description: 'Fresh cucumber, celery, kale, apple, ginger, and lemon pressed daily.',
        isVegetarian: true,
        isVegan: true,
        isHalal: true,
        allergens: [],
      },
    ],
  },
  {
    id: 'food-brew',
    name: 'Stadium Brew & Bake',
    cuisine: 'Specialty Coffee & Desserts',
    emoji: '☕',
    rating: 4.6,
    distance: 180,
    walkingTime: 3,
    queueTime: 3,
    isOpen: true,
    priceRange: '$',
    prepTime: 2,
    crowdStatus: 'Low',
    categories: ['Coffee', 'Desserts'],
    isVegetarian: true,
    isHalal: true,
    popularItems: [
      {
        name: 'Iced Caramel Macchiato',
        price: 6.49,
        description: 'Espresso with cold milk, caramel drizzle, vanilla syrup over ice.',
        isVegetarian: true,
        isVegan: false,
        isHalal: true,
        allergens: ['Dairy'],
      },
      {
        name: 'Warm Chocolate Glazed Donut',
        price: 3.99,
        description: 'Freshly baked donut glazed in dark Belgian chocolate.',
        isVegetarian: true,
        isVegan: false,
        isHalal: true,
        allergens: ['Wheat', 'Dairy', 'Egg'],
      },
      {
        name: 'Double Espresso Shot',
        price: 4.29,
        description: 'Two shots of our premium Arabica house espresso roast.',
        isVegetarian: true,
        isVegan: true,
        isHalal: true,
        allergens: [],
      },
    ],
  },
];
