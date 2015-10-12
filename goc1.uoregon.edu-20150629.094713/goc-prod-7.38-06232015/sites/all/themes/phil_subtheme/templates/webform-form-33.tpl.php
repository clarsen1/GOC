<?php #dpm($form); ?>
<div class="basic">
    <h2 style = "color:white"><?php print render($form['#node']->title); ?></h2>
</div>
<div class="form-wrap">
    <div class="form">
        <?php print drupal_render($form['submitted']['nom']); ?>
        <?php print drupal_render($form['submitted']['adresse_e_mail']); ?>
        <?php print drupal_render($form['submitted']['sujet']); ?>
        <?php print drupal_render($form['submitted']['message']); ?>
        <?php print drupal_render($form['actions']['submit']); ?>
    </div>
</div>