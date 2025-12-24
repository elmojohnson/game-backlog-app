import * as z from "zod";

export const BacklogSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
});

export type BacklogDto = z.infer<typeof BacklogSchema>;
