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
const discount = document.querySelector('.price-pair__discount')
const sku = document.querySelector('.product-card__sku')
const cartButton = document.querySelector('.cart-button')
const cartLabel = cartButton.querySelector('.cart-button__label')

function renderOption(variant, index) {
  const id = `variant-${variant.weight}`
  return `
    <div class="variant-option">
      <input class="variant-option__input visually-hidden" type="radio"
        name="variant" id="${id}" value="${variant.weight}"${index === 0 ? ' checked' : ''} />
      <label class="variant-option__label" for="${id}">
        <span class="variant-option__weight">${weightLabel(variant)}</span>
        <span class="variant-option__price">${formatPrice(variant.price)}</span>
        <span class="variant-option__unit-price">${formatPrice(unitPrice(variant))} за 100 г</span>
      </label>
    </div>`
}

function showVariant(variant) {
  currentPrice.textContent = formatPrice(variant.price)
  // The last child is the amount text node after the hidden «Старая цена» prefix
  oldPrice.lastChild.textContent = ` ${formatPrice(variant.oldPrice)}`
  oldPrice.hidden = !hasDiscount(variant)
  discount.textContent = `−${discountPercent(variant)}%` // U+2212 minus
  discount.hidden = !hasDiscount(variant)
  sku.textContent = variant.sku
}

options.innerHTML = variants.map(renderOption).join('')

selector.addEventListener('change', (event) => {
  const weight = Number(event.target.value)
  showVariant(variants.find((variant) => variant.weight === weight))
})

let doneTimer
cartButton.addEventListener('click', () => {
  cartButton.classList.add('cart-button--done')
  cartLabel.textContent = 'Добавлено'
  clearTimeout(doneTimer)
  doneTimer = setTimeout(() => {
    cartButton.classList.remove('cart-button--done')
    cartLabel.textContent = 'В корзину'
  }, 1000)
})
