import type { ReplyPayload } from "../../../auto-reply/reply-payload.js";
import { SILENT_REPLY_TOKEN } from "../../../auto-reply/tokens.js";

export function resolveTerminalPayloads(params: {
  assistantTexts?: string[];
  emptyAssistantReplyIsSilent: boolean;
  payloadsForTerminalPath?: ReplyPayload[];
}): ReplyPayload[] | undefined {
  if (params.emptyAssistantReplyIsSilent) {
    return [{ text: SILENT_REPLY_TOKEN }];
  }
  if (params.payloadsForTerminalPath?.length) {
    return params.payloadsForTerminalPath;
  }
  const fallbackAssistantPayloads = (params.assistantTexts ?? [])
    .map((text) => text.trim())
    .filter((text) => text.length > 0)
    .map((text) => ({ text }));
  return fallbackAssistantPayloads.length ? fallbackAssistantPayloads : undefined;
}
