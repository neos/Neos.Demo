<?php
declare(ENCODING = 'utf-8');
namespace F3\PhoenixDemoTypo3Org\Controller;

/*                                                                        *
 * This script belongs to the FLOW3 package "PhoenixDemoTypo3Org".        *
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU General Public License as published by the Free   *
 * Software Foundation, either version 3 of the License, or (at your      *
 * option) any later version.                                             *
 *                                                                        *
 * This script is distributed in the hope that it will be useful, but     *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHAN-    *
 * TABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General      *
 * Public License for more details.                                       *
 *                                                                        *
 * You should have received a copy of the GNU General Public License      *
 * along with the script.                                                 *
 * If not, see http://www.gnu.org/licenses/gpl.html                       *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */

/**
 * Controller that handles the creation of temporary Accounts
 *
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class RegistrationController extends \F3\FLOW3\MVC\Controller\ActionController {

	/**
	 * @inject
	 * @var \F3\FLOW3\Security\AccountRepository
	 */
	protected $accountRepository;

	/**
	 * @inject
	 * @var \F3\FLOW3\Security\AccountFactory
	 */
	protected $accountFactory;

	/**
	 * @return string
	 * @author Bastian Waidelich <bastian@typo3.org>
	 */
	public function indexAction() {
	}

	/**
	 * Displays a form that creates a temporary account
	 *
	 * @param \F3\PhoenixDemoTypo3Org\Domain\Model\Registration $registration
	 * @return void
	 * @dontvalidate $registration
	 * @author Bastian Waidelich <bastian@typo3.org>
	 */
	public function newAccountAction(\F3\PhoenixDemoTypo3Org\Domain\Model\Registration $registration = NULL) {
		if ($registration === NULL) {
			$number = (time() - 1292863102);
			$registration = $this->objectManager->create('F3\PhoenixDemoTypo3Org\Domain\Model\Registration');
			$registration->setFirstName('Santa');
			$registration->setLastName('Claus');
			$registration->setUsername('santa' . $number);
		}
		$this->view->assign('registration', $registration);
	}

	/**
	 * Action for creating a temporary account
	 *
	 * @param \F3\PhoenixDemoTypo3Org\Domain\Model\Registration $registration
	 * @return void
	 * @author Bastian Waidelich <bastian@typo3.org>
	 */
	public function createAccountAction(\F3\PhoenixDemoTypo3Org\Domain\Model\Registration $registration) {
		$accountIdentifier = $registration->getUsername();
		$existingAccount = $this->accountRepository->findActiveByAccountIdentifierAndAuthenticationProviderName($accountIdentifier, 'DefaultProvider');
		if ($existingAccount !== NULL) {
			$this->flashMessageContainer->add('An account with the username "' . $accountIdentifier . '" already exists.');
			$this->redirect('newAccount');
		}

		$account = $this->createTemporaryAccount($accountIdentifier, $registration->getPassword(), $registration->getFirstName(), $registration->getLastName());
		$this->accountRepository->add($account);
		$this->redirect('index', 'Login', 'TYPO3', array('username' => $accountIdentifier));
	}

	/**
	 * Creates a temporary account
	 *
	 * @param string $accountIdentifier
	 * @param string $password
	 * @param string $firstName
	 * @param string $lastName
	 * @return \F3\FLOW3\Security\Account
	 */
	protected function createTemporaryAccount($accountIdentifier, $password, $firstName, $lastName) {
		if (strlen($firstName) === 0 && strlen($lastName) === 0) {
			$firstName = 'Test';
			$lastName = 'User';
		}
		$name = $this->objectManager->get('F3\Party\Domain\Model\PersonName', '', $firstName, '', $lastName);
		$person = $this->objectManager->get('F3\Party\Domain\Model\Person');
		$person->setName($name);
		$account = $this->accountFactory->createAccountWithPassword($accountIdentifier, $password, array('Administrator'));
		$account->setParty($person);
		$account->setExpirationDate(new \DateTime('+1 week'));
		return $account;
	}

	/**
	 * Confirmation for createAccountAction
	 *
	 * @param string $username Identifier of the account that was created
	 * @return void
	 * @author Bastian Waidelich <bastian@typo3.org>
	 */
	public function createAccountConfirmationAction($username) {
		$this->view->assign('username', $username);
	}
}
?>
