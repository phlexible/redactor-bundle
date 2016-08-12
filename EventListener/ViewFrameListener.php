<?php

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
            ->addLink('/bundles/app/redactor/styles/redactor.css')
            ->addLink('/bundles/app/redactor/styles/plugins.css')
            ->addScript('/bundles/app/jquery/jquery-1.8.2'.$this->getMinifiedScriptSuffix().'.js')
            ->addScript('/bundles/app/redactor/scripts/redactor'.$this->getMinifiedScriptSuffix().'.js')
            ->addInlineScript('var RedactorBaseUrl = "/bundles/app/redactor/scripts";')
            ->addScript('/bundles/app/redactor/scripts/plugins/concatenated-plugins.js');
    }

    /**
     * @return string
     */
    private function getMinifiedScriptSuffix()
    {
        return $this->debug ? '.min' : '';
    }
}
