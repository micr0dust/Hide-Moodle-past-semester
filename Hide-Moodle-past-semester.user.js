// ==UserScript==
// @name         Hide-Moodle-past-semester
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在暨大Moodle清單內移除舊學期課程
// @author       Microdust
// @match        https://moodle.ncnu.edu.tw/*
// @icon         https://moodle.ncnu.edu.tw/theme/image.php/lambda/theme/1646170574/favicon
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const date = new Date();
    const thisSemester = (date.getFullYear() - 1912).toString() + semesterFn(date).toString();
    let path = document.querySelector('#wrapper > header.navbar > nav > div > div > ul:nth-child(1)');
    if (location.href.split("?")[1]) path = document.querySelector('#custom_menu_activitystream');
    path.querySelector('ul:nth-child(1) > li.dropdown.langmenu').style.display = 'none';
    const list = path.querySelector('ul > li:nth-child(2) > ul');
    for (let i = 0; i < list.childNodes.length; i++) {
        let className = list.childNodes[i];
        let semester = className.textContent.split('-')[0];
        if (semester != thisSemester) list.childNodes[i].style.display = 'none';
    }

    function semesterFn(date) {
        let month = date.getMonth() + 1;
        if (month >= 2 && month <= 7) return 2;
        return 1;
    }
})();