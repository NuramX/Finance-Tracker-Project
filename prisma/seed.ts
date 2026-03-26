import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Start seeding...')
  
  // เช็คเบื้องต้นว่าหา DB เจอไหม
  try {
    const categories = [
      { name: 'Food & Drinks', icon: '🍔' },
      { name: 'Transport', icon: '🚗' },
      { name: 'Shopping', icon: '🛍️' },
      { name: 'Entertainment', icon: '🎬' },
    ]

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { name: cat.name },
        update: {},
        create: {
          name: cat.name,
          icon: cat.icon,
        },
      })
    }
    console.log('✅ Seeding finished successfully!')
  } catch (error) {
    console.error('❌ Database error:', error)
  }
}

main()
  .catch((e) => {
    console.error('❌ Script error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })