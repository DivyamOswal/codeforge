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

    const {data} = await axios.post()
}