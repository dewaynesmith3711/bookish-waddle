---
layout: "layouts/blog-post.njk"
title: Automating Web Performance Measurement
description: >
  Use PSI to get web performance metrics into your build process.
authors:
  - addyosmani
date: 2014-06-05
updated: 2019-03-15
---

Web performance can have a huge impact on your [entire](http://radar.oreilly.com/2014/01/web-performance-is-user-experience.html) user experience. If you’ve been looking at improving your own site’s perf lately, you’ve probably heard of [PageSpeed Insights](https://pagespeed.web.dev/) - a tool that analyzes pages and offers advice on how to make them faster based on best practices for mobile and desktop web performance.

PageSpeed’s scores are based on a number of factors, including how well your scripts are minimized, images optimized, content gzipped, tap targets being appropriately sized and landing page redirects avoided.

With [40%](https://www.akamai.com/about/news/press/2009-press/akamai-reveals-2-seconds-as-the-new-threshold-of-acceptability-for-ecommerce-web-page-response-times.jsp) of people potentially abandoning pages that take more than 3 seconds to load, caring about how quickly your pages load on your users devices is increasingly becoming an essential part of our development workflow.

## Performance metrics in your build process

Although manually going to the [PageSpeed Insights](https://pagespeed.web.dev/) to find out how your scores is fine, a number of developers have been asking whether it's possible to get similar performance scoring into their build process.

The answer is: absolutely.

## Introducing PSI for Node

Today we’re happy to introduce [PSI](https://github.com/addyosmani/psi/) for Node - a new module that works great with [Gulp](https://gulpjs.com/), [Grunt](https://gruntjs.com/) and other build systems and can connect up to the PageSpeed Insights service and return a detailed report of your web performance. Let’s look at a preview of the type of reporting it enables:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/KI5rpndvxVoRE1Nyoc0m.png", alt="Perfromance reporting screen", width="786", height="900" %}
</figure>

The results above are good for getting a feel for the type of improvements that could be made. For example, a 5.92 for sizing content to viewport means “some” work can still be done whilst a 24 for minimizing render blocking resources may suggest you need to defer loading of JS using the `async` attribute.

### Lowering the barrier of entry to PageSpeed Insights

If you've tried using the PageSpeed Insights API in the past or attempted to use any of the tools we build on top of it, you probably had to register for a dedicated API key. We know that although this just takes a few minutes, it can be a turn off for getting Insights as part of your regular workflow.

We're happy to inform you that the PageSpeed Insights service supports making requests without an API key for up to 1 request every 5 seconds (plenty for anyone). For more regular usage or serious production builds, you'll probably want to register for a key.

The PSI module supports both a `nokey` option for getting it setup in less than a few minutes and the `key` option for a little longer. Details on how to register for an [API key](https://developers.google.com/speed/docs/insights/v5/getting_started#auth) are documented.

### Getting started

You have two options for how you integrate PSI into your workflow. You can either integrate it into your build process or run it as a globally installed tool on your system.

### Build process

Using PSI in your Grunt or Gulp build-process is fairly straight-forward. If you’re working on a Gulp project, you can install and use PSI directly.

**Install**

Install PSI using npm and pass `--save-dev` to save it to your package.json file.


```shell
npm install psi --save-dev
```

Then define a Gulp task for it in your gulpfile as follows (also covered in our Gulp [sample](https://github.com/addyosmani/psi-gulp-sample) project):


```js
var psi = require('psi');
gulp.task('psi', function (cb) {
    psi({
        nokey: 'true', // or use key: ‘YOUR_API_KEY’
        url: site,
        strategy: 'mobile',
    }, cb);
});
```

For the above, you can then run the task using:


```shell
gulp psi
```

And if you’re using Grunt, you can use [grunt-pagespeed](https://github.com/jrcryer/grunt-pagespeed) by James Cryer which now uses PSI to power it’s reporting.

**Install**

```shell
npm install grunt-pagespeed --save-dev
```

Then load the task in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-pagespeed');
```

and configure it for use:


```json
pagespeed: {
    options: {
    nokey: true,
    url: "https://www.html5rocks.com",
    strategy: "mobile"
    }
}
```


You can then run the task using:

```shell
grunt pagespeed
```

### Installing as a global tool

You can also  install PSI as a globally available tool on your system. Once again, we can use npm to install the tool:

```shell
$ npm install -g psi
```

And via any terminal window, request PageSpeed Insights reports for a site (with the `nokey` option or an API specific `key` as follows):

```shell
psi http://www.html5rocks.com --nokey --strategy=mobile
```

or for those with a registered API key:

```shell
psi http://www.html5rocks.com --key=YOUR_API_KEY --strategy=mobile
```

That’s it!

## Go forth and make performance part of your culture

We need to start thinking more about the impact of our designs and implementations on user experience.

Solutions like PSI can keep an eye on your web performance on desktop and mobile and are useful when used as part of your regular post-deployment workflow.

We're eager to hear of any feedback you might have and hope PSI helps improve the performance culture on your team.


