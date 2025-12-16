export async function onRequest(context) {
    const { env } = context;

    // 1. Base Configuration
    const siteName = env.SITE_NAME || 'Subconverter Web';
    const shortUrl = env.SHORT_URL || 'https://s.ops.ci';
    const apiUrl = env.API_URL || 'http://127.0.0.1:25500';

    // 2. Advanced: API Backends
    // Priority: env.API_BACKENDS (JSON) > env.API_URL (Single Override) > Default List
    let apiBackends = [
        {
            name: '本地服务',
            url: apiUrl,
        },
        {
            name: '官方服务',
            url: 'https://sub.xeton.dev',
        },
    ];

    if (env.API_BACKENDS) {
        try {
            apiBackends = JSON.parse(env.API_BACKENDS);
        } catch (e) {
            console.error('Failed to parse API_BACKENDS', e);
        }
    }

    // 3. Advanced: Remote Config
    // Priority: env.REMOTE_CONFIG (JSON) > Default List
    let remoteConfigOptions = [
        {
            value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini',
            text: 'ACL4SSR Online',
        },
        {
            value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini',
            text: 'ACL4SSR Online Full',
        },
    ];

    if (env.REMOTE_CONFIG) {
        try {
            remoteConfigOptions = JSON.parse(env.REMOTE_CONFIG);
        } catch (e) {
            console.error('Failed to parse REMOTE_CONFIG', e);
        }
    }

    // 4. Construct Final Config Object
    const config = {
        siteName: siteName,
        apiBackends: apiBackends,
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
        remoteConfigOptions: remoteConfigOptions,
    };

    const jsContent = `window.config = ${JSON.stringify(config, null, 2)};`;

    return new Response(jsContent, {
        headers: {
            'content-type': 'application/javascript;charset=UTF-8',
        },
    });
}
