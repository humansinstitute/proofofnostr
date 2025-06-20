# PM2 Deployment Guide

## Quick Start

### Local Testing (macOS)

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start PM2 locally:**

   ```bash
   npm run pm2:start:local
   ```

3. **Test the application:**
   Open http://localhost:8069 in your browser

4. **Stop when done:**
   ```bash
   npm run pm2:stop
   ```

### Production Deployment (Ubuntu Server)

1. **Install PM2 globally (if not already installed):**

   ```bash
   npm install -g pm2
   ```

2. **Clone/update your repository:**

   ```bash
   git clone <your-repo-url> /var/www/pow-notes
   cd /var/www/pow-notes
   ```

3. **Install dependencies and build:**

   ```bash
   npm install --production
   npm install -g serve  # Install serve globally for production
   npm run build
   ```

4. **Create log directories:**

   ```bash
   sudo mkdir -p /var/log/pow-notes
   sudo chown $USER:$USER /var/log/pow-notes
   ```

5. **Start the application:**

   ```bash
   npm run pm2:start:prod
   ```

6. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

## Available Scripts

| Script                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm run start:prod`      | Start with serve directly (no PM2)       |
| `npm run pm2:start`       | Start both local and prod configurations |
| `npm run pm2:start:local` | Start only local configuration           |
| `npm run pm2:start:prod`  | Start only production configuration      |
| `npm run pm2:stop`        | Stop all PM2 processes                   |
| `npm run pm2:restart`     | Restart all PM2 processes                |
| `npm run pm2:reload`      | Reload all PM2 processes (zero downtime) |
| `npm run pm2:delete`      | Delete all PM2 processes                 |
| `npm run pm2:logs`        | View PM2 logs                            |
| `npm run pm2:status`      | Check PM2 process status                 |
| `npm run pm2:monit`       | Open PM2 monitoring dashboard            |

## nginx Configuration

Add this to your nginx site configuration:

```nginx
server {
    listen 80;
    server_name pow.otherstuff.ai;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pow.otherstuff.ai;

    # SSL configuration (add your certificate paths)
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    location / {
        proxy_pass http://localhost:8069;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Optional: serve static assets directly from nginx for better performance
    location /assets/ {
        alias /var/www/pow-notes/dist/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Monitoring and Maintenance

### Check Application Status

```bash
npm run pm2:status
```

### View Logs

```bash
npm run pm2:logs
# Or for specific app:
pm2 logs pow-notes-prod
```

### Monitor Resources

```bash
npm run pm2:monit
```

### Update Application

```bash
cd /var/www/pow-notes
git pull origin main
npm install --production
npm run build
npm run pm2:reload  # Zero downtime restart
```

### Troubleshooting

1. **Port 8069 already in use:**

   ```bash
   sudo lsof -i :8069
   # Kill the process using the port
   ```

2. **Permission errors:**

   ```bash
   sudo chown -R $USER:$USER /var/www/pow-notes
   sudo chown -R $USER:$USER /var/log/pow-notes
   ```

3. **PM2 not starting:**

   ```bash
   pm2 kill
   pm2 start ecosystem.config.js --env production
   ```

4. **Check nginx status:**
   ```bash
   sudo systemctl status nginx
   sudo nginx -t  # Test configuration
   ```

## Security Notes

- Run PM2 as a non-root user
- Set proper file permissions on the application directory
- Use nginx for SSL termination and security headers
- Regularly update dependencies and the server OS
- Monitor logs for suspicious activity

## Performance Tips

- Use `pm2 reload` instead of `restart` for zero-downtime updates
- Monitor memory usage with `pm2 monit`
- Set up log rotation to prevent disk space issues
- Consider using nginx to serve static assets directly
- Enable gzip compression in nginx for better performance
