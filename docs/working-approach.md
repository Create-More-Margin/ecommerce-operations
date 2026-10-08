# Working approach
1. Identify the business workflow, failure, and acceptance criteria.
2. Inspect current data and permissions before changing anything.
3. Scope the smallest useful repair and explain dependencies.
4. Test failure paths as well as the expected path.
5. Verify the affected state after implementation.
6. Provide handoff notes, operating instructions, and remaining limits.

An API accepting a request is not proof that every intended business field changed. Verification must compare the resulting state.

For catalog audits, preserve source identifiers and distinguish parent products from variants. A repeated SKU may be intentional; report candidates for review before changing listings.

For automation, retain explicit write controls, handle uncertain responses without blind retries, and keep credentials out of repositories.

