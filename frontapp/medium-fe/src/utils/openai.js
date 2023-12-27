import axios from 'axios'

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

export default async function callOpenAI(content) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: content }],
      temperature: 0.7,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  )

  return response.data
}
