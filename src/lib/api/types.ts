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

export const apiStaffSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  position: z.string(),
  photo: z.string().nullable().optional(),
  bio: z.string(),
  sortOrder: z.number(),
});
export type ApiStaff = z.infer<typeof apiStaffSchema>;

export const apiStaffPageSchema = paginatedSchema(apiStaffSchema);

export const apiTestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  quote: z.string(),
  sortOrder: z.number(),
});
export type ApiTestimonial = z.infer<typeof apiTestimonialSchema>;

export const apiTestimonialPageSchema = paginatedSchema(apiTestimonialSchema);

export const contentStatusSchema = z.enum(["published", "draft"]);

export const apiSpotlightSchema = z.object({
  id: z.string(),
  section: z.literal("spotlight"),
  title: z.string(),
  source: z.string(),
  coverImage: z.url(),
  url: z.string().nullable().optional(),
  status: contentStatusSchema,
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ApiSpotlight = z.infer<typeof apiSpotlightSchema>;
export const apiSpotlightPageSchema = paginatedSchema(apiSpotlightSchema);

export const contentStatSchema = z.object({value: z.string(), label: z.string()});

export const apiProjectSchema = z.object({
  id: z.string(),
  section: z.literal("projects"),
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  year: z.string(),
  projectType: z.string(),
  industry: z.string(),
  duration: z.string(),
  coverImage: z.url().nullable().optional(),
  videoUrl: z.url().nullable().optional(),
  caseStudyUrl: z.url().nullable().optional(),
  liveUrl: z.url().nullable().optional(),
  stats: z.array(contentStatSchema).optional(),
  status: contentStatusSchema,
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ApiProject = z.infer<typeof apiProjectSchema>;
export const apiProjectPageSchema = paginatedSchema(apiProjectSchema);

export const apiAwardSchema = z.object({
  id: z.string(),
  section: z.literal("awards"),
  year: z.string(),
  award: z.string(),
  description: z.string(),
  status: contentStatusSchema,
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ApiAward = z.infer<typeof apiAwardSchema>;
export const apiAwardPageSchema = paginatedSchema(apiAwardSchema);

export const apiPartnerSchema = z.object({
  id: z.string(),
  section: z.literal("partners"),
  name: z.string(),
  logo: z.url(),
  status: contentStatusSchema,
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ApiPartner = z.infer<typeof apiPartnerSchema>;
export const apiPartnerPageSchema = paginatedSchema(apiPartnerSchema);

export const apiContentBundleSchema = z.object({
  projects: z.array(apiProjectSchema),
  testimonials: z.array(apiTestimonialSchema),
  spotlight: z.array(apiSpotlightSchema),
  staff: z.array(apiStaffSchema),
  awards: z.array(apiAwardSchema),
  partners: z.array(apiPartnerSchema),
});
export type ApiContentBundle = z.infer<typeof apiContentBundleSchema>;

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
