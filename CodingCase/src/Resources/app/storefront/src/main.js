import StickyHeader from './scripts/sticky-header'
import AddToCartFeedback from './scripts/add-to-cart-feedback'

console.info("JS Loaded 8mylez!")


window.PluginManager.register('StickyHeader', StickyHeader, '.main-navigation')
window.PluginManager.override('AddToCart', AddToCartFeedback, '[data-add-to-cart]')