$(document).ready(function() {
    $('body').append("<div id=\"ec-bubble\"><div id=\"ec-bubble-text\"></div></div>");

	$(document).dblclick(function(e) {
		hideBubble();
		processSelection(e);
	});

	$(document).click(function(e) {
		hideBubble();
		processSelection(e);
	});

	$(document).bind('mouseup', function(e) {
		processSelection(e);
	});

});

function processSelection(e) {
    var text = getSelectedText();

    if ($.isNumeric(text) && (text.length == 10 || text.length == 13)) {
		convertTimestamp(text,function(humanReadableDate){

    		if (humanReadableDate) {
                showBubble(e, humanReadableDate);
            }
        });
	}
}

function getSelectedText() {
	var text = "";

    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

	return text;
}

function convertTimestamp(ts, cb) {
    chrome.storage.sync.get(function(opts){
        var date;
        if(ts.length == 10){ // s
            date = moment.unix(+ts);
        } else { // ms
            date = moment(+ts);
        }

        if(!date.isValid()){
    		return;
        }
    	return cb(date.format(opts.dateFormat));
    });
}

function showBubble(e, text) {
    $('#ec-bubble').css('top', e.pageY + 20 + "px");
    $('#ec-bubble').css('left', e.pageX - 85 + "px");
    $('#ec-bubble-text').html(text);
    $('#ec-bubble').css('visibility', 'visible');
}

function hideBubble() {
    $('#ec-bubble').css('visibility', 'hidden');
    $('#ec-bubble-text').html("");
}
