import { z } from "zod";

export const addSiteSchema = z.object({
  site_name: z.string().min(1, "Site name is required"),
  address: z.string().min(1, "Site location is required"),
  job_type: z.string().min(1, "Job type is required"),
  uniform: z.array(z.string()).min(1, "Select at least one uniform"),
  client_name: z.string().min(1, "Client name is required"),
  client_email: z
    .string()
    .min(1, "Client email is required")
    .email("Please enter a valid email address"),
});

export type AddSiteSchema = z.infer<typeof addSiteSchema>;

export const editSiteSchema = addSiteSchema.extend({
  status: z.enum(["active", "suspended"]),
});

export type EditSiteSchema = z.infer<typeof editSiteSchema>;
