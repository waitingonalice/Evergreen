/* eslint-disable arrow-body-style */
import { TransactionTypeEnum } from "@expense-tracker/shared";
import { Request, Response } from "express";
import { ErrorEnum } from "~/constants/enum";
import { pg, prisma } from "~/db";
import { insertBalanceMutation, latestBalanceQuery } from "~/models/balance";
import * as TransactionModel from "~/models/transaction";
import { BalanceHistory, CreateTransactionRequestBody } from "./types";

/**
 * @param variables Represents the transaction object to be created in the transaction table
 * @returns The number of transactions created.
 * Example data format:
 *
 * `{result:{ totalCount: 1 }}`
 */
export const handleCreateTransactions = async (req: Request, res: Response) => {
  try {
    const { accountId } = res.locals;
    const { variables }: CreateTransactionRequestBody = req.body;
    let totalExpense = 0;
    let totalIncome = 0;

    const transactionsWithId = variables.map((item) => {
      const toNumberAmount = Number(item.amount);
      if (item.type === TransactionTypeEnum.EXPENSE) {
        totalExpense -= toNumberAmount;
      } else {
        totalIncome += toNumberAmount;
      }
      return {
        ...item,
        account_id: accountId,
        amount: toNumberAmount,
      };
    });

    const transactions = await prisma.transaction.createMany({
      data: transactionsWithId,
    });

    // update balance history
    await pg.transaction(async (client) => {
      const latestBalance = await client.query<BalanceHistory>({
        text: latestBalanceQuery,
        values: [accountId],
      });

      if (latestBalance?.rows.length > 0) {
        const {
          total_income: currentIncome,
          total_expense: currentExpense,
          total: currentTotal,
        } = latestBalance.rows[0];

        const updateCurrentIncome = Number(currentIncome) + totalIncome;
        const updateCurrentExpense = Number(currentExpense) + totalExpense;
        const updateCurrentTotal =
          Number(currentTotal) + totalIncome + totalExpense;

        await client.query({
          text: insertBalanceMutation,
          values: [
            accountId,
            updateCurrentIncome,
            updateCurrentExpense,
            updateCurrentTotal,
          ],
        });
      } else {
        // to handle the case when account is new and has no balance history
        await client.query({
          text: insertBalanceMutation,
          values: [
            accountId,
            totalIncome,
            totalExpense,
            totalIncome + totalExpense,
          ],
        });
      }
    });

    return res.status(200).json({
      result: {
        totalCount: transactions.count,
      },
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return res.status(400).json({ code: err.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @param id Retrieve transaction by id primary key in transaction table using url params
 */
export const handleGetTransactionById = async (_: Request, res: Response) => {
  try {
    const { transactionId, accountId } = res.locals;
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId, account_id: accountId },
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        category: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json({
      result: {
        ...transaction,
        amount: transaction?.amount,
      },
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return res.status(400).json({ code: err.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};

/**
 *
 * @param limit Represents the number of transactions to be retrieved in a paginated list
 * @param offset Represents the number of transactions to be skipped in a paginated list
 * @param query Represents the search key to be used to filter transactions. Leverage on sql ILIKE operator to perform the search.
 * @param amount Represents the amount to be used to filter transactions. Leverage on sql BETWEEN operator to perform the search.
 * @param category Represents the category to be used to filter transactions.
 * @param type Represents the type to be used to filter transactions.
 * @returns Paginated list of transactions
 * Example data format:
 *
 * `{result:{ totalCount: 1, transactions: [{...}] }}`
 */
export const handleGetTransactions = async (req: Request, res: Response) => {
  return res.json({ result: req.query, header: req.headers });
};

/**
 * @param search Represents the full text search query to be used to filter transactions. Will leverage on sql ILIKE operator to perform the search with prefix and suffix wildcards.
 * NOTE: only support search for title and descriptions as they require full text search.
 * @returns Paginated list of transactions
 * Example data format:
 *  { result : {transactions: [{id, amount, title, description}]}}
 */
export const handleSearchTransactions = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    const decodedKey = decodeURIComponent(key as string);
    const { accountId } = res.locals;
    const result = await TransactionModel.searchTransactions({
      accountId,
      searchKey: `%${decodedKey}%`,
    });
    const transactions = result?.map((item) => ({
      ...item,
      amount: item.amount,
    }));
    return res.status(200).json({
      result: {
        transactions,
      },
    });
  } catch (err) {
    console.error(err);
    return res.json({ code: err });
  }
};

// export const updateTransactionById = async (req: Request, res: Response) => {};
// export const deleteTransactionById = async (req: Request, res: Response) => {};
