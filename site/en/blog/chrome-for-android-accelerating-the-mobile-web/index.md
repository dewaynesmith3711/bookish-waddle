---
layout: 'layouts/blog-post.njk'
title: Chrome for Android - Accelerating the Mobile Web
description: >
  Chrome for Android Beta is based on the Chromium open source project, and brings with it many of the latest HTML5 features that Chrome developers have come to know and love
authors:
  - borissmus
date: 2012-02-06
updated: 2019-02-01

---

You've probably already heard that Chrome for Android Beta launched today. This
new browser is based on the Chromium open source project, and brings with it
many of the latest HTML5 features that Chrome developers have come to know and
love. For an overview of the new hotness, see the launch announcement on
[blog.chromium.org][chromium-blog] and a more detailed overview on
[code.google.com][codesite]. I'll quickly go through the stuff I personally
find most interesting:

## UI Improvements

Chrome for Android makes it easy for developers to create modern mobile web
user interfaces using fixed positioning, and `overflow: scroll` for
individually scrollable elements. In addition, native-like scroll behavior is
enabled by default. Chrome for Android supports the [old flexbox
model][flexbox-old], though be aware that the original flexbox model is deprecated
in favor of a [new one][flexbox-new]. Also supported are DateTime pickers, and
early support for `<input type="range">`.


## Fast graphics

Chrome for Android also supports hardware accelerated canvas, and performs
quite well. There's also support for [requestAnimationFrame][raf], which is
important for mobile, letting the browser decide when to render, giving it a
chance to manage battery life more efficiently in GPU intensive applications.
Chrome for Android introduces a slew of other notable HTML5 features including
[File System API][], [IndexedDB][], [Web Workers][] and [Web Sockets][].

## Remote debugging

Hands down, my personal favorite feature of Chrome for Android is remote
debugging through the [Chrome Developer Tools][cdt]. Remote debugging makes it
very easy for web developers to debug their application as it's running live on
their mobile device, without having to resort to clever hacks such as Weinre.
Here's a quick screencast showing this feature in action:

{% YouTube id="s4zpL4VBbuU" %}


For more information about remote debugging, see this [remote debugging
article][debugging].

Try Chrome for Android Beta for yourself by [downloading it from Google Play][market]. If you've written a mobile web app to use a feature, but
Chrome for Android doesn't support it, keep in mind that this is a beta
release, and see if this is already a [known issue][mcrbug], and star it if it is.
Otherwise, please [log a bug][new-mcrbug].

I'm stoked about the positive impact Chrome for Android will make on the mobile
web developer community, and looking forward to see the great things we can
build together! If you have additional questions, see if they are already
answered in this [FAQ][faq]. Otherwise, if you have a Chrome-specific mobile
web development question, please post it on Stack Overflow, tagged with the
[google-chrome and android][so] tags.

[so]: https://stackoverflow.com/questions/tagged/google-chrome+android
[faq]: /docs/multidevice/faq/
[raf]: https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
[debugging]: /docs/devtools/remote-debugging
[flexbox-new]: https://www.w3.org/TR/css-flexbox-1/
[flexbox-old]: https://www.html5rocks.com/tutorials/flexbox/quick/
[market]: https://play.google.com/store/apps/details?id=com.android.chrome
[chromium-blog]: https://blog.chromium.org/2012/02/deeper-look-at-chrome-for-android.html
[codesite]: /multidevice
[cdt]: /docs/devtools
[indexeddb]: https://www.html5rocks.com/tutorials/indexeddb/uidatabinding/#toc-intro
[web workers]: https://www.html5rocks.com/tutorials/workers/basics/
[web sockets]: https://www.html5rocks.com/tutorials/websockets/basics/
[mcrbug]: https://support.google.com/chrome/answer/95315
[new-mcrbug]: https://support.google.com/chrome/answer/95315
[file system api]: https://www.html5rocks.com/tutorials/file/filesystem/


