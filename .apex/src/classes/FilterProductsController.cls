public class FilterProductsController {
	@AuraEnabled(cacheable=true)
	public static List<String> getFamilies() {
		List<String> result = new List<String>{};
		Set<String> families = new Set<String>{};

		for (Product__c prod :[
				SELECT Family__c
				from Product__c
		]) {
			families.add(prod.Family__c);
		}
		result.addAll(families);
		result.sort();
		return result;
	}

	@AuraEnabled(cacheable=true)
	public static List<String> getTypes() {
		List<String> result = new List<String>{};
		Set<String> types = new Set<String>{};

		for (Product__c prod :[
				SELECT Type__c
				from Product__c
		]) {
			types.add(prod.Type__c);
		}
		result.addAll(types);
		result.sort();
		return result;
	}

	@AuraEnabled(cacheable=true)
	public static List<Product__c> filerResult(String[] familyFilters, String[] typeFilters, String searchKey) {
		if (familyFilters == null && typeFilters == null && searchKey == null)
			return ([SELECT Name, Description__c,Image__c FROM Product__c]);

		List<String> criteria = new List<String>{};
		String whereClause = '';
		String newSearchKey = '%' + searchKey + '%';

		if (familyFilters != null && familyFilters.size() != 0) {
			criteria.add('Family__c IN :familyFilters');
		}
		if (typeFilters != null && typeFilters.size() != 0) {
			criteria.add('Type__c in :typeFilters');
		}
		if (searchKey != null && searchKey.length() != 0) {
			criteria.add('Name LIKE :newSearchKey');
		}
		if (criteria.size() > 0) {
			whereClause = 'WHERE ' + String.join(criteria, ' AND ');
		}

		return Database.query(
						'SELECT Name, Description__c,Image__c FROM Product__c ' + whereClause
		);
	}
}