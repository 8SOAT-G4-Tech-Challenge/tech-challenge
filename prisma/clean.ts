import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.orderItem.deleteMany({});
	await prisma.order.deleteMany({});
	await prisma.productImage.deleteMany({});
	await prisma.product.deleteMany({});
	await prisma.productCategory.deleteMany({});

	console.log('Database cleaned successfully!');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
