<?php
declare(strict_types=1);

namespace Neos\Demo\Form\Runtime\Validation\Validator;

/*
 * This file is part of the Neos.Demo package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Security\AccountRepository;
use Neos\Flow\Validation\Validator\AbstractValidator;

class UsernameInUseValidator extends AbstractValidator
{
    #[Flow\Inject]
    protected ?AccountRepository $accountRepository;

    /**
     * Checks whether a given account name already exists
     * @param string $value The account name to be checked
     */
    protected function isValid($value): void
    {
        $existingAccount = $this->accountRepository->findActiveByAccountIdentifierAndAuthenticationProviderName($value, 'Neos.Neos:Backend');

        if ($existingAccount) {
            $this->addError('The given username is already in use', 1659612430);
        }
    }
}
