# Netlify Plugin: Custom Cache

[![npm](https://img.shields.io/npm/v/netlify-plugin-cache?logo=npm&color=red)](https://www.npmjs.com/package/netlify-plugin-cache)

A generic cache plugin for saving and restoring files and/or folders between Netlify builds for impressive speed improvements. Worry less about running out of build minutes! ⚡

In other words, this plugin is a pretty wrapper around [Netlify's native cache utility](https://github.com/netlify/build/blob/master/packages/cache-utils/README.md
) — it isn't tied to any specific static site generator (on purpose).

## Install

Add the following to your `netlify.toml` configuration:

```toml
[[plugins]]
package = "netlify-plugin-cache"
  [plugins.inputs]
  paths = ["resources", "_vendor", "folder/file.md"]
```

This plugin only takes one input named `paths`, an array of files and/or directories relative to your project's root. These files/directories are restored before a build and saved in cache after a build **if it is successful**.

**🚨 Important:** `paths` defaults to `[".cache"]`, but it's **highly recommended** you set this yourself based on the tools you're using. See examples below.

Read more about plugin configuration at [the official Netlify Plugin docs](https://docs.netlify.com/configure-builds/build-plugins/#install-a-plugin).

## Usage examples

- **Hugo:** Caching the `resources` directory can speed up your build greatly if you [process](https://gohugo.io/content-management/image-processing/) a lot of images via Hugo pipes. You can also cache the `public` directory to avoid completely rebuilding the entire site on each deploy. [More info here.](https://gohugo.io/getting-started/directory-structure/#directory-structure-explained)
- **Gatsby:** By default, the `.cache` directory holds persistent data between builds. You can also cache the `dist` directory to avoid completely rebuilding the entire site on each deploy. [More info here.](https://www.gatsbyjs.org/docs/build-caching/)
- **Next.js:** The `.next` directory holds the build output. [More info here.](https://nextjs.org/docs/api-reference/next.config.js/setting-a-custom-build-directory)
- **Anything else:** This is the reason I kept this plugin as generic as possible! Research the caching behavior of your static site generator (and how to customize it if necessary). Feel free to make a PR and add it here as another example, too!

## Debugging

This plugin doesn't provide a way to output a list of files that were cached or restored, because Netlify already provides an official plugin named [`netlify-plugin-debug-cache`](https://github.com/netlify-labs/netlify-plugin-debug-cache) to do exactly that. No need to re-invent the wheel!

You can add their debug plugin **after** this plugin in your `netlify.toml`. (And yes, you need a `[[plugins]]` line for *each* plugin you add.)

```toml
[[plugins]]
package = "netlify-plugin-debug-cache"
```

The plugin will generate a file named `cache-output.json` at the root of your project's publish directory. [See an example file](https://gist.github.com/jakejarvis/dff606289e8b5d6be42d317e425bbee6#file-cache-output-json) or [learn more about this plugin](https://github.com/netlify-labs/netlify-plugin-debug-cache).

## Licenses

This project is distributed under the [MIT License](LICENSE).
