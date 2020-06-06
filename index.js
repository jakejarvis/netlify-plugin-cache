// https://github.com/netlify/build/blob/master/packages/cache-utils/README.md

module.exports = {
  // try to restore cache before build begins, if it exists
  onPreBuild: async ({ utils: { cache }, inputs }) => {
    if (await cache.restore(inputs.paths)) {
      const files = await cache.list(inputs.paths)
      console.log(`Successfully restored: ${inputs.paths.join(', ')} ... ${files.length} files in total.`)
    } else {
      console.log(`A cache of ${inputs.paths.join(', ')} doesn't exist (yet).`)
    }
  },

  // only save/update cache if build was successful
  onSuccess: async ({ utils: { cache, status }, inputs }) => {
    if (await cache.save(inputs.paths)) {
      const files = await cache.list(inputs.paths)
      console.log(`Successfully cached: ${inputs.paths.join(', ')} ... ${files.length} files in total.`)

      // show success & more detail in deploy summary
      status.show({
        title: `${files.length} files cached`,
        summary: 'These will be restored on the next build! ⚡',
        text: `${inputs.paths.join(', ')}`,
      })
    } else {
      console.log(`Failed caching ${inputs.paths.join(', ')}. :(`)
    }
  },
}
  