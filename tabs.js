const tabs = document.getElementById("resultTabs").childNodes
const resultCoins = document.getElementsByClassName("resultPositioning")


const urlString = window.location.search.toLowerCase();
const urlParams = new URLSearchParams(urlString);
const coin = urlParams.get('coin')

console.log(coin);

if(coin == "scp" || coin == "scprime" || coin == "siaprime") {
    changeTab("sia")
    changeTab("cash2")
} else if(coin == "sc" || coin == "sia" || coin == "siacoin"){
    changeTab("cash2")
    changeTab("scp")
} else if(coin == "cash2" || coin == "c2" || coin == "cash"){
    changeTab("sia")
    changeTab("scp")
} else {
    changeTab("cash2")
}


function changeTab(tab) {
    if (tab == "showAll") {
        for (i = 3; i < tabs.length; i += 2) {
            tabs[i].classList.add("selectedTab")
            tabs[i].classList.remove("notSelectedTab");
        }

        for (t = 3; t <= 9; t += 2) {
            for (x = 0; x <= 4; x++) {
                checkTab(t, x, "open")
            }
        }

    } else if (tab == "scp") {
        checkTab(3, 0)
    } else if (tab == "cash2") {
        checkTab(5, 1)
    } else if (tab == "sia") {
        checkTab(7, 2)
    }
}

function checkTab(tabNum, resultNum, all) {
    if (tabs[tabNum].classList.contains("selectedTab") & all != "open") {
        tabs[tabNum].classList.add("notSelectedTab");
        tabs[tabNum].classList.remove("selectedTab");
        resultCoins[resultNum].classList.add("noClick");
        resultCoins[resultNum].animate([
            {
                opacity: 1
            },
            {
                opacity: 0
            },
            {
                opacity: 0,
                position: "absolute",
                visibility: "hidden"
            }
        ], {
            duration: 500,
            fill: "forwards"
        })
    } else {
        tabs[tabNum].classList.add("selectedTab");
        tabs[tabNum].classList.remove("notSelectedTab");
        resultCoins[resultNum].animate([
            {
                opacity: 0,
                position: "relative"
            },
            {
                opacity: 1
            },
            {
                opacity: 1,
                visibility: "visible"
            }
        ], {
            duration: 1000,
            fill: "forwards"
        })
        resultCoins[resultNum].classList.remove("noClick");
    }
}

