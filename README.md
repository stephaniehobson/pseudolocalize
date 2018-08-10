# Pseudolocalize #

## What is pseudolocalization? ##

[Pseudolocalization](https://en.wikipedia.org/wiki/Pseudolocalization) is a method for testing
how code handles other languages. But you don't need to have a full translation to do the testing. Words get replaced with an altered version to fake translation.

For example: Account Settings → Àççôûñţ Šéţţîñĝš

This extension includes two pseudolocalization options:

### Accented ###

This option will replace English characters with accented characters. This helps test fonts
and page encoding. It also makes the text 30% longer which helps test for variation in
word lengths (for example: German is often longer than English).

### Bidi ###

This option will replace the English characters with backwards characters. It will also insert
hidden characters what will get Firefox to treat the fake words as if they are in a language
that is written from right to left.

It will also set the `dir` attribute on the `<html>` to RTL.

### Reset ###

It's a very basic extension. To return to the original page, you will need to refresh.

## Thanks ##

This extension was inspired by [Firefox 62 Pseudolocalization Demo](https://www.youtube.com/watch?v=pmT9PINv6nE) and uses the [`transformString`](https://searchfox.org/mozilla-central/source/intl/l10n/L10nRegistry.jsm#248) function and
character maps straight out of Firefox.

The [Your Second Extension tutorial](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension)
on the MDN Web Docs site was very useful to me!

# Generate release #

```
./zipup $VERSION
git push --follow-tags
```
