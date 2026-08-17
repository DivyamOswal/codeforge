import { getJudge01languageId, pollBatchResults } from '@/lib/judge0'
import { currentRole } from '@/modules/auth/actions'
import { prisma } from '@/lib/db'
import { UserRole } from '@/lib/generated/prisma/enums'
import { NextRequest, NextResponse } from 'next/server'

const JUDGE0_ACCEPTED = 3

async function submitBatch(
  submissions: { source_code: string; language_id: number; stdin: string; expected_output: string }[]
) {
  const res = await fetch(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ submissions }),
  })

  if (!res.ok) {
    throw new Error(`Judge0 batch submit failed: ${res.status} ${await res.text()}`)
  }

  return res.json();
}

export async function POST(request: NextRequest) {
  try {
    const roleResult = await currentRole();

    if (!roleResult.success || roleResult.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = await request.json();

    if (!title || !description || !difficulty || !testCases || !codeSnippets || !referenceSolutions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json({ error: "At least one testcase is required" }, { status: 400 });
    }

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge01languageId(language);

      const submissions = testCases.map(({ input, output }: { input: string; output: string }) => ({
        source_code: solutionCode as string,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);
      const tokens = submissionResults.map((res: any) => res.token);
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== JUDGE0_ACCEPTED) {
          return NextResponse.json(
            {
              error: `Validation failed for ${language}`,
              testCase: {
                input: submissions[i].stdin,
                expectedOutput: submissions[i].expected_output,
                actualOutput: result.stdout,
                error: result.stderr || result.compile_output,
              },
              details: result,
            },
            { status: 400 }
          );
        }
      }
    }

    const currentUser = await roleResult;

    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags: tags ?? [],
        examples,
        constraints,
        testcases: testCases,
        codeSnippets,
        referenceSolutions,
        userId: (await currentRole()) as any, // placeholder, see note below
      },
    });

    return NextResponse.json({ success: true, message:"Problem created successfully",  problem }, { status: 201 });
  } catch (err) {
    console.error("Problem creation failed:", err);
    return NextResponse.json({ error: "Failed to create problem" }, { status: 500 });
  }
}