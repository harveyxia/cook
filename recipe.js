// recipe
var recipeSchema = {
    "name": "Name of Dish",
    "description": "This is a delicious...",
    "tags": ["Southern", "Beef"],
    "timing": "time in hours",
    "yield":
        {
            "q": { "val": 8, "unit": "g" },
            "description": "about 5 pint jars"
        },
    "equipment":
        {
            "equipment1": equipmentSchema,
            "equipment2": equipmentSchema
        },
    "ingredients":
        {
            "main":
                {
                    "ingredient1UniqueName": [
                        ingredient1Type1Schema,
                        ingredient1Type2Schema
                    ],
                    "ingredient2UniqueName": ingredientSchema
                },
            "sauce":
                {
                    "ingredient1UniqueName": ingredientSchema,
                    "ingredient2UniqueName": ingredientSchema
                }
        },
    "steps": [
        stepSchema,
        stepSchema,
        stepSchema
    ]
};

var ingredientSchema = {
    "name": "Onion",
    "q": 200,
    "unit": "g",
    "type": "diced",
    "substitutes": ["shallot", "spring onion"]
};

var equipmentSchema = {
    "size": {"val": 8, "unit": "liters"},
    "description": "has handle"
};

var quantitySchema = {
    "val": 8,
    "unit": "g" // servings, grams, ml, etc.
};

var stepSchema = {
    "heading": "Prepare the oven",
    "procedure": ["Preheat the oven to...", "then do this", "then do that"],
    "ingredients":
        {
            "ingredient1Name": ingredientSchema
        }
}