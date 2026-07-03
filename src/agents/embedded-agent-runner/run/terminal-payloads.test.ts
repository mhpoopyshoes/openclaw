import { describe, expect, it } from "vitest";
import { SILENT_REPLY_TOKEN } from "../../../auto-reply/tokens.js";
import { resolveTerminalPayloads } from "./terminal-payloads.js";

describe("resolveTerminalPayloads", () => {
  it("uses non-empty assistant text when no richer terminal payload exists", () => {
    expect(
      resolveTerminalPayloads({
        assistantTexts: ["  fallback final  ", "", "second"],
        emptyAssistantReplyIsSilent: false,
        payloadsForTerminalPath: [],
      }),
    ).toEqual([{ text: "fallback final" }, { text: "second" }]);
  });

  it("preserves existing terminal payloads over assistant-text fallback", () => {
    expect(
      resolveTerminalPayloads({
        assistantTexts: ["fallback final"],
        emptyAssistantReplyIsSilent: false,
        payloadsForTerminalPath: [{ text: "canonical final" }],
      }),
    ).toEqual([{ text: "canonical final" }]);
  });

  it("keeps silent terminal replies explicit", () => {
    expect(
      resolveTerminalPayloads({
        assistantTexts: ["fallback final"],
        emptyAssistantReplyIsSilent: true,
      }),
    ).toEqual([{ text: SILENT_REPLY_TOKEN }]);
  });
});
