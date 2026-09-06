import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // ==================================================
        // CLEAR EXISTING DATA
        // ==================================================

        await Product.deleteMany({});
        await Category.deleteMany({});

        console.log("Old categories and products cleared");

        // ==================================================
        // CATEGORIES
        // ==================================================

        const categories = await Category.insertMany([
            {
                name: "Atta, Rice & Grains",
                slug: "atta-rice-and-grains",
                image: "/images/categories/atta-rice-grains.png",
                icon: "rice",
                isActive: true,
            },
            {
                name: "Daal, Pulses & Dry Fruits",
                slug: "daal-pulses-and-dry-fruits",
                image: "/images/categories/daal-pulses-dry-fruits.jpg",
                icon: "pulses",
                isActive: true,
            },
            {
                name: "Oil, Ghee, Sugar & Salt",
                slug: "oil-ghee-sugar-and-salt",
                image: "/images/categories/oil-ghee-sugar-salt.jpg",
                icon: "oil",
                isActive: true,
            },
            {
                name: "Spices & Cooking Essentials",
                slug: "spices-and-cooking-essentials",
                image: "/images/categories/spices.jpg",
                icon: "spices",
                isActive: true,
            },
            {
                name: "Tea, Coffee, Breakfast & Desserts",
                slug: "tea-coffee-breakfast-and-desserts",
                image: "/images/categories/tea-breakfast.jpg",
                icon: "coffee",
                isActive: true,
            },
            {
                name: "Milk, Dairy & Eggs",
                slug: "milk-dairy-and-eggs",
                image: "/images/categories/dairy-eggs.jpg",
                icon: "milk",
                isActive: true,
            },
            {
                name: "Beverages & Drinks",
                slug: "beverages-and-drinks",
                image: "/images/categories/beverages.jpg",
                icon: "beverages",
                isActive: true,
            },
            {
                name: "Biscuits, Snacks & Sweets",
                slug: "biscuits-snacks-and-sweets",
                image: "/images/categories/snacks.jpg",
                icon: "snacks",
                isActive: true,
            },
            {
                name: "Pasta, Noodles & Ready Foods",
                slug: "pasta-noodles-and-ready-foods",
                image: "/images/categories/pasta-noodles.jpg",
                icon: "noodles",
                isActive: true,
            },
            {
                name: "Sauces, Ketchup & Pickles",
                slug: "sauces-ketchup-and-pickles",
                image: "/images/categories/sauces.jpg",
                icon: "sauces",
                isActive: true,
            },
            {
                name: "Frozen & Chilled Foods",
                slug: "frozen-and-chilled-foods",
                image: "/images/categories/frozen.jpg",
                icon: "frozen",
                isActive: true,
            },
            {
                name: "Household & Cleaning",
                slug: "household-and-cleaning",
                image: "/images/categories/household.jpg",
                icon: "household",
                isActive: true,
            },
            {
                name: "Laundry Care",
                slug: "laundry-care",
                image: "/images/categories/laundry.jpg",
                icon: "laundry",
                isActive: true,
            },
            {
                name: "Personal & Baby Care",
                slug: "personal-and-baby-care",
                image: "/images/categories/personal-baby-care.jpg",
                icon: "personal-care",
                isActive: true,
            },
            {
                name: "Tissues, Disposable & General",
                slug: "tissues-disposable-and-general",
                image: "/images/categories/general.jpg",
                icon: "general",
                isActive: true,
            },
        ]);

        console.log(`${categories.length} categories inserted`);

        // ==================================================
        // CATEGORY HELPER
        // ==================================================

        const findCat = (slug) => {
            const category = categories.find((c) => c.slug === slug);

            if (!category) {
                throw new Error(`Category not found: ${slug}`);
            }

            return category._id;
        };

        // ==================================================
        // PRODUCTS
        // ==================================================

        const products = [

            // ==================================================
            // 1. ATTA, RICE & GRAINS
            // ==================================================

            {
                name: "Basmati Rice Super Kernel",
                slug: "basmati-rice-super-kernel-1kg",
                description:
                    "Premium long-grain Pakistani basmati rice suitable for everyday cooking.",
                category: findCat("atta-rice-and-grains"),
                price: 450,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 18,
                images: [],
            },

            {
                name: "Falak Basmati Rice",
                slug: "falak-basmati-rice-1kg",
                description:
                    "Long-grain aromatic basmati rice for traditional rice dishes.",
                category: findCat("atta-rice-and-grains"),
                price: 520,
                discount: 8,
                quantity: 1,
                unit: "kg",
                stock: 12,
                images: [],
            },

            {
                name: "Sella Basmati Rice",
                slug: "sella-basmati-rice-1kg",
                description:
                    "Parboiled basmati rice with long separate grains.",
                category: findCat("atta-rice-and-grains"),
                price: 360,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 15,
                images: [],
            },

            {
                name: "Guard Basmati Rice",
                slug: "guard-basmati-rice-1kg",
                description:
                    "Premium Pakistani basmati rice for everyday meals.",
                category: findCat("atta-rice-and-grains"),
                price: 430,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 10,
                images: [],
            },

            {
                name: "Ashrafi Chakki Atta",
                slug: "ashrafi-chakki-atta-10kg",
                description:
                    "Whole wheat chakki atta for traditional rotis and chapatis.",
                category: findCat("atta-rice-and-grains"),
                price: 1650,
                discount: 5,
                quantity: 10,
                unit: "kg",
                stock: 8,
                images: [],
            },

            {
                name: "Maida",
                slug: "maida-flour-1kg",
                description:
                    "Refined wheat flour used for baking and cooking.",
                category: findCat("atta-rice-and-grains"),
                price: 190,
                discount: 0,
                quantity: 1,
                unit: "kg",
                stock: 20,
                images: [],
            },

            {
                name: "Sooji",
                slug: "sooji-500g",
                description:
                    "Semolina used for halwa, desserts and cooking.",
                category: findCat("atta-rice-and-grains"),
                price: 140,
                discount: 0,
                quantity: 500,
                unit: "g",
                stock: 15,
                images: [],
            },

            // ==================================================
            // 2. DAAL, PULSES & DRY FRUITS
            // ==================================================

            {
                name: "Masoor Daal",
                slug: "masoor-daal-1kg",
                description:
                    "Red split lentils commonly used in Pakistani cooking.",
                category: findCat("daal-pulses-and-dry-fruits"),
                price: 320,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 16,
                images: [],
            },

            {
                name: "Moong Daal",
                slug: "moong-daal-1kg",
                description:
                    "Yellow split mung lentils for traditional daal dishes.",
                category: findCat("daal-pulses-and-dry-fruits"),
                price: 390,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 14,
                images: [],
            },

            {
                name: "Chana Daal",
                slug: "chana-daal-1kg",
                description:
                    "Split chickpeas used in traditional Pakistani dishes.",
                category: findCat("daal-pulses-and-dry-fruits"),
                price: 330,
                discount: 0,
                quantity: 1,
                unit: "kg",
                stock: 15,
                images: [],
            },

            {
                name: "White Chickpeas",
                slug: "white-chickpeas-1kg",
                description:
                    "Whole white chickpeas for curries, chana and salads.",
                category: findCat("daal-pulses-and-dry-fruits"),
                price: 380,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 12,
                images: [],
            },

            {
                name: "Black Chickpeas",
                slug: "black-chickpeas-1kg",
                description:
                    "Whole black chickpeas for curries and traditional dishes.",
                category: findCat("daal-pulses-and-dry-fruits"),
                price: 340,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 10,
                images: [],
            },

            {
                name: "Almonds",
                slug: "almonds-250g",
                description:
                    "Premium almonds for snacking and desserts.",
                category: findCat("daal-pulses-and-dry-fruits"),
                price: 650,
                discount: 5,
                quantity: 250,
                unit: "g",
                stock: 8,
                images: [],
            },

            {
                name: "Raisins",
                slug: "raisins-250g",
                description:
                    "Sweet dried raisins for snacks and desserts.",
                category: findCat("daal-pulses-and-dry-fruits"),
                price: 350,
                discount: 5,
                quantity: 250,
                unit: "g",
                stock: 10,
                images: [],
            },

            // ==================================================
            // 3. OIL, GHEE, SUGAR & SALT
            // ==================================================

            {
                name: "Dalda Cooking Oil",
                slug: "dalda-cooking-oil-1l",
                description:
                    "Cooking oil suitable for frying and everyday household cooking.",
                category: findCat("oil-ghee-sugar-and-salt"),
                price: 605,
                discount: 3,
                quantity: 1,
                unit: "l",
                stock: 20,
                images: [],
            },

            {
                name: "Sufi Canola Cooking Oil",
                slug: "sufi-canola-cooking-oil-1l",
                description:
                    "Canola cooking oil for everyday household use.",
                category: findCat("oil-ghee-sugar-and-salt"),
                price: 590,
                discount: 5,
                quantity: 1,
                unit: "l",
                stock: 18,
                images: [],
            },

            {
                name: "Dalda Banaspati Ghee",
                slug: "dalda-banaspati-ghee-1kg",
                description:
                    "Banaspati ghee commonly used for traditional cooking.",
                category: findCat("oil-ghee-sugar-and-salt"),
                price: 620,
                discount: 4,
                quantity: 1,
                unit: "kg",
                stock: 12,
                images: [],
            },

            {
                name: "Refined White Sugar",
                slug: "refined-white-sugar-1kg",
                description:
                    "Fine refined sugar for tea, desserts and everyday cooking.",
                category: findCat("oil-ghee-sugar-and-salt"),
                price: 190,
                discount: 0,
                quantity: 1,
                unit: "kg",
                stock: 30,
                images: [],
            },

            {
                name: "Iodized Table Salt",
                slug: "iodized-table-salt-800g",
                description:
                    "Iodized salt for everyday household cooking.",
                category: findCat("oil-ghee-sugar-and-salt"),
                price: 65,
                discount: 0,
                quantity: 800,
                unit: "g",
                stock: 35,
                images: [],
            },

            {
                name: "Gur Jaggery",
                slug: "gur-jaggery-1kg",
                description:
                    "Traditional jaggery used in cooking and desserts.",
                category: findCat("oil-ghee-sugar-and-salt"),
                price: 280,
                discount: 0,
                quantity: 1,
                unit: "kg",
                stock: 10,
                images: [],
            },

            // ==================================================
            // 4. SPICES & COOKING ESSENTIALS
            // ==================================================

            {
                name: "National Biryani Masala",
                slug: "national-biryani-masala-78g",
                description:
                    "Ready-to-use spice mix for traditional biryani.",
                category: findCat("spices-and-cooking-essentials"),
                price: 290,
                discount: 7,
                quantity: 78,
                unit: "g",
                stock: 25,
                images: [],
            },

            {
                name: "Shan Biryani Masala",
                slug: "shan-biryani-masala-67g",
                description:
                    "Spice mix for aromatic traditional biryani.",
                category: findCat("spices-and-cooking-essentials"),
                price: 125,
                discount: 5,
                quantity: 67,
                unit: "g",
                stock: 30,
                images: [],
            },

            {
                name: "Red Chili Powder",
                slug: "red-chili-powder-200g",
                description:
                    "Ground red chili powder for everyday cooking.",
                category: findCat("spices-and-cooking-essentials"),
                price: 220,
                discount: 0,
                quantity: 200,
                unit: "g",
                stock: 18,
                images: [],
            },

            {
                name: "Turmeric Powder",
                slug: "turmeric-powder-200g",
                description:
                    "Ground turmeric powder for cooking and seasoning.",
                category: findCat("spices-and-cooking-essentials"),
                price: 180,
                discount: 5,
                quantity: 200,
                unit: "g",
                stock: 20,
                images: [],
            },

            {
                name: "Cumin Seeds",
                slug: "cumin-seeds-100g",
                description:
                    "Aromatic cumin seeds used in Pakistani cooking.",
                category: findCat("spices-and-cooking-essentials"),
                price: 230,
                discount: 5,
                quantity: 100,
                unit: "g",
                stock: 12,
                images: [],
            },

            {
                name: "Black Pepper",
                slug: "black-pepper-50g",
                description:
                    "Whole black pepper for seasoning and cooking.",
                category: findCat("spices-and-cooking-essentials"),
                price: 165,
                discount: 0,
                quantity: 50,
                unit: "g",
                stock: 12,
                images: [],
            },

            // ==================================================
            // 5. TEA, COFFEE, BREAKFAST & DESSERTS
            // ==================================================

            {
                name: "Tapal Danedar Tea",
                slug: "tapal-danedar-tea-900g",
                description:
                    "Strong black tea blend popular in Pakistani households.",
                category: findCat("tea-coffee-breakfast-and-desserts"),
                price: 1845,
                discount: 5,
                quantity: 900,
                unit: "g",
                stock: 8,
                images: [],
            },

            {
                name: "Lipton Yellow Label Tea",
                slug: "lipton-yellow-label-tea-475g",
                description:
                    "Black tea blend for everyday tea preparation.",
                category: findCat("tea-coffee-breakfast-and-desserts"),
                price: 1150,
                discount: 5,
                quantity: 475,
                unit: "g",
                stock: 8,
                images: [],
            },

            {
                name: "Nescafe Classic Coffee",
                slug: "nescafe-classic-coffee-50g",
                description:
                    "Instant coffee for quick preparation.",
                category: findCat("tea-coffee-breakfast-and-desserts"),
                price: 750,
                discount: 5,
                quantity: 50,
                unit: "g",
                stock: 9,
                images: [],
            },

            {
                name: "National Strawberry Jam",
                slug: "national-strawberry-jam-500g",
                description:
                    "Strawberry spread for bread and breakfast.",
                category: findCat("tea-coffee-breakfast-and-desserts"),
                price: 420,
                discount: 5,
                quantity: 500,
                unit: "g",
                stock: 10,
                images: [],
            },

            {
                name: "Rafhan Custard Powder",
                slug: "rafhan-custard-powder-80g",
                description:
                    "Custard powder for preparing homemade desserts.",
                category: findCat("tea-coffee-breakfast-and-desserts"),
                price: 175,
                discount: 5,
                quantity: 80,
                unit: "g",
                stock: 15,
                images: [],
            },

            {
                name: "Rafhan Jelly Powder",
                slug: "rafhan-jelly-powder-80g",
                description:
                    "Jelly dessert mix for homemade desserts.",
                category: findCat("tea-coffee-breakfast-and-desserts"),
                price: 175,
                discount: 5,
                quantity: 80,
                unit: "g",
                stock: 15,
                images: [],
            },

            // ==================================================
            // 6. MILK, DAIRY & EGGS
            // ==================================================

            {
                name: "Olper's Full Cream Milk",
                slug: "olpers-full-cream-milk-1l",
                description:
                    "Full cream packaged milk for everyday household consumption.",
                category: findCat("milk-dairy-and-eggs"),
                price: 350,
                discount: 0,
                quantity: 1,
                unit: "l",
                stock: 20,
                images: [],
            },

            {
                name: "Olper's Full Cream Milk",
                slug: "olpers-full-cream-milk-250ml",
                description:
                    "Convenient small pack of full cream milk.",
                category: findCat("milk-dairy-and-eggs"),
                price: 92,
                discount: 0,
                quantity: 250,
                unit: "ml",
                stock: 30,
                images: [],
            },

            {
                name: "Milkpak Full Cream Milk",
                slug: "milkpak-full-cream-milk-1l",
                description:
                    "Full cream packaged milk for everyday use.",
                category: findCat("milk-dairy-and-eggs"),
                price: 365,
                discount: 3,
                quantity: 1,
                unit: "l",
                stock: 16,
                images: [],
            },

            {
                name: "Nestle Everyday Milk Powder",
                slug: "nestle-everyday-milk-powder-350g",
                description:
                    "Milk powder commonly used for tea and beverages.",
                category: findCat("milk-dairy-and-eggs"),
                price: 715,
                discount: 5,
                quantity: 350,
                unit: "g",
                stock: 10,
                images: [],
            },

            {
                name: "Milkpak Cream",
                slug: "milkpak-cream-200ml",
                description:
                    "Cooking and dessert cream.",
                category: findCat("milk-dairy-and-eggs"),
                price: 230,
                discount: 0,
                quantity: 200,
                unit: "ml",
                stock: 12,
                images: [],
            },

            {
                name: "Fresh Eggs",
                slug: "fresh-eggs-dozen",
                description:
                    "Fresh chicken eggs for cooking and breakfast.",
                category: findCat("milk-dairy-and-eggs"),
                price: 360,
                discount: 0,
                quantity: 12,
                unit: "pcs",
                stock: 15,
                images: [],
            },

            // ==================================================
            // 7. BEVERAGES & DRINKS
            // ==================================================

            {
                name: "Coca-Cola",
                slug: "coca-cola-1-5l",
                description:
                    "Classic carbonated cola soft drink.",
                category: findCat("beverages-and-drinks"),
                price: 155,
                discount: 0,
                quantity: 1.5,
                unit: "l",
                stock: 24,
                images: [],
            },

            {
                name: "Pepsi",
                slug: "pepsi-1-5l",
                description:
                    "Carbonated cola soft drink.",
                category: findCat("beverages-and-drinks"),
                price: 155,
                discount: 0,
                quantity: 1.5,
                unit: "l",
                stock: 22,
                images: [],
            },

            {
                name: "Sprite",
                slug: "sprite-1-5l",
                description:
                    "Lemon-lime carbonated soft drink.",
                category: findCat("beverages-and-drinks"),
                price: 155,
                discount: 0,
                quantity: 1.5,
                unit: "l",
                stock: 20,
                images: [],
            },

            {
                name: "Sting Energy Drink",
                slug: "sting-energy-drink-500ml",
                description:
                    "Carbonated energy drink.",
                category: findCat("beverages-and-drinks"),
                price: 100,
                discount: 5,
                quantity: 500,
                unit: "ml",
                stock: 30,
                images: [],
            },

            {
                name: "Aquafina Drinking Water",
                slug: "aquafina-drinking-water-500ml",
                description:
                    "Packaged drinking water.",
                category: findCat("beverages-and-drinks"),
                price: 45,
                discount: 0,
                quantity: 500,
                unit: "ml",
                stock: 40,
                images: [],
            },

            {
                name: "Rooh Afza",
                slug: "rooh-afza-800ml",
                description:
                    "Rose-flavored syrup used for preparing refreshing drinks.",
                category: findCat("beverages-and-drinks"),
                price: 465,
                discount: 5,
                quantity: 800,
                unit: "ml",
                stock: 12,
                images: [],
            },

            // ==================================================
            // 8. BISCUITS, SNACKS & SWEETS
            // ==================================================

            {
                name: "Peek Freans Sooper",
                slug: "peek-freans-sooper",
                description:
                    "Popular Pakistani biscuits.",
                category: findCat("biscuits-snacks-and-sweets"),
                price: 80,
                discount: 0,
                quantity: 1,
                unit: "pack",
                stock: 35,
                images: [],
            },

            {
                name: "LU Prince Chocolate Biscuits",
                slug: "lu-prince-chocolate-biscuits",
                description:
                    "Chocolate sandwich biscuits.",
                category: findCat("biscuits-snacks-and-sweets"),
                price: 90,
                discount: 5,
                quantity: 1,
                unit: "pack",
                stock: 28,
                images: [],
            },

            {
                name: "Lays Masala Chips",
                slug: "lays-masala-chips",
                description:
                    "Potato chips with spicy masala flavor.",
                category: findCat("biscuits-snacks-and-sweets"),
                price: 100,
                discount: 0,
                quantity: 1,
                unit: "pack",
                stock: 40,
                images: [],
            },

            {
                name: "Kurleez",
                slug: "kurleez",
                description:
                    "Crunchy corn snack with a spicy flavor.",
                category: findCat("biscuits-snacks-and-sweets"),
                price: 80,
                discount: 5,
                quantity: 1,
                unit: "pack",
                stock: 30,
                images: [],
            },

            {
                name: "Cadbury Dairy Milk",
                slug: "cadbury-dairy-milk",
                description:
                    "Milk chocolate bar.",
                category: findCat("biscuits-snacks-and-sweets"),
                price: 220,
                discount: 5,
                quantity: 1,
                unit: "pack",
                stock: 20,
                images: [],
            },

            {
                name: "Chupa Chups Lollipop",
                slug: "chupa-chups-lollipop",
                description:
                    "Fruit-flavored lollipop.",
                category: findCat("biscuits-snacks-and-sweets"),
                price: 40,
                discount: 0,
                quantity: 1,
                unit: "pcs",
                stock: 40,
                images: [],
            },

            // ==================================================
            // 9. PASTA, NOODLES & READY FOODS
            // ==================================================

            {
                name: "Knorr Chicken Noodles",
                slug: "knorr-chicken-noodles-66g",
                description:
                    "Instant noodles with chicken flavor.",
                category: findCat("pasta-noodles-and-ready-foods"),
                price: 90,
                discount: 5,
                quantity: 66,
                unit: "g",
                stock: 30,
                images: [],
            },

            {
                name: "Shan Shoop Noodles",
                slug: "shan-shoop-noodles-260g",
                description:
                    "Instant noodles with spicy flavor.",
                category: findCat("pasta-noodles-and-ready-foods"),
                price: 180,
                discount: 5,
                quantity: 260,
                unit: "g",
                stock: 20,
                images: [],
            },

            {
                name: "Kolson Macaroni",
                slug: "kolson-macaroni-400g",
                description:
                    "Macaroni pasta for home cooking.",
                category: findCat("pasta-noodles-and-ready-foods"),
                price: 180,
                discount: 0,
                quantity: 400,
                unit: "g",
                stock: 14,
                images: [],
            },

            {
                name: "Kolson Spaghetti",
                slug: "kolson-spaghetti-400g",
                description:
                    "Spaghetti pasta for everyday cooking.",
                category: findCat("pasta-noodles-and-ready-foods"),
                price: 180,
                discount: 0,
                quantity: 400,
                unit: "g",
                stock: 14,
                images: [],
            },

            {
                name: "Shan Vermicelli",
                slug: "shan-vermicelli-150g",
                description:
                    "Vermicelli for traditional sweet and savory dishes.",
                category: findCat("pasta-noodles-and-ready-foods"),
                price: 110,
                discount: 5,
                quantity: 150,
                unit: "g",
                stock: 15,
                images: [],
            },

            // ==================================================
            // 10. SAUCES, KETCHUP & PICKLES
            // ==================================================

            {
                name: "National Tomato Ketchup",
                slug: "national-tomato-ketchup-800g",
                description:
                    "Tomato ketchup for meals, sandwiches and snacks.",
                category: findCat("sauces-ketchup-and-pickles"),
                price: 450,
                discount: 5,
                quantity: 800,
                unit: "g",
                stock: 12,
                images: [],
            },

            {
                name: "Shan Garlic Pickle",
                slug: "shan-garlic-pickle-370g",
                description:
                    "Spicy and tangy garlic pickle.",
                category: findCat("sauces-ketchup-and-pickles"),
                price: 350,
                discount: 5,
                quantity: 370,
                unit: "g",
                stock: 10,
                images: [],
            },

            {
                name: "Young's Mayonnaise",
                slug: "youngs-mayonnaise-500ml",
                description:
                    "Creamy mayonnaise for sandwiches and meals.",
                category: findCat("sauces-ketchup-and-pickles"),
                price: 450,
                discount: 5,
                quantity: 500,
                unit: "ml",
                stock: 14,
                images: [],
            },

            {
                name: "National Chilli Garlic Sauce",
                slug: "national-chilli-garlic-sauce-800g",
                description:
                    "Spicy chili garlic sauce for meals and snacks.",
                category: findCat("sauces-ketchup-and-pickles"),
                price: 390,
                discount: 5,
                quantity: 800,
                unit: "g",
                stock: 10,
                images: [],
            },

            {
                name: "National Mango Pickle",
                slug: "national-mango-pickle-370g",
                description:
                    "Traditional spicy mango pickle.",
                category: findCat("sauces-ketchup-and-pickles"),
                price: 340,
                discount: 5,
                quantity: 370,
                unit: "g",
                stock: 9,
                images: [],
            },

            // ==================================================
            // 11. FROZEN & CHILLED FOODS
            // ==================================================

            {
                name: "National Chicken Nuggets",
                slug: "national-chicken-nuggets-300g",
                description:
                    "Frozen chicken nuggets for quick meals.",
                category: findCat("frozen-and-chilled-foods"),
                price: 650,
                discount: 5,
                quantity: 300,
                unit: "g",
                stock: 8,
                images: [],
            },

            {
                name: "Dawn Frozen Paratha",
                slug: "dawn-frozen-paratha",
                description:
                    "Frozen paratha for convenient preparation.",
                category: findCat("frozen-and-chilled-foods"),
                price: 350,
                discount: 5,
                quantity: 1,
                unit: "pack",
                stock: 10,
                images: [],
            },

            {
                name: "McCain French Fries",
                slug: "mccain-french-fries-750g",
                description:
                    "Frozen potato fries for quick preparation.",
                category: findCat("frozen-and-chilled-foods"),
                price: 750,
                discount: 5,
                quantity: 750,
                unit: "g",
                stock: 6,
                images: [],
            },

            {
                name: "Dawn Chicken Samosa",
                slug: "dawn-chicken-samosa",
                description:
                    "Frozen chicken samosas for convenient cooking.",
                category: findCat("frozen-and-chilled-foods"),
                price: 550,
                discount: 5,
                quantity: 12,
                unit: "pcs",
                stock: 8,
                images: [],
            },

            // ==================================================
            // 12. HOUSEHOLD & CLEANING
            // ==================================================

            {
                name: "Vim Dishwash Liquid",
                slug: "vim-dishwash-liquid-500ml",
                description:
                    "Dishwashing liquid for removing grease and food residue.",
                category: findCat("household-and-cleaning"),
                price: 300,
                discount: 5,
                quantity: 500,
                unit: "ml",
                stock: 15,
                images: [],
            },

            {
                name: "Harpic Toilet Cleaner",
                slug: "harpic-toilet-cleaner-500ml",
                description:
                    "Toilet cleaning liquid for household bathrooms.",
                category: findCat("household-and-cleaning"),
                price: 330,
                discount: 5,
                quantity: 500,
                unit: "ml",
                stock: 12,
                images: [],
            },

            {
                name: "Dettol Antiseptic Liquid",
                slug: "dettol-antiseptic-liquid-500ml",
                description:
                    "Antiseptic liquid for household hygiene and cleaning.",
                category: findCat("household-and-cleaning"),
                price: 550,
                discount: 5,
                quantity: 500,
                unit: "ml",
                stock: 10,
                images: [],
            },

            {
                name: "Max Floor Cleaner",
                slug: "max-floor-cleaner-1l",
                description:
                    "Floor cleaning liquid for household cleaning.",
                category: findCat("household-and-cleaning"),
                price: 350,
                discount: 5,
                quantity: 1,
                unit: "l",
                stock: 10,
                images: [],
            },

            {
                name: "Air Freshener",
                slug: "air-freshener-300ml",
                description:
                    "Fragrance spray for household spaces.",
                category: findCat("household-and-cleaning"),
                price: 450,
                discount: 5,
                quantity: 300,
                unit: "ml",
                stock: 8,
                images: [],
            },

            // ==================================================
            // 13. LAUNDRY CARE
            // ==================================================

            {
                name: "Surf Excel Washing Powder",
                slug: "surf-excel-washing-powder-1kg",
                description:
                    "Laundry detergent powder for everyday clothes washing.",
                category: findCat("laundry-care"),
                price: 620,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 15,
                images: [],
            },

            {
                name: "Brite Maximum Power Detergent",
                slug: "brite-maximum-power-detergent-1kg",
                description:
                    "Laundry detergent powder for everyday washing.",
                category: findCat("laundry-care"),
                price: 620,
                discount: 5,
                quantity: 1,
                unit: "kg",
                stock: 14,
                images: [],
            },

            {
                name: "Bonus Tristar Washing Powder",
                slug: "bonus-tristar-washing-powder-960g",
                description:
                    "Affordable laundry detergent powder.",
                category: findCat("laundry-care"),
                price: 270,
                discount: 0,
                quantity: 960,
                unit: "g",
                stock: 18,
                images: [],
            },

            {
                name: "Comfort Fabric Softener",
                slug: "comfort-fabric-softener-800ml",
                description:
                    "Fabric conditioner for softer and fresher clothes.",
                category: findCat("laundry-care"),
                price: 650,
                discount: 5,
                quantity: 800,
                unit: "ml",
                stock: 8,
                images: [],
            },

            // ==================================================
            // 14. PERSONAL & BABY CARE
            // ==================================================

            {
                name: "Lifebuoy Total Soap",
                slug: "lifebuoy-total-soap-115g",
                description:
                    "Antibacterial bathing soap for everyday hygiene.",
                category: findCat("personal-and-baby-care"),
                price: 120,
                discount: 5,
                quantity: 115,
                unit: "g",
                stock: 25,
                images: [],
            },

            {
                name: "Lux Soft Touch Soap",
                slug: "lux-soft-touch-soap-100g",
                description:
                    "Fragranced bathing soap for personal care.",
                category: findCat("personal-and-baby-care"),
                price: 110,
                discount: 5,
                quantity: 100,
                unit: "g",
                stock: 25,
                images: [],
            },

            {
                name: "Colgate Maximum Cavity Protection",
                slug: "colgate-maximum-cavity-protection-100g",
                description:
                    "Toothpaste for daily oral hygiene.",
                category: findCat("personal-and-baby-care"),
                price: 230,
                discount: 5,
                quantity: 100,
                unit: "g",
                stock: 16,
                images: [],
            },

            {
                name: "Sunsilk Shampoo",
                slug: "sunsilk-shampoo-360ml",
                description:
                    "Everyday shampoo for hair cleansing and care.",
                category: findCat("personal-and-baby-care"),
                price: 550,
                discount: 5,
                quantity: 360,
                unit: "ml",
                stock: 10,
                images: [],
            },

            {
                name: "Nivea Body Lotion",
                slug: "nivea-body-lotion-200ml",
                description:
                    "Moisturizing body lotion for daily skin care.",
                category: findCat("personal-and-baby-care"),
                price: 750,
                discount: 5,
                quantity: 200,
                unit: "ml",
                stock: 8,
                images: [],
            },

            {
                name: "Pampers Diapers",
                slug: "pampers-diapers-medium",
                description:
                    "Disposable baby diapers for everyday use.",
                category: findCat("personal-and-baby-care"),
                price: 1450,
                discount: 5,
                quantity: 1,
                unit: "pack",
                stock: 7,
                images: [],
            },

            {
                name: "Johnson's Baby Shampoo",
                slug: "johnsons-baby-shampoo-200ml",
                description:
                    "Gentle baby shampoo for everyday bathing.",
                category: findCat("personal-and-baby-care"),
                price: 650,
                discount: 5,
                quantity: 200,
                unit: "ml",
                stock: 8,
                images: [],
            },

            // ==================================================
            // 15. TISSUES, DISPOSABLE & GENERAL
            // ==================================================

            {
                name: "Rose Petal Facial Tissue",
                slug: "rose-petal-facial-tissue",
                description:
                    "Soft facial tissues for everyday household use.",
                category: findCat("tissues-disposable-and-general"),
                price: 235,
                discount: 4,
                quantity: 1,
                unit: "pack",
                stock: 18,
                images: [],
            },

            {
                name: "Rose Petal Toilet Tissue",
                slug: "rose-petal-toilet-tissue",
                description:
                    "Soft toilet tissue for household use.",
                category: findCat("tissues-disposable-and-general"),
                price: 110,
                discount: 0,
                quantity: 1,
                unit: "roll",
                stock: 30,
                images: [],
            },

            {
                name: "Disposable Paper Cups",
                slug: "disposable-paper-cups",
                description:
                    "Disposable paper cups for drinks and gatherings.",
                category: findCat("tissues-disposable-and-general"),
                price: 250,
                discount: 5,
                quantity: 25,
                unit: "pcs",
                stock: 12,
                images: [],
            },

            {
                name: "National Ball Pen",
                slug: "national-ball-pen-blue",
                description:
                    "Blue ballpoint pen for everyday writing.",
                category: findCat("tissues-disposable-and-general"),
                price: 40,
                discount: 0,
                quantity: 1,
                unit: "pcs",
                stock: 50,
                images: [],
            },

            {
                name: "AA Batteries",
                slug: "aa-batteries-2-pack",
                description:
                    "AA batteries for common household devices.",
                category: findCat("tissues-disposable-and-general"),
                price: 180,
                discount: 5,
                quantity: 2,
                unit: "pcs",
                stock: 15,
                images: [],
            },

            {
                name: "Kitchen Matchbox",
                slug: "kitchen-matchbox",
                description:
                    "Household matchbox for everyday kitchen use.",
                category: findCat("tissues-disposable-and-general"),
                price: 25,
                discount: 0,
                quantity: 1,
                unit: "pack",
                stock: 40,
                images: [],
            },
        ];

        // ==================================================
        // INSERT PRODUCTS
        // ==================================================

        const insertedProducts = await Product.insertMany(products);

        // ==================================================
        // FINAL SUMMARY
        // ==================================================

        console.log("--------------------------------------");
        console.log("Seed completed successfully");
        console.log(`Categories: ${categories.length}`);
        console.log(`Products:   ${insertedProducts.length}`);
        console.log("--------------------------------------");

        process.exit(0);

    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
};

run();

