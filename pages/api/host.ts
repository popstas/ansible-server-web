import type { NextApiRequest, NextApiResponse } from 'next'
import { HostType } from '../../helpers/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HostType>
) {
  const host = {
    ip: '0.0.0.0',
    name: 'host',
    host: 'host',
    type: 'host',
  };
  res.status(200).json(host);
}
