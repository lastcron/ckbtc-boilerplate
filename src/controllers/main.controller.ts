import { Request, Response } from 'express';
import prismaI from '../config/prisma.config';
import { AccountIdentifier, LedgerCanister } from '@dfinity/ledger-icp';
import { convertStringToE8s, uint8ArrayToHexString, } from '@dfinity/utils';
import { HttpAgent, toHex } from "@dfinity/agent";
import { identity } from '../config/identify.config';
import { stringToHex } from '../helpers/verify.helper';
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { createAgent } from "@dfinity/utils";
import fetch from "cross-fetch";
import { Principal } from '@dfinity/principal';
import { CkBTCMinterCanister } from '@dfinity/ckbtc';
global.fetch = fetch;

const getUserBalance = async (req: Request, res: Response) => {
  const { uid: id } = req.params

  if (!id) return res.send({ message: 'Invalid user' })

  const userData = await prismaI.user
    .findFirstOrThrow({
      where: { id },
      include: {
        merchant: {
          select: { ckbtcAddress: true },
        },
      },
    });

  const agent = new HttpAgent({
    identity: identity(userData.merchant.ckbtcAddress),
    // identity: identity("nhk6f-gnhhq-yntfr-55swx-watqv-7g23y-kpp2p-wg76j-tue6q-lu3lu-sqe"),
    host: "https://icp-api.io"
  });

  const { metadata, balance } = IcrcLedgerCanister.create({
    agent,
    canisterId: Principal.from("mxzaz-hqaaa-aaaar-qaada-cai"),
  });

  const bal = await balance({ owner: Principal.fromText("nhk6f-gnhhq-yntfr-55swx-watqv-7g23y-kpp2p-wg76j-tue6q-lu3lu-sqe") });
  // const bal = await balance({ owner: Principal.fromText(userData.merchant.ckbtcAddress) })

  return res.send({ balance: JSON.parse(JSON.stringify(bal, (_, v) => typeof v === 'bigint' ? v.toString() : v)) })

  // return res.send({ messsage: 'UserBalance', data: userData, userBalance })
}

const getPaymentStatus = async (req: Request, res: Response) => {
  // Here we can send the requeste to external EP
  return res.send({ message: 'Payment finished', data: true })
}

const getPaymentReceived = async (req: Request, res: Response) => {
  // Here we can send the request to external EP

  return res.send({ message: 'Payment is in process', data: false })
}

const getPaymentHistory = async (req: Request, res: Response) => {
  const { uid: userId } = req.params
  if (!userId) return res.send({ message: 'Invalid user' })

  const paymentHistory = await prismaI.transaction.findMany({
    where: { userId },
    include: { terminal: { select: { name: true } } },
  })

  return res.send({ message: 'Payment History', data: paymentHistory })
}

const createPaymentRequest = async (req: Request, res: Response) => {
  const { terminalId, userId } = req.body

  if (!terminalId || !userId)
    return res.send({ message: 'Invalid terminal or user' });

  const agent = new HttpAgent({
    // identity: identity(userData.merchant.ckbtcAddress),
    identity: identity("nhk6f-gnhhq-yntfr-55swx-watqv-7g23y-kpp2p-wg76j-tue6q-lu3lu-sqe"),
    host: "https://icp-api.io"
  });

  const { transfer } = IcrcLedgerCanister.create({
    agent,
    canisterId: Principal.from("mxzaz-hqaaa-aaaar-qaada-cai"),
  });

  const transferResult = transfer({
    to: {
      owner: Principal.fromText(""),
      subaccount: []
    },
    amount: BigInt(9007199254740991)
  });

  const createTransaction = await prismaI.transaction.create({
    data: {
      terminalId,
      userId,
      amount: 2.0,
      status: false,
    },
    include: {
      terminal: { include: { merchant: { select: { ckbtcAddress: true } } } },
    },
  });

  return res.send({ message: 'Request Created', data: transferResult })
}

const ckbtcTesting = async (req: Request, res: Response) => {
  const agent = new HttpAgent({
    identity: identity('nhk6f-gnhhq-yntfr-55swx-watqv-7g23y-kpp2p-wg76j-tue6q-lu3lu-sqe'),
    host: "https://icp-api.io"
  });

  const { getBtcAddress, getMinterInfo } = CkBTCMinterCanister.create({
    agent,
    canisterId: "mqygn-kiaaa-aaaar-qaadq-cai" as any,
  });

  // const minterInfo = await getMinterInfo({});
  const btcAddress = await getBtcAddress({});
  // res.send({ btcAddress, minter: JSON.stringify(minterInfo, (_, v) => typeof v === 'bigint' ? v.toString() : v) })

  // const ledger = LedgerCanister.create()
  // const accountIdentifier = AccountIdentifier.fromHex("6e686b3666676e686871796e7466723535737778776174717637673233796b70703270776737366a74756536716c75336c75737165");

  // const { accountBalance } = LedgerCanister.create({
  //   // agent,
  //   // canisterId: "mqygn-kiaaa-aaaar-qaadq-cai" as any
  // })
  // const { accountBalance } = LedgerCanister.create()

  // const userBalance = await accountBalance({ accountIdentifier });
  res.send({ userBalance: btcAddress })


  // const ledger = LedgerCanister.create();

  // const accountIdentifier = AccountIdentifier.fromHex("6e686b3666676e686871796e7466723535737778776174717637673233796b70703270776737366a74756536716c75336c75737165");

  // const balance = await ledger.accountBalance({ accountIdentifier });

  // res.send({ balance });
}

export {
  getUserBalance,
  createPaymentRequest,
  getPaymentStatus,
  getPaymentReceived,
  getPaymentHistory,
  ckbtcTesting
}
