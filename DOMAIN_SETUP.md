# IONOS Domain Setup Guide

## Overview
Your domain is configured through IONOS with a sponsor redirect from Entri. This setup ensures proper routing and acknowledgment of hackathon sponsors.

## Domain Configuration Steps

### 1. IONOS DNS Configuration
Configure these DNS records in your IONOS control panel:

```
Type: CNAME
Name: www
Value: your-site.netlify.app
TTL: 3600

Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

Type: CNAME
Name: *
Value: your-site.netlify.app
TTL: 3600
```

### 2. Netlify Domain Settings
1. Go to your Netlify dashboard
2. Navigate to Site Settings > Domain Management
3. Add your IONOS domain
4. Verify DNS configuration

### 3. SSL Certificate
- Netlify will automatically provision SSL certificate
- This may take 24-48 hours to fully propagate
- Ensure HTTPS redirect is enabled

### 4. Entri Sponsor Redirect
The following redirects are configured:
- `/entri-redirect` → https://entri.app
- `/sponsor` → https://entri.app

This acknowledges Entri as a hackathon sponsor while maintaining your site functionality.

## Verification Steps

### Test Domain Resolution
```bash
# Check DNS propagation
nslookup your-domain.com

# Test HTTPS
curl -I https://your-domain.com

# Verify redirects
curl -I https://your-domain.com/entri-redirect
```

### Expected Results
- Main site loads on your custom domain
- HTTPS is enabled and working
- Sponsor redirects function properly
- All routes work correctly

## Troubleshooting

### Common Issues
1. **DNS not propagating**: Wait 24-48 hours
2. **SSL certificate pending**: Check domain verification
3. **Redirects not working**: Verify netlify.toml configuration
4. **404 errors**: Ensure SPA fallback is configured

### Support Contacts
- **IONOS Support**: For DNS and domain issues
- **Netlify Support**: For hosting and SSL issues
- **Hackathon Organizers**: For sponsor redirect requirements

## Security Features
- HTTPS enforcement
- Security headers configured
- Content Security Policy enabled
- XSS protection active

## Performance Optimizations
- Static asset caching (1 year)
- Gzip compression enabled
- CDN distribution via Netlify

## Monitoring
Monitor your domain setup:
- SSL certificate expiration
- DNS record integrity
- Redirect functionality
- Site performance metrics

---

**Note**: The Entri redirect is part of the hackathon sponsorship agreement and should remain active during the competition period.