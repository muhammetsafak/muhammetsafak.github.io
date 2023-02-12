(function ($) {
    $.alertNotify = function (options) {
        var settings = $.extend(
            {
                name: "",
                message: "",
                mainStyle: {},
                messageStyle: {},
                btnClass: "",
                btnLabel: "",
                btnStyle: {},
                btnOnClick: function(){},
                cancelBtn: true,
                cancelBtnLabel: '',
                cancelBtnClass: '',
                cookieTTL: 365
            },
            options
        );

        const body = $("body");
        const banner = $("<div id='alert-notify'></div>");
        const container = $("<div id='alert-notify-container'></div>");
        const message = $(
            "<p id='alert-notify-message'>" + settings.message + "</p>"
        );
        const button = $(
            "<a id='alert-notify-button' href='#' class='btn" + (settings.btnClass != '' ? ' ' + settings.btnClass : '') + "'>" + settings.btnLabel + "</a>"
        );
        const cancelBtn = $(
            "<a id='alert-notify-cancel-button' href='#' class='btn" + (settings.cancelBtnClass != '' ? ' ' + settings.cancelBtnClass : '') + "'>" + settings.cancelBtnLabel + "</a>"
        );

        if (!getCookie("cookie-alert-notify-" + settings.name)) {
            init();
        }

        // ▶️ INITIALISATION
        function init() {
            body.append(banner);
            banner
                .append(container)
                .css(settings.mainStyle);
            container
                .append(message.css(settings.messageStyle))
                .append(
                    button.css(settings.btnStyle)
                );
            if (settings.cancelBtn === true) {
                container.append(cancelBtn);
            }
        }

        button.on("click", (e) => {
            e.preventDefault();
            banner.remove();
            setCookie("cookie-alert-notify-" + settings.name, 1, settings.lifetime);
            settings.btnOnClick();
        });
        cancelBtn.on('click', (e) => {
            e.preventDefault();
            banner.remove();
            setCookie("cookie-alert-notify-" + settings.name, 1, settings.lifetime);
        })
        function getCookie(name) {
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(";");
            name = name + "=";
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
        }

        function setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            const expires = "expires=" + date.toUTCString();
            document.cookie =
                name + "=" + value + ";" + expires + ";path=/;Secure";
        }
    };
})(jQuery);
