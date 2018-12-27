<form role="form" class="new-post-webhook-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<div class="form-group">
				<label for="webhook-new-post-url">URL to hit on new post</label>
				<input type="text" id="webhook-new-post-url" name="webhook-new-post-url" title="Webhook New Post URL" class="form-control" placeholder="http://foo.com">

				<label for="webhook-variable-name-user">Variable name for the user who posted</label>
				<input type="text" id="webhook-variable-name-user" name="webhook-variable-name-user" title="Variable name for the user who posted" class="form-control" placeholder="username">

				<label for="webhook-variable-name-thread-title">Variable name for the thread title</label>
				<input type="text" id="webhook-variable-name-thread-title" name="webhook-variable-name-thread-title" title="Variable name for the thread title" class="form-control" placeholder="title">

				<label for="webhook-variable-name-url">Variable name for the new post's url</label>
				<input type="text" id="webhook-variable-name-url" name="webhook-variable-name-url" title="Variable name for the new post's url" class="form-control" placeholder="url">
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
