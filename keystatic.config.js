// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'TharinduEpaz/epazingha-me-v3', // Your GitHub repo (username/repo-name)
      },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        date: fields.date({ label: 'Date' }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'src/content/blog/{slug}',
          publicPath: './{slug}/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        authors: fields.array(fields.text({ label: 'Author' }), {
          label: 'Authors',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/blog/{slug}',
              publicPath: './{slug}/',
            },
          },
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'name',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'src/content/projects',
          publicPath: './',
        }),
        link: fields.url({
          label: 'Project Link (URL)',
          validation: { isRequired: false },
        }),
        startDate: fields.date({
          label: 'Start Date',
          validation: { isRequired: false },
        }),
        endDate: fields.date({
          label: 'End Date',
          validation: { isRequired: false },
        }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/projects',
              publicPath: './',
            },
          },
        }),
      },
    }),
  },
});