import type {NextApiRequest, NextApiResponse} from 'next'
import getConfig from 'next/config'
import {throws} from "assert";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { serverRuntimeConfig } = getConfig()
    const {username, password} = req.body
	console.log('req.body', req.body)
    if (username && password) {
        console.log('serverRuntimeConfig', serverRuntimeConfig.token)
        if (username === 'demo' && password === '132654') {
            res.status(200).json({token: serverRuntimeConfig.token})
        }
		else {
            res.status(401).json({error: 'incorrect username or password'})
        }
    }
}