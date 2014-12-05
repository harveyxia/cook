// recipe
var recipeSchema = {
    "name": "Name of Dish",
    "description": "This is a delicious...",
    "tags": ["Southern", "Beef"],
    "timing": "time in hours",
    "yield":
        {
            "quantity": { "val": 8, "unit": "g" },
            "description": "about 5 pint jars"
        },
    "equipment":
        {
            "equipment1": equipmentSchema,
            "equipment2": equipmentSchema
        },
    "ingredients":
        {
            "ingredient1Name": ingredientSchema,
            "ingredient2Name": ingredientSchema
        },
    "steps": [
        stepSchema,
        stepSchema,
        stepSchema
    ]
};

var ingredientSchema = {
    "name": "Onion",
    "quantity": 200,
    "unit": "g",
    "state": "diced"
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
    "description": "Preheat the oven to...",
    "equipment":
        {
            "equipment1": equipmentSchema
        },
    "ingredients":
        {
            "ingredient1Name": ingredientSchema
        },
}