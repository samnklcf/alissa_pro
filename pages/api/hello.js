const { AssemblyAI } = require('assemblyai')

const client = new AssemblyAI({
  apiKey: "89a2c7bdf0c74130b0ece95b574ab121"
})



export default function handler(req, res) {
  async function sam() {

    const audioUrl =
  'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'

const config = {
  audio_url: audioUrl
}

const run = async () => {
  const transcript = await client.transcripts.transcribe(config)
  console.log(transcript.text)
  res.status(200).json(transcript.text);
}

run()

  }

  

  sam();
}
