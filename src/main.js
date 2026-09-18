import './styles/main.scss'
import {
  variants,
  hasDiscount,
  discountPercent,
  weightLabel,
} from './variants.js'
import { formatPrice, unitPrice } from './format.js'

const selector = document.querySelector('.variant-selector')
const options = selector.querySelector('.variant-selector__options')
const currentPrice = document.querySelector('.price-pair__current')
const oldPrice = document.querySelector('.price-pair__old')
const oldAmount = oldPrice.querySelector('.price-pair__old-amount')
const discount = document.querySelector('.price-pair__discount')
const sku = document.querySelector('.product-card__sku')
const cartButton = document.querySelector('.cart-button')
const cartLabel = cartButton.querySelector('.cart-button__label')
const cartStatus = document.querySelector('.cart-button__status')

function renderOption(variant) {
  const id = `variant-${variant.weight}`
  return `
    <div class="variant-option">
      <input class="variant-option__input visually-hidden" type="radio"
        name="variant" id="${id}" value="${variant.weight}" />
      <label class="variant-option__label" for="${id}">
        <span class="variant-option__weight">${weightLabel(variant)}</span>
        <span class="variant-option__price">${formatPrice(variant.price)}</span>
        <span class="variant-option__unit-price">${formatPrice(unitPrice(variant))} за 100 г</span>
      </label>
    </div>`
}

function showVariant(variant) {
  currentPrice.textContent = formatPrice(variant.price)
  oldAmount.textContent = formatPrice(variant.oldPrice)
  oldPrice.hidden = !hasDiscount(variant)
  discount.textContent = `−${discountPercent(variant)}%` // U+2212 minus
  discount.hidden = !hasDiscount(variant)
  sku.textContent = variant.sku
}

function checkedVariant() {
  const checked = selector.querySelector('input[name="variant"]:checked')
  const weight = Number(checked?.value)
  return variants.find((variant) => variant.weight === weight) ?? variants[0]
}

// Keep the selected state a user may already have picked (or a restored
// form state) across the re-render, then derive the price pair from data
function syncVariant() {
  const variant = checkedVariant()
  selector.querySelector(`#variant-${variant.weight}`).checked = true
  showVariant(variant)
}

options.innerHTML = variants.map(renderOption).join('')
syncVariant()
window.addEventListener('pageshow', syncVariant)

selector.addEventListener('change', (event) => {
  const weight = Number(event.target.value)
  showVariant(variants.find((variant) => variant.weight === weight))
})

let doneTimer
cartButton.addEventListener('click', () => {
  cartButton.classList.add('cart-button--done')
  cartLabel.textContent = 'Добавлено'
  cartStatus.textContent = 'Товар добавлен в корзину'
  clearTimeout(doneTimer)
  doneTimer = setTimeout(() => {
    cartButton.classList.remove('cart-button--done')
    cartLabel.textContent = 'В корзину'
    cartStatus.textContent = ''
  }, 1000)
})
