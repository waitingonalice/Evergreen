import { pg } from "~/db";

export const latestBalanceQuery = `SELECT total_income, total_expense, total 
FROM "BalanceHistory"
WHERE account_id = $1
ORDER BY id DESC LIMIT 1`;

export const insertBalanceMutation = `INSERT INTO "BalanceHistory" (account_id,total_income,total_expense, total)
VALUES ($1, $2, $3, $4)`;

export const getLatestBalance = async (accountId: string) => {
  const res = await pg.query({
    text: latestBalanceQuery,
    values: [accountId],
    name: "get-latest-balance",
  });
  return res?.rows[0];
};
