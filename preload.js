function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

window.exports = {
    'ip': {
        mode: 'none',
        args: {
            enter: () => {
                const ip = getIPAddress();
                utools.copyText(ip);
                utools.showNotification(`${ip}已复制到剪切板`);
                utools.outPlugin();
                utools.hideMainWindow();
            },
        }
    }
}