// import {Card} from "@/components/ui/card";
// import {Role, Transcript} from "ultravox-client";

// interface ChatBubbleProps {
//     message: string
//     avatar: string
//     name: string
// }

// export function ChatBubble({message, name}: ChatBubbleProps) {
//     return (
//         <div className="flex items-start space-x-3 max-w-md mx-auto bg-secondary/50 backdrop-blur-sm rounded-lg p-4">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-primary flex-shrink-0"/>
//             <div className="flex-col">
//                 <div className="font-medium text-sm text-primary mb-1 text-left">{name}</div>
//                 <p className="text-foreground/90">{message}</p>
//             </div>
//         </div>
//     )
// }

// export function ChatMessages(props: { messages: Transcript[] | null }) {
//     return (<>
//             {(props.messages && props.messages.length>0) && (
//                 <Card className="bg-[#1A1D24]/50 backdrop-blur-md p-6 rounded-2xl mt-6 max-w-7xl mx-auto">
//                     <h2 className="text-2xl font-bold mb-6">Conversation</h2>

//                     <div className="space-y-4">
//                         {props.messages?.map((message:Transcript, index) => {
//                             return (
//                                 <div key={index}
//                                      className={`p-4 rounded-xl w-fit h-fit ${(message?.speaker == Role.USER) ? " content-end bg-primary text-foreground" : "content-center bg-secondary text-foreground"}`}>
//                                     <p>{message?.text}</p>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </Card>)}
//         </>
//     )
// }

import { Card } from "@/components/ui/card";
import { Role, Transcript } from "ultravox-client";

interface ChatBubbleProps {
  message: string;
  avatar: string;
  name: string;
}

export function ChatBubble({ message, name }: ChatBubbleProps) {
  return (
    <div className="flex items-start space-x-3 max-w-md mx-auto bg-white rounded-lg p-4 shadow-sm">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex-shrink-0" />
      <div className="flex-col">
        <div className="font-medium text-sm text-red-600 mb-1 text-left">
          {name}
        </div>
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
}

export function ChatMessages(props: { messages: Transcript[] | null }) {
  return (
    <>
      {props.messages && props.messages.length > 0 && (
        <Card className="bg-white backdrop-blur-md p-6 rounded-2xl mt-6 max-w-7xl mx-auto shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-red-600">Conversation</h2>

          <div className="space-y-4">
            {props.messages?.map((message: Transcript, index) => {
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl w-fit h-fit ${
                    message?.speaker === Role.USER
                      ? "ml-auto bg-red-600 text-white" // User messages (red background, white text)
                      : "bg-gray-100 text-gray-800" // Bot messages (light gray background, dark text)
                  }`}
                >
                  <p>{message?.text}</p>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
}
