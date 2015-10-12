<?php #dpm($content); ?>
<div class="module mid" style = "background: 
    linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url(<?php print file_create_url($content["field_project_image"]["#items"][0]["uri"]); ?>) no-repeat center center; background-size: cover">
    <h2 style = "color:white"><?php print $node->title; ?></h2>
</div>
<div class="writing">
    <?php print $content['body']['#items'][0]['value']; ?>
    <h2 id="partners">Gabon Partners</h2>
    <?php print $content['field_gabon_partners']['#items'][0]['value']; ?>
    <h2 id="partners">Oregon Partners</h2>
    <?php print $content['field_oregon_partners']['#items'][0]['value']; ?>
</div>

