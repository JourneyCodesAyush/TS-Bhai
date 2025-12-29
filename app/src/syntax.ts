import Prism, { languages } from "prismjs";

export const bhaiLangSyntax = languages.extend("clike", {
  comment: [
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true,
    },
    {
      pattern: /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/,
      lookbehind: true,
      greedy: true,
    },
  ],
  string: {
    pattern: /(["])((?:\\\1|(?:(?!\1)).)*)(\1)/,
    greedy: true,
  },
  keyword:
    /(?:bol bhai|bhai ye hai|nalla|agar bhai|nahi to bhai|warna bhai|jab tak bhai|bas kar bhai|agla dekh bhai)/,
  boolean: /\b(?:sahi|galat)\b/,
  number: /\b\d+(\.\d+)?\b/,
  operator: /(\+=|-=|\*=|\/=|==|>=|<=|=|\+|-|\*|\/|>|<)/,
  punctuation: /[{}();,]/,
});

Prism.languages.bhaiLang = bhaiLangSyntax;
