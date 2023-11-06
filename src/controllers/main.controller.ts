import { Request, Response } from 'express';
import prismaI from '../config/prisma.config';

const getUserBalance = async (req: Request, res: Response) => {
    const { uid: id } = req.params;

    if (!id) return res.send({ message: 'Invalid user' })

    const userData = await prismaI.user.findFirstOrThrow({
        where: { id },
        include: {
            merchant: {
                select: { ckbtcAddress: true }
            }
        }
    }).catch((err) => {
        return res.send(err);
    });

    // Here we can send the requeste to external EP

    return res.send({ messsage: 'UserBalance', data: userData });
};

const getPaymentStatus = async (req: Request, res: Response) => {
    // Here we can send the requeste to external EP
    return res.send({ message: "Payment finished", data: true });
};

const getPaymentReceived = async (req: Request, res: Response) => {
    // Here we can send the requeste to external EP
    return res.send({ message: "Payment is in process", data: false });
};

const getPaymentHistory = async (req: Request, res: Response) => {
    const { uid: userId } = req.params;
    if (!userId) return res.send({ message: 'Invalid user' });

    const paymentHistory = await prismaI.transaction.findMany({
        where: { userId },
        include: { terminal: { select: { name: true } } }
    });

    return res.send({ message: "Payment History", data: paymentHistory });
}

const createPaymentRequest = async (req: Request, res: Response) => {
    const { terminalId, userId } = req.body;

    if (!terminalId || !userId) return res.send({ message: 'Invalid terminal or user' });

    const createTransaction = await prismaI.transaction.create({
        data: {
            terminalId,
            userId,
            amount: 2.00,
            status: false,
        },
        include: { terminal: { include: { merchant: { select: { ckbtcAddress: true } } } } }
    });

    return res.send({ message: 'Request Created', data: createTransaction })
};

export {
    getUserBalance,
    createPaymentRequest,
    getPaymentStatus,
    getPaymentReceived,
    getPaymentHistory
}