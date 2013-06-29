window.HomeView = Backbone.View.extend({

    initialize:function () {
		this.renders = _.wrap(this.render, function(render) {
				this.beforeRender();
				this.render();						
				this.afterRender();
			});
			
        this.renders();
        
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },
	beforeRender: function () {
			console.log("Before render");
		},
		
	afterRender: function () {
		console.log("After render");
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", '../js/helper/initStellar.js');
		document.getElementsByTagName("head")[0].appendChild(fileref);
		console.log("Created Script");
		}

});