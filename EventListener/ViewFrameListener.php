<?php

/*
 * This file is part of the phlexible redactor package.
 *
 * (c) Stephan Wentz <sw@brainbits.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Phlexible\Bundle\RedactorBundle\EventListener;

use Phlexible\Bundle\GuiBundle\Event\ViewEvent;

/**
 * View frame listener
 *
 * @author Tim Hoepfner <thoepfner@brainbits.net>
 */
class ViewFrameListener
{
    /**
     * @var bool
     */
    private $debug;

    /**
     * ViewFrameListener constructor.
     *
     * @param bool $debug Application debug flag
     */
    public function __construct($debug)
    {
        $this->debug = $debug;
    }

    /**
     * @param ViewEvent $event
     * @internal param $redactorConfig
     */
    public function onViewFrame(ViewEvent $event)
    {
        $event->getView()
            ->addLink('/bundles/phlexibleredactor/redactor/styles/redactor.css')
            ->addLink('/bundles/phlexibleredactor/redactor/styles/plugins.css')
            ->addScript('/bundles/phlexibleredactor/jquery/jquery-1.8.2'.$this->getMinifiedScriptSuffix().'.js')
            ->addScript('/bundles/phlexibleredactor/redactor/scripts/redactor'.$this->getMinifiedScriptSuffix().'.js')
            ->addInlineScript('var RedactorBaseUrl = "/bundles/phlexibleredactor/redactor/scripts";')
            ->addScript('/bundles/phlexibleredactor/redactor/scripts/plugins/concatenated-plugins.js');
    }

    /**
     * @return string
     */
    private function getMinifiedScriptSuffix()
    {
        return $this->debug ? '.min' : '';
    }
}
