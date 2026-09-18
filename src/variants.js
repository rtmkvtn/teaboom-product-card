// Packaging variants: the single source of truth for the selector,
// the price pair and the SKU. Prices are in rubles, weight in grams.
export const variants = [
  { weight: 100, sku: '01306', price: 326.4, oldPrice: 349.2 },
  { weight: 500, sku: '01307', price: 1432, oldPrice: 1646 },
  { weight: 1000, sku: '01308', price: 2064, oldPrice: 2592 },
  { weight: 5000, sku: '01309', price: 6320, oldPrice: 8710 },
]

export const hasDiscount = (variant) => variant.oldPrice > variant.price

export const discountPercent = (variant) =>
  Math.round((1 - variant.price / variant.oldPrice) * 100)

// No-break space (U+00A0) keeps the number and the unit on one line
export const weightLabel = (variant) => `${variant.weight} г`
