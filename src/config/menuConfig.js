const menuList = [ 
    {
    title: 'Dashboard',   // 菜单标题名称
    key: '/home', // 对应的path 
    icon: 'home', // 图标名称
    },
     {
    title: '运营数据',
    key: '/products',
    icon: 'appstore', 
    children: [
         // 子菜单列表
    {
    title: 'LTV数据',
    key: '/category',
    icon: 'bars'
    },
    {
    title: '留存数据',
    key: '/product', 
    icon: 'tool'
    }, 
    {
    title: '付费数据',
    key: '/paydata', 
    icon: 'tool'
    }, 
    {
    title: '用户在线时长',
    key: '/onlinetime', 
    icon: 'tool'
    }, 
    {
    title: '用户进入数据',
    key: '/enter', 
    icon: 'tool'
    }, 
    {
    title: '用户离开数据',
    key: '/leave', 
    icon: 'tool'
    }, 
    {
    title: '漏斗数据',
    key: '/FunnelData', 
    icon: 'tool',
    children:[
    {
    title: '新用户漏斗',
    key: '/FunnelData/new_user', 
    icon: 'tool'
    }, 
    {
    title: '其他用户漏斗',
    key: '/FunnelData/other', 
    icon: 'tool'
    }, 
    ]
    }, 

]
     },
     {
    title: '用户管理', key: '/user', icon: 'user'
    }, {
    title: '角色管理', key: '/role', icon: 'safety',
    }, 
    {title: '图形图表', key: '/charts', icon: 'area-chart', children: [
        {
        title: '柱形图', key: '/charts/bar', icon: 'bar-chart'
        }, {
        title: '折线图', key: '/charts/line', icon: 'line-chart'
        }, 
        {
        title: '饼图',
        key: '/charts/pie', 
        icon: 'pie-chart'
        }, 
     ]
        }, 
    ]

export default menuList