<?php

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
