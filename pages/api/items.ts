// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getItems } from "../../helpers/getItems";
import { ItemTypeShort } from "../../helpers/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemTypeShort[]>
) {
  const items = await getItems();
  res.status(200).json(items);
}
