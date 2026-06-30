#!/bin/bash
set -e

DOMAIN="${1:-veiled.com}"
EMAIL="${2:-admin@veiled.com}"

echo "=== Veiled Deployment Script for Hostinger KVM ==="
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo ""

# --- System deps ---
apt-get update
apt-get install -y curl git nginx certbot python3-certbot-nginx

# --- Docker ---
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker "$USER"
fi

# --- Clone / Pull ---
if [ ! -d /opt/veiled ]; then
  git clone https://github.com/Ayankhan1267/veield.git /opt/veiled
fi
cd /opt/veiled
git pull origin master

# --- Generate DB password if not set ---
if [ ! -f .env ]; then
  DB_PASS=$(openssl rand -hex 16)
  SECRET=$(openssl rand -hex 32)
  JWT_SECRET=$(openssl rand -hex 32)
  cat > .env <<EOF
DATABASE_URL="postgresql://veiled:${DB_PASS}@db:5432/veiled"
NEXTAUTH_URL="https://${DOMAIN}"
NEXTAUTH_SECRET="${SECRET}"
JWT_SECRET="${JWT_SECRET}"
DB_PASSWORD="${DB_PASS}"
DOMAIN="${DOMAIN}"
EOF
  echo ".env created with random secrets"
fi

# --- Nginx reverse proxy ---
cat > /etc/nginx/sites-available/veiled <<NGINX
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /_next/static {
        proxy_cache_bypass \$http_upgrade;
        proxy_pass http://127.0.0.1:3000;
    }

    location /images {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/veiled /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# --- SSL via Let's Encrypt ---
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos -m "${EMAIL}"

# --- Build & run with Docker ---
docker compose -f docker-compose.prod.yml up -d --build

# --- Run DB migrations ---
sleep 5
docker compose -f docker-compose.prod.yml exec -T app npx prisma db push

echo ""
echo "=== Deployment complete! ==="
echo "Visit https://${DOMAIN}"
echo "Admin: https://${DOMAIN}/admin"
echo ""
echo "First, create an admin user:"
echo "  docker compose -f docker-compose.prod.yml exec app npm run seed"
