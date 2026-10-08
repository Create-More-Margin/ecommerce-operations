import test from 'node:test';
import assert from 'node:assert/strict';
import { auditCatalog } from '../examples/catalog-audit.mjs';

test('flags literal duplicates while preserving similar SKUs and titles', () => {
  const rows = [
    { id: 1, sku: 'OB-3W', title: 'Soap' },
    { id: 2, sku: 'TOB-3W', title: 'Soap' },
    { id: 3, sku: 'OB-3W', title: 'Soap' },
    { id: 4, sku: 'OB-3W', title: 'Soap Large' },
  ];
  const before = structuredClone(rows);
  const result = auditCatalog(rows);
  assert.equal(result.candidates.length, 1);
  assert.deepEqual(result.candidates[0].matches.map(x => x.id), [1, 3]);
  assert.deepEqual(rows, before);
  assert.equal(result.listingMutations, 0);
});
test('reports missing values instead of grouping incomplete records', () => {
  assert.equal(auditCatalog([{ sku: '', title: 'x' }, { sku: 'x', title: null }]).missing.length, 2);
});
test('handles empty input and rejects invalid containers', () => {
  assert.deepEqual(auditCatalog([]).candidates, []);
  assert.throws(() => auditCatalog(null), TypeError);
  assert.throws(() => auditCatalog([null]), TypeError);
});

