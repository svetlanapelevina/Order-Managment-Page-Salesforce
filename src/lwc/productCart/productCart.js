import {LightningElement, api, track, wire} from 'lwc';
import getProductInCart from '@salesforce/apex/ProductCartController.getProductInCart';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProductCart extends LightningElement {
    showCart = false;
    @api
    changeCartView() {
        this.showCart = true;
    }

    productlist;
    @api
    setProductsInCart(value) {
        this.productlist = value;
    }

    @track recordsInCart;
    recordsData = [];
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