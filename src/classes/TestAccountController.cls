@IsTest
private class TestAccountController {

	@isTest
	static void testGetAccountData() {
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

		Id userId = users[0].Id;
		String name = AccountController.getAccountName(userId);
		System.assertEquals('TestAccount1', name);

		String numb = AccountController.getAccountNumber(userId);
		System.assertEquals('TT000000', numb);

		Id id = AccountController.getAccountId(userId);
		System.assertEquals(accounts[0].Id, id);

		Boolean isManager = AccountController.checkIsManager(userId);
		System.assertEquals(false, isManager);
	}
}