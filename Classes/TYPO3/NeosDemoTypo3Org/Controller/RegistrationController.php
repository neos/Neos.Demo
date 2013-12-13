<?php
namespace TYPO3\NeosDemoTypo3Org\Controller;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "NeosDemoTypo3Org".      *
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU General Public License as published by the Free   *
 * Software Foundation, either version 3 of the License, or (at your      *
 * option) any later version.                                             *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Error\Message;
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Mvc\Routing\UriBuilder;
use TYPO3\Flow\Security\Account;
use TYPO3\Flow\Security\AccountFactory;
use TYPO3\Flow\Security\AccountRepository;
use TYPO3\Neos\Domain\Model\User;
use TYPO3\NeosDemoTypo3Org\Domain\Model\Registration;
use TYPO3\Party\Domain\Model\PersonName;
use TYPO3\Party\Domain\Repository\PartyRepository;

/**
 * Controller that handles the creation of temporary Accounts
 */
class RegistrationController extends ActionController {

	/**
	 * @Flow\Inject
	 * @var AccountRepository
	 */
	protected $accountRepository;

	/**
	 * @Flow\Inject
	 * @var PartyRepository
	 */
	protected $partyRepository;

	/**
	 * @Flow\Inject
	 * @var AccountFactory
	 */
	protected $accountFactory;

	/**
	 * @return string
	 */
	public function indexAction() {
	}

	/**
	 * Displays a form that creates a temporary account
	 *
	 * @return void
	 */
	public function newAccountAction() {
		$uniqueUsername = 'demo' . (time() - 1302876012);
		$registration = new Registration();
		$registration->setFirstName('John');
		$registration->setLastName('Doe');
		$registration->setUsername($uniqueUsername);
		$registration->setPassword('demo');

		$this->view->assign('registration', $registration);
	}

	/**
	 * Action for creating a temporary account
	 *
	 * @param Registration $registration
	 * @return void
	 */
	public function createAccountAction(Registration $registration) {
		$accountIdentifier = $registration->getUsername();
		$existingAccount = $this->accountRepository->findActiveByAccountIdentifierAndAuthenticationProviderName($accountIdentifier, 'Typo3BackendProvider');
		if ($existingAccount !== NULL) {
			$this->addFlashMessage('An account with the username "%s" already exists.', 'Account already exists', Message::SEVERITY_ERROR, array($accountIdentifier));
			$this->forward('newAccount');
		}

		$this->createTemporaryAccount($accountIdentifier, $registration->getPassword(), $registration->getFirstName(), $registration->getLastName());

		$uriBuilder = new UriBuilder();
		$uriBuilder->setRequest($this->request->getParentRequest());
		$redirectUri = $uriBuilder
			->setCreateAbsoluteUri(TRUE)
			->uriFor('index', array('username' => $accountIdentifier), 'Login', 'TYPO3.Neos');
		$this->redirectToUri($redirectUri);
	}

	/**
	 * Creates a temporary account
	 *
	 * @param string $accountIdentifier
	 * @param string $password
	 * @param string $firstName
	 * @param string $lastName
	 * @return Account
	 */
	protected function createTemporaryAccount($accountIdentifier, $password, $firstName, $lastName) {
		if (strlen($firstName) === 0 && strlen($lastName) === 0) {
			$firstName = 'Santa';
			$lastName = 'Claus';
		}

		$user = new User();
		$user->setName(new PersonName('', $firstName, '', $lastName));
		$user->getPreferences()->set('context.workspace', 'user-' . $accountIdentifier);
		$this->partyRepository->add($user);

		$account = $this->accountFactory->createAccountWithPassword($accountIdentifier, $password, array('TYPO3.Neos:Editor'), 'Typo3BackendProvider');
		$account->setParty($user);
		$account->setExpirationDate(new \DateTime('+1 week'));

		$this->accountRepository->add($account);
	}

	/**
	 * @return boolean Disable the default error flash message
	 */
	protected function getErrorFlashMessage() {
		return FALSE;
	}
}