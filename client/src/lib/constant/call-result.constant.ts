const CALL_RESULT = {
  QUALIFIED: "qualified",
  DISQUALIFIED: "disqualified",
  NO_ANSWER: "no_answer",
};

export type CallResultType = (typeof CALL_RESULT)[keyof typeof CALL_RESULT];

export default CALL_RESULT;
