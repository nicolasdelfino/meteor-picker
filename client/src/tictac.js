if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('gameName', 'tic tac toe');

    var matrix = {
        horizontal: 3,
        vertical: 3
    }

    var dimensions = {
        width: 300,
        height: 300
    };

    // keeps track of mouse position
    var mx = 0;
    var my = 0;

    var mouseEvent = function(e) {
        mx = e.clientX;
        my = e.clientY
    }

    var tiles = [];
    var selectedTile = null;

    Template.game.hooks({
        created: function() {
            console.log("game created");
        },
        rendered: function() {
            console.log("game rendered");

            $(window).on('mousemove', mouseEvent);

            window.addEventListener("mouseup", function(event) {
                // resetAllTiles();
            });

            removeTileBorders();
        },
        destroyed: function() {
            console.log("game destroyed");

            $(window).off('mousemove', mouseEvent);
        }
    });

    Template.game.helpers({
        gameName: function() {
            return Session.get('gameName');
        },
        dimensions: function() {
            return dimensions;
        },
        horizontal: function() {
            return matrix.horizontal;
        },
        vertical: function() {
            return matrix.vertical;
        },
        tiles: function() {

            for (var x = 0; x < matrix.horizontal; x++) {
                for (var y = 0; y < matrix.vertical; y++) {
                    tiles.push("x");
                }
            }

            return tiles;
        },
        blockWidth: function() {
            return dimensions.width / 3;
        },
        blockHeight: function() {
            return dimensions.height / 3;
        }
    });

    var removeTileBorders = function() {

        $('.tile').each(function(index) {

            if (index == 0 || index == 1 || index == 2) {
                $(this).css('border-top', 'none');

                if (index == 0) {
                    $(this).css('border-left', 'none');
                }
                if (index == 1 || index == 2) {
                    $(this).css('border-right', 'none');
                }
            } else if (index == 3 || index == 4 || index == 5) {
                $(this).css('border-top', 'none');

                if (index == 3) {
                    $(this).css('border-left', 'none');
                }
                if (index == 4 || index == 5) {
                    $(this).css('border-right', 'none');
                }
            } else if (index == 6 || index == 7 || index == 8) {
                $(this).css('border-top', 'none');
                $(this).css('border-bottom', 'none');

                if (index == 6) {
                    $(this).css('border-left', 'none');
                }
                if (index == 7 || index == 8) {
                    $(this).css('border-right', 'none');
                }
            }
        });
    }

    Template.game.events({
        "click [data-action='tile/selectX']": function(e, t) {
            console.log("select x");

            $(selectedTile).append('<img src="/x.png" class="Aligner-item-fixed" />');
            removePop();
            calcMatrix(getMatrix());
        },
        "click [data-action='tile/selectO']": function(e, t) {
            console.log("select o");

            $(selectedTile).append('<img src="/o.png" class="Aligner-item-fixed" />');
            removePop();
            calcMatrix(getMatrix());
        }
    });

    var calcMatrix = function(matrix) {

        console.log("calcMatrix");

        var combos = ["012", "345", "678", "036", "147", "258", "048", "246"];
        var o_amount = 0;
        var x_amount = 0;
        var o = "";
        var x = "";

        for (var i = 0; i < matrix.length; i++) {
            var val = matrix[i];
            if (val == "o") {
                o_amount++;
                o += i.toString();

            } else if (val == "x") {
                x_amount++;
                x += i.toString();
            }
        }

        if (o_amount >= 3 || x_amount >= 3) {
            console.log("o => " + o);
            console.log("x => " + x);
            var check;
            if (o_amount >= 3) {
                check = o;
            } else if (x_amount >= 3) {
                check = x;
            }
            for (var z = 0; z < combos.length; z++) {
                var combo = combos[z];

                // loop through each char:
                var comboArr = combo.split("");
                var comboNumFound = 0;

                for (var c = 0; c < comboArr.length; c++) {
                    var comboArrVal = comboArr[c];

                    if (check.indexOf(comboArrVal) > -1) {
                        comboNumFound++;

                        if (comboNumFound == 3) {
                            highlightVictoryTiles(combo);
                        }
                    }
                }
            }
        }
    }

    var highlightVictoryTiles = function(tiles) {

        $('.tile').each(function(index) {
            if (tiles.indexOf(index.toString()) != -1) {
                TweenLite.to($(this), 0.5, {
                    scale: 0.8,
                    ease: Bounce.easeOut
                });
                $(this).addClass('victoryTile');
                $(this).css('border', '4px solid black');
            } else {
                TweenLite.to($(this), 0.5, {
                    scale: 0.6,
                    ease: Bounce.easeOut
                });
                $(this).addClass('blur-more');
            }
        });

        TweenLite.to($('.gameBoard'), 0.5, {
            scale: 0.5,
            ease: Bounce.easeOut
        });

       $('.victory').css('display', 'block'); 
    }

    var getMatrix = function() {
        var matrix = [];
        $('.tile').each(function(index) {
            var str = $(this).html();
            var val = "";
            // console.log(index + ": " + str);
            if (str.indexOf("o.png") != -1) {
                // console.log(index + ": " + "o");
                val = "o";
            } else if (str.indexOf("x.png") != -1) {
                // console.log(index + ": " + "x");
                val = "x";
            } else {
                // console.log(index);
            }

            matrix.push(val);
        });

        // console.log(JSON.stringify(matrix));
        return matrix;
    }

    Template.gameBoard.inheritsHelpersFrom("game");
    Template.blockObj.inheritsHelpersFrom("game");

    Template.tile.events({
        // "mousedown [data-action='tile/press']": function(e, t) {
        "click [data-action='tile/press']": function(e, t) {

            if (selectedTile == null) {
                $(e.target).addClass("pressed");

                selectedTile = $(e.target);

                var x_val = Math.floor(mx - $('.gameBoard').offset().left);
                var y_val = Math.floor(my - $('.gameBoard').offset().top);
                var pos = {
                    x: x_val,
                    y: y_val
                }
                scaleTile(e.target, 0.9, 0.2);
                createPop(pos);
            }
        }
    });

    var createPop = function(pos) {
        console.log("create pop");

        var offY = $('.gameBoard').offset().top - $('#gameBase').offset().top;
        var offX = $('.gameBoard').offset().left - $('#gameBase').offset().left;

        $('.pop').css('top', (offY + pos.y - $('.pop').height() / 2) + 'px');
        $('.pop').css('left', (offX + pos.x - $('.pop').width() / 2) + 'px');

        TweenLite.to($('.gameBoard'), 0.2, {
            scale: 0.9,
        });

        $('.gameBoard').addClass('blur');
        //scale it down to zero
        TweenLite.to($('.pop'), 0, {
            scale: 0
        });
        //make it visible
        $('.pop').css('display', 'block');
        //and make it pop
        TweenLite.to($('.pop'), 0.5, {
            scale: 1,
            ease: Bounce.easeOut
        });
    }

    var removePop = function(pos) {
        console.log("remove pop");

        $(selectedTile).removeClass('pressed');

        TweenLite.to($('.pop'), 0.2, {
            scale: 0,
            ease: Power4.Strong
        });

        $('.gameBoard').removeClass('blur');

        TweenLite.to($('.gameBoard'), 0.2, {
            scale: 1
        });

        scaleTile($(selectedTile), 1, 0);

        selectedTile = null;
    }

    var scaleTile = function(target, s, d) {
        TweenLite.to($(target), d, {
            scale: s,
            ease: Power4.Strong
        });
    }
}
