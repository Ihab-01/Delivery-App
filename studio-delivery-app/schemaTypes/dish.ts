import { defineField, defineType } from "sanity";

export const dish = defineType({
    name: 'dish',
    title: 'Dish',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Dish Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Dish Description',
            type: 'string',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'price',
            title: 'Price of the Dish in USD',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image of the Dish',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})