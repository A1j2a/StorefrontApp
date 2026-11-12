import { Product, ProductReview, StoreId } from '../types';

/**
 * Labelled MOCK / SAMPLE Shopify catalog data used for prototype execution.
 * Mirrors the normalized shape returned by the Shopify Storefront GraphQL API.
 */
export const MOCK_PRODUCTS_BY_STORE: Record<StoreId, Product[]> = {
  'store-a': [
    {
      id: 'gid://shopify/Product/1001',
      storeId: 'store-a',
      handle: 'apex-seamless-compression-tee',
      title: 'Apex Seamless Compression Tee',
      category: 'Tops',
      description:
        'Four-way stretch seamless knit engineered with breathable mesh zones and sweat-wicking yarn for heavy training days.',
      imageUrl:
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      badge: 'BESTSELLER',
      variants: [
        {
          id: 'gid://shopify/ProductVariant/1001-1',
          title: 'Onyx Black / S',
          size: 'S',
          color: 'Onyx Black',
          price: 38.0,
          availableForSale: true,
          sku: 'APX-TEE-BLK-S',
        },
        {
          id: 'gid://shopify/ProductVariant/1001-2',
          title: 'Onyx Black / M',
          size: 'M',
          color: 'Onyx Black',
          price: 38.0,
          availableForSale: true,
          sku: 'APX-TEE-BLK-M',
        },
        {
          id: 'gid://shopify/ProductVariant/1001-3',
          title: 'Onyx Black / L',
          size: 'L',
          color: 'Onyx Black',
          price: 38.0,
          availableForSale: false,
          sku: 'APX-TEE-BLK-L',
        },
        {
          id: 'gid://shopify/ProductVariant/1001-4',
          title: 'Steel Grey / M',
          size: 'M',
          color: 'Steel Grey',
          price: 40.0,
          availableForSale: true,
          sku: 'APX-TEE-GRY-M',
        },
      ],
    },
    {
      id: 'gid://shopify/Product/1002',
      storeId: 'store-a',
      handle: 'stride-5-inch-training-shorts',
      title: 'Stride 5" Training Shorts',
      category: 'Shorts',
      description:
        'Lightweight woven training shorts with concealed zip pockets, split hem mobility, and anti-chafe liner.',
      imageUrl:
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
      badge: 'NEW',
      variants: [
        {
          id: 'gid://shopify/ProductVariant/1002-1',
          title: 'Obsidian / S',
          size: 'S',
          color: 'Obsidian',
          price: 46.0,
          availableForSale: true,
          sku: 'STR-SHT-OBS-S',
        },
        {
          id: 'gid://shopify/ProductVariant/1002-2',
          title: 'Obsidian / M',
          size: 'M',
          color: 'Obsidian',
          price: 46.0,
          availableForSale: false,
          sku: 'STR-SHT-OBS-M',
        },
        {
          id: 'gid://shopify/ProductVariant/1002-3',
          title: 'Chalk / L',
          size: 'L',
          color: 'Chalk',
          price: 48.0,
          availableForSale: true,
          sku: 'STR-SHT-CHK-L',
        },
      ],
    },
    {
      id: 'gid://shopify/Product/1003',
      storeId: 'store-a',
      handle: 'crest-heavyweight-pump-hoodie',
      title: 'Crest Heavyweight Hoodie',
      category: 'Outerwear',
      description:
        '460gsm brushed cotton fleece cut with an oversized drop-shoulder silhouette for warm-ups and rest days.',
      imageUrl:
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      variants: [
        {
          id: 'gid://shopify/ProductVariant/1003-1',
          title: 'Jet Black / M',
          size: 'M',
          color: 'Jet Black',
          price: 68.0,
          availableForSale: true,
          sku: 'CRS-HOD-BLK-M',
        },
        {
          id: 'gid://shopify/ProductVariant/1003-2',
          title: 'Jet Black / XL',
          size: 'XL',
          color: 'Jet Black',
          price: 72.0,
          availableForSale: true,
          sku: 'CRS-HOD-BLK-XL',
        },
        {
          id: 'gid://shopify/ProductVariant/1003-3',
          title: 'Ash / S',
          size: 'S',
          color: 'Ash',
          price: 68.0,
          availableForSale: false,
          sku: 'CRS-HOD-ASH-S',
        },
      ],
    },
    {
      id: 'gid://shopify/Product/1004',
      storeId: 'store-a',
      handle: 'sculpt-high-rise-leggings',
      title: 'Sculpt High-Rise Leggings',
      category: 'Leggings',
      description:
        'Squat-proof matte interlock fabric with contoured waistband support and zero-front-seam comfort.',
      imageUrl:
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80',
      badge: 'LIMITED',
      variants: [
        {
          id: 'gid://shopify/ProductVariant/1004-1',
          title: 'Carbon / XS',
          size: 'XS',
          color: 'Carbon',
          price: 58.0,
          availableForSale: true,
          sku: 'SCP-LEG-CRB-XS',
        },
        {
          id: 'gid://shopify/ProductVariant/1004-2',
          title: 'Carbon / S',
          size: 'S',
          color: 'Carbon',
          price: 58.0,
          availableForSale: true,
          sku: 'SCP-LEG-CRB-S',
        },
        {
          id: 'gid://shopify/ProductVariant/1004-3',
          title: 'Carbon / M',
          size: 'M',
          color: 'Carbon',
          price: 58.0,
          availableForSale: false,
          sku: 'SCP-LEG-CRB-M',
        },
      ],
    },
  ],
  'store-b': [
    {
      id: 'gid://shopify/Product/2001',
      storeId: 'store-b',
      handle: 'silk-bias-midi-dress',
      title: 'Satin Bias Midi Dress',
      category: 'Dresses',
      description:
        'Fluid mulberry-finish satin cut on the bias for an effortless drape from daytime brunch to evening events.',
      imageUrl:
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      badge: 'BESTSELLER',
      variants: [
        {
          id: 'gid://shopify/ProductVariant/2001-1',
          title: 'Petal Pink / XS',
          size: 'XS',
          color: 'Petal Pink',
          price: 118.0,
          availableForSale: true,
          sku: 'MRS-DRS-PNK-XS',
        },
        {
          id: 'gid://shopify/ProductVariant/2001-2',
          title: 'Petal Pink / S',
          size: 'S',
          color: 'Petal Pink',
          price: 118.0,
          availableForSale: true,
          sku: 'MRS-DRS-PNK-S',
        },
        {
          id: 'gid://shopify/ProductVariant/2001-3',
          title: 'Petal Pink / M',
          size: 'M',
          color: 'Petal Pink',
          price: 118.0,
          availableForSale: false,
          sku: 'MRS-DRS-PNK-M',
        },
      ],
    },
    {
      id: 'gid://shopify/Product/2002',
      storeId: 'store-b',
      handle: 'cropped-boucle-cardigan',
      title: 'Cropped Bouclé Cardigan',
      category: 'Knitwear',
      description:
        'Soft textured bouclé knit finished with pearlized buttons and rib-knit cuffs.',
      imageUrl:
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      badge: 'NEW IN',
      variants: [
        {
          id: 'gid://shopify/ProductVariant/2002-1',
          title: 'Blush Cream / S',
          size: 'S',
          color: 'Blush Cream',
          price: 84.0,
          availableForSale: true,
          sku: 'MRS-KNT-BLS-S',
        },
        {
          id: 'gid://shopify/ProductVariant/2002-2',
          title: 'Blush Cream / M',
          size: 'M',
          color: 'Blush Cream',
          price: 84.0,
          availableForSale: false,
          sku: 'MRS-KNT-BLS-M',
        },
        {
          id: 'gid://shopify/ProductVariant/2002-3',
          title: 'Rosewood / L',
          size: 'L',
          color: 'Rosewood',
          price: 88.0,
          availableForSale: true,
          sku: 'MRS-KNT-RSW-L',
        },
      ],
    },
    {
      id: 'gid://shopify/Product/2003',
      storeId: 'store-b',
      handle: 'tailored-linen-blazer',
      title: 'Tailored Linen Blazer',
      category: 'Tailoring',
      description:
        'Single-breasted breathable European linen blazer with relaxed structured shoulders and satin lining.',
      imageUrl:
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      variants: [
        {
          id: 'gid://shopify/ProductVariant/2003-1',
          title: 'Ivory / S',
          size: 'S',
          color: 'Ivory',
          price: 145.0,
          availableForSale: true,
          sku: 'MRS-BLZ-IVR-S',
        },
        {
          id: 'gid://shopify/ProductVariant/2003-2',
          title: 'Ivory / M',
          size: 'M',
          color: 'Ivory',
          price: 145.0,
          availableForSale: true,
          sku: 'MRS-BLZ-IVR-M',
        },
        {
          id: 'gid://shopify/ProductVariant/2003-3',
          title: 'Dusty Rose / L',
          size: 'L',
          color: 'Dusty Rose',
          price: 150.0,
          availableForSale: false,
          sku: 'MRS-BLZ-DRS-L',
        },
      ],
    },
    {
      id: 'gid://shopify/Product/2004',
      storeId: 'store-b',
      handle: 'pleated-mini-tote-bag',
      title: 'Pleated Leather Mini Tote',
      category: 'Accessories',
      description:
        'Supple vegan pebble leather handbag with detachable crossbody strap and magnetic closure.',
      imageUrl:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      badge: 'LIMITED',
      variants: [
        {
          id: 'gid://shopify/ProductVariant/2004-1',
          title: 'Fuchsia / One Size',
          size: 'One Size',
          color: 'Fuchsia',
          price: 96.0,
          availableForSale: true,
          sku: 'MRS-BAG-FCH-OS',
        },
        {
          id: 'gid://shopify/ProductVariant/2004-2',
          title: 'Champagne / One Size',
          size: 'One Size',
          color: 'Champagne',
          price: 96.0,
          availableForSale: false,
          sku: 'MRS-BAG-CMP-OS',
        },
      ],
    },
  ],
};

export const MOCK_REVIEWS_BY_PRODUCT: Record<string, ProductReview[]> = {
  'gid://shopify/Product/1001': [
    {
      id: 'rev-1',
      author: 'Marcus V.',
      rating: 5,
      date: '2 days ago',
      title: 'Locked-in fit for push day',
      comment:
        'Breathable across the upper back and zero bunching around the shoulders. Ordered M at 5ft 11in and the taper is spot on.',
      verifiedBuyer: true,
    },
    {
      id: 'rev-2',
      author: 'Elena R.',
      rating: 5,
      date: '1 week ago',
      title: 'Doesn’t hold sweat',
      comment:
        'Wore it through a 45-minute conditioning circuit and it dried almost immediately.',
      verifiedBuyer: true,
    },
  ],
  'gid://shopify/Product/1002': [
    {
      id: 'rev-3',
      author: 'Devon K.',
      rating: 5,
      date: '4 days ago',
      title: 'Zip pockets actually stay flat',
      comment:
        'Phone never bounces during box jumps or sprints. Best 5-inch length in the rotation.',
      verifiedBuyer: true,
    },
  ],
};

export const DEFAULT_MOCK_REVIEWS: ProductReview[] = [
  {
    id: 'rev-default-1',
    author: 'Jordan T.',
    rating: 5,
    date: '5 days ago',
    title: 'True to size & great fabric weight',
    comment:
      'Clean stitching and holds shape after multiple washes. Exactly what I expected from the collection.',
    verifiedBuyer: true,
  },
  {
    id: 'rev-default-2',
    author: 'Priya S.',
    rating: 4,
    date: '2 weeks ago',
    title: 'Comfortable everyday staple',
    comment:
      'Super soft feel and great stretch recovery. Would love even more colorways restocked soon.',
    verifiedBuyer: true,
  },
];

