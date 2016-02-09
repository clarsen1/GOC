<?php #dpm($fields); ?>

<div class ="image" style="float:left">
        <?php print $fields["field_project_image"]->content; ?>
        <div class="contenthover">
        <h3 style = "color:white"><?php print $fields["title"]->content; ?></h3>
        <p><?php print $fields["body"]->content; ?></p>
        </div>
</div>
