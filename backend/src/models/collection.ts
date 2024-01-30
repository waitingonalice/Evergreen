/* eslint-disable class-methods-use-this */
import { pg, prisma } from "~/db";
import {
  CollectionInputType,
  CreateCollectionBody,
} from "~/modules/playground/types";
import { toBase64 } from "~/utils/formatting";

class CollectionModel {
  async getCollections({ id, keyword, limit, offset }: CollectionInputType) {
    const result = await pg.query({
      text: `SELECT id,code,title,description,"updatedAt" FROM "Collection" WHERE account_id = $1 AND 
      concat(title, description) ILIKE $2 ORDER BY "updatedAt" DESC LIMIT $3 OFFSET $4`,
      values: [id, `${keyword}%`, limit, offset],
    });
    const totalCount = await pg.query({
      text: `SELECT COUNT(*) FROM "Collection" WHERE account_id = $1`,
      values: [id],
    });
    return {
      result: result?.rows,
      totalCount: totalCount?.rows[0]?.count,
    };
  }

  async createCollection({
    input,
    id,
  }: {
    input: CreateCollectionBody["input"];
    id: string;
  }) {
    const encode = toBase64(input.code);
    const collection = await prisma.collection.create({
      data: {
        code: encode,
        title: input.title,
        description: input.description,
        account_id: id,
      },
      select: {
        code: true,
        title: true,
        description: true,
      },
    });
    return collection;
  }

  async deleteCollection(id: string) {
    const collection = await prisma.collection.delete({
      where: {
        id: Number(id),
      },
      select: {
        code: true,
        title: true,
        description: true,
      },
    });

    return collection;
  }
}

const collectionModel = new CollectionModel();
export default collectionModel;
