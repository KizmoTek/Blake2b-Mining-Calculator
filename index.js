/*
 * Copyright (c) 2018 by KizmoTek <KizmoTek@gmail.com>
 * All rights reserved.
 *
 * License: 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   - Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var themeToggle = document.getElementById("diffToggleSwitch2")
if (localStorage.getItem('theme') == null) {
    themeToggle.checked = false
} else {
    var data = localStorage.getItem('theme')
    var newData = JSON.parse(data)
    themeToggle.checked = newData.Toggle
    ChangeTheme()
}

function ChangeTheme() {
    var CalcName = document.getElementsByClassName("CalcName")

    if (themeToggle.checked == true) {
        var data = {Toggle: themeToggle.checked}
        var strData = JSON.stringify(data)
        localStorage.setItem('theme', strData);
        var currentTheme = document.body.children
        for (var i = 0; i < currentTheme.length; i++) {
            currentTheme[i].style.color = "white";
        }

        for (var i = 0; i < CalcName.length; i++) {
          CalcName[i].style.color = "white";
        }

        currentTheme[0].style.backgroundColor = "#3b3d3f"
        currentTheme[1].style.backgroundColor = "#535659"
        currentTheme[2].style.backgroundColor = "#3b3d3f"
        document.body.style.background = "#535659";
        currentTheme[2].style.borderColor = "#28292b"
    } else {
        var data = {Toggle: themeToggle.checked}
        var strData = JSON.stringify(data)
        localStorage.setItem('theme', strData);
        var currentTheme = document.body.children
        for (var i = 0; i < currentTheme.length; i++) {
            currentTheme[i].style.removeProperty("color")
            currentTheme[i].style.removeProperty("background-color")
            currentTheme[i].style.removeProperty("border-color")
        }

        for (var i = 0; i < CalcName.length; i++) {
          CalcName[i].style.removeProperty("color")
        }

        document.body.style.removeProperty("background-color")
    }
}