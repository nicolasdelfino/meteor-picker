Meteor.methods({

    createGame: function() {

        //GAME
        console.log("game init");

        return GAME.insert({
            cross: false,
            circle: false,
            option1: 'option',
            option2: 'option',
            t1: '',
            t2: '',
            t3: '',
            t4: '',
            t5: '',
            t6: '',
            t7: '',
            t8: '',
            t9: ''
        });
    },

    updatePlayerCross: function(id) {
        return GAME.update(id, {
            $set: {
                'cross': true
            }
        });
    },

    updatePlayerCircle: function(id) {
        return GAME.update(id, {
            $set: {
                'circle': true
            }
        });
    },

    updateTile: function(id, index, tile_val) {

        console.log("updating tile: " + id + " index:" + index + " tile_val:" + tile_val);

        if (index == 0) {
            return GAME.update(id, {
                $set: {
                    't1': tile_val
                }
            });
        } else if (index == 1) {
            return GAME.update(id, {
                $set: {
                    't2': tile_val
                }
            });
        } else if (index == 2) {
            return GAME.update(id, {
                $set: {
                    't3': tile_val
                }
            });
        } else if (index == 3) {
            return GAME.update(id, {
                $set: {
                    't4': tile_val
                }
            });
        } else if (index == 4) {
            return GAME.update(id, {
                $set: {
                    't5': tile_val
                }
            });
        } else if (index == 5) {
            return GAME.update(id, {
                $set: {
                    't6': tile_val
                }
            });
        } else if (index == 6) {
            return GAME.update(id, {
                $set: {
                    't7': tile_val
                }
            });
        } else if (index == 7) {
            return GAME.update(id, {
                $set: {
                    't8': tile_val
                }
            });
        } else if (index == 8) {
            return GAME.update(id, {
                $set: {
                    't9': tile_val
                }
            });
        }
    },

    updateMatrix: function(id, index, tile_val) {

        console.log("matrix update");

        var game = TM.findOne(id);
        var matrix = game.matrix;

        matrix[index] = tile_val;

        TM.update(id, {
            $set: {
                matrix: matrix
            }
        });

        return game;
    },
    updateOption1: function(id, option) {

        return GAME.update(id, {
            $set: {
                option1: option
            }
        });
    },
    updateOption2: function(id, option) {

        return GAME.update(id, {
            $set: {
                option2: option
            }
        });
    }
});
