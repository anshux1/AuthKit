import { BlobServiceClient } from "@azure/storage-blob"
import { env } from "~/env"

export const blobServiceClient = new BlobServiceClient(env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL)
export const containerName = env.NEXT_PUBLIC_AZURE_BLOB_CONTAINER_NAME
export const containerClient = blobServiceClient.getContainerClient(containerName)
