module.exports = {
  apps: [
    {
      // Local development/testing configuration (macOS)
      name: "pow-notes-local",
      script: "server.js",
      cwd: ".",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 8069,
        HOST: "localhost",
      },
      error_file: "./logs/local-err.log",
      out_file: "./logs/local-out.log",
      log_file: "./logs/local-combined.log",
      time: true,
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
    {
      // Production configuration (Ubuntu server)
      name: "pow-notes-prod",
      script: "server.js",
      cwd: "/var/www/pow-notes",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000,
      env: {
        NODE_ENV: "production",
        PORT: 8069,
        HOST: "0.0.0.0",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8069,
        HOST: "0.0.0.0",
      },
      error_file: "/var/log/pow-notes/error.log",
      out_file: "/var/log/pow-notes/out.log",
      log_file: "/var/log/pow-notes/combined.log",
      time: true,
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      log_type: "json",
    },
  ],

  // Deployment configuration for remote servers
  deploy: {
    production: {
      user: "deploy",
      host: "pow.otherstuff.ai",
      ref: "origin/main",
      repo: "git@github.com:username/pow-notes.git", // Update with your actual repo
      path: "/var/www/pow-notes",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install --production && npm run build && pm2 reload ecosystem.config.cjs --env production",
      "pre-setup": "",
    },
  },
};
