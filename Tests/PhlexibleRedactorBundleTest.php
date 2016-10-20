<?php

/*
 * This file is part of the phlexible redactor package.
 *
 * (c) Stephan Wentz <sw@brainbits.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Phlexible\Bundle\RedactorBundle\Tests;

use Phlexible\Bundle\RedactorBundle\PhlexibleRedactorBundle;

/**
 * Redactor bundle test
 *
 * @author Stephan Wentz <sw@brainbits.net>
 */
class PhlexibleTinymceBundleTest extends \PHPUnit_Framework_TestCase
{
    public function testBundle()
    {
        $bundle = new PhlexibleRedactorBundle();

        $this->assertSame('PhlexibleRedactorBundle', $bundle->getName());
    }
}
