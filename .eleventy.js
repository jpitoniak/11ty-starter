const yaml = require("js-yaml")
const {parse} = require("csv-parse/sync")
const pluginWebc = require("@11ty/eleventy-plugin-webc")

module.exports = function (eleventyConfig) {
    // copy directories of static files to the _site folder
	eleventyConfig.addPassthroughCopy("css")
	eleventyConfig.addPassthroughCopy("images")
	eleventyConfig.addPassthroughCopy("js")

    // process Markdown and HTML templates; copy image files and PDFs that are stored anywhere in the site
	eleventyConfig.setTemplateFormats([
		'md',
		'html',
		'jpg',
		'jpeg',
		'png',
		'pdf'
	]);

    // custom markdown filters
    const md = require("markdown-it")({
    	html: true,  // allow html tags in markdown content
    	breaks: false, // do not treat newlines in markdown as <br> tags
    	linkify: true //convert bare URLs into links
    })

    // implement Jekyll's markdownify plugin (parse markdown in variables)
	eleventyConfig.addFilter("markdownify", value => (value) ? md.render(value) : '')

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

	return {
		dir: {
            // look for layout files in _layouts instead of _includes
			layouts: "_layouts"
	    }
	}
