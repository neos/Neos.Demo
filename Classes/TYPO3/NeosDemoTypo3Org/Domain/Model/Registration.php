<?php
namespace TYPO3\NeosDemoTypo3Org\Domain\Model;

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

/**
 * Domain Model of a Registration
 *
 * @Flow\Entity
 */
class Registration {

	/**
	 * @var string
	 * @Flow\Validate(type="Label")
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $username = '';

	/**
	 * @var string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $password = '';

	/**
	 * @var string
	 */
	protected $firstName = '';

	/**
	 * @var string
	 */
	protected $lastName = '';

	/**
	 * @param string $username
	 * @return void
	 */
	public function setUsername($username) {
		$this->username = $username;
	}

	/**
	 * @return string
	 */
	public function getUsername() {
		return $this->username;
	}

	/**
	 * @param string $password
	 * @return void
	 */
	public function setPassword($password) {
		$this->password = $password;
	}

	/**
	 * @return string
	 */
	public function getPassword() {
		return $this->password;
	}

	/**
	 * @param string $firstName
	 * @return void
	 */
	public function setFirstName($firstName) {
		$this->firstName = $firstName;
	}

	/**
	 * @return string
	 */
	public function getFirstName() {
		return $this->firstName;
	}

	/**
	 * @param string $lastName
	 * @return void
	 */
	public function setLastName($lastName) {
		$this->lastName = $lastName;
	}

	/**
	 * @return string
	 */
	public function getLastName() {
		return $this->lastName;
	}
}
