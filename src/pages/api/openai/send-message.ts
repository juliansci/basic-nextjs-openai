import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  if (!configuration.apiKey) {
    res.status(500).json({
      message:
        "OpenAI API key not configured, please follow instructions in README.md",
    });
    return;
  }
  const body = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `The system is an interviewer that received information about the interviewee. The interviewer will ask ten questions about the knowledge and the professional experience of the interviewee.
            The interviewer is an expert in the interviewee profession. It means that knowledge will affect the interviewer questions.
            `,
        },
        {
          role: "user",
          content: `Hi. I am the interviewee.
          This is a summary of my professional experience: ${body.bio}.
          My profesion is ${body.profession} 
          My more important skills are ${body.skills}.
          My most outstanding jobs are ${body.jobs}.`,
        },
      ],

      temperature: 0.6,
      max_tokens: 528,
    });
    console.log(completion);

    console.log(JSON.stringify(completion.data));
    res
      .status(200)
      .json({ message: completion.data.choices[0].message?.content || "" });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        message: "An error occurred during your request.",
      });
    }
  }

  res.status(200).json({ message: req.body.message });
}
