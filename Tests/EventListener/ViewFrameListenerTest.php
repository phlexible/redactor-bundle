<?php

/*
 * This file is part of the phlexible redactor package.
 *
 * (c) Stephan Wentz <sw@brainbits.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Phlexible\Bundle\RedactorBundle\Tests\EventListener;

use Phlexible\Bundle\GuiBundle\Event\ViewEvent;
use Phlexible\Bundle\GuiBundle\View\AbstractView;
use Phlexible\Bundle\RedactorBundle\EventListener\ViewFrameListener;
use PHPUnit\Framework\TestCase;
use Prophecy\Argument;
use Symfony\Component\HttpFoundation\Request;

/**
 * View frame listener test.
 *
 * @author Stephan Wentz <swentz@brainbits.net>
 */
class ViewFrameListenerTest extends TestCase
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
