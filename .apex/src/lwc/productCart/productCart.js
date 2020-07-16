import {LightningElement, api, track, wire} from 'lwc';
import getProductInCart from '@salesforce/apex/ProductCartController.getProductInCart';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/**
 * Displays the cart with selected products
 * */
export default class ProductCart extends LightningElement {
    productlist;
    @track recordsInCart;
    recordsData = [];

    /** Called by mainComponent with click on "Cart" button */
    showCart = false;
    @api
    changeCartView() {
        this.showCart = true;
    }

    /** Get products to view */

    @api
    setProductsInCart(value) {
        this.productlist = value;
    }

    /** Get product data by Id list*/
    @wire(getProductInCart, {idList : '$productlist'})
    wiredProductInCart({error, data}) {
        if (data) {
            this.recordsInCart = JSON.parse(data.toString());
            this.recordsData = [];
            for (let i in this.recordsInCart) {
                this.recordsData.push({id: i, count: this.recordsInCart[i] })
            }
        }
    }

    /** Handle click on button "Check out" (create new order with order items) */
    handleCheckOutCart() {
        if (this.recordsData.length !== 0)
            this.template.querySelector('c-object-builder').createOrder(this.recordsData);
        else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Cart is empty',
                    variant: 'error',
                })
            );
        }
    }
}