Meteor.startup(function() {

    WebFontConfig = {
        // google: { families: [ 'Crimson+Text'] }
        google: {
            families: ['Roboto+Condensed']
        }
        // google: { families: [ 'Roboto'] }
        // google: { families: [ 'Roboto+Slab'] }
        // google: { families: [ 'Open+Sans+Condensed:300'] }
        // google: { families: [ 'PT Sans'] }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
        console.log("async fonts loaded", WebFontConfig);
    })();

})
