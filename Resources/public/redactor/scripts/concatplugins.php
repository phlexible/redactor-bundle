<?php

if (php_sapi_name() !== 'cli') exit(1);

$contents = "";
$plugins = [];
chdir(__DIR__.'/plugins');
foreach (glob('*.js') as $script) {
    $contents .= "\n";
    $contents .= "/* Resource: plugins/$script */";
    $contents .= "\n";
    $contents .= file_get_contents($script);
    $plugins[] = "plugins/$script";
}
$plugins = implode(" \n", $plugins);
$fhandle = fopen('concatenated-plugins.js', 'w');
$fcontents=<<<EOL
/*
Concatenated redactor plugins
$plugins
*/
if (typeof RedactorBaseUrl === 'undefined') var RedactorBaseUrl = '';
EOL;
fwrite($fhandle, $fcontents.$contents);
fclose($fhandle);
echo 'Done.';
exit(0);