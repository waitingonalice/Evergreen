/* eslint-disable no-console */

/* eslint-disable lines-between-class-members */
import { Pool, QueryResultRow } from "pg";

interface QueryConfigType {
  text: string;
  values?: any[];
  name?: string;
}
class PgClient {
  private client: Pool;
  private lastQuery?: string;
  private stats?: Record<string, number>;

  constructor() {
    const config = {
      connectionString: process.env.DATABASE_URL,
      allowExitOnIdle: false,
      connectionTimeoutMillis: 20000, // 20 seconds
      idle_in_transaction_session_timeout: 20000, // 20 seconds
    };

    this.client = new Pool(config);

    this.client.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      this.client.end();
      process.exit(-1);
    });

    this.stats = {
      totalCount: 0,
      idleCount: 0,
      waitingCount: 0,
    };
  }

  private setStats() {
    this.stats = {
      totalCount: this.client.totalCount,
      idleCount: this.client.idleCount,
      waitingCount: this.client.waitingCount,
    };
  }

  clientHealthCheck = async () => {
    try {
      await this.client?.query("SELECT NOW()");
      this.setStats();
      console.log("stats", this.stats);
    } catch (err) {
      console.error("PostgreSQL is not connected");
      console.error(err);
      this.setStats();
      console.error(this.stats);
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
      this.setStats();
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}

export const pg = new PgClient();
