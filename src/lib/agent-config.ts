import {
  MenuItem,
  ParameterLocation,
  SelectedTool,
  InactivityMessage,
} from "@/lib/types";

export function getSystemPrompt(menu: MenuItem[]) {
  let sysPrompt: string;
  let categories = menu
    .map((item: MenuItem) => {
      return item.title;
    })
    .join(" ,");
  let menu_str = menu
    .map((category: MenuItem) => {
      const header = `\n\t==${category.title}==\n\t${category.description}\n`;
      // const items = category.items.map(item => {
      //     return `\t\t- ${item.name.toUpperCase()} $${item.price.toFixed(2)}\n\t\t${item.description}`
      // }).join('\n\n');
      // return header +'\n'+ items;
    })
    .join("\n\n");
  sysPrompt = `
  # Restaurant Order System Configuration

  ## Agent Role
  - Name: foodistaan
  - Context: Voice-based order taking system with TTS output
  - Current time: ${new Date()}

  ## Menu Items
  ${menu_str}
  
  ## Conversation Flow
  1. Greeting -> Order Taking -> Call "updateOrder" Tool -> Order Confirmation -> Payment Direction

  ## Tool Usage Rules
  - You must call the tool "updateOrder" immediately when:
    - User confirms an item
    - User requests item removal
    - User modifies quantity
  - Do not emit text during tool calls
  - Validate menu items before calling updateOrder

  ## ** RAG/KnowledgeBase :**
  - You must use the queryCorpus tool to look up specific information about the Stella AI dental services. This will search a vector database and return back chunks that are semantically similar to the query....
  - Strictly consult the internal knowledge base(Rag)/Corpus Service for answers. Do not generate responses from external sources. If the requested information is unavailable, respond with: ‘I couldn't find this in our knowledge base. Please check the website or contact support.

  ## **Multilingual Capabilities:**
    - Detect the caller's preferred language from their initial interaction
    - Respond fluently in the caller's language throughout the entire conversation
    - Switch languages if the caller changes their language preference
    - Maintain the same warm, professional tone across all languages
    - Translate key healthcare terminology accurately in each supported language

  ## Handling not to interrupt the user
    - IF you think user is still thinking or DID NOT YET complete their sentence, just respond with "." OR "uh-huh", OR "ok" OR "yeah", based on the situation. this will make the conversation flow more natural and not interrupt the user when they are still thinking or have not completed their sentence. "if you tired of voice agent saying that its calling certain function (out loud to user) also try this:"- DO NOT MENTION TOOLS OR FUNCTIONS IN YOUR RESPONSES to the user. they dont need to know that you are using a tool or function. if you must reply to user and do not have appropriate response, just respond with a dot : "."."

  ## Response Guidelines
  1. Voice-Optimized Format
    - Use spoken numbers ("one twenty-nine" vs "$1.29")
    - For 8.00 dollars Don't say 800 dollars say 8 dollars and 0 cents
    - Avoid special characters and formatting
    - Use natural speech patterns

  2. Conversation Management
    - Keep responses brief (1-2 sentences)
    - Use clarifying questions for ambiguity
    - Maintain conversation flow without explicit endings
    - Allow for casual conversation

  3. Order Processing
    - Validate items against menu
    - Suggest similar items for unavailable requests
    - Cross-sell based on order composition

  4. Standard Responses
    - Off-topic: "Um... this is a Foodistaan."
    - Thanks: "My pleasure."
    - Menu inquiries: Provide 2-3 relevant suggestions

  5. Order confirmation
    - Call the "updateOrder" tool first
    - Add 10% VAT to the total
    - Provide total amount after VAT
    - Total amount is always rounded of to the next dollar
    - Only confirm the full order at the end when the customer is done

  ## Error Handling
  1. Menu Mismatches
    - Suggest closest available item
    - Explain unavailability briefly
  2. Unclear Input
    - Request clarification
    - Offer specific options
  3. Invalid Tool Calls
    - Validate before calling
    - Handle failures gracefully

  ## State Management
  - Track order contents
  - Monitor order type distribution (${categories})
  - Maintain conversation context
  - Remember previous clarifications    
  `;

  sysPrompt = sysPrompt.replace(/"/g, '"').replace(/\n/g, "\n");

  return sysPrompt;
}

export const selectedTools: SelectedTool[] = [
    {
        "temporaryTool": {
            "modelToolName": "updateOrder",
            "description": "Update order details. Used any time items are added or removed or when the order is finalized. Call this any time the user updates their order.",
            "dynamicParameters": [
                {
                    "name": "orderDetailsData",
                    "location": ParameterLocation.BODY,
                    "schema": {
                        "description": "An array of objects contain order items.",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": { "type": "string", "description": "The name of the item to be added to the order." },
                                "specialInstructions": { "type": "string", "description": "Any special instructions that pertain to the item." },
                                "quantity": { "type": "number", "description": "The quantity of the item for the order." },
                                "price": { "type": "number", "description": "The unit price for the item." },
                            },
                            "required": ["name", "quantity", "price"]
                        }
                    },
                    "required": true
                },
            ],
            "client": {}
        }
    },
    {
      toolName: "queryCorpus",
      parameterOverrides: {
        corpus_id: "de76e158-d49a-44fc-b06f-e0ef6bc844f2",
        max_results: 5
      }
    },
    {
      toolName: "hangUp"
    }
];
