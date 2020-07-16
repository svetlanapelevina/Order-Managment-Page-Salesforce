import {LightningElement, wire, track} from 'lwc';
import Id from '@salesforce/user/Id';
import getAccountNumber from '@salesforce/apex/AccountController.getAccountNumber';
import getAccountName from '@salesforce/apex/AccountController.getAccountName';
import checkIsManager from '@salesforce/apex/AccountController.checkIsManager';
import { NavigationMixin } from 'lightning/navigation';

/**
 * Component with header and links to another components
 */
export default class MainComponent extends NavigationMixin(LightningElement) {
    /** Account data */
    @track accountName;
    @track accountNumber;
    @track isManager = false;

    @wire(checkIsManager, {currId: Id})
    wiredId({error, data}) {
        if (data) this.isManager = data;
        else {
            //console.log(error);
        }
    }

    @wire(getAccountName, {currId: Id})
    wiredName({error, data}) {
        if (data) this.accountName = data;
        else {
            //console.log(error);
        }
    }

    @wire(getAccountNumber, {currId: Id})
    wiredNumber({error, data}) {
        if (data) this.userNumber = data;
        else {
            //console.log(error);
        }
    }

    /** Handle click on the button "Create product" */
    handleCreateClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Product__c',
                actionName: 'new'
            }
        })
    };

    /** Handle click on the button "Cart" */
    handleOpenCartClick() {
        this.template.querySelector('c-product-list').changeCartView1();
    }
}