@IsTest
private class TestItemsTrigger {
	@testSetup
	static void createOrder() {
		Profile profileId = [SELECT Id FROM Profile WHERE Name = 'Standard User' LIMIT 1];

		List<User> users = new List<User>{
				new User(
						LastName = 'LIVESTON',
						FirstName = 'JASON',
						Email = 'jason.liveston@asdf.com',
						Username = 'jason.liveston@truesalessoft.com',
						ProfileId = profileId.id,
						Alias = 'alias',
						TimeZoneSidKey = 'America/Los_Angeles',
						LocaleSidKey = 'en_US',
						EmailEncodingKey = 'UTF-8',
						LanguageLocaleKey = 'en_US',
						isManager__c = false
				)};
		insert users;

		List<Account> accounts = new List<Account>{
				new Account(
						Name = 'TestAccount1',
						AccountNumber = 'TT000000',
						OwnerId = users[0].Id
				)};
		insert accounts;

		List<Product__c> products = new List<Product__c> {
				new Product__c(
						Name = 'Test Product 2',
						Price__c = 10,
						Family__c = 'Family1',
						Type__c = 'Type0'
				),
				new Product__c(
						Name = 'Test Product 3',
						Price__c = 100,
						Family__c = 'Family1',
						Type__c = 'Type2'
				)};
		insert products;

		List<Order__c> orders = new List<Order__c>{
				new Order__c(
						Name = 'Test Order 1',
						AccountId__c = accounts[0].Id,
						TotalProductCount__c = 0,
						TotalPrice__c = 0
				)};
		insert orders;

		List<OrderItem__c> orderItems = new List<OrderItem__c>{
				new OrderItem__c(
						Name = 'Test Order Item 1',
						ProductId__c = products[0].Id,
						OrderId__c = orders[0].Id,
						Quantity__c = 5
				),
				new OrderItem__c(
						Name = 'Test Order Item 2',
						ProductId__c = products[1].Id,
						OrderId__c = orders[0].Id,
						Quantity__c = 8
				)};
		insert orderItems;
	}

	@isTest
	static void testOrderTrigger() {
		Order__c order = [SELECT TotalPrice__c, TotalProductCount__c from Order__c limit 1];
		System.assertEquals(order.TotalPrice__c, 850);
		System.assertEquals(order.TotalProductCount__c, 13);
	}
}