import {z} from "zod";

const E164 = /^\+[1-9]\d{7,14}$/;
const SEPARATORS = /[\s().-]/g;
const INTERNATIONAL_PREFIX = /^00/;

export const PHONE_ERROR = "Enter your phone number with country code, e.g. +234 801 234 5678";

function normalizePhone(value: string): string {
  return value.replace(SEPARATORS, "").replace(INTERNATIONAL_PREFIX, "+");
}

export const phoneSchema = z.string().transform(normalizePhone).pipe(z.string().regex(E164, PHONE_ERROR));
