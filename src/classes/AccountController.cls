public with sharing class AccountController {

	@AuraEnabled(cacheable=true)
	public static String getAccountName(Id currId) {
		return [
				select Name
				from Account
				where OwnerId = :currId
				limit 1
		].Name;
	}

	@AuraEnabled(cacheable=true)
	public static String getAccountNumber(Id currId) {
		return String.valueOf([
				select AccountNumber
				from Account
				where OwnerId = :currId
		][0].AccountNumber);
	}

	@AuraEnabled(cacheable=true)
	public static String getAccountId(Id currId) {
		return String.valueOf([
				select Id
				from Account
				where OwnerId = :currId
		][0].Id);
	}

	@AuraEnabled(cacheable=true)
	public static Boolean checkIsManager(Id currId) {
		String accountId = [select OwnerId from Account where OwnerId = :currId][0].OwnerId;
		return ([select isManager__c from User where Id = :accountId][0].isManager__c);
	}
}