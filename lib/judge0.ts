import axios from "axios"

export function getJudge01languageId(language:string){
    const languageMap = {
        "PYTHON":71,
        "JAVASCRIPT":63,
        "JAVA":62,
    }

    return languageMap[language.toUpperCase() as keyof typeof languageMap]
}

export async function submitBatch(submissions:any){ 
    const options = {
        method: 'POST',
        url: 'https://judgo0-extra-cel.p.rapidapi.com/submissions/batch',
        params:{
            base64_encoded: 'false'
        },
          headers: {
    'x-rapidapi-key': 'de1f4e075amsh2c411d4788503a5p1b64afjsn8c6b5618bc39',
    'x-rapidapi-host': 'judge0-extra-ce1.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions: submissions,
  },
}

    const {data} = await axios.request(options)

    return data
}

export async function pollBatchResults(tokens:string[]){
    while(true){
    const options = {
  method: 'GET',
  url: 'https://judge0-extra-ce1.p.rapidapi.com/submissions/batch',
  params: {
    tokens: tokens.join(","),
    base64_encoded: 'true',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': 'de1f4e075amsh2c411d4788503a5p1b64afjsn8c6b5618bc39',
    'x-rapidapi-host': 'judge0-extra-ce1.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
    };

    const {data} = await axios.request(options)

    const results = data.submissions

    const isAllDone = results.every(
        (r:any)=>r.status.id !==1 && r.status.id !== 2
    )

    if(isAllDone) return results
    await sleep(1000)
    }
}

export const sleep = (ms:number)=> new Promise((resolve)=> setTimeout(resolve, ms))