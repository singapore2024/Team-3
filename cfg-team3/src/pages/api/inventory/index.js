export default async function handler(req, res) {

    if (method === 'GET') {
        try {
            
            const [rows] = await pool.query('SELECT * FROM Inventory');

            res.status(200).json(rows);
        } catch (error) {
            // Handle errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}

// datasource db {
//     provider = "postgresql" // Change this to your database provider: "mysql" or "sqlite"
//     url      = env("DATABASE_URL")
//   }

// model Inventory
//     id Int
//     ingredientID Int
//     quantity Int
  
//   model Ingredients {
//     id        Int      @id @default(autoincrement()) // Primary key, auto-incremented
//     name      string
//     price     Float
//     createdAt DateTime @default(now())  // Automatically set timestamp
//     updatedAt DateTime @updatedAt       // Automatically update on change
  
//     // Relations
//     recipes   Recipe[] // One-to-many relationship with Recipe
//   }
  
//   model Recipe {
//     id        Int     @id @default(autoincrement()) // Primary key, auto-incremented
//     name      String

// model RecipeIngredients
//    id Int
//   recipeID Int
//   ingredientID Int
//  ingredient_quantity Int

// model Timeslot
//     id Int 
//     name String (morning, delivery, lunch)

// model Shifts
//     id Int 
//     slot Timeslot
//     date DateTime


// model Orders 
//     id int
//     orderid int
//     customerName String
//     recipe recipe(id)
//     quantity Int
//     datetime DateTime
//     status String






