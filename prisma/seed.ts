import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const merchant = await prisma.merchant.create({
    data: {
      name: 'Merch-01',
      ckbtcAddress:
        'nhk6f-gnhhq-yntfr-55swx-watqv-7g23y-kpp2p-wg76j-tue6q-lu3lu-sqe',
    },
  })

  const terminal = await prisma.terminal.create({
    data: {
      name: 'terminal-default',
      merchantId: merchant.id,
    },
  })

  const user = await prisma.user.create({
    data: { username: 'superUser01', merchantId: merchant.id },
  })

  const transactions = await prisma.transaction.createMany({
    data: [
      {
        amount: 1.99,
        userId: user.id,
        terminalId: terminal.id,
        status: false,
      },
      {
        amount: 2.0,
        userId: user.id,
        terminalId: terminal.id,
        status: true,
      },
      {
        amount: 4.99,
        userId: user.id,
        terminalId: terminal.id,
        status: true,
      },
    ],
  })

  console.log({ merchant, terminal, user, transactions })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
