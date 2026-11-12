const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_PATH = path.join(ROOT_DIR, '.env');
const EXAMPLE_PATH = path.join(ROOT_DIR, '.env.example');
const OUTPUT_PATH = path.join(ROOT_DIR, 'src', 'config', 'env.generated.ts');

function parseEnv(raw) {
  const result = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

function syncEnv() {
  const sourcePath = fs.existsSync(ENV_PATH)
    ? ENV_PATH
    : fs.existsSync(EXAMPLE_PATH)
      ? EXAMPLE_PATH
      : null;

  const parsed = sourcePath ? parseEnv(fs.readFileSync(sourcePath, 'utf8')) : {};

  const payload = {
    USE_LIVE_SHOPIFY: parsed.USE_LIVE_SHOPIFY || 'false',
    SHOPIFY_API_VERSION: parsed.SHOPIFY_API_VERSION || '2025-01',
    STORE_A_DOMAIN:
      parsed.STORE_A_DOMAIN || 'apex-athletics-demo.myshopify.com',
    STORE_A_STOREFRONT_TOKEN: parsed.STORE_A_STOREFRONT_TOKEN || '',
    STORE_B_DOMAIN: parsed.STORE_B_DOMAIN || 'maison-rose-demo.myshopify.com',
    STORE_B_STOREFRONT_TOKEN: parsed.STORE_B_STOREFRONT_TOKEN || '',
    REVIEWS_API_URL: parsed.REVIEWS_API_URL || '',
    REVIEWS_API_KEY: parsed.REVIEWS_API_KEY || '',
  };

  const fileContent =
    `// Auto-generated from .env by scripts/syncEnv.js — do not commit real tokens.\n` +
    `export const GENERATED_ENV = ${JSON.stringify(payload, null, 2)} as const;\n`;

  const existing = fs.existsSync(OUTPUT_PATH)
    ? fs.readFileSync(OUTPUT_PATH, 'utf8')
    : '';

  if (existing !== fileContent) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, fileContent, 'utf8');
  }
}

if (require.main === module) {
  syncEnv();
}

module.exports = { syncEnv };

