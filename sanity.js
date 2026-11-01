import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
    projectId: 'c8cxjidd',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2026-10-30',
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;