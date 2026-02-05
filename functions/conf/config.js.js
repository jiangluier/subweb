export async function onRequest(context) {
    const { env } = context;

    // 1. Base Configuration
    const siteName = env.SITE_NAME || 'Subconverter Web';
    const shortUrl = env.SHORT_URL || 'https://s.ops.ci';
    // 解析 ENABLE_SHORT_URL
    const enableShortUrl = (env.ENABLE_SHORT_URL || 'true').toLowerCase() !== 'false';

    // 2. Advanced: API Backends
    // 获取默认后端 URL (用于覆盖逻辑)
    const defaultApiUrl = env.API_URL || 'http://127.0.0.1:25500';

    // 默认列表
    let apiBackends = [
        {
            name: '肥羊增强型后端',
            url: 'https://api.v1.mk',
        },
        {
            name: '官方服务',
            url: 'https://sub.xeton.dev',
        },
        {
            name: '自建后端',
            // 建议：如果没有设置 API_URL，这里才使用硬编码，或者干脆移除硬编码
            url: env.API_URL || 'https://mqtpvhexheny.us-west-1.clawcloudrun.com', 
        },
        {
            name: 'Aethersailor 后端',
            url: 'https://api.asailor.org',
        },
    ];

    // 逻辑修复：处理优先级
    if (env.API_BACKENDS) {
        // 优先级 1: 如果提供了完整的 JSON 列表，直接使用
        try {
            apiBackends = JSON.parse(env.API_BACKENDS);
        } catch (e) {
            console.error('Failed to parse API_BACKENDS', e);
        }
    } else if (env.API_URL) {
        // 优先级 2: 如果没有 JSON 列表，但提供了单个 API_URL，将其置顶或作为默认
        // 这里的策略是将 env.API_URL 插入到列表第一位，作为默认选择
        apiBackends.unshift({
            name: '自定义后端 (Env)',
            url: env.API_URL
        });
    }

    // 3. Advanced: Remote Config
    let remoteConfigOptions = [
        {
            value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini',
            text: 'ACL4SSR Online',
        },
        {
            value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini',
            text: 'ACL4SSR Online Full',
        },
        {
            value: 'https://raw.githubusercontent.com/Aethersailor/Custom_OpenClash_Rules/refs/heads/main/cfg/Custom_Clash.ini',
            text: 'Aethersailor 规则 标准版',
        },
        {
            value: 'https://raw.githubusercontent.com/Aethersailor/Custom_OpenClash_Rules/refs/heads/main/cfg/Custom_Clash_Lite.ini',
            text: 'Aethersailor 规则 轻量版',
        },
        {
            value: 'https://raw.githubusercontent.com/Aethersailor/Custom_OpenClash_Rules/refs/heads/main/cfg/Custom_Clash_GFW.ini',
            text: 'Aethersailor 规则 极简版(GFW)',
        },
        {
            value: 'https://raw.githubusercontent.com/Aethersailor/Custom_OpenClash_Rules/refs/heads/main/cfg/Custom_Clash_Full.ini',
            text: 'Aethersailor 规则 重度分流版',
        },
    ];

    if (env.REMOTE_CONFIG) {
        try {
            remoteConfigOptions = JSON.parse(env.REMOTE_CONFIG);
        } catch (e) {
            console.error('Failed to parse REMOTE_CONFIG', e);
        }
    }

    // 4. Advanced: Menu Items
    let menuItem = [
        {
            title: '首页',
            link: '/',
            target: '',
        },
        {
            title: 'GitHub',
            link: 'https://github.com/jiangluier/subweb',
            target: '_blank',
        },
    ];

    if (env.MENU_ITEM) {
        try {
            menuItem = JSON.parse(env.MENU_ITEM);
        } catch (e) {
            console.error('Failed to parse MENU_ITEM', e);
        }
    }

    // 5. Construct Final Config Object
    const config = {
        siteName: siteName,
        apiUrl: defaultApiUrl, // 修复：将 apiUrl 加入配置，因为某些旧版前端逻辑可能依赖这个字段
        apiBackends: apiBackends,
        enableShortUrl: enableShortUrl,
        shortUrl: shortUrl,
        menuItem: menuItem,
        remoteConfigOptions: remoteConfigOptions,
    };

    const jsContent = `console.log('✅ Configuration loaded from Cloudflare Function'); window.config = ${JSON.stringify(config, null, 2)};`;

    return new Response(jsContent, {
        headers: {
            'content-type': 'application/javascript;charset=UTF-8',
        },
    });
}
