<?php
/**
 * phlexible
 *
 * @copyright 2007-2013 brainbits GmbH (http://www.brainbits.net)
 * @license   proprietary
 */

namespace Phlexible\Bundle\RedactorBundle\Tests\EventListener;

use Phlexible\Bundle\GuiBundle\Event\ViewEvent;
use Phlexible\Bundle\GuiBundle\View\AbstractView;
use Phlexible\Bundle\RedactorBundle\EventListener\ViewFrameListener;
use Prophecy\Argument;
use Symfony\Component\HttpFoundation\Request;

/**
 * View frame listener test
 *
 * @author Stephan Wentz <swentz@brainbits.net>
 */
class ViewFrameListenerTest extends \PHPUnit_Framework_TestCase
{
    public function testOnViewFrame()
    {
        $view = $this->prophesize(AbstractView::class);
        $view->addLink(Argument::type('string'))->shouldBeCalled()->willReturn($view->reveal());
        $view->addScript(Argument::type('string'))->shouldBeCalled()->willReturn($view->reveal());
        $view->addInlineScript(Argument::type('string'))->shouldBeCalled()->willReturn($view->reveal());

        $event = new ViewEvent(new Request(), $view->reveal());

        $listener = new ViewFrameListener(true);
        $listener->onViewFrame($event);
    }
}
