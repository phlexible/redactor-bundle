<?php

/*
 * This file is part of the phlexible redactor package.
 *
 * (c) Stephan Wentz <sw@brainbits.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Phlexible\Bundle\RedactorBundle\Field;

use Phlexible\Bundle\ElementtypeBundle\Field\TextField;

/**
 * Redactor field
 *
 * @author Tim Hoepfner <thoepfner@brainbits.net>
 */
class RedactorField extends TextField
{
    /**
     * {@inheritdoc}
     */
    public function getIcon()
    {
        return 'p-elementtype-field_editor-icon';
    }
}
