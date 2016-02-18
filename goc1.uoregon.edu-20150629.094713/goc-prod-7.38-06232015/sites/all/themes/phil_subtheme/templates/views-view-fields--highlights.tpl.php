<?php #dpm($fields); ?>

<div class ="image" style="float:left">
        <?php print $fields["field_project_image"]->content; ?>
        <div class="contenthover">
        <h1 style = "color:white"><?php print $fields["title"]->content; ?></h1>
        <p><?php print $fields["body"]->content; ?></p>
        <div class = "linker"><?php print $fields["path"]->content; ?></div>
        </div>
</div>

