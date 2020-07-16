import {LightningElement} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

/**
 * Component with single button to open an Order Management page from Account
 */
export default class ButtonMainPage extends NavigationMixin(LightningElement) {
    openPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/lightning/n/Order_managment_page'
            }
        })
    }
}
