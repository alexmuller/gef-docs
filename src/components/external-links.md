---
title: External Links
summary: When we link to content, it’s important to differentiate between internal and external links so our audience knows exactly what to expect. External links direct people outside of the BBC domain, and are clearly indicated with an icon.
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/external-linking
includecss: gelui.css
---

## Introduction

External links point to non-BBC domains. 

Whether the external link is inline (e.g. inside a paragraph) or as an item belonging to a list of 'further reading', it must be accompanied by the [GEL Iconography](https://www.bbc.co.uk/gel/guidelines/iconography) external link icon.

External links navugate the user to new and potentially unfamiliar user interfaces. Blind users should be warned of this context change by including some visually hidden text reading _"leave BBC site"_ or similar.

## Expected markup

### Inline external link

::: info Code is elided
The example places the external link within a paragraph. The paragraph text surrounding the link has been replaced with '...'
:::

```html
<p>...
  <a href="link/to/exteranl/resource">
    <span class="vh">leave BBC site:</span>
    Football Association of 
    <span class="gel-nowrap">
      Wales
      <svg class="gel-icon gel-icon--text" focusable="false">
        <use xlink:href="{{site.basedir}}/static/images/gel-icons-all.svg#gel-icon-external-link" style="undefined"></use>
      </svg>
    </span>
  </a>
...</p>
```

#### Notes

* **`<span class="vh">leave BBC site:</span>`:** This text comes before the link's unique text content in both inline and list-based external links. It is visually hidden using the `vh` class[^1] and warns screen reader users of the change in context `target="_blank"` will invoke. In most screen reader software it will be read after the link role, resulting in _"link, leave BBC site: [unique link text]"_. The appended colon ensures there is a pause between _"leave BBC site"_ and the link text.
* **`gel-icon`:** The icon must use the [GEL Iconography](https://www.bbc.co.uk/gel/guidelines/iconography) external link icon. In addition, apply `focusable="false"` to ensure Internet Explorer and some versions of Edge do not place the SVG in focus order[^2] (if JavaScript is not taking care of this already).
* **`gel-nowrap`:** Use this `<span>` to wrap the icon and the last word of the link's unique text. By applying `white-space: nowrap` it ensures the icon never becomes a widow (wraps onto a new link by itself)

### External link list

```html
<h2>Further reading</h2>
<ul class="gel-external-links">
  <li>
    <a href="#">
      <svg class="gel-icon gel-icon--text" focusable="false">
        <use xlink:href="{{site.basedir}}/static/images/gel-icons-all.svg#gel-icon-external-link" style="undefined"></use>
      </svg>
      <span class="vh">leave BBC site:</span>
      Football Association of Wales
    </a>
  </li>
  <li>
    <a href="#">
      <svg class="gel-icon gel-icon--text" focusable="false">
        <use xlink:href="{{site.basedir}}/static/images/gel-icons-all.svg#gel-icon-external-link" style="undefined"></use>
      </svg>
      <span class="vh">leave BBC site:</span>
      Europa League final
    </a>
  </li>
  <li>
    <a href="#">
      <svg class="gel-icon gel-icon--text" focusable="false">
        <use xlink:href="{{site.basedir}}/static/images/gel-icons-all.svg#gel-icon-external-link" style="undefined"></use>
      </svg>
      <span class="vh">leave BBC site:</span>
      West Bromwich Albion official site
    </a>
  </li>
</ul>
```

#### Notes

* The main difference between external links within listsis that the icon comes _before_ the content
* **`<ul>` and `<li>`:** It is important list markup is used since it identifies itself to assistive technologies, enumerates the items, and provides navigation options in screen readers. 
* **`<h2>`** In most cases, lists of external links should be introduced by a heading. This makes them more discoverable within the document structure, both visually and by screen reader shortcuts. Make sure the heading is of the correct level (see [**Headings**](#link-todo)) and contains suitable text, such as _"Further reading"_ or _"Read more"_.

## Expected layout

The link itself does not need any special styling, and should inherit link styling for the context. But be sure to wrap the last word and icon in a `gel-nowrap` `<span>` to stop the icon becoming a widow (inline external links only).

```css
.gel-nowrap {
  white-space: nowrap;
}
```

Unfortunately, upon removing the bullets from the list using `list-style: none`, some Voiceover versions cease to identify the list. This can be remedied by placing some arbitrary pseudo-content before each item. In the following solution[^3], a zero-width space is added:

```css
.gel-external-links {
  list-style-type: none;
}

.gel-external-links li::before {
  content: '\200B';
}
```

Some white space is placed between external links in the list formation to improve demarcation and legibility:

```css
.gel-external-links li + li {
  margin-top: 0.5rem;
}
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behavior of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/external-links.html">

<p><a class="gel-button gel-button--dark gel-long-primer-bold" href="../demos/external-links/" target="_new">Open in new window <svg class="gel-button__icon gel-icon gel-icon--text"><use xlink:href="/code-gel/static/images/gel-icons-core-set.svg#gel-icon-external-link"></use></svg></a></p>

## Test specifications

[TODO]

## Related research

[TODO]

### Further reading, elsewhere on the Web

[^1]: Gist of the `vh` (visually hidden) class <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^2]: "Removing SVG Keyboard Focus in IE" — websemantics.uk
[^3]: "VoiceOver and list-style-type: none" — unfetteredthoughts.net, <https://unfetteredthoughts.net/2017/09/26/voiceover-and-list-style-type-none/>