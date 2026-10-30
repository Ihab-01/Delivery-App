import { defineField, defineType } from "sanity";

export const feature= defineType({
    name: 'feature',
    title: 'Feature',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Feature Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Feature Description',
            type: 'string',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'restaurants',
            title: 'Restaurants',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'restaurant' }] }],
        }),
    ],
})