import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { order_id } = req.query
    res.status(200).json((`Order: ${order_id}`))
}
