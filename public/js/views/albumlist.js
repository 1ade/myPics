window.AlbumListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var albums = this.model.models;
        var len = albums.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);
		
        $(this.el).html('<div class="fancyList"><table class="table table-striped albums"></table></div>');

        for (var i = startPos; i < endPos; i++) {
            $('.albums', this.el).append(new AlbumListItemView({model: albums[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.AlbumListItemView = Backbone.View.extend({

    tagName: "tr",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});