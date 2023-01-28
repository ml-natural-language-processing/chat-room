export function getCookie(key: string) {
    const cookieList = document.cookie ? document.cookie.split(';') : []
    let value = '';
    cookieList.forEach(cookie => {
        const kv = cookie.split('=');
        if (key == kv[0].trim()) {
            value = kv[1];
        }
    });
    return value
}


export function setCookie(key: string, value: string, exdays = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + "; " + expires;
}
