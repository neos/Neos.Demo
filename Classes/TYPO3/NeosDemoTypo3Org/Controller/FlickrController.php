<?php
namespace TYPO3\NeosDemoTypo3Org\Controller;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "TYPO3.NeosDemoTypo3Org".*
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU General Public License as published by the Free   *
 * Software Foundation, either version 3 of the License, or (at your      *
 * option) any later version.                                             *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;

/**
 * Controller that displays flickr photo streams
 */
class FlickrController extends ActionController {

	/**
	 * @Flow\Inject(setting="flickr.tagStreamUriPattern")
	 * @var string
	 */
	protected $tagStreamUriPattern;

	/**
	 * @Flow\Inject(setting="flickr.userStreamUriPattern")
	 * @var string
	 */
	protected $userStreamUriPattern;

	/**
	 * @return void
	 */
	public function tagStreamAction() {
		$tags = $this->request->getInternalArgument('__tags');
		if ($tags === NULL || $tags === '') {
			return '<p>Please specify Flickr tag(s)</p>';
		}
		$endpointUrl = sprintf($this->tagStreamUriPattern, $tags);

		$this->view->assign('tags', $tags);
		$this->view->assign('feed', $this->fetchStream($endpointUrl));
	}

	/**
	 * @param string $userId
	 * @return void
	 */
	public function userStreamAction($userId = NULL) {
		if ($userId === NULL) {
			return '<p>No user specified</p>';
		}
		$endpointUrl = sprintf($this->userStreamUriPattern, $userId);
		$this->view->assign('feed', $this->fetchStream($endpointUrl));
	}

	/**
	 * @param string $endpointUrl
	 * @return array
	 */
	protected function fetchStream($endpointUrl) {
		$stream = file_get_contents($endpointUrl);
		return json_decode($stream, TRUE);
	}

	/**
	 * Disable the default error flash message
	 *
	 * @return boolean
	 */
	protected function getErrorFlashMessage() {
		return FALSE;
	}
}
