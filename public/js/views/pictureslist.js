window.PicturesListView = Backbone.View.extend({

    initialize: function () {
	
		this.renders = _.wrap(this.render, function(render) {
				this.beforeRender();
				this.render();						
				this.afterRender();
			});
			
        this.renders();
    },

    render: function () {
        var album = this.model;
        //var len = wines.length;
        //var startPos = (this.options.page - 1) * 8;
        //var endPos = Math.min(startPos + 8, len);
		//alert(album.id)
        $(this.el).html('<div class="frm"> <div class="form-screen">'+
						'<div class="form-icon"><img src="img/Pocket@2x.png" onmouseover="$(this).transition({scale:\'1.2\'}).transition({scale:\'1\'})" alt="Album"><h4></h4></div>'+
						'<div class="form-form">'+
						'<div class="thumbs"></div></fieldset></div></div>');
	
        //for (var i = startPos; i < endPos; i++) {
            //$('.thumbs', this.el).append(new PicturesListItemView({model: wines[0]}).render().el);
			 $('.thumbs', this.el).append(new PicturesListItemView({model: album}).render().el);
        //}

        //$(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    },
	
beforeRender: function () {
			console.log("Before render");
		},
		
	afterRender: function () {
		console.log("After render");
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", '../js/upload/main.js');
		document.getElementsByTagName("head")[0].appendChild(fileref);
		console.log("Created Script");
		}
});

window.PicturesListItemView = Backbone.View.extend({

    tagName: "div",

    initialize: function () {
       // this.model.bind("change", this.render, this);
        //this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});