<div class="module mid" style = "background: 
    linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url(<?php print file_create_url($content["field_project_image"]["#items"][0]["uri"]); ?>) no-repeat center center; background-size: cover">
</div>
<div class="writing">
    <h1 style = "color:black"><?php print $node->title; ?></h2>
    <?php print $content['body']['#items'][0]['value']; ?>
</div>
<?php #dpm($content); ?>


