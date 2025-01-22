import type { TocLink } from '@nuxt/content';

interface Links {
  id: string;
  text: string;
  depth: number;
}

export function getTocTextsWithIndent(tocLinks: TocLink[] | undefined) {
  const tocTexts: Links[] = [];

  function traverseLinks(links: TocLink[] | undefined) {
    if (links) {
      for (const link of links) {
        tocTexts.push({ id: link.id, text: link.text, depth: link.depth });

        if (link.children) {
          traverseLinks(link.children);
        }
      }
    }
  }

  traverseLinks(tocLinks);

  return tocTexts;
}