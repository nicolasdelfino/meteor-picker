if (Meteor.isClient) {

    UI.registerHelper('tileSet', function(tile, index) {

        var game = GAME.find(Session.get('activeGame')).fetch();

        // console.log(game[0]);
        // console.log("checking tile index: " + index + " and tile val: " + tile);
        
        console.log("=>: " + game[0]['t' + (index + 1)]);

        var con = index + 1;

        if(game[0]['t' + (index + 1)] == tile){
        	return true;
        }
        else {
        	return false;
        }
    });

    UI.registerHelper('addIndex', function(all) {
        return _.map(all, function(val, index) {
            return {
                index: index,
                value: val
            };
        });
    });
}
