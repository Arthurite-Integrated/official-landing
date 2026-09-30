import {z} from "zod";

export const apiEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  coverImage: z.string(),
  description: z.string(),
  location: z.string(),
  startsAt: z.string(),
  capacity: z.number().nullable().optional(),
  registeredCount: z.number(),
  remainingCapacity: z.number().nullable().optional(),
  registrationLink: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ApiEvent = z.infer<typeof apiEventSchema>;

export const paginationSchema = z.object({
  limit: z.number(),
  nextCursor: z.string().nullable(),
});
export type ApiPagination = z.infer<typeof paginationSchema>;

export const paginatedSchema = <Item>(itemSchema: z.ZodType<Item>) => z.object({items: z.array(itemSchema), pagination: paginationSchema});

export const apiEventPageSchema = paginatedSchema(apiEventSchema);
export type ApiEventPage = z.infer<typeof apiEventPageSchema>;

export const jobModeSchema = z.enum(["Remote", "Hybrid"]);
export const jobLocationSchema = z.enum(["Lagos", "London", "Accra", "Qatar"]);
export const jobStatusSchema = z.enum(["open", "closed"]);

export const apiJobSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  subcategory: z.string(),
  mode: jobModeSchema,
  location: jobLocationSchema,
  description: z.string(),
  status: jobStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ApiJob = z.infer<typeof apiJobSchema>;

export const apiJobPageSchema = paginatedSchema(apiJobSchema);
export type ApiJobPage = z.infer<typeof apiJobPageSchema>;

export const uploadResultSchema = z.object({
  uploadUrl: z.url(),
  fields: z.record(z.string(), z.string()),
  fileUrl: z.url(),
  expiresIn: z.number(),
});
export type ApiUploadResult = z.infer<typeof uploadResultSchema>;

export const areaOfInterestSchema = z.enum(["Cloud Architecture", "DevOps", "Cloud Security", "Full Stack Cloud"]);
export type AreaOfInterest = z.infer<typeof areaOfInterestSchema>;

export const contactPayloadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  workEmail: z.email(),
  phone: z.string(),
  jobTitle: z.string(),
  companyName: z.string(),
  companySize: z.string(),
  message: z.string(),
});
export type ApiContactPayload = z.infer<typeof contactPayloadSchema>;

export const eventRegistrationPayloadSchema = z.object({
  fullName: z.string(),
  email: z.email(),
});
export type ApiEventRegistrationPayload = z.infer<typeof eventRegistrationPayloadSchema>;

export const jobApplicationPayloadSchema = z.object({
  jobId: z.string(),
  fullName: z.string(),
  email: z.email(),
  phone: z.string(),
  cvUrl: z.url(),
});
export type ApiJobApplicationPayload = z.infer<typeof jobApplicationPayloadSchema>;

export const internshipPayloadSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  areaOfInterest: areaOfInterestSchema,
  cvUrl: z.url().optional(),
});
export type ApiInternshipPayload = z.infer<typeof internshipPayloadSchema>;

export const createdDataSchema = z.unknown();
