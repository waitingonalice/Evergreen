import { Pool, PoolClient, QueryResultRow } from "pg";

interface QueryConfigType {
  text: string;
  values?: any[];
  name?: string;
}
class PgClient {
  private client: Pool;

  private stats?: Record<string, number | string>;

  constructor() {
    const config = {
      connectionString: process.env.DATABASE_URL,
      allowExitOnIdle: false,
      // connectionTimeoutMillis: 20000, // 20 seconds
      // idle_in_transaction_session_timeout: 20000, // 20 seconds
    };

    this.client = new Pool(config);

    this.client.on("connect", () => {
      console.log("PostgreSQL connected");
    });

    this.client.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      this.client.end();
      process.exit(-1);
    });

    this.stats = {
      totalCount: 0,
      idleCount: 0,
      waitingCount: 0,
      lastQuery: "",
    };
  }

  private setStats(lastQuery?: string) {
    this.stats = {
      totalCount: this.client.totalCount,
      idleCount: this.client.idleCount,
      waitingCount: this.client.waitingCount,
      lastQuery: lastQuery || "",
    };
  }

  clientHealthCheck = async () => {
    try {
      await this.client?.query(`SELECT * FROM "Account"`);
      this.setStats();
      console.log("stats", this.stats);
    } catch (err) {
      console.error("PostgreSQL is not connected");
      console.error(err);
      this.setStats();
      console.error(this.stats);
    }
  };

  /**
   * For simple queries that do not require a transaction
   */
  query = async <T extends QueryResultRow>({
    text,
    values,
    name,
  }: QueryConfigType) => {
    try {
      const start = Date.now();
      const res = await this.client.query<T>({
        text,
        values,
        name,
      });
      const duration = Date.now() - start;
      this.setStats(text);
      console.log("executed query: ", { text, duration, rows: res.rowCount });
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  /**
   * For queries that require a long running transaction
   */
  transaction = async <T>(
    callback: (args: PoolClient) => Promise<T>
  ): Promise<T | null> => {
    const start = Date.now();
    const client = await this.client.connect();
    let res: T | null = null;
    try {
      await client.query("BEGIN");
      const queryResponse = await callback(client);
      await client.query("COMMIT");
      res = queryResponse;
    } catch (err) {
      console.error(err);
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
      const duration = Date.now() - start;
      this.setStats();
      console.log("executed transaction", { duration });
    }
    return res;
  };
}

export const pg = new PgClient();
