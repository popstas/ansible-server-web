// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getItems } from "helpers/getItems";
import { JsonViewerDataType, JsonViewerFieldType } from 'helpers/typesJsonViewer';
import Cors from 'cors';
import initMiddleware from 'helpers/initMiddleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const fields: JsonViewerFieldType[] = [
  {
    name: "slug",
    comment: "slug",
    groups: ["main"],
    default: true,
    type: "string",
    filterType: "string",
  },
  {
    name: "name",
    comment: "Название",
    groups: ["main"],
    type: "string",
    filterType: "string",
  },
  {
    name: "type",
    comment: "Тип",
    groups: ["main"],
    stat: {
      type: "enum",
    },
    type: "string",
    filterType: "enum",
  },
  {
    name: "host",
    comment: 'Хост',
    groups: ["main"],
    stat: {
      type: "enum",
    },
    type: "string",
    filterType: "enum",
  },
];

const columns = {
  default: {
    name: "default",
    groups: ["main"],
    columns: ["slug", "name", "type", "host"],
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JsonViewerDataType>
) {
  await cors(req, res);

  const items = getItems();
  const data = { name: 'ansible-server', items, fields, columns };
  res.json(data);
}
