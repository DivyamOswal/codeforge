import { getJudge01languageId } from '@/lib/judge0'
import {currentRole} from '@/modules/auth/actions'
import {NextRequest, NextResponse} from 'next/server'
import { stdin } from 'process'

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
        
        for(const [language, solutionCode] of Object.entries(refrenceSolutions)){
            // 1. get judge0 language id for current lang
            const languageId = getJudge01languageId(language)
            // 2. prepare judge0 submissions for all test cases
            const submissions = testCases.map(({input, output})=>({
                source_code: solutionCode,
                language_id:languageId,
                stdin:input,
                expected_output: output
            }))
            // 3. Submit all testcases in one batch
            const submissionResults = await submitBatch(submissions)
            // 4. Extract tokens from response
            const tokens = submissionResults.map((res:any)=>res.token)
        }


    } catch (error) {
        
    }
}

function submitBatch(submissions: { source_code: unknown; language_id: number; stdin: any; expected_output: any }[]) {
    throw new Error('Function not implemented.')
}
