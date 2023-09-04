# 11ty-starter
Eleventy Static Site Starter

---

An Eleventy static-site started with sane defaults:

* Automatic parsing of YAML and CSV data files
* Pass-through copying of image, CSS, and JavaScript files
* Separate directories for layouts and includes
* A default site.yml data file for Jekyll-style `site.*` global variables
* A Jekyll-style `markdownify` filter for parsing Markdown inside variables
* Support for additional attributes in Markdown
* Support for [WebC](https://www.11ty.dev/docs/languages/webc/) components
* Support for [Eleventy Navigation](https://www.11ty.dev/docs/plugins/navigation/)
* Support for embedding templates within templates via thr [Render](https://www.11ty.dev/docs/plugins/render/) plugin (useful with WebC)
* A default layout using [Bamboo CSS](https://rilwis.github.io/bamboo/)
* Automatic building and minification of JavaScript and Less assets using [esbuild](https://esbuild.github.io/) (Yes, I prefer Less to Sass. I'm weird.)
* Tagging of JavaScript and CSS URLs with a version hash to prevent issues with agressive caching

## How To Use

1. Fork this repository
    1. Give it a new name
    1. Give it a description, if desired
    1. Check "copy the main branch only" to avoid copying the history of this repo
1. Clone the new repo to your local machine
1. (Optional) Add 11ty-starter as a remote to allow future changes to the starter template to be incorporated in the new site:

        git remote add upstream https://github.com/jpitoniak/11ty-starter.git
1. Start building your site
1. If using 11ty-starter as a remote, periodically pull in 11ty-starter updates with:

        git fetch upstream
        git rebase upstream/main
    
## Building the site

The included `package.json` file includes several pre-defined scripts for building the site.  They can be run by calling `npm run {SCRIPT}` with one of the following scripts:

* **build** - builds the site FOR PRODUCTION, which includes minifying JavaScript and CSS assets
* **build-test** - builds the site FOR TESTING: assets won't be minified, but sourcemaps will be generated
* **watch** - same as *build-test*, but Eleventy keeps running after the build to watch for changes and automatically rebuilds the site when any are detected
* **serve** - same as *watch*, but Eleventy also starts a webserver on port 8080 for local testing
* **clean** - delete everything from the _site directory.  This is automatically called when running *build*.

## JavaScript and Less

Eleventy will look for a `./jssrc/site.js` file and will use esbuild to transform it into an IIFE which is saved to `./_site/js/site.js`.  

Additional JavaScript assets, that do not need trasforming, can be added to the `./js` directory, where they will be copied to the site during build without transforming.  Avoid adding a `site.js` file to this directory, as the results will be unpredictable when the site is built.

Similarly, for Less code, Eleventy will look for a `./less/site.less` file and compile it to `./css/site.css`.  Standard CSS files in `./css` will be copied to the site, but again, placing a `site.css` in that directory should be avoided.

`site.js` and `site.css` will be minified when the site is built for production (i.e. `npm run build`).  Source maps will be generated when run with any of the other build scripts noted in the section above.

## TODO

Some things I plan to add, when time allows:

* **Precompression** - compressing web assets before they are served saves bandwidth and helps sites load faster.  Precompressing them (and configuring the web server to look for those precompressed files) allows for stronger compression and saves even more processing time
* **Image Optimization** including automatic generation of webp versions of images
* **Template Improvements** - add basic layout to sample site, navigation, etc.
