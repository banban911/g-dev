import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function authMiddleware(request: NextRequest, response: NextResponse) {
    const token = localStorage.getItem('token')
    if (token) {
        if (request.url.includes('/auth/login')) {
            console.log('vao login khi da co token')
            return NextResponse.redirect('/')
        }
    } else {
        if (request.url !== '/') {
            return NextResponse.redirect('auth/login')
        }
    }
}
