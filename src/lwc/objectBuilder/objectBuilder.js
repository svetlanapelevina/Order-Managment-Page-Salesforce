import {LightningElement, api, wire} from 'lwc';
import getAccountId from '@salesforce/apex/AccountController.getAccountId';
import getAccountName from '@salesforce/apex/AccountController.getAccountName';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/** Record DML operations. */
import { createRecord } from 'lightning/uiRecordApi';

/** Order__c Schema. */
import ORDER_OBJECT from '@salesforce/schema/Order__c';
import NAME_FIELD from '@salesforce/schema/Order__c.Name';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Order__c.AccountId__c';
import COUNT_FIELD from '@salesforce/schema/Order__c.TotalProductCount__c';
import PRICE_FIELD from '@salesforce/schema/Order__c.TotalPrice__c';

/** OrderItem__c Schema. */
import ORDER_ITEM_OBJECT from '@salesforce/schema/OrderItem__c';
import PRODUCT_ID_FIELD from '@salesforce/schema/OrderItem__c.ProductId__c';
import PRODUCT_PRICE_FIELD from '@salesforce/schema/OrderItem__c.Price__c';
import ITEM_NAME_FIELD from '@salesforce/schema/OrderItem__c.Name';
import PRODUCT_QUANTITY_FIELD from '@salesforce/schema/OrderItem__c.Quantity__c';
import ORDER_ID_FIELD from '@salesforce/schema/OrderItem__c.OrderId__c';

/**
 * Builds Order__c and OrderItem__c
 */
export default class ObjectBuilder extends LightningElement {
    /** Account name and number. */
    accountId;
    @wire(getAccountId, {currId: Id})
    wiredAccountId(data) {
        if (data) this.accountId = data.data;
    }

    accountName;
    @wire(getAccountName, {currId: Id})
    wiredAccountName(data) {
        if (data) this.accountName = data.data;
    }

    /** Create a new Order__c. with receiving data */
    recordsData;
    @api
    createOrder(data) {
        this.recordsData = data;
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = "Order-" + this.accountName;
        fields[ACCOUNT_ID_FIELD.fieldApiName] = this.accountId;
        fields[COUNT_FIELD.fieldApiName] = 0;
        fields[PRICE_FIELD.fieldApiName] = 0;
        const recordInput = { apiName: ORDER_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then((order) => {
                this.addOrderItems(order.id);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Order created',
                        variant: 'success',
                    })
                );
            })
            .catch(error => {
                console.log(error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating order',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });

    }

    /** Create a new OrderItem__c. with receiving data*/
    addOrderItems(curId) {
        for (let i in this.recordsData)
        {
            const fields = {};
            fields[PRODUCT_ID_FIELD.fieldApiName] = this.recordsData[i].id;
            fields[ITEM_NAME_FIELD.fieldApiName] = "item-in-" + curId;
            fields[ORDER_ID_FIELD.fieldApiName] = curId;
            fields[PRODUCT_PRICE_FIELD.fieldApiName] = 1;
            fields[PRODUCT_QUANTITY_FIELD.fieldApiName] = this.recordsData[i].count;
            const recordInput = { apiName: ORDER_ITEM_OBJECT.objectApiName, fields };
            createRecord(recordInput)
        }
    }
}