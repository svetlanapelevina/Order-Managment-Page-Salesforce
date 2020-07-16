import {LightningElement, wire, api, track} from 'lwc';
import getFamilies from '@salesforce/apex/FilterProductsController.getFamilies';
import getTypes from '@salesforce/apex/FilterProductsController.getTypes';
import filerResult from '@salesforce/apex/FilterProductsController.filerResult';

export default class ProductList extends LightningElement {
    //data
    @track products;
    /**
     * Load the list of available products.
     */

    // check-boxes
    families;
    @wire(getFamilies)
    wiredFamiliesList(data) {
        if (data) {
            this.families = data;
            this.families = this.families.data;
        }
    }

    types;
    @wire(getTypes)
    wiredTypesList(data) {
        if (data) {
            this.types = data;
            this.types = this.types.data;
        }
    }

    get optionsFamilies() {
        var result = []
        for (let i in this.families) {
            result.push({label: this.families[i], value: this.families[i]});
        }
        return result;
    }

    get optionsTypes() {
        var result = []
        for (let i in this.types) {
            result.push({label: this.types[i], value: this.types[i]});
        }
        return result;
    }


    @wire(filerResult, {familyFilters : '$familiesFilter', typeFilters: '$typesFilter', searchKey: '$inputValue'})
    wiredFilterProduct(data) {
        if (data) { this.products = data; }
    }

    familiesFilter = [];
    handleCheckBoxFilterChange(e) {
        this.familiesFilter = e.detail.value;
        this.wiredFilterProduct();
    }

    typesFilter = [];
    handleCheckBoxTypeChange(e) {
        this.typesFilter = e.detail.value;
        this.wiredFilterProduct();
    }

    inputValue = '';
    handleSearch(event) {
        this.inputValue = event.target.value;
        this.wiredFilterProduct();
    }

    //show detais
    handleShowDetails(event) {
        this.template.querySelector('c-product-details').showDetails(event.target.name);
    }

    // add to cart
    @api recordList = [];
    handleAddProductToCart(event) {
        this.recordList.push(event.target.name);
        this.template.querySelector('c-product-cart').setProductsInCart(this.recordList);
    }

    @api
    changeCartView1() {
        this.template.querySelector('c-product-cart').changeCartView();
    }
}