/* eslint-disable no-console */

/* eslint-disable lines-between-class-members */
import { Pool, QueryResultRow } from "pg";

interface QueryConfigType {
  text: string;
  values?: any[];
  name?: string;
}
class PgClient {
  private client?: Pool;
  private lastQuery?: string;

  constructor() {
    const config = {
      connectionString: process.env.DATABASE_URL,
      allowExitOnIdle: false,
      connectionTimeoutMillis: 20000, // 20 seconds
      idle_in_transaction_session_timeout: 20000, // 20 seconds
    };

    const pool = new Pool(config);
    this.client = pool;

    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      pool.end();
      process.exit(-1);
    });
  }

  clientHealthCheck = async () => {
    try {
      await this.client?.query("SELECT NOW()");
      const totalCount = this.client?.totalCount;
      const idleCount = this.client?.idleCount;
      const waitingCount = this.client?.waitingCount;
      console.log("totalCount", totalCount);
      console.log("idleCount", idleCount);
      console.log("waitingCount", waitingCount);
      console.log("lastQuery", this.lastQuery);
    } catch (err) {
      console.error("PostgreSQL is not connected");
      console.error(err);
    }
  };

  query = async <T extends QueryResultRow>({
    text,
    values,
    name,
  }: QueryConfigType) => {
    try {
      this.lastQuery = text;
      const res = await this.client?.query<T>({
        text,
        values,
        name,
      });
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}

export const pg = new PgClient();
