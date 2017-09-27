/*!
 * Project : simply-countdown
 * File : simplyCountdown
 * Date : 27/06/2015
 * License : MIT
 * Version : 1.3.2
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 * Contributors :
 *  - Justin Beasley <JustinB@harvest.org>
 *  - Nathan Smith <NathanS@harvest.org>
 */
/*global window, document*/
(function (exports) {
    'use strict';

    var // functions
        extend,
        createElements,
        createCountdownElt,
        simplyCountdown;

    /**
     * Function that merge user parameters with defaults one.
     * @param out
     * @returns {*|{}}
     */
    extend = function (out) {
        var i,
            obj,
            key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }

        return out;
    };

    /**
     * Function that create a countdown section
     * @param countdown
     * @param parameters
     * @param typeClass
     * @returns {{full: (*|Element), amount: (*|Element), word: (*|Element)}}
     */
    createCountdownElt = function (countdown, parameters, typeClass) {
        var innerSectionTag,
            sectionTag,
            amountTag,
            wordTag;

        sectionTag = document.createElement('div');
        amountTag = document.createElement('span');
        wordTag = document.createElement('span');
        innerSectionTag = document.createElement('div');

        innerSectionTag.appendChild(amountTag);
        innerSectionTag.appendChild(wordTag);
        sectionTag.appendChild(innerSectionTag);

        sectionTag.classList.add(parameters.sectionClass);
        sectionTag.classList.add(typeClass);
        amountTag.classList.add(parameters.amountClass);
        wordTag.classList.add(parameters.wordClass);

        countdown.appendChild(sectionTag);

        return {
            full: sectionTag,
            amount: amountTag,
            word: wordTag
        };
    };

    /**
     * Function that create full countdown DOM elements calling createCountdownElt
     * @param parameters
     * @param countdown
     * @returns {{days: (*|Element), hours: (*|Element), minutes: (*|Element), seconds: (*|Element)}}
     */
    createElements = function (parameters, countdown) {
        var spanTag;

        if (!parameters.inline) {
            return {
                days: createCountdownElt(countdown, parameters, 'simply-days-section'),
                hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
                minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
                seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
            };
        }

        spanTag = document.createElement('span');
        spanTag.classList.add(parameters.inlineClass);
        return spanTag;
    };

    /**
     * simplyCountdown, create and display the coundtown.
     * @param elt
     * @param args (parameters)
     */
    simplyCountdown = function (elt, args) {
        var parameters = extend({
                year: 2017,
                month: 12,
                day: 13,
                hours: 0,
                minutes: 0,
                seconds: 0,
                words: {
                    days: 'day',
                    hours: 'hour',
                    minutes: 'minute',
                    seconds: 'second',
                    pluralLetter: 's'
                },
                plural: true,
                inline: false,
                enableUtc: true,
                onEnd: function () {
                    return;
                },
                refresh: 1000,
                inlineClass: 'simply-countdown-inline',
                sectionClass: 'simply-section',
                amountClass: 'simply-amount',
                wordClass: 'simply-word',
                zeroPad: false
            }, args),
            interval,
            targetDate,
            targetTmpDate,
            now,
            nowUtc,
            secondsLeft,
            days,
            hours,
            minutes,
            seconds,
            cd = document.querySelectorAll(elt);

        targetTmpDate = new Date(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        );

        if (parameters.enableUtc) {
            targetDate = new Date(
                targetTmpDate.getUTCFullYear(),
                targetTmpDate.getUTCMonth(),
                targetTmpDate.getUTCDate(),
                targetTmpDate.getUTCHours(),
                targetTmpDate.getUTCMinutes(),
                targetTmpDate.getUTCSeconds()
            );
        } else {
            targetDate = targetTmpDate;
        }

        Array.prototype.forEach.call(cd, function (countdown) {
            var fullCountDown = createElements(parameters, countdown),
                refresh;


            // Set the date we're counting down to
var countDownDate = new Date("Dec 12, 2017 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
//    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//    + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
//    if (distance < 0) {
//        clearInterval(x);
//        document.getElementById("demo").innerHTML = "EXPIRED";
//    }
}, 1000);


            refresh = function () {
                var dayWord,
                    hourWord,
                    minuteWord,
                    secondWord;



                    secondsLeft = seconds;


                    secondsLeft = seconds;


                if (secondsLeft > 0) {
//                    days = parseInt(secondsLeft / 52800, 10);
//                    secondsLeft = secondsLeft % 52800;
//
//                    hours = parseInt(secondsLeft / 3600, 10);
//                    secondsLeft = secondsLeft % 3600;
//
//                    minutes = parseInt(secondsLeft / 60, 10);
//                    seconds = parseInt(secondsLeft % 60, 10);
                } else {
                    days = 0;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                    window.clearInterval(interval);
                    parameters.onEnd();
                }

                if (parameters.plural) {
                    dayWord = days > 1
                        ? parameters.words.days + parameters.words.pluralLetter
                        : parameters.words.days;

                    hourWord = hours > 1
                        ? parameters.words.hours + parameters.words.pluralLetter
                        : parameters.words.hours;

                    minuteWord = minutes > 1
                        ? parameters.words.minutes + parameters.words.pluralLetter
                        : parameters.words.minutes;

                    secondWord = seconds > 1
                        ? parameters.words.seconds + parameters.words.pluralLetter
                        : parameters.words.seconds;

                } else {
                    dayWord = parameters.words.days;
                    hourWord = parameters.words.hours;
                    minuteWord = parameters.words.minutes;
                    secondWord = parameters.words.seconds;
                }

                /* display an inline countdown into a span tag */
                if (parameters.inline) {
                    countdown.innerHTML =
                        days + ' ' + dayWord + ', ' +
                        hours + ' ' + hourWord + ', ' +
                        minutes + ' ' + minuteWord + ', ' +
                        seconds + ' ' + secondWord + '.';

                } else {
                    fullCountDown.days.amount.textContent = (parameters.zeroPad && days.toString().length < 2 ? '0' : '') + days;
                    fullCountDown.days.word.textContent = dayWord;

                    fullCountDown.hours.amount.textContent = (parameters.zeroPad && hours.toString().length < 2 ? '0' : '') + hours;
                    fullCountDown.hours.word.textContent = hourWord;

                    fullCountDown.minutes.amount.textContent = (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + minutes;
                    fullCountDown.minutes.word.textContent = minuteWord;

                    fullCountDown.seconds.amount.textContent = (parameters.zeroPad && seconds.toString().length < 2 ? '0' : '') + seconds;
                    fullCountDown.seconds.word.textContent = secondWord;
                }
            };

            // Refresh immediately to prevent a Flash of Unstyled Content
            refresh();
            interval = window.setInterval(refresh, parameters.refresh);
        });
    };

    exports.simplyCountdown = simplyCountdown;
}(window));

/*global $, jQuery, simplyCountdown*/
if (window.jQuery) {
    (function ($, simplyCountdown) {
        'use strict';

        function simplyCountdownify(el, options) {
            simplyCountdown(el, options);
        }

        $.fn.simplyCountdown = function (options) {
            return simplyCountdownify(this.selector, options);
        };
    }(jQuery, simplyCountdown));
}
