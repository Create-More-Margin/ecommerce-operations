# Create More Margin
## Ecommerce operations, integrations, and automation
Led by Jeff Chappell. We help ecommerce businesses connect storefronts, marketplaces, catalog data, and operational workflows.

This repository presents our working approach and a runnable catalog-audit example. The example uses synthetic data. It is not client production code.

### Start here
- [Catalog audit example](examples/catalog-audit.mjs)
- [Working approach](docs/working-approach.md)

### Services
Shopify and marketplace workflow troubleshooting; catalog and inventory process review; integration development; automation with explicit write controls, tests, and verification.

### Demonstration
The included example reports literal SKU-and-title duplicate candidates and incomplete records without changing listings. Its tests cover candidate detection, similar SKUs, invalid inputs, and preservation of input data. It uses synthetic records and is not evidence of deployed client work.

### Run the example
Requires Node.js 22 or newer. No packages, account access, or credentials.
```sh
node examples/catalog-audit.mjs
node --test tests/catalog-audit.test.mjs
```

### Discuss a project
Email [Jeff](mailto:jeff@createmoremargin.com) with the platform, operational problem, and desired outcome. Start with a bounded diagnosis, then agree on implementation and acceptance criteria.

No revenue increases, time savings, or client endorsements are claimed without supporting evidence.

