// pages/api/calculator/index.js

export default async function handler(req, res) {
  const { method, query } = req;

  if (method == "GET") {
    // Fetch all products from the database
    const [orders] = await pool.query("SELECT * FROM Orders");

    // Step 2: Fetch the recipe ingredients for all recipes
    const [recipeIngredients] = await pool.query(`
            SELECT ri.recipe_id, ri.ingredient_id, ri.quantity AS ingredient_quantity, i.name AS ingredient_name
            FROM RecipeIngredients ri
            JOIN Ingredients i ON ri.ingredient_id = i.id
        `);

    // Step 3: Create a map to store the total quantity of each ingredient needed
    const ingredientMap = {};

    // Step 4: Calculate the total ingredients needed for all orders
    orders.forEach((order) => {
      const { recipe_id, quantity } = order;

      // Find all ingredients for the current recipe
      const ingredientsForRecipe = recipeIngredients.filter(
        (ri) => ri.recipeID === recipe_id
      );

      ingredientsForRecipe.forEach(
        ({ ingredient_id, ingredient_quantity, ingredient_name }) => {
          // Calculate the total quantity needed for this ingredient
          const totalQuantityNeeded = ingredient_quantity * quantity;

          // Update the ingredient map
          if (!ingredientMap[ingredient_id]) {
            ingredientMap[ingredient_id] = {
              name: ingredient_name,
              totalQuantity: 0,
            };
          }
          ingredientMap[ingredient_id].totalQuantity += totalQuantityNeeded;
        }
      );
    });

    // Step 5: Convert the ingredient map to an array and send it in the response
    const totalIngredientsNeeded = Object.values(ingredientMap);
    res.status(200).json(totalIngredientsNeeded);
  } else {
    // Method not allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// // Function to handle adding an item
// async function addProduct(req, res) {
//     const { recipe_id, } = req.body;

//     if (!product_id || !quantity) {
//         return res.status(400).json({ error: 'product and quantity are required' });
//     }

//     // Logic to add the item
//     // For example, add the item to a database (this is a placeholder)
//     const newItem = { id: Date.now(), itemName, quantity };

//     return res.status(201).json({ message: 'Item added successfully', item: newItem });
// }

// // Function to handle deleting an item
// async function deleteItem(req, res) {
//     const { id } = req.body;

//     if (!id) {
//         return res.status(400).json({ error: 'Item ID is required' });
//     }

//     // Logic to delete the item
//     // For example, remove the item from a database (this is a placeholder)

//     return res.status(200).json({ message: `Item with ID ${id} deleted successfully` });
// }
