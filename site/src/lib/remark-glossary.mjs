import glossarySrc from '../../../glossary.md?raw';


function defsMd(src) {
  const defs = [];
  let id = null;
  for (const line of src.split(/\r?\n/)) {
    const heading = line.match(/^###\s+(.+?)\s*\{#g-([\w-]+)\}\s*$/);
    if (heading) {
      id = heading[2];
    } else if (/^#/.test(line)) {
      id = null;
    } else if (id && line.trim().length > 0) {
      defs.push(`[^g-${id}]: ${line.trim()}`);
      id = null;
    }
  }
  return defs.join('\n');
}

const marker = /\[\^g-([\w-]+)\]/g;

export default {
  text(node, ctx) {
    if (!node.value.includes('[^g-')) return undefined;
    const parts = [];
    let last = 0;
    marker.lastIndex = 0;
    let m;
    while ((m = marker.exec(node.value))) {
      if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) });
      parts.push({ type: 'footnoteReference', identifier: `g-${m[1]}`, label: `g-${m[1]}` });
      last = marker.lastIndex;
    }
    if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
    ctx.replaceNode(node, parts);
    return undefined;
  },
  after(root, ctx) {
    if (!ctx.source.includes('[^g-')) return;
    ctx.appendChild(root, { raw: `\n\n${defsMd(glossarySrc)}` });
  },
};
