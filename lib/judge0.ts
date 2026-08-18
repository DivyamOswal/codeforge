import axios from "axios"

const JUDGE0_BASE_URL = `https://${process.env.JUDGE0_API_HOST}`

const JUDGE0_HEADERS = {
  'x-rapidapi-key': process.env.JUDGE0_API_KEY!,
  'x-rapidapi-host': process.env.JUDGE0_API_HOST!,
  'Content-Type': 'application/json',
}

export function getJudge01languageId(language: string) {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
  }

  return languageMap[language.toUpperCase() as keyof typeof languageMap]
}

export async function submitBatch(submissions: any) {
  const options = {
    method: 'POST',
    url: `${JUDGE0_BASE_URL}/submissions/batch`,
    params: { base64_encoded: 'false' },
    headers: JUDGE0_HEADERS,
    data: { submissions },
  }

  const { data } = await axios.request(options)
  return data
}

const MAX_POLL_ATTEMPTS = 30

export async function pollBatchResults(tokens: string[]) {
  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
    const options = {
      method: 'GET',
      url: `${JUDGE0_BASE_URL}/submissions/batch`,
      params: {
        tokens: tokens.join(","),
        base64_encoded: 'false',
        fields: '*',
      },
      headers: JUDGE0_HEADERS,
    }

    const { data } = await axios.request(options)
    const results = data.submissions

    const isAllDone = results.every(
      (r: any) => r.status.id !== 1 && r.status.id !== 2
    )

    if (isAllDone) return results
    await sleep(1000)
  }

  throw new Error("Judge0 polling timed out after 30 seconds")
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))