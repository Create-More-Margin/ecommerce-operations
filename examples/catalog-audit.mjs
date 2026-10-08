import { pathToFileURL } from 'node:url';

/** Read-only candidate detection. Inputs and outputs stay in memory. */
export function auditCatalog(rows) {
  if (!Array.isArray(rows)) throw new TypeError('rows must be an array');
  const groups = new Map();
  const missing = [];
  for (const [index, row] of rows.entries()) {
    if (!row || typeof row !== 'object' || Array.isArray(row)) throw new TypeError('each row must be an object');
    if (typeof row.sku !== 'string' || !row.sku.trim() || typeof row.title !== 'string' || !row.title.trim()) {
      missing.push({ index, id: row.id ?? null });
      continue;
    }
    // Literal comparison: case, spacing, and similar SKUs remain distinct.
    const key = JSON.stringify([row.sku, row.title]);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ index, id: row.id ?? null, status: row.status ?? null });
  }
  const candidates = [...groups.entries()]
    .filter(([, matches]) => matches.length > 1)
    .map(([key, matches]) => {
      const [sku, title] = JSON.parse(key);
      return { sku, title, matches };
    });
  return { rowCount: rows.length, missing, candidates, listingMutations: 0 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const rows = [
    { id: 'demo-1', sku: 'SOAP-01', title: 'Sample Soap', status: 'active' },
    { id: 'demo-2', sku: 'SOAP-01', title: 'Sample Soap', status: 'draft' },
    { id: 'demo-3', sku: 'SOAP-01-L', title: 'Sample Soap Large', status: 'active' },
    { id: 'demo-4', sku: '', title: 'Unassigned Sample', status: 'draft' },
  ];
  console.log(JSON.stringify(auditCatalog(rows), null, 2));
}

