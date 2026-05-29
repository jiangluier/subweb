window.config = {
  // 网站标题
  siteName: 'Subconverter Web',
  // 后端 API 列表
  apiBackends: [
    {
      name: 'Aethersailor 后端',
      url: 'https://api.asailor.org',
    },
    {
      name: '官方服务',
      url: 'https://sub.xeton.dev',
    },
    {
      name: '肥羊增强型后端',
      url: 'https://api.v1.mk',
    },
  ],
  // 是否启用短链接功能 (true: 启用, false: 关闭)
  enableShortUrl: true,
  // 短域名服务地址
  shortUrl: 'https://s.ops.ci',
  // 首页菜单
  menuItem: [
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
  ],
  // 远程配置地址,可以自行按照格式添加。
  remoteConfigOptions: [
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
  ],
};
