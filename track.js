// https://app.abstractapi.com/api/ip-geolocation/tester

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}


function getAndSave(res) {
    res = JSON.parse(res)
    // console.log(res)
    // console.log(navigator)

    extracted = {
        IP: res.ip_address,
        City: res.city,
        'Using VPN': res.security.is_vpn,
        languages: navigator.languages,
        userAgent: navigator.userAgent,
        // userAgentData: navigator.userAgentData,
        doNotTrack: navigator.doNotTrack
    }

    fields = []
    for (const key in extracted) {
        val = extracted[key]
        if (val === undefined) {
            val = 'undefined'
        } else if (typeof val != 'string') {
            val = JSON.stringify(val)
        }
        fields.push({
            name: key,
            value: val,
            inline: true
        })
    }
    // https://gist.github.com/dragonwocky/ea61c8d21db17913a43da92efe0de634
    fetch('https://discord.com/api/webhooks/1025026553140232222/L275QQWcWBaEqMx5TpnlpcYLn6Dbycw0efDZK42ZISoAmf97YSuAxkXJnmDhJogybbin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'umbrecore.com tracker',
            embeds: [
                {
                    color: 1947988,
                    description: 'we have a visitor',
                    fields: fields
                }
            ]
        })
    })
}


function main() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop)
    })
    if (params.save_visit in ['false', '0', 'none']) {
        console.log('not saving visit')
        return
    }

    let url = "https://ipgeolocation.abstractapi.com/v1/?api_key=3b30b90784964f6e908478415d461c58"
    httpGetAsync(url, getAndSave)
}

main()