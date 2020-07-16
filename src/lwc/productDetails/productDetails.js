import {LightningElement, api, track} from 'lwc';

/**
 * Displays a model with product details
 */
export default class ProductDetails extends LightningElement {
    @track openmodel = false;
    @track id;

    @api
    showDetails(id) {
        this.openmodel = true;
        this.id = id;
    }

    closeModal() {
        this.id = undefined;
        this.openmodel = false;
    }
}