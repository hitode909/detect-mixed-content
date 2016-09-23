function detectMixedContent(url) {
    var webPage = require('webpage');
    var page = webPage.create();

    var insecureContents = [];
    var watchMessage = function (msg) {
        var matched = msg.match(/displayed insecure content from (.+)\./);
        if (!matched) return;
        console.log(matched[1]);
        insecureContents.push(matched[1]);
    };
    page.onError = watchMessage;
    page.onConsoleMessage = watchMessage;

    page.open(url, function (status) {
        if (status !== 'success') {
            console.log('unable to open page');
            phantom.exit(1);
            return;
        }
        if (insecureContents.length > 0) {
            phantom.exit(1);
            return;
        }
        phantom.exit(0);
    });
}

var system = require('system');
var args = system.args;

if (args.length === 2) {
    detectMixedContent(args[1]);
} else {
    console.log("URL required");
    phantom.exit(1);
}
