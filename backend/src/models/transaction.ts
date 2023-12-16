import { pg } from "~/db";

interface SearchTransactionType {
  accountId: string;
  searchKey: string;
}

interface SearchTransactionReturnType {
  id: string;
  title: string;
  description: string;
  amount: string;
}
export const searchTransactions = async ({
  accountId,
  searchKey,
}: SearchTransactionType) => {
  const res = await pg.query<SearchTransactionReturnType>({
    text: `SELECT id, title, description, amount FROM "Transaction" WHERE account_id = $1 AND (title ILIKE $2 OR description ILIKE $2) LIMIT 5`,
    values: [accountId, searchKey],
    name: "search-transactions",
  });
  return res?.rows;
};
