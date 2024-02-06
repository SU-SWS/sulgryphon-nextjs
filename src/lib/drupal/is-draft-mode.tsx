import {draftMode} from "next/headers";

/*
 Draft mode works only in normal builds, use environment variable during development.
 */
export const isDraftMode = (): boolean => {
  return process.env.NODE_ENV == 'development' || draftMode().isEnabled;
}