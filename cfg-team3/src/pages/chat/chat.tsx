import ChatWithSpeech from '@/components/ChatWithSpeech'
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function ChatPage(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

export default function  {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chat with Speech</h1>
      <ChatWithSpeech />
    </div>
  )
}