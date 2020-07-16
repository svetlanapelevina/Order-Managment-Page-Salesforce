import {LightningElement, wire, api, track} from 'lwc';
import getFamilies from '@salesforce/apex/FilterProductsController.getFamilies';
import getTypes from '@salesforce/apex/FilterProductsController.getTypes';
import filerResult from '@salesforce/apex/FilterProductsController.filerResult';

/**
 * Displays a filter panel, search panel and list of products
 */
export default class ProductList extends LightningElement {
    /** All available products */
    @track products;

    /**
     * Check boxes
     */

    /** Get all families */
    families;
    @wire(getFamilies)
    wiredFamiliesList(data) {
        if (data) {
            this.families = data;
            this.families = this.families.data;
        }
    }

    /** Get all types */
    types;
    @wire(getTypes)
    wiredTypesList(data) {
        if (data) {
            this.types = data;
            this.types = this.types.data;
        }
    }

    /** For data in check boxes */
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

    /** Filter products by search key, families and types */
    @wire(filerResult, {familyFilters : '$familiesFilter', typeFilters: '$typesFilter', searchKey: '$inputValue'})
    wiredFilterProduct(data) {
        if (data) { this.products = data; }
    }

    /** Handlers to get filters data and reload products */
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

    /**
     * Show details for selected product
     */
    handleShowDetails(event) {
        this.template.querySelector('c-product-details').showDetails(event.target.name);
    }

    /**
     * Handler for update products in cart (after click on "Add" button
     */
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