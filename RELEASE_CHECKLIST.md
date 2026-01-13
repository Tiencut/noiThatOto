# Release checklist

- [ ] Update `public/data/products.json` (generate with `npm run generate-data` or via CRON workflow)
- [ ] Verify featured products, search and filter on staging
- [ ] Provide `GEMINI_KEY` in environment if using AI enhancement
- [ ] Provide `ANALYTICS_ENDPOINT` in environment for production event capture
- [ ] Run basic accessibility audit (Lighthouse)
- [ ] Configure Vercel project and set secrets: `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`, `VERCEL_SCOPE`
- [ ] Merge PR and confirm successful deploy on Vercel
