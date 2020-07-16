import {LightningElement} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ButtonMainPage extends NavigationMixin(LightningElement) {
    openPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            }
        })
    }
}