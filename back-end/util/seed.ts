import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Reset auto-increment IDs and delete existing records
  await prisma.$executeRaw`TRUNCATE TABLE "Cocktail" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CocktailIngredient" RESTART IDENTITY CASCADE`;

  console.log("Existing data deleted and IDs reset.");

  // Seed Cocktails
  const cocktails = await prisma.cocktail.createMany({
    data: [
      { name: "Mojito", description: "A refreshing Cuban cocktail with lime, mint, and rum.", strongness: 3, image: "/images/mojito.jpg", authorId: 1 },
      { name: "Moscow Mule", description: "A cocktail made with vodka, ginger beer, and lime.", strongness: 3, image: "/images/moscowMule.jpg", authorId: 1},
      { name: "Amaretto Sour", description: "A cocktail made with Amaretto liqueur and lemon juice.", strongness: 2, image: "/images/amarettoSour.jpg", authorId: 1 },
      { name: "Pornstar Martini", description: "A cocktail with passion fruit and vanilla vodka.", strongness: 4, image: "/images/pornstarMartini.jpg", authorId: 1},
      { name: "Caipirinha", description: "A Brazilian cocktail with cachaça, lime, and sugar.", strongness: 4, image: "/images/caipirinha.jpg", authorId: 1 },
      { name: "Vesper", description: "A gin and vodka martini with Lillet Blanc.", strongness: 4, image: "/images/vesper.jpg", authorId: 1 },
      { name: "Vodka Martini", description: "A vodka martini served with an olive.", strongness: 4, image: "/images/vodkaMartini.jpg", authorId: 1 },
      { name: "Cosmopolitan", description: "A vodka cocktail with cranberry and lime.", strongness: 3, image: "/images/cosmopolitan.jpg", authorId: 1 },
      { name: "Carajillo", description: "A coffee cocktail with espresso and liqueur.", strongness: 2, image: "/images/carajillo.jpg", authorId: 1 },
      { name: "Gin Basil Smash", description: "A gin cocktail with lemon and basil.", strongness: 3, image: "/images/ginBasilSmash.jpg", authorId: 1 },
      { name: "Pina Colada", description: "A tropical cocktail with rum and coconut.", strongness: 3, image: "/images/pinaColada.jpg" , authorId: 1},
      { name: "Margarita", description: "A tequila cocktail with lime and salt rim.", strongness: 4, image: "/images/margarita.jpg", authorId: 1 },
      { name: "Zombie", description: "A strong rum cocktail with fruit juices.", strongness: 5, image: "/images/zombie.jpg" , authorId: 1},
      { name: "Mai Tai", description: "A rum cocktail with curaçao and lime.", strongness: 5, image: "/images/maiTai.jpg" , authorId: 1},
      { name: "Americano", description: "A Campari and vermouth cocktail with soda.", strongness: 2, image: "/images/americano.jpg", authorId: 1 },
      { name: "Bloody Mary", description: "A vodka and tomato juice cocktail.", strongness: 3, image: "/images/bloodyMary.jpg" , authorId: 1},
      { name: "Manhattan", description: "A whiskey cocktail with vermouth and bitters.", strongness: 4, image: "/images/manhattan.jpg" , authorId: 1},
      { name: "Penicillin", description: "A scotch cocktail with honey-ginger syrup.", strongness: 4, image: "/images/penicillin.jpg" , authorId: 1},
      { name: "Aperol Spritz", description: "A spritz cocktail with Aperol and prosecco.", strongness: 2, image: "/images/aperolSpritz.jpg" , authorId: 1},
      { name: "Dry Martini", description: "A classic gin martini with dry vermouth.", strongness: 5, image: "/images/dryMartini.jpg", authorId: 1 },
      { name: "Whiskey Sour", description: "A whiskey cocktail with lemon juice.", strongness: 3, image: "/images/whiskeySour.jpg", authorId: 1 },
      { name: "Daiquiri", description: "A rum cocktail with lime juice and syrup.", strongness: 3, image: "/images/daiquiri.jpg", authorId: 1 },
    ],
  });

  console.log(`${cocktails.count} cocktails created.`);

  // Seed Ingredients
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: "White rum" }, // 1
      { name: "Mint leaves" },// 2
      { name: "Lime" },// 3
      { name: "Sugar" },// 4
      { name: "Soda water" }, //5
      { name: "Ice" }, // 6
      { name: "Vodka" }, // 7
      { name: "Ginger beer" }, // 8
      { name: "Lime juice" }, // 9
      { name: "Lime wedge" }, // 10
      { name: "Amaretto liqueur" }, // 11
      { name: "Lemon juice" }, // 12
      { name: "Simple syrup" },   // 13
      { name: "Egg white" }, // 14
      { name: "Cherry" }, // 15
      { name: "Vanilla vodka" }, // 16
      { name: "Passion fruit puree" }, // 17
      { name: "Prosecco" }, // 18
      { name: "Half passion fruit" }, // 19
      { name: "Cachaça" }, // 20
      { name: "Gin" }, // 21
      { name: "Lillet Blanc" }, // 22
      { name: "Lemon twist" }, // 23
      { name: "Dry vermouth" }, // 24
      { name: "Olive" }, // 25
      { name: "Triple sec" },   // 26
      { name: "Cranberry juice" }, // 27
      { name: "Coffee liqueur" }, // 28
      { name: "Espresso" }, // 29
      { name: "Basil leaves" }, // 30
      { name: "Coconut cream" }, // 31
      { name: "Pineapple juice" }, // 32
      { name: "Tequila" }, // 33
      { name: "Dark rum" }, // 34
      { name: "Apricot brandy" }, // 35
      { name: "Orange curaçao" }, // 36
      { name: "Campari" }, // 37
      { name: "Sweet vermouth" }, // 38
      { name: "Tomato juice" }, // 39
      { name: "Worcestershire sauce" }, // 40
      { name: "Tabasco" }, // 41
      { name: "Salt and pepper" }, // 42
      { name: "Rye whiskey" }, // 43
      { name: "Angostura bitters" }, // 44
      { name: "Blended scotch" }, // 45
      { name: "Honey-ginger syrup" }, // 46
      { name: "Islay scotch" }, // 47
      { name: "Aperol" }, // 48
      { name: "Prosecco" }, // 49
      { name: "Soda water" }, // 50
    ],
  });

  console.log(`${ingredients.count} ingredients created.`);

  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { name: "admin", email: "admin@email.com", password: await bcrypt.hash('admin', 12), role: "Admin" },
      { name: "user01", email: "user1@email.com", password: await bcrypt.hash('user1', 12) , role : "User" },
      { name: "moderator1", email: "moderator1@email.com", password: await bcrypt.hash('moderator1', 12) , role: "Moderator" },
    ],
  });

  console.log(`${users.count} users created.`);

  // Seed CocktailIngredients (many-to-many relationships)
  const cocktailIngredients = await prisma.cocktailIngredient.createMany({
    data: [
      { cocktailId: 1, ingredientId: 1, amount: "50ml" },
      { cocktailId: 1, ingredientId: 2, amount: "10 leaves" },
      { cocktailId: 1, ingredientId: 3, amount: "1/2 lime" },
      { cocktailId: 1, ingredientId: 4, amount: "2 tsp" },
      { cocktailId: 1, ingredientId: 5, amount: "Top off" },
      { cocktailId: 1, ingredientId: 6, amount: "As needed" },

      { cocktailId: 2, ingredientId: 7, amount: "60ml" }, // Vodka
      { cocktailId: 2, ingredientId: 8, amount: "120ml" }, // Ginger beer
      { cocktailId: 2, ingredientId: 9, amount: "15ml" }, // Lime juice
      { cocktailId: 2, ingredientId: 6, amount: "As needed" }, // Ice
      { cocktailId: 2, ingredientId: 10, amount: "1 wedge" }, // Lime wedge

      // Amaretto Sour
      { cocktailId: 3, ingredientId: 11, amount: "45ml" }, // Amaretto liqueur
      { cocktailId: 3, ingredientId: 12, amount: "30ml" }, // Lemon juice
      { cocktailId: 3, ingredientId: 13, amount: "10ml" }, // Simple syrup
      { cocktailId: 3, ingredientId: 14, amount: "(1 optional)" }, // Egg white
      { cocktailId: 3, ingredientId: 6, amount: "As needed" }, // Ice
      { cocktailId: 3, ingredientId: 15, amount: "For garnish" }, // Cherry

      // Pornstar Martini
      { cocktailId: 4, ingredientId: 16, amount: "45ml" }, // Vanilla vodka
      { cocktailId: 4, ingredientId: 17, amount: "30ml" }, // Passion fruit puree
      { cocktailId: 4, ingredientId: 12, amount: "15ml" }, // Lime juice
      { cocktailId: 4, ingredientId: 18, amount: "Served on the side" }, // Prosecco
      { cocktailId: 4, ingredientId: 6, amount: "As needed" }, // Ice
      { cocktailId: 4, ingredientId: 19, amount: "1/2 for garnish" }, // Half passion fruit

      // Caipirinha
      { cocktailId: 5, ingredientId: 20, amount: "50ml" }, // Cachaça
      { cocktailId: 5, ingredientId: 3, amount: "1 whole" }, // Lime
      { cocktailId: 5, ingredientId: 4, amount: "2 tsp" }, // Sugar
      { cocktailId: 5, ingredientId: 6, amount: "As needed" }, // Ice

      // Vesper
      { cocktailId: 6, ingredientId: 21, amount: "60ml" }, // Gin
      { cocktailId: 6, ingredientId: 7, amount: "15ml" }, // Vodka
      { cocktailId: 6, ingredientId: 22, amount: "7.5ml" }, // Lillet Blanc
      { cocktailId: 6, ingredientId: 23, amount: "1 for garnish" }, // Lemon twist

      // Vodka Martini
      { cocktailId: 7, ingredientId: 7, amount: "60ml" }, // Vodka
      { cocktailId: 7, ingredientId: 24, amount: "15ml" }, // Dry vermouth
      { cocktailId: 7, ingredientId: 25, amount: "1 for garnish" }, // Olive

      // Cosmopolitan
      { cocktailId: 8, ingredientId: 7, amount: "45ml" }, // Vodka
      { cocktailId: 8, ingredientId: 26, amount: "15ml" }, // Triple sec
      { cocktailId: 8, ingredientId: 27, amount: "30ml" }, // Cranberry juice
      { cocktailId: 8, ingredientId: 9, amount: "10ml" }, // Lime juice

      // Carajillo
      { cocktailId: 9, ingredientId: 28, amount: "45ml" }, // Coffee liqueur
      { cocktailId: 9, ingredientId: 29, amount: "30ml" }, // Espresso

      // Gin Basil Smash
      { cocktailId: 10, ingredientId: 21, amount: "50ml" }, // Gin
      { cocktailId: 10, ingredientId: 12, amount: "25ml" }, // Lemon juice
      { cocktailId: 10, ingredientId: 13, amount: "15ml" }, // Simple syrup
      { cocktailId: 10, ingredientId: 30, amount: "10 leaves" }, // Basil leaves

      // Pina Colada
      { cocktailId: 11, ingredientId: 1, amount: "45ml" }, // White rum
      { cocktailId: 11, ingredientId: 31, amount: "30ml" }, // Coconut cream
      { cocktailId: 11, ingredientId: 32, amount: "90ml" }, // Pineapple juice
      { cocktailId: 11, ingredientId: 6, amount: "As needed" }, // Ice

      // Margarita
      { cocktailId: 12, ingredientId: 33, amount: "50ml" }, // Tequila
      { cocktailId: 12, ingredientId: 26, amount: "25ml" }, // Triple sec
      { cocktailId: 12, ingredientId: 9, amount: "20ml" }, // Lime juice
      { cocktailId: 12, ingredientId: 34, amount: "For rim" }, // Salt

      // Zombie
      { cocktailId: 13, ingredientId: 35, amount: "20ml" }, // Dark rum
      { cocktailId: 13, ingredientId: 1, amount: "20ml" }, // White rum
      { cocktailId: 13, ingredientId: 36, amount: "15ml" }, // Apricot brandy
      { cocktailId: 13, ingredientId: 32, amount: "30ml" }, // Pineapple juice
      { cocktailId: 13, ingredientId: 9, amount: "10ml" }, // Lime juice

      // Mai Tai
      { cocktailId: 14, ingredientId: 35, amount: "30ml" }, // Dark rum
      { cocktailId: 14, ingredientId: 1, amount: "30ml" }, // White rum
      { cocktailId: 14, ingredientId: 37, amount: "15ml" }, // Orange curaçao
      { cocktailId: 14, ingredientId: 9, amount: "15ml" }, // Lime juice

      // Americano
      { cocktailId: 15, ingredientId: 38, amount: "30ml" }, // Campari
      { cocktailId: 15, ingredientId: 39, amount: "30ml" }, // Sweet vermouth
      { cocktailId: 15, ingredientId: 5, amount: "Top off" }, // Soda water

      // Bloody Mary
      { cocktailId: 16, ingredientId: 7, amount: "45ml" }, // Vodka
      { cocktailId: 16, ingredientId: 40, amount: "90ml" }, // Tomato juice
      { cocktailId: 16, ingredientId: 12, amount: "15ml" }, // Lemon juice
      { cocktailId: 16, ingredientId: 41, amount: "2 dashes" }, // Worcestershire sauce
      { cocktailId: 16, ingredientId: 42, amount: "to taste" }, // Tabasco
      { cocktailId: 16, ingredientId: 43, amount: "to taste" }, // Salt and pepper

      // Manhattan
      { cocktailId: 17, ingredientId: 43, amount: "60ml" }, // Rye whiskey
      { cocktailId: 17, ingredientId: 39, amount: "30ml" }, // Sweet vermouth
      { cocktailId: 17, ingredientId: 44, amount: "2 dashes" }, // Angostura bitters

      // Penicillin
      { cocktailId: 18, ingredientId: 45, amount: "45ml" }, // Blended scotch
      { cocktailId: 18, ingredientId: 46, amount: "15ml" }, // Honey-ginger syrup
      { cocktailId: 18, ingredientId: 9, amount: "20ml" }, // Lemon juice
      { cocktailId: 18, ingredientId: 47, amount: "7.5ml float" }, // Islay scotch

      // Aperol Spritz
      { cocktailId: 19, ingredientId: 48, amount: "60ml" }, // Aperol
      { cocktailId: 19, ingredientId: 49, amount: "90ml" }, // Prosecco
      { cocktailId: 19, ingredientId: 50, amount: "30ml" }, // Soda water

      // Dry Martini
      { cocktailId: 20, ingredientId: 21, amount: "60ml" }, // Gin
      { cocktailId: 20, ingredientId: 24, amount: "10ml" }, // Dry vermouth
      { cocktailId: 20, ingredientId: 25, amount: "1 for garnish" }, // Olive

      // Whiskey Sour
      { cocktailId: 21, ingredientId: 43, amount: "50ml" }, // Whiskey
      { cocktailId: 21, ingredientId: 12, amount: "20ml" }, // Lemon juice
      { cocktailId: 21, ingredientId: 13, amount: "15ml" }, // Simple syrup

      // Daiquiri
      { cocktailId: 22, ingredientId: 1, amount: "60ml" }, // White rum
      { cocktailId: 22, ingredientId: 9, amount: "20ml" }, // Lime juice
      { cocktailId: 22, ingredientId: 13, amount: "10ml" }, // Simple syrup
    
    ]
  });

  console.log(`${cocktailIngredients.count} cocktail ingredients created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
