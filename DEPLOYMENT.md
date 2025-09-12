# 🚀 Deployment Guide

## Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy
   - Your site will be live at `https://your-project.vercel.app`

3. **Environment Variables** (if needed)
   - Add any API keys in Vercel dashboard
   - Update `metadataBase` in `src/lib/metadata.ts`

## Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Node Version**: 18.x or higher

## Custom Domain

1. **Update metadata.ts**
   ```typescript
   metadataBase: new URL("https://yourdomain.com")
   ```

2. **Update sitemap.xml**
   - Replace `https://example.com` with your domain

3. **Add CNAME record** pointing to your hosting provider

## Performance Optimization

### Image Optimization
- Replace placeholder images with optimized WebP/AVIF
- Use Next.js `<Image>` component for automatic optimization
- Add proper alt text for accessibility

### Bundle Analysis
```bash
npm install -D @next/bundle-analyzer
npm run build
npm run analyze
```

### SEO Checklist
- [ ] Update all metadata with real content
- [ ] Add real project images and descriptions
- [ ] Test with Google PageSpeed Insights
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (optional)

## Content Updates

### Adding New Projects
1. Add project data to `public/data/projects.json`
2. Add images to appropriate `public/assets/` folder
3. Update thumbnail paths in JSON

### Adding New Pages
1. Create new page in `src/app/[lang]/`
2. Add metadata using `generatePageMetadata()`
3. Update navigation in `src/app/layout.tsx`
4. Add to sitemap.xml

## Monitoring

### Analytics
- Add Google Analytics 4
- Monitor Core Web Vitals
- Track user interactions

### Error Monitoring
- Consider adding Sentry for error tracking
- Monitor 404s and broken links

## Security

### Headers
Add security headers in `next.config.ts`:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};
```

## Backup Strategy
- Regular GitHub commits
- Database backups (if using)
- Asset backups to cloud storage
