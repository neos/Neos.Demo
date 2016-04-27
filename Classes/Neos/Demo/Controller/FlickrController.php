<?php
namespace Neos\Demo\Controller;

/*
 * This file is part of the Neos.Demo package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;

/**
 * Controller that displays flickr photo streams
 */
class FlickrController extends ActionController
{
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
    public function tagStreamAction()
    {
        $tags = $this->request->getInternalArgument('__tags');
        if ($tags === null || $tags === '') {
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
    public function userStreamAction($userId = null)
    {
        if ($userId === null) {
            return '<p>No user specified</p>';
        }
        $endpointUrl = sprintf($this->userStreamUriPattern, $userId);
        $this->view->assign('feed', $this->fetchStream($endpointUrl));
    }

    /**
     * @param string $endpointUrl
     * @return array
     */
    protected function fetchStream($endpointUrl)
    {
        $stream = file_get_contents($endpointUrl);
        return json_decode($stream, true);
    }

    /**
     * Disable the default error flash message
     *
     * @return boolean
     */
    protected function getErrorFlashMessage()
    {
        return false;
    }
}
