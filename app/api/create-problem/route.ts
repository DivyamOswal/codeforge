import {currentRole} from '@/modules/auth/actions'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request:NextRequest) {
    try {
        const userRole = await currentRole()

        if(userRole !== UserRole.ADMIN){
            return NextResponse.json({error:"Unauthorized"}, {status: 401})
        }

        const {title, description, difficulty, tags, examples, constraints, testCases, codeSnippets, refrenceSolutions} = await request.json()

        if(!title || !description || !difficulty || !testCases || !codeSnippets || !refrenceSolutions){
            return NextResponse.json(
                {error: "Missing required fields"},
                {status: 400},
            )
        }

        if(!Array.isArray(testCases) || testCases.length == 0){
            return NextResponse.json(
                {error: "At least one testcase is required"},
                {status: 400},
            )
        }
    } catch (error) {
        
    }
}