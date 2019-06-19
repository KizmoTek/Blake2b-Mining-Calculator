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

/*window.onload = function () {
  if (localStorage.getItem('socialPopUp') == null) {
      createPopUp()
  } else {
      var data = localStorage.getItem('socialPopUp')
      var newData = JSON.parse(data)
      if (newData.PopUpData != true) {
        createPopUp()
      }
  }
}*/

function createPopUp() {
  var mainDiv = document.getElementsByClassName("main")[0]
  var body = document.getElementsByTagName("BODY")[0]
  body.style.pointerEvents = "none"

  var box = document.createElement("div")
  mainDiv.appendChild(box)
  box.style.pointerEvents = "all"
  box.id = "PopUpBox"
  box.style.backgroundColor = "#a8a8a8"
  box.style.border = "2px solid #6a6b6d"
  box.style.borderRadius = "12px"
  box.style.position = "fixed"
  box.style.zIndex = "15"

  var x = document.createElement("div")
  box.appendChild(x)
  x.id = "close"
  x.setAttribute( "onClick", "hidePopUp()")



  var MainText = document.createElement("h3")
  var SecondaryText = document.createElement("h5")
  box.appendChild(MainText)
  box.appendChild(SecondaryText)
  MainText.innerHTML = "Thank you for using my website!"
  SecondaryText.innerHTML = "In this new update, I spent the majority of my free time perfecting a lot of the math for the GrinCuckatoo31/32 Mining Simulator so that it is more accurate, I also created a homepage and changed the domain name of the website since I will be working on more calculators.<br> If you didnt know about this already, I also added in dark theme during the last update, there is a toggle on the top right of the website.<br><br>Follow me on social media:"
  MainText.style.marginBottom = "0px"
  MainText.style.marginTop = "5px"
  SecondaryText.style.marginLeft = "2px"
  SecondaryText.style.marginRight = "2px"
  SecondaryText.style.marginTop = "10px"
  SecondaryText.style.marginBottom = "0px"

  var SocialMediaDiv = document.createElement("div")
  box.appendChild(SocialMediaDiv)
  var SocialLinks = document.createElement("span")
  SocialLinks.style.width = "170px"
  SocialLinks.style.margin = "auto"
  SocialMediaDiv.appendChild(SocialLinks)
  SocialLinks.id = "socialLinks"

  var twitterA = document.createElement("a")
  SocialLinks.appendChild(twitterA)
  var twitterIMG = document.createElement("img")
  twitterA.appendChild(twitterIMG)
  twitterA.href = "https://twitter.com/KizmoTek"
  twitterA.target = "_blank"
  twitterIMG.src = "Images/twitter.png"
  twitterIMG.id = "twitterIMG"
  twitterIMG.className = "socialIMGMargin"

  var instagramA = document.createElement("a")
  SocialLinks.appendChild(instagramA)
  var instagramIMG = document.createElement("img")
  instagramA.appendChild(instagramIMG)
  instagramA.href = "https://www.instagram.com/kizmotek/"
  instagramA.target = "_blank"
  instagramIMG.src = "Images/instagram.png"
  instagramIMG.id = "instagramIMG"
  instagramIMG.className = "socialIMGMargin"

  var discordA = document.createElement("a")
  SocialLinks.appendChild(discordA)
  var discordIMG = document.createElement("img")
  discordA.appendChild(discordIMG)
  discordA.href = "https://discord.gg/vBWhVWT"
  discordA.target = "_blank"
  discordIMG.src = "Images/discord.png"
  discordIMG.id = "discordIMG"
  discordIMG.className = "socialIMGMargin"

  var DontShowAgainButton = document.createElement("INPUT")
  box.appendChild(DontShowAgainButton)
  DontShowAgainButton.style.marginTop = "30px"
  DontShowAgainButton.setAttribute("type", "button")
  DontShowAgainButton.id = "DontShowAgainButton"
  DontShowAgainButton.value = "Dont Show Again"
  DontShowAgainButton.setAttribute( "onClick", "DontShowAgainPopUp()")
}

function hidePopUp() {
  var data = {PopUpData: false}
  var strData = JSON.stringify(data)
  localStorage.setItem('socialPopUp', strData)

  var PopUpBox = document.getElementById("PopUpBox")
  PopUpBox.parentNode.removeChild(PopUpBox)

  var body = document.getElementsByTagName("BODY")[0]
  body.style.pointerEvents = "all"
}

function DontShowAgainPopUp() {
  var data = {PopUpData: true}
  var strData = JSON.stringify(data)
  localStorage.setItem('socialPopUp', strData)

  var PopUpBox = document.getElementById("PopUpBox")
  PopUpBox.parentNode.removeChild(PopUpBox);

  var body = document.getElementsByTagName("BODY")[0]
  body.style.pointerEvents = "all"
}

function changePage() {
    const logoDropdown = document.getElementById("logoDropdown")
    if (logoDropdown.selectedIndex == 0) {
        window.open("https://www.blakemining.com/", "_top");
    } else if(logoDropdown.selectedIndex == 1) {
        window.open("https://www.kizmotek.com/Grin.html", "_top");
    } else if(logoDropdown.selectedIndex == 2) {
        window.open("PoC.html", "_top");
    }
}

function BTCSet() {
    var coinAddress = "1DNEmupDWC873fDv4Lpy1xY2us6eYKwXTH"
    var coin = "BTC"
    var popup = document.getElementById("myPopup");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function SIASet() {
    var coinAddress = "f7e6b31b7fbfd78894964d81e418ad0d1b9f0a8ae59be37e932e5853670feb89e0f4021df521"
    var coin = "SIA"
    var popup = document.getElementById("myPopup2");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function XSCSet() {
    var coinAddress = "ebe11b2258f11caba02e7d2c1a5766b94175a5155d9e620a7f77a95d4bd1f5856fdb2d513cb3"
    var coin = "XSC"
    var popup = document.getElementById("myPopup3");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function SCPSet() {
    var coinAddress = "bd187fa1c247a297e364d67ee59b66a4cbecec2d4a3cf2c01d4d5540c9d6a03f6279d40657a3"
    var coin = "SCP"
    var popup = document.getElementById("myPopup4");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function Cash2Set() {
    var coinAddress = "27xnv8XecrsRBnVau4xinb5kuyMAbthiihVVPmZMJvsJ7Q2bKxwmRC2SaY6tGz57iBXieRarHcoGLFFWzQuVJbYdB2nCD1J"
    var coin = "Cash2"
    var popup = document.getElementById("myPopup5");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}