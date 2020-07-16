trigger OrderItemTrigger on OrderItem__c (after insert) {

    List<OrderItem__c> itemsToUpdate = [SELECT Id, Price__c, ProductId__c, OrderId__c, Quantity__c from OrderItem__c where Id in :Trigger.new];

    for (OrderItem__c item : itemsToUpdate) {
        item.Price__c = [SELECT Price__c from Product__c where Id = :item.ProductId__c][0].Price__c;

        Order__c order = [select Id, TotalProductCount__c, TotalPrice__c from Order__c where Id = :item.OrderId__c limit 1];
        order.TotalPrice__c += item.Price__c * item.Quantity__c;
        order.TotalProductCount__c += item.Quantity__c;
        update order;
    }
    update itemsToUpdate;
}