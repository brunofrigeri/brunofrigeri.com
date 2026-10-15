import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/firebase'

export type CurrentViews = {
  total: number
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CurrentViews>
) => {
  const slug = req?.query?.slug as string
  if (req.method === 'POST') {
    const locale = JSON.parse(req.body).locale as string
    const ref = db.ref('views').child(locale).child(slug)
    // Prime the local cache: without it the transaction first runs against
    // null and briefly exposes an optimistic value of 1 to concurrent reads.
    await ref.once('value')
    const { snapshot } = await ref.transaction((currentViews) => {
      if (currentViews === null) {
        return 1
      }
      return currentViews + 1
    })
    return res.status(200).json({
      total: snapshot.val(),
    })
  }
  if (req.method === 'GET') {
    const locale = req.query.locale as string
    const value = await db.ref('views').child(locale).child(slug).once('value')
    const views = value.val()
    return res.status(200).json({
      total: views || 0,
    })
  }
}
