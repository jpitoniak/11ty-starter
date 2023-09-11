const yaml = require("js-yaml")
const {parse} = require("csv-parse/sync")
const pluginWebc = require("@11ty/eleventy-plugin-webc")
const esbuild = require("esbuild")
const {lessLoader} = require("esbuild-plugin-less")
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster")
const markdownItAttrs = require("markdown-it-attrs")
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const { EleventyRenderPlugin } = require("@11ty/eleventy")

module.exports = function (eleventyConfig) {
    // ignore the _drafts directory when building for production
    if(process.env.ELEVENTY_ENV === "production" || process.env.SKIP_DRAFTS == true) {
        eleventyConfig.ignores.add("_drafts")
    }

    // copy directories of static files to the _site folder
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("images")
    eleventyConfig.addPassthroughCopy("js")

    // process Markdown and HTML templates; copy image files and PDFs that are stored anywhere in the site
	eleventyConfig.setTemplateFormats([
		"md",
		"html",
		"jpg",
		"jpeg",
		"png",
		"pdf"
	]);

    // custom markdown filters
    const md = require("markdown-it")({
    	html: true,  // allow html tags in markdown content
    	breaks: false, // do not treat newlines in markdown as <br> tags
    	linkify: true //convert bare URLs into links
    }).use(markdownItAttrs)

    // implement Jekyll's markdownify plugin (parse markdown in variables)
	eleventyConfig.addFilter("markdownify", value => (value) ? md.render(value) : "")

	// allow parsng yaml data files
    eleventyConfig.addDataExtension("yaml, yml", contents => yaml.load(contents));

    // allow parsing csv files
    eleventyConfig.addDataExtension("csv", contents => parse(contents, {
        columns: true,
        skip_empty_lines: true
    }))

    // allow webc components
    eleventyConfig.addPlugin(pluginWebc, {
    	components: "_components/**/*.webc"
    })

    // allow-templates inside templates (i.e. webc inside markdown) with the render plugin
    eleventyConfig.addPlugin(EleventyRenderPlugin)

    // watch for changes in the jssrc and less directories
    eleventyConfig.addWatchTarget("./jssrc")
    eleventyConfig.addWatchTarget("./less")

    eleventyConfig.addPlugin(cacheBuster({
        outputDirectory: "./_site"
    }))

    // enable the Eleventy Navigation plugin
    eleventyConfig.addPlugin(eleventyNavigationPlugin)

    eleventyConfig.on("eleventy.before", () => {
        // build jssrc/site.js and less/site.less
        return esbuild.build({
            entryPoints: [
                { out: "js/site", in: "./jssrc/site.js"},
                { out: "css/site", in: "./less/site.less"},
            ],
            external: [  // don't try to include images and fonts when building css files
                "*.svg",
                "*.jpg",
                "*.png",
                "*.gif",
                "*.webp",
                "*.woff",
                "*.woff2"
            ],
            outdir: "_site",
            bundle: true,
            minify: process.env.ELEVENTY_ENV === "production",
            sourcemap: process.env.ELEVENTY_ENV !== "production",
            plugins: [lessLoader()]
        })
    })

	return {
		dir: {
            // look for layout files in _layouts instead of _includes
			layouts: "_layouts"
	    }
	}
}
