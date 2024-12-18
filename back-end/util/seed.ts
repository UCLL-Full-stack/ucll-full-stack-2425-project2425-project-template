import db  from './database';

async function main() {
    try {
      await db.stats.deleteMany()
      await db.player.deleteMany()
      await db.coach.deleteMany()
      await db.match.deleteMany()
      await seed();
    } catch (e) {
      console.error(e);
    } finally {
      await db.$disconnect();
    }
  };

  async function seed() {}