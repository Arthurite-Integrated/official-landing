import {z} from "zod";

export const COMPANY_SIZES = ["1-50", "51-200", "201-1,000", "1,001-10,000", "10,000+"] as const;

const ContactRequestSchema = z.object({
  company: z.string().trim().min(1, "Enter your company name"),
  companySize: z.enum(COMPANY_SIZES, "Select your company size"),
  email: z.string().trim().pipe(z.email("Enter a valid work email")),
  firstName: z.string().trim().min(1, "Enter your first name"),
  jobTitle: z.string().trim().min(1, "Enter your job title"),
  lastName: z.string().trim().min(1, "Enter your last name"),
  message: z.string().trim().min(1, "Tell us how we can help"),
  phone: z.string().trim(),
});

export type ContactRequest = z.infer<typeof ContactRequestSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactRequest, string>>;

type ParsedContactRequest =
  | {readonly success: true; readonly data: ContactRequest}
  | {readonly success: false; readonly errors: ContactFieldErrors};

export function parseContactRequest(values: Record<string, unknown>): ParsedContactRequest {
  const result = ContactRequestSchema.safeParse(values);

  if (result.success) {
    return {success: true, data: result.data};
  }

  const {fieldErrors} = z.flattenError(result.error);
  const errors: ContactFieldErrors = Object.fromEntries(Object.entries(fieldErrors).map(([field, messages]) => [field, messages[0]]));

  return {success: false, errors};
}
