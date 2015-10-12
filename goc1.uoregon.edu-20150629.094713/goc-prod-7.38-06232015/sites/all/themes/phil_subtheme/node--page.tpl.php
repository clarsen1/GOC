<?php #dpm($content); ?>
<div class="basic">
    <h2 style = "color:white"><?php print $node->title; ?></h2>
</div>
<div class="writing">
    <p><?php print $content['body']['#items'][0]['value']; ?></p>
</div>