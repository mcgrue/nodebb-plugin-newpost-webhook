'use strict';
/* globals $, app, socket */

define('admin/plugins/new-post-webhook', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('new-post-webhook', $('.new-post-webhook-settings'));

		$('#save').on('click', function() {
			Settings.save('new-post-webhook', $('.new-post-webhook-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'new-post-webhook-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});