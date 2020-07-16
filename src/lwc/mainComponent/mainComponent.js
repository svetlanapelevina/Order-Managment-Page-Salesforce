import {LightningElement, wire, track} from 'lwc';
import Id from '@salesforce/user/Id';
import getAccountNumber from '@salesforce/apex/AccountController.getAccountNumber';
import getAccountName from '@salesforce/apex/AccountController.getAccountName';
import checkIsManager from '@salesforce/apex/AccountController.checkIsManager';
import { NavigationMixin } from 'lightning/navigation';

export default class MainComponent extends NavigationMixin(LightningElement) {
    @track userName;
    @track userNumber;
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
        if (data) this.userName = data;
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

    handleCreateClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Product__c',
                actionName: 'new'
            }
        })
    };

    handleOpenCartClick() {
        this.template.querySelector('c-product-list').changeCartView1();
    }
}