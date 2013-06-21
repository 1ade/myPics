var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "pictures/:id"		: "pictures",
		"albums/add"		: "addAlbum",
		"albums/:id"		: "albumDetails",
		"albums"			: "albumList",
        "albums/page/:page"	: "albumList"
		
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	albumList: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var albumList = new AlbumCollection();
        albumList.fetch({success: function(){
            $("#content").html(new AlbumListView({model: albumList, page: p}).el);
        }});
        this.headerView.selectMenuItem('photo-album');
    },

    albumDetails: function (id) {
        var album = new Album({_id: id});
        album.fetch({success: function(){
            $("#content").html(new AlbumView({model: album}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addAlbum: function() {
        var album = new Album();
        $('#content').html(new AlbumView({model: album}).el);
        this.headerView.selectMenuItem('add-album');
	},

    pictures: function(id){
		var album = new Album({_id: id});
		album.fetch({success: function(){
            $("#content").html(new PicturesListView({model: album}).el);
        }});
		
        
	}
	

});

utils.loadTemplate(['HomeView', 'HeaderView','PicturesListItemView','AlbumListItemView','AlbumView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});