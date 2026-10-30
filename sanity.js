import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
    projectId: 'c8cxjidd',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2026-10-30',
})

const build = createImageUrlBuilder(client);
export const urlFor = (source)=> build.image(source);

export default client;