@IsTest
private class TestProductController {
	@testSetup
	static void createProducts() {
		List<Product__c> products = new List<Product__c>();

		products.add(
				new Product__c(
						Name = 'Test Product 1',
						Price__c = 1000,
						Family__c = 'Family0',
						Type__c = 'Type1'
				)
		);

		products.add(
				new Product__c(
						Name = 'Test Product 2',
						Price__c = 10,
						Family__c = 'Family1',
						Type__c = 'Type0'
				)
		);

		products.add(
				new Product__c(
						Name = 'Test Product 3',
						Price__c = 100,
						Family__c = 'Family1',
						Type__c = 'Type2'
				)
		);

		insert products;
	}

	@isTest
	static void testGetFilters() {
		List<String> families = FilterProductsController.getFamilies();
		System.assertEquals(families.size(), 2);
	}

	@isTest
	static void testGetTypes() {
		List<String> types = FilterProductsController.getTypes();
		System.assertEquals(types.size(), 3);
	}

	@isTest
	static void testFilter() {
		String[] families = new String[] {'Family0'};
		String[] types = new String[] {'Type0'};
		List<Product__c> result = FilterProductsController.filerResult(families, types, null);
		System.assertEquals(result.size(), 0);

		String[] families2 = new String[] {};
		String[] types2 = new String[] {'Type1', 'Type2'};
		result = FilterProductsController.filerResult(families2, types2, null);
		System.assertEquals(result.size(), 2);

		String[] families3 = new String[] {'Family0', 'Family2'};
		String[] types3 = new String[] {};
		result = FilterProductsController.filerResult(families3, types3, null);
		System.assertEquals(result.size(), 1);

		String[] families4 = new String[] {};
		String[] types4 = new String[] {};
		result = FilterProductsController.filerResult(families4, types4, null);
		System.assertEquals(result.size(), 3);

		result = FilterProductsController.filerResult(null, null, null);
		System.assertEquals(result.size(), 3);
	}

	@isTest
	static void testCartProducts() {
		List<Id> idList = new List<Id>();
		List<Product__c> products = [SELECT Id from Product__c];
		idList.add(products[0].Id);
		idList.add(products[0].Id);
		idList.add(products[0].Id);
		//{"id1":3}
		String expectedResult = '{"' + products[0].Id + '":3}';
		String result = ProductCartController.getProductInCart(idList);
		System.assertEquals(expectedResult, result);
	}

	@isTest
	static void testSearch() {
		List<Product__c> result = FilterProductsController.filerResult(null, null, 'Test Product');
		System.assertEquals(3, result.size());

		result = FilterProductsController.filerResult(null, null, '1');
		System.assertEquals(1, result.size());
	}
}