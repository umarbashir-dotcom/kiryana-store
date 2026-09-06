import {
    Wheat,
    Bean,
    Droplet,
    Flame,
    Coffee,
    Milk,
    GlassWater,
    Cookie,
    Utensils,
    Soup,
    Snowflake,
    SprayCan,
    Shirt,
    Baby,
    Package,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| Category Icons
|--------------------------------------------------------------------------
|
| The key must match the `icon` field stored in your Category model.
|
|--------------------------------------------------------------------------
*/

export const categoryIcons = {

    // 1. Atta, Rice & Grains
    rice: Wheat,

    // 2. Daal, Pulses & Dry Fruits
    pulses: Bean,

    // 3. Oil, Ghee, Sugar & Salt
    oil: Droplet,

    // 4. Spices & Cooking Essentials
    spices: Flame,

    // 5. Tea, Coffee, Breakfast & Desserts
    coffee: Coffee,

    // 6. Milk, Dairy & Eggs
    milk: Milk,

    // 7. Beverages & Drinks
    beverages: GlassWater,

    // 8. Biscuits, Snacks & Sweets
    snacks: Cookie,

    // 9. Pasta, Noodles & Ready Foods
    noodles: Utensils,

    // 10. Sauces, Ketchup & Pickles
    sauces: Soup,

    // 11. Frozen & Chilled Foods
    frozen: Snowflake,

    // 12. Household & Cleaning
    household: SprayCan,

    // 13. Laundry Care
    laundry: Shirt,

    // 14. Personal & Baby Care
    "personal-care": Baby,

    // 15. Tissues, Disposable & General
    general: Package,
};