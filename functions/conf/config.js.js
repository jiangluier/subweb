export async function onRequest(context) {
    const { env } = context;

    // Default values mirroring the original config.js
    const siteName = env.SITE_NAME || 'Subconverter Web';
    const shortUrl = env.SHORT_URL || 'https://s.ops.ci';
    const apiUrl = env.API_URL || 'http://127.0.0.1:25500';

    const config = {
        siteName: siteName,
        apiBackends: [
            {
                name: '本地服务',
                url: apiUrl,
            },
            {
                name: '官方服务',
                url: 'https://sub.xeton.dev',
            },
        ],
        shortUrl: shortUrl,
        menuItem: [
            {
                title: '首页',
                link: '/',
                target: '',
            },
            {
                title: 'GitHub',
                link: 'https://github.com/Aethersailor/subweb',
                target: '_blank',
            },
        ],
        remoteConfigOptions: [
            {
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini',
                text: 'ACL4SSR Online',
            },
            {
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini',
                text: 'ACL4SSR Online Full',
            },
        ],
    };

    const jsContent = `window.config = ${JSON.stringify(config, null, 2)};`;

    return new Response(jsContent, {
        headers: {
            'content-type': 'application/javascript;charset=UTF-8',
        },
    });
}
