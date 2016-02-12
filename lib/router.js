Router.configure({
    // notFoundTemplate: 'pageNotFound',
    layoutTemplate: 'masterLayout'
});

Router.map(function() {

    this.route('dashboard', {
            path: '/',
            template: 'init'
        }),
        this.route('play', {
            path: 'picker/:_id',
            template: 'tictactoe',
            data: function() {

                if (this.ready()) {

                    console.log("data: " + this.params._id);
                    var game = TM.findOne(this.params._id);
                    if (game) {
                        console.log("data good");
                        console.log(game);
                        return game;
                    }
                }
            },
            onBeforeAction: function() {

                if (Session.get('activeGame') == null) {
                    Session.set('activeGame', this.params._id);

                    this.next();
                } else {

                    this.next();
                }
            }
        })
});
