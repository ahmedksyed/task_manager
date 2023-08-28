<?php
function planeName($name)
{
    return preg_replace('/[0-9]+/', '', $name);
}
?>