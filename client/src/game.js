if (Meteor.isClient) {

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

    var popSelect = "";

    Template.game.hooks({
        created: function() {
            console.log("game created");
        },
        rendered: function() {
            console.log("game rendered");

            nameTileIcons();

            $(window).on('mousemove', mouseEvent);

            TweenLite.to($('.gameBoard'), 0, {
                alpha: 0,
                scale: 0
            });

            TweenLite.to($('.gameBoard'), 0.5, {
                rotation: 360,
                alpha: 1,
                scale: 1
            });

            console.log("ACTIVE GAME:" + Session.get('activeGame'));
            // 
            initGame();
        },
        destroyed: function() {
            console.log("game destroyed");

            $(window).off('mousemove', mouseEvent);
        }
    });

    var initGame = function() {
        hideTileIcons();
        var game = GAME.findOne(Session.get('activeGame'));
        // var matrix = game.matrix;
        // updateBoard(matrix);

        $('.popX').css("display", "none");
        $('.popO').css("display", "none");

        if (game.cross == false && game.circle == false) {

            Meteor.call('updatePlayerCross', game, function(error, success) {
                if (error) {
                    //
                } else {
                    console.log("up up 1");
                    popSelect = "cross";
                }
            });

        } else if (game.cross == true && game.circle == false) {

            Meteor.call('updatePlayerCircle', game, function(error, success) {
                if (error) {
                    //
                } else {
                    console.log("up up 2");
                    popSelect = "circle";
                }
            });

        } else if (game.cross == true && game.circle == true) {
            console.log("no more players");
            console.log("up up 3");
            popSelect = "none";
        }

        removeTileBorders();
    }

    var updateGame = function() {

    }

    Template.tictactoe.helpers({});

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

            var game = GAME.find(Session.get('activeGame'));
            tiles = [game.t1, game.t2, game.t3, game.t4, game.t5, game.t6, game.t7, game.t8, game.t9];

            return tiles;
        },
        blockWidth: function() {
            return dimensions.width / 3;
        },
        blockHeight: function() {
            return dimensions.height / 3;
        }
    });

    var nameTileIcons = function() {

        $('.tile').each(function(index) {
            $(this).addClass('tile_' + index.toString());
        });

        var o = true;
        var counter = 0;
        $('.tile').find('img').each(function(index) {
            if (o) {
                $(this).attr('id', Math.floor(counter).toString() + '_o_tile');
                o = false;
            } else {
                // $(this).addClass(Math.floor(counter).toString() + '_x_tile hideTile');
                $(this).attr('id', Math.floor(counter).toString() + '_x_tile');
                o = true;
            }

            counter += 0.5;
        });
    }

    var hideTileIcons = function() {
        var o = true;
        var counter = 0;
        $('.tile').find('img').each(function(index) {
            $(this).addClass('hideTile');
        });
    }

    var removeTileBorders = function() {

        $('.tile').each(function(index) {

            if (index == 0 || index == 1 || index == 2) {
                $(this).css('border-top', 'none');

                if (index == 0) {
                    $(this).css('border-left', 'none');
                    $(this).css('border-right', 'none');
                }
                if (index == 1 || index == 2) {
                    $(this).css('border-right', 'none');
                }
            }
            if (index == 3 || index == 4 || index == 5) {
                $(this).css('border-top', 'none');

                if (index == 3) {
                    $(this).css('border-left', 'none');
                    $(this).css('border-right', 'none');
                }
                if (index == 4 || index == 5) {
                    $(this).css('border-right', 'none');
                }
            }
            if (index == 6 || index == 7 || index == 8) {
                $(this).css('border-top', 'none');
                $(this).css('border-bottom', 'none');

                if (index == 6) {
                    $(this).css('border-left', 'none');
                    $(this).css('border-right', 'none');
                }
                if (index == 7 || index == 8) {
                    $(this).css('border-right', 'none');
                    $(this).css('border-right', 'none');
                }
            }
        });
    }

    Template.game.events({
        "click [data-action='tile/selectX']": function(e, t) {
            console.log("select x");

            var tileIndex;
            for (var i = 0; i < 9; i++) {

                var str = $(selectedTile).parent().parent().html();

                if (str.indexOf('tile_' + i.toString()) != -1) {

                    console.log("Bingo, clicked tile: " + i);
                    tileIndex = i;
                    break;
                }
            }

            // var game = TM.findOne(Session.get('activeGame'));
            // var matrix = game.matrix;
            // var matrix = getMatrix();

            Meteor.call('updateTile', Session.get('activeGame'), tileIndex, "x", function(error, success) {
                if (success) {
                    // updateBoard();
                    console.log("update success");
                    removePop();

                    // console.log("return matrix: " + success.matrix)

                    // calcMatrix(success.matrix);
                } else {
                    console.log("update error");
                }
            });

        },
        "click [data-action='tile/selectO']": function(e, t) {
            console.log("select o");

            var tileIndex;
            for (var i = 0; i < 9; i++) {

                var str = $(selectedTile).parent().parent().html();

                if (str.indexOf('tile_' + i.toString()) != -1) {

                    console.log("Bingo, clicked tile: " + i);
                    tileIndex = i;
                    break;
                }
            }

            Meteor.call('updateTile', Session.get('activeGame'), tileIndex, "o", function(error, success) {
                if (success) {
                    // updateBoard();
                    console.log("update success");
                    removePop();
                    calcMatrix(success.matrix);
                } else {
                    console.log("update error");
                }
            });

        },
        "click [data-action='tile/cancel']": function(e, t) {
            console.log("cancel tile select");

            removePop();
        }
    });

    var updateBoard = function(matrix) {

        for (var i = 0; i < matrix.length; i++) {
            var matrixTile = matrix[i];

            var x_tile = $('#' + i.toString() + '_x_tile');
            var o_tile = $('#' + i.toString() + '_o_tile');

            TweenLite.to(x_tile, 0.1, {
                alpha: 0
            });
            TweenLite.to(o_tile, 0.1, {
                alpha: 0
            });

            if (matrixTile === "x") {

                TweenLite.to(x_tile, 0.5, {
                    alpha: 1,
                    delay: 0.2
                });

            } else if (matrixTile === "o") {

                TweenLite.to(o_tile, 0.5, {
                    alpha: 1,
                    delay: 0.2
                });
            }
        }
    }

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
                    alpha: 0,
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
            if (str.indexOf("o_t.png") != -1) {
                // console.log(index + ": " + "o");
                val = "o";
            } else if (str.indexOf("x_t.png") != -1) {
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

    Template.blockObj.events({
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

        TweenLite.to($('.gameBoard'), 0.2, {
            scale: 0.7,
        });


        if (popSelect == "cross") {

            $('.popX').css('top', (offY + pos.y - $('.popX').height() / 2) + 'px');
            $('.popX').css('left', (offX + pos.x - $('.popX').width() / 2) + 'px');

            TweenLite.to($('.popX'), 0, {
                scale: 0
            });
            //make it visible
            $('.popX').css('display', 'block');
            //and make it pop
            TweenLite.to($('.popX'), 0.5, {
                scale: 1,
                ease: Bounce.easeOut
            });
        } else if (popSelect == "circle") {

            $('.popO').css('top', (offY + pos.y - $('.popO').height() / 2) + 'px');
            $('.popO').css('left', (offX + pos.x - $('.popO').width() / 2) + 'px');

            TweenLite.to($('.popO'), 0, {
                scale: 0
            });
            //make it visible
            $('.popO').css('display', 'block');
            //and make it pop
            TweenLite.to($('.popO'), 0.5, {
                scale: 1,
                ease: Bounce.easeOut
            });
        }

        //show cancel btn:
        TweenLite.to($('.cancel'), 0.5, {
            top: "-68px",
            alpha: 1,
            delay: 0.3,
            ease: Bounce.easeOut
        });
    }

    var removePop = function(pos) {
        console.log("remove pop");

        $(selectedTile).removeClass('pressed');

        if (popSelect == "cross") {
            TweenLite.to($('.popX'), 0.2, {
                scale: 0,
                ease: Power4.Strong
            });
        } else if (popSelect == "circle") {
            TweenLite.to($('.popO'), 0.2, {
                scale: 0,
                ease: Power4.Strong
            });
        }

        $('.gameBoard').removeClass('blur');

        TweenLite.to($('.gameBoard'), 0.2, {
            scale: 1
        });

        scaleTile($(selectedTile), 1, 0);

        selectedTile = null;

        //hide cancel btn:
        TweenLite.to($('.cancel'), 0.5, {
            top: "0px",
            alpha: 0,
            ease: Bounce.easeOut
        });
    }

    var scaleTile = function(target, s, d) {
        TweenLite.to($(target), d, {
            scale: s,
            ease: Power4.Strong
        });
    }
}
