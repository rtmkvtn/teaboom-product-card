// Russian price format: thousands grouped with a narrow no-break space
// (U+202F), decimal comma, fraction only when non-zero, and a no-break
// space (U+00A0) before the ruble sign so the amount never wraps.
export function formatPrice(rubles) {
  const [whole, fraction] = rubles.toFixed(2).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+$)/g, ' ')
  return `${grouped}${fraction === '00' ? '' : `,${fraction}`} ₽`
}

// Current price per 100 г, rounded to kopecks to avoid float noise
export function unitPrice(variant) {
  return Math.round((variant.price / variant.weight) * 100 * 100) / 100
}
