import Account from "./Account";

export default interface WireTransfer {
  id: number;
  wireTransferDate: string;
  value: number;
  type: string;
  transactionOperatorName: string;
  account: Account;
}