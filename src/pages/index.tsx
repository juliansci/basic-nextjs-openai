import { sendMessage } from "@/services/openai";
import Head from "next/head";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState("");
  const [bio, setBio] = useState("");

  const [messages, setMessages] = useState<string[]>([]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: any
  ) => {
    console.log(event.target.value);
    setter(event.target.value);
  };

  const handleSend = async () => {
    const response = await sendMessage({ profession, skills, jobs, bio });
    setMessages((messages) => [`${response.data.message}`, ...messages]);
  };
  return (
    <>
      <Head>
        <title>Basic NextJS OpenAI</title>
        <meta name="description" content="Basic NextJS OpenAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center flex-col items-center gap-8 mt-12">
        <h1 className="text-4xl">OpenAI Interviewer</h1>
        <div className="flex flex-col gap-4">
          <div>
            <label className="w-[100px] inline-block">Profession</label>
            <input
              value={profession}
              placeholder="Add a profession"
              className="p-2 w-[400px] text-black"
              onChange={(event) => handleInputChange(event, setProfession)}
            />
          </div>
          <div>
            <label className="w-[100px] inline-block">Skills</label>
            <input
              value={skills}
              placeholder="Add some skills"
              className="p-2 w-[400px] text-black"
              onChange={(event) => handleInputChange(event, setSkills)}
            />
          </div>
          <div>
            <label className="w-[100px] inline-block">Jobs</label>
            <input
              value={jobs}
              placeholder="Add some previous jobs"
              className="p-2 w-[400px] text-black"
              onChange={(event) => handleInputChange(event, setJobs)}
            />
          </div>
          <div>
            <label className="w-[100px] inline-block">Bio</label>
            <input
              value={bio}
              placeholder="Add a bio"
              className="p-2 w-[400px] text-black"
              onChange={(event) => handleInputChange(event, setBio)}
            />
          </div>

          <button
            className="bg-blue-900 text-white py-2 px-8"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
        <div className="flex flex-col">
          <div>
            {messages.map((message) => (
              <div key={message} className="my-16 whitespace-pre-line">
                {message}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
