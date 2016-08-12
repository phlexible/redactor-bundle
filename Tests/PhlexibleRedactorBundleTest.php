<?php
/**
 * phlexible
 *
 * @copyright 2007-2013 brainbits GmbH (http://www.brainbits.net)
 * @license   proprietary
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
