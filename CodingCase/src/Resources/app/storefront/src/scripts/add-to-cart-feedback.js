import AddToCart from 'src/plugin/add-to-cart/add-to-cart.plugin'
import DomAccess from 'src/helper/dom-access.helper'
import HttpClient from 'src/service/http-client.service'


export default class AddToCartFeedback extends AddToCart {

    init(){
        this.PluginManager = window.PluginManager
        this._cartEL = DomAccess.querySelector(document,'.header-cart') //.btn-buy .buy-widget data-add-to-cart vorher: .header-cart
        this._btnEL = DomAccess.querySelector(document,'.btn-buy')
        this._client= new HttpClient(window.accessKey, window.contextToken)
        super.init()
        console.info("INIT klappt")
    }


    _openOffCanvasCart(instance, requestUrl, formData) {
        this._client.post(requestUrl, formData, this._afterAddItemToCart.bind(this))
    
    }

    // Trigger the Feedback Script
    _afterAddItemToCart(){
        this._refreshCartValue()
        console.info("afterAddItem klappt")
        this._feedbackButton()
    }


    _refreshCartValue(){
        const cartWidgetEL = DomAccess.querySelector(this._cartEL, '[data-cart-widget]')
        const cartWidgetInstance = this.PluginManager.getPluginInstanceFromElement(cartWidgetEL, 'CartWidget')
        cartWidgetInstance.fetch()
    }


    // Adding a visual Feedback to the buy button and shopping-cart
    _feedbackButton(){
        
        const option = JSON.stringify(this.options.btnText)
        const text = document.getElementById("btnFeedback").innerHTML
        const newText = "Wird in den Warenkorb gelegt ..."

        this._cartEL.classList.add('feedbackCart')
        this._btnEL.classList.add('feedback')

        document.getElementById("btnFeedback").innerHTML = newText

        // Animation
        window.setTimeout(() => {

            document.getElementById("btnFeedback").innerHTML = "Wird in den Warenkorb gelegt .."

        }, 333)

        window.setTimeout(() => {

            document.getElementById("btnFeedback").innerHTML = "Wird in den Warenkorb gelegt ."

        }, 666)
        
        // Reset color and text
        window.setTimeout(() => {
            this._cartEL.classList.remove('feedbackCart')
            this._btnEL.classList.remove('feedback')
            document.getElementById("btnFeedback").innerHTML = text

        }, 1000)
    }
}