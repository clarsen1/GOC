
<div class="writing">
	<div class= "proj-container">
	    <div class="proj-img">
	        <?php print $fields['field_image']->content; ?>
	    </div>
	    <div class="proj-info">
	        <h2><?php print $fields["title"]->content; ?></h2>
	        <p><?php print $fields["body"]->content; ?></p>
	    </div>
	</div>
</div>

<?php #dpm($content); ?>

