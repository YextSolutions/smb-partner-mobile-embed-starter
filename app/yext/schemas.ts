import { z } from "zod";

export const YextApiResponseSchema = z.object({
  meta: z.object({
    uuid: z.string(),
  }),
  response: z.any(),
});

// export const EntitySchema = z.object({

export const ReviewSchema = z.object({
  id: z.number(),
  locationId: z.string(),
  accountId: z.string(),
  publisherId: z.string(),
  rating: z.number(),
  title: z.string().optional(),
  content: z.string(),
  authorName: z.string(),
  authorEmail: z.string().optional(),
  url: z.string(),
  publisherDate: z.number(),
  lastYextUpdateTime: z.number(),
  status: z.string(),
  flagStatus: z.string(),
  reviewLanguage: z.string().optional(),
  comments: z.array(
    z.object({
      id: z.number(),
      parentId: z.number().optional(),
      publisherDate: z.number(),
      authorName: z.string(),
      authorEmail: z.string().optional(),
      authorRole: z.string(),
      content: z.string(),
      visibility: z.string(),
    })
  ),
});

export const ReviewListSchema = z.object({
  count: z.number(),
  averageRating: z.number(),
  reviews: z.array(ReviewSchema),
});

export const ImageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  region: z.string().optional(),
  postalCode: z.string(),
  countryCode: z.string(),
});

export const HourseInterval = z.object({
  start: z.string(),
  end: z.string(),
});

export const DaySchema = z.object({
  openIntervals: z.array(HourseInterval).optional(),
  isClosed: z.boolean().optional(),
});

export const HoursSchema = z.object({
  monday: DaySchema,
  tuesday: DaySchema,
  wednesday: DaySchema,
  thursday: DaySchema,
  friday: DaySchema,
  saturday: DaySchema,
  sunday: DaySchema,
});

export const EntitySchema = z.object({
  meta: z.object({
    accountId: z.string(),
    uid: z.string(),
    id: z.string(),
    timestamp: z.string(),
    labels: z.array(z.string()).optional(),
    folderId: z.string(),
    language: z.string(),
    countryCode: z.string(),
    entityType: z.string(),
  }),
  name: z.string(),
  address: AddressSchema.optional(),
  addressHidden: z.boolean().optional(),
  logo: z
    .object({
      image: ImageSchema,
      description: z.string().optional(),
    })
    .optional(),
  description: z.string().optional(),
  closed: z.boolean().optional(),
  mainPhone: z.string().optional(),
  hours: HoursSchema.optional(),
  additionalHoursText: z.string().optional(),
});

export const EntitiesListSchema = z.object({
  count: z.number(),
  pageToken: z.string().optional(),
  entities: z.array(EntitySchema),
});
