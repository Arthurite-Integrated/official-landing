import {z} from "zod";

export const COMPANY_SIZES = ["1-50", "51-200", "201-1,000", "1,001-10,000", "10,000+"] as const;

const E164 = /^\+[1-9]\d{7,14}$/;

const ContactRequestSchema = z.object({
  companyName: z.string().trim().min(1, "Enter your company name"),
  companySize: z.enum(COMPANY_SIZES, "Select your company size"),
  workEmail: z.string().trim().pipe(z.email("Enter a valid work email")),
  firstName: z.string().trim().min(1, "Enter your first name"),
  jobTitle: z.string().trim().min(1, "Enter your job title"),
  lastName: z.string().trim().min(1, "Enter your last name"),
  message: z.string().trim().min(10, "Tell us a bit more about what you need"),
  phone: z.string().trim().regex(E164, "Enter your phone number with country code, e.g. +2348012345678"),
});

export const EnquiryDetailsSchema = ContactRequestSchema.omit({message: true});

export type ContactRequest = z.infer<typeof ContactRequestSchema>;
export type EnquiryDetails = z.infer<typeof EnquiryDetailsSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactRequest, string>>;

type ParseResult<T> = {readonly success: true; readonly data: T} | {readonly success: false; readonly errors: ContactFieldErrors};

function parse<T>(schema: z.ZodType<T>, values: Record<string, unknown>): ParseResult<T> {
  const result = schema.safeParse(values);

  if (result.success) {
    return {success: true, data: result.data};
  }

  const {fieldErrors} = z.flattenError(result.error) as {fieldErrors: Record<string, string[] | undefined>};
  const errors: ContactFieldErrors = Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0] ?? "Invalid value"])
  );

  return {success: false, errors};
}

export function parseContactRequest(values: Record<string, unknown>) {
  return parse(ContactRequestSchema, values);
}

export function parseEnquiryDetails(values: Record<string, unknown>) {
  return parse(EnquiryDetailsSchema, values);
}
