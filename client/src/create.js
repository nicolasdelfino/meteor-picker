if (Meteor.isClient) {
    Session.setDefault('gameName', 'tic tac toe');
    Session.setDefault('activeGame', null);

    Template.init.hooks({
        created: function() {
            //
        },
        rendered: function() {

        	$('.sc2_or').hide();
        	$('.sc3_ok').hide();

            $('#option1').on('input', function() {
                var input = $(this).val();
                if (input.length > 0) {
                    $('.sc2_or').fadeIn();
                } else {
                    $('.sc2_or').fadeOut();
                }
            });

            $('#option2').on('input', function() {
                var input = $(this).val();
                if (input.length > 0) {
                    $('.sc3_ok').fadeIn();
                } else {
                    $('.sc3_ok').fadeOut();
                }
            });
        },
        destroyed: function() {
            //
        }
    });

    Template.init.helpers({});

    Template.init.events({
        "click [data-action='picker/create']": function(e, t) {
            console.log("picker create");
            $('.pickerCreate').css('display', 'none');
            $('.option1').css('display', 'block');
            $('.option2').css('display', 'none');
            $('.pickerGen').css('display', 'none');


            Meteor.call('createGame', function(error, id) {
                if (error) {
                    //
                } else {
                    var gameID = id;
                    console.log(gameID);
                    Session.set('activeGame', gameID);
                }
            });

        },
        "click [data-action='picker/or']": function(e, t) {
            console.log("picker or");
            var opt1 = $('#option1').val();

            $('.pickerCreate').css('display', 'none');
            $('.option1').css('display', 'none');
            $('.option2').css('display', 'block');
            $('.pickerGen').css('display', 'none');

            Meteor.call('updateOption1', Session.get('activeGame'), opt1);

            var option = GAME.findOne(Session.get('activeGame'));
            $('._option1_text').text(option.option1);
        },
        "click [data-action='picker/ok']": function(e, t) {
            console.log("picker ok");
            var opt2 = $('#option2').val();

            $('.pickerCreate').css('display', 'none');
            $('.option1').css('display', 'none');
            $('.option2').css('display', 'none');
            $('.pickerGen').css('display', 'block');

            Meteor.call('updateOption2', Session.get('activeGame'), opt2);

            $('#game_id').text("picker/" + Session.get('activeGame'));
        },
        "click [data-action='picker/go']": function(e, t) {
            console.log("picker go");
            $('.pickerCreate').css('display', 'none');
            $('.option1').css('display', 'none');
            $('.option2').css('display', 'none');
            $('.pickerGen').css('display', 'none');
            $('.outer').css('display', 'none');

            Router.go('play', {
                _id: Session.get('activeGame')
            });
        }
    });
}
