var Hello = {
    connection: null,
    log: function(msg) {
        $('#log').append("<p>" + msg + "</p>");
    }
}

$(document).ready(function() {
    $('#login_dialog').dialog({
        autoOpen: true,
        draggable: false,
        modal: true,
        title: "Connect to XMPP",
        buttons: {
            "Connect": function() {
                $(document).trigger('connect', {
                    jid: $('#jid').val(),
                    password: $('#password').val()
                });

                $('#password').val('');
                $(this).dialog('close');
            }
        }
    });
});

$(document).bind('connect', function(ev, data) {
    var conn = new Strophe.Connection("http://localhost:7070/http-bind/");
    conn.connect(data.jid, data.password, function(status) {
        if (status == Strophe.Status.CONNECTED) {
            $(document).trigger('connected');
        } else if (status == Strophe.Status.DISCONNECTED) {
            $(document).trigger('disconnected');
        }
    });

    Hello.connection = conn;
});

$(document).bind('connected', function() {
    Hello.log('Connection established.');
});

$(document).bind('disconnected', function() {
    Hello.log("Connection terminated.");
    Hello.connection = null;
});