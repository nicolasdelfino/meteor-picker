Meteor.publish('tileMatrix', function() {
    return TM.find();
});

Meteor.publish('game', function() {
    return GAME.find();
});