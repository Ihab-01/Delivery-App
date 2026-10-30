import { defineField, defineType } from "sanity";

export const restaurant = defineType({
    name: 'restaurant',
    title: 'Restaurant',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Restaurant Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Restaurant Description',
            type: 'string',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'image',
            title: 'Restaurant Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'lat',
            title: 'Restaurant Latitude',
            type: 'number',
        }),
        defineField({
            name: 'long',
            title: 'Restaurant Longitude',
            type: 'number',
        }),
        defineField({
            name: 'address',
            title: 'Restaurant Address',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Enter a Rating (1-5 Stars)',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5).error('Please enter a number between 1 and 5'),
        }),
        defineField({
            name: 'type',
            title: 'Category',
            type: 'array',
            of: [{ type: 'reference', to: [{type: 'category'}] }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'dishes',
            title: 'Dishes',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'dish' }] }],
        }),
    ],
})