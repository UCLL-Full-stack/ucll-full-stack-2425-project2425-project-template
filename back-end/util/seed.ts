import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Cocktails
  const cocktails = await prisma.cocktail.createMany({
    data: [
      { name: "Mojito", description: "A refreshing Cuban cocktail with lime, mint, and rum.", strongness: 3, image: "/images/mojito.jpg" },
      { name: "Moscow Mule", description: "A cocktail made with vodka, ginger beer, and lime.", strongness: 3, image: "/images/moscowMule.jpg" },
      { name: "Amaretto Sour", description: "A cocktail made with Amaretto liqueur and lemon juice.", strongness: 2, image: "/images/amarettoSour.jpg" },
      { name: "Pornstar Martini", description: "A cocktail with passion fruit and vanilla vodka.", strongness: 4, image: "/images/pornstarMartini.jpg" },
      { name: "Caipirinha", description: "A Brazilian cocktail with cachaça, lime, and sugar.", strongness: 4, image: "/images/caipirinha.jpg" },
      { name: "Vesper", description: "A gin and vodka martini with Lillet Blanc.", strongness: 4, image: "/images/vesper.jpg" },
      { name: "Vodka Martini", description: "A vodka martini served with an olive.", strongness: 4, image: "/images/vodkaMartini.jpg" },
      { name: "Cosmopolitan", description: "A vodka cocktail with cranberry and lime.", strongness: 3, image: "/images/cosmopolitan.jpg" },
      { name: "Carajillo", description: "A coffee cocktail with espresso and liqueur.", strongness: 2, image: "/images/carajillo.jpg" },
      { name: "Gin Basil Smash", description: "A gin cocktail with lemon and basil.", strongness: 3, image: "/images/ginBasilSmash.jpg" },
      { name: "Pina Colada", description: "A tropical cocktail with rum and coconut.", strongness: 3, image: "/images/pinaColada.jpg" },
      { name: "Margarita", description: "A tequila cocktail with lime and salt rim.", strongness: 4, image: "/images/margarita.jpg" },
      { name: "Zombie", description: "A strong rum cocktail with fruit juices.", strongness: 5, image: "/images/zombie.jpg" },
      { name: "Mai Tai", description: "A rum cocktail with curaçao and lime.", strongness: 5, image: "/images/maiTai.jpg" },
      { name: "Americano", description: "A Campari and vermouth cocktail with soda.", strongness: 2, image: "/images/americano.jpg" },
      { name: "Bloody Mary", description: "A vodka and tomato juice cocktail.", strongness: 3, image: "/images/bloodyMary.jpg" },
      { name: "Manhattan", description: "A whiskey cocktail with vermouth and bitters.", strongness: 4, image: "/images/manhattan.jpg" },
      { name: "Penicillin", description: "A scotch cocktail with honey-ginger syrup.", strongness: 4, image: "/images/penicillin.jpg" },
      { name: "Aperol Spritz", description: "A spritz cocktail with Aperol and prosecco.", strongness: 2, image: "/images/aperolSpritz.jpg" },
      { name: "Dry Martini", description: "A classic gin martini with dry vermouth.", strongness: 5, image: "/images/dryMartini.jpg" },
      { name: "Whiskey Sour", description: "A whiskey cocktail with lemon juice.", strongness: 3, image: "/images/whiskeySour.jpg" },
      { name: "Daiquiri", description: "A rum cocktail with lime juice and syrup.", strongness: 3, image: "/images/daiquiri.jpg" },
    ],
  });

  console.log(`${cocktails.count} cocktails created.`);

  // Seed Ingredients
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: "White rum" },
      { name: "Mint leaves" },
      { name: "Lime" },
      { name: "Sugar" },
      { name: "Soda water" },
      { name: "Ice" },
      { name: "Vodka" },
      { name: "Ginger beer" },
      { name: "Lime juice" },
      { name: "Lime wedge" },
      { name: "Amaretto liqueur" },
      { name: "Lemon juice" },
      { name: "Simple syrup" },
      { name: "Egg white" },
      { name: "Cherry" },
      { name: "Vanilla vodka" },
      { name: "Passion fruit puree" },
      { name: "Prosecco" },
      { name: "Half passion fruit" },
      { name: "Cachaça" },
      { name: "Gin" },
      { name: "Lillet Blanc" },
      { name: "Lemon twist" },
      { name: "Dry vermouth" },
      { name: "Olive" },
      { name: "Triple sec" },
      { name: "Cranberry juice" },
      { name: "Coffee liqueur" },
      { name: "Espresso" },
      { name: "Basil leaves" },
      { name: "Coconut cream" },
      { name: "Pineapple juice" },
      { name: "Tequila" },
      { name: "Dark rum" },
      { name: "Apricot brandy" },
      { name: "Orange curaçao" },
      { name: "Campari" },
      { name: "Sweet vermouth" },
      { name: "Tomato juice" },
      { name: "Worcestershire sauce" },
      { name: "Tabasco" },
      { name: "Salt and pepper" },
      { name: "Rye whiskey" },
      { name: "Angostura bitters" },
      { name: "Blended scotch" },
      { name: "Honey-ginger syrup" },
      { name: "Islay scotch" },
    ],
  });

  console.log(`${ingredients.count} ingredients created.`);

  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { name: "Bazinga", email: "Bazinga@email.com", password: "L" },
      { name: "Badinga", email: "Badinga@email.com", password: "L" },
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
      // Additional cocktail-ingredient relationships...
    ],
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
