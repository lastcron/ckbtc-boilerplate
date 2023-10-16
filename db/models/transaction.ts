interface TransactionAttributes {
    id: number;
    user: number;
    terminal: number;
    amount: number;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }