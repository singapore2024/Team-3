import AccessibleChatWithSpeech from "@/components/ChatWithAccSpeech" 
export default function ChatPage(){
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chat with Speech</h1>
      <AccessibleChatWithSpeech />
    </div>
  )
}