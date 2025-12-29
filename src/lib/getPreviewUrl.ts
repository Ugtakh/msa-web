export const getPreviewUrl = (fileId: string) => {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}` +
        `/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${fileId}/preview` +
        `?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`;
}