"use strict";

var controllers = require('./lib/controllers');
var Meta = module.parent.require('./meta');
var User = module.parent.require("./user");
var Topics = module.parent.require("./topics");

// var NodeBB = module.require('./nodebb')
// var meta = NodeBB.meta;

var plugin = {};

plugin.init = function(params, callback) {
	console.log("************** HELLO init ****************");

	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/new-post-webhook', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/new-post-webhook', controllers.renderAdminPage);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/new-post-webhook',
		icon: 'fa-tint',
		name: 'New Post Webhook'
	});

	callback(null, header);
};

var doWebhook = function(data, url) {
	console.log("DO THE WEBHOOK");
	console.log(data);
	console.log(url);
};

plugin.doNotificationWebhook = function(header, callback) {
	Meta.settings.get('new-post-webhook', function(err, settings) {
		var url = settings['webhook-new-post-url'];
		if(url) {
			var tid = header.post.tid;
			var uid = header.post.uid;
			var pid = header.post.pid;

			Topics.getTopicFields(tid, ['title', 'slug'], function (err, topicData) {
				// If there is an error or missing data, bail out and log it.
				if (err || !topicData.title || !topicData.slug) return console.log("Couldn't find topic data.");

				// Save the data we need.
				var topic = topicData.title;
				var topicSlug = topicData.slug;
				
				// Get the user info...
				// We only need the name, but again we could use getUserData if we wanted all fields.
				User.getUserField(uid, 'username', function (err, name) {

					// If there is an error or missing data, bail out and log it.
					if (err || !name) return console.log("Couldn't find username.");
			

					// nconf.get('url')
					// Links always follow this same structure.
					// the site url + "topic/" + the topic slug + "/" + the post id
					var link = "topic/" + topicSlug + "/" + pid;

					// Now do whatever we want with the data.
					doWebhook({
						name: name,
						topic: topic,
						link: link
					}, url);
				});
			});
		}
	} );
};


	






module.exports = plugin;