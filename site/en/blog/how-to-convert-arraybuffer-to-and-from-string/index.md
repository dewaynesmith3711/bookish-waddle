---
layout: 'layouts/blog-post.njk'
title: How to convert ArrayBuffer to and from String
description: >
  How to convert ArrayBuffer to and from String
authors:
  - renatomangini
date: 2012-06-14
updated: 2019-02-09

---

{% Aside %}
 **Update, August 2014**: The Encoding API specification has matured, and a
number of browsers now support it natively. The information in this article
still applies for browsers that don’t yet support the Encoding API, but the
recommended approach is to use the official API wherever possible. See [Easier
ArrayBuffer <-> String conversion with the Encoding
API](/blog/easier-arraybuffer-string-conversion-with-the-encoding-api)
for more details.
{% endAside %}


ArrayBuffers are used to transport raw data and several new APIs rely on them,
including
[WebSockets](https://www.html5rocks.com/tutorials/websockets/basics/),
[Web Intents](https://www.w3.org/TR/web-intents/)
2](https://www.html5rocks.com/en/tutorials/file/xhr2/) and
[WebWorkers](https://www.html5rocks.com/en/tutorials/workers/basics/#toc-gettingstarted-workercomm). However, because they recently landed in the
JavaScript world, sometimes they are misinterpreted or misused.

Semantically, an [ArrayBuffer](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
is simply an array of bytes viewed through a specific mask.
This mask, an instance of
[ArrayBufferView](https://developer.mozilla.org/docs/Web/API/ArrayBufferView),
defines how bytes are aligned to match
the expected structure of the content. For example, if you know that the bytes
in an ArrayBuffer represent an array of 16-bit unsigned integers, you just wrap
the ArrayBuffer in a `Uint16Array` view and you can manipulate its elements
using the brackets syntax as if the `Uint16Array` was an integer array:


```js
// suppose buf contains the bytes [0x02, 0x01, 0x03, 0x07]
// notice the multibyte values respect the hardware endianess, which is little-endian in x86
var bufView = new Uint16Array(buf);
if (bufView[0]===258) {   // 258 === 0x0102
    console.log("ok");
}
bufView[0] = 255;    // buf now contains the bytes [0xFF, 0x00, 0x03, 0x07]
bufView[0] = 0xff05; // buf now contains the bytes [0x05, 0xFF, 0x03, 0x07]
bufView[1] = 0x0210; // buf now contains the bytes [0x05, 0xFF, 0x10, 0x02]
```


One common practical question about ArrayBuffer is how to convert a `String` to
an `ArrayBuffer` and vice-versa. Since an ArrayBuffer is, in fact, a byte array,
this conversion requires that both ends agree on how to represent the characters
in the String as bytes. You probably have seen this "agreement" before: it is
the String's character encoding (and the usual "agreement terms" are, for
example, Unicode UTF-16 and iso8859-1). Thus, supposing you and the other party
have agreed on the UTF-16 encoding, the conversion code could be something like:


```js
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
```

Note the use of `Uint16Array`. This is an ArrayBuffer view that aligns bytes of
the ArrayBuffers as 16-bit elements. It doesn't handle the character encoding
itself, which is handled as Unicode by `String.fromCharCode` and
`str.charCodeAt`.

Note: A robust implementation of the String to ArrayBuffer conversion capable of
handling more encodings is provided by
[the stringencoding library](https://github.com/inexorabletash/text-encoding).
But, for simple usage where
you control both sides of the communication pipe, the code above is probably
enough. A standardized API specification for String encoding
[is being drafted](https://encoding.spec.whatwg.org/#api)
[by the WHATWG](https://encoding.spec.whatwg.org/#api) working group.

A popular StackOverflow
[question about this](https://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers)
has a highly voted answer with a somewhat convoluted solution to the conversion:
create a `FileReader` to act as a converter and feed a `Blob` containing the
String into it. Although this method works, it has poor readability and I
suspect it is slow. Since unfounded suspicions have driven many mistakes in the
history of humanity, let's take a more scientific approach here. I have
[jsperf'ed the two methods](https://jsperf.com/arraybuffer-string-conversion/4)
and the result confirms my suspicion and you [check out the demo here](https://www.html5rocks.com/tutorials/canvas/performance/).

In Chrome 20, it is almost 27 times faster to use the direct `ArrayBuffer` manipulation code on this article than it is to use the `FileReader`/`Blob` method.

