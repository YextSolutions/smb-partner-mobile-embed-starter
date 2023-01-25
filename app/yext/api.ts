import Axios, { AxiosInstance } from "axios";
import { z } from "zod";
import {
  EntitiesListSchema,
  EntitySchema,
  ReviewListSchema,
  ReviewSchema,
  YextApiResponseSchema,
} from "./schemas";

const yextClient = (creds: YextCredentials) => {
  const { apiKey, accountId } = creds;
  return Axios.create({
    baseURL: `https://api.yext.com/v2/accounts/${accountId ? accountId : "me"}`,
    params: {
      v: "20221001",
      api_key: apiKey,
    },
  });
};

type YextCredentials = {
  apiKey: string;
  accountId?: string | undefined | null;
};

export const YextCredsSchema = z.object({
  apiKey: z.string(),
  accountId: z.string().optional().nullable(),
});

export const encryptCreds = (creds: YextCredentials) => {
  return Buffer.from(JSON.stringify(creds)).toString("base64");
};

export const decryptCreds = (encryptedCred: string) => {
  return YextCredsSchema.parse(
    JSON.parse(Buffer.from(encryptedCred, "base64").toString("ascii"))
  );
};

export const getYextAPICredientialFromRequest = (request: Request) => {
  const url = new URL(request.url);
  const encrypedCreds = z.string().parse(url.searchParams.get("creds"));

  // Decode the creds from base64
  const creds = decryptCreds(encrypedCreds);

  return creds as YextCredentials;
};

class YextApi {
  client: AxiosInstance;
  constructor(private creds: YextCredentials) {
    this.client = yextClient(creds);
  }

  async get(path: string, searchParams?: any) {
    const response = await this.client.get(path, {
      params: searchParams,
    });
    return YextApiResponseSchema.parse(response.data);
  }

  async put(path: string, data: any) {
    const response = await this.client.put(path, data);
    return YextApiResponseSchema.parse(response.data);
  }
}

export const fetchReviews = async ({ creds }: { creds: YextCredentials }) => {
  const api = new YextApi(creds);
  const { response } = await api.get("/reviews");
  return ReviewListSchema.parse(response);
};

export const isSingleEntity = async ({ creds }: { creds: YextCredentials }) => {
  const api = new YextApi(creds);
  const { response } = await api.get("/entities");
  const entities = EntitiesListSchema.parse(response);
  if (entities.count === 1) {
    return EntitySchema.parse(entities.entities[0]).meta.id;
  } else {
    return null;
  }
};

export const getOptimizationLink = async ({
  creds,
  entityIds,
  taskIds,
}: {
  creds: YextCredentials;
  entityIds: string[];
  taskIds: number[];
}) => {
  // https://api.yext.com/v2/accounts/me/optimizationlink?locationIds=100012&taskIds=29&api_key=23142ad192bfc9d6122f5c8afbde3db8&v=20230101
  const api = new YextApi(creds);
  const { response } = await api.get("/optimizationlink", {
    locationIds: entityIds.join(","),
    taskIds: taskIds.join(","),
  });
  return z
    .object({
      link: z.string(),
    })
    .parse(response);
};

export const fetchEntities = async ({ creds }: { creds: YextCredentials }) => {
  const api = new YextApi(creds);
  const { response } = await api.get("/entities");
  return EntitiesListSchema.parse(response);
};

export const fetchEntity = async ({
  creds,
  entityId,
}: {
  creds: YextCredentials;
  entityId: string;
}) => {
  const api = new YextApi(creds);
  const { response } = await api.get(`/entities/${entityId}`);
  return EntitySchema.parse(response);
};

export const updateEntity = async ({
  creds,
  entityId,
  data,
}: {
  creds: YextCredentials;
  entityId: string;
  data: any;
}) => {
  const api = new YextApi(creds);
  const res = await api.put(`/entities/${entityId}`, data);
  return z
    .object({
      meta: z.object({
        uuid: z.string(),
      }),
      response: z.any(),
    })
    .parse(res);
};

export const fetchReview = async ({
  creds,
  reviewId,
}: {
  creds: YextCredentials;
  reviewId: number;
}) => {
  const api = new YextApi(creds);
  const { response } = await api.get(`/reviews/${reviewId}`);
  const review = ReviewSchema.parse(response);
  return review;
};
