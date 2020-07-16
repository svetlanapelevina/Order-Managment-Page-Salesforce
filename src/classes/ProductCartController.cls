public with sharing class ProductCartController {

	@AuraEnabled(cacheable=true)
	public static String getProductInCart(String[] idList) {
		Map<Id, Integer> result = new Map<Id, Integer>{};
		for (Product__c prod : [
				SELECT Id, Name
				from Product__c
				where Id in :idList
		]) {
			Integer count = 0;
			for (String id : idList) {
				if (id.compareTo(prod.Id) == 0) count++;
			}
			result.put(prod.Id, count);
		}
		return JSON.serialize(result);
	}
}