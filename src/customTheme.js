export const palette = {
    primary: { main: "#0087dc", contrastText: '#fff' },
    secondary: { main: '#b9eb5f', contrastText: '#fff' },
    error: { main: '#E53B2F', contrastText: '#fff' },
    warning: { main: '#FFD23F', contrastText: '#fff' },
}

export const dark = {
    900: '#001228',
    800: '#0087dc',
    700: '#0c1b2e',
    500: '#142439',
    400: '#1e2e42',
    300: '#1c375a',
}

export const light = {
    900: '#455263',
    800: '#647386',
    700: '#949FAC',
    500: '#BECAD7',
    400: '#ECEEEF',
    300: '#ffffff',
}

export const blue = {
    200: '#53bdff'
}

export const lighten_palette = {
    primary: { main: '#53bdff', contrastText: '#fff', light: "#53bdff" },
    secondary: { main: '#E53B2F', contrastText: '#fff' },
    warning: { main: '#FFD23F', contrastText: '#fff' },
    appbar: { background: '#fff', color: '#000', svg: '#000' },
    divider: "rgba(0, 0, 0, 0.12)",
    boxShadow: ["unset", "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"],
    siderbar: { background: '#5594c9', color: '#fff', active: "#3b86b1", hover: "rgba(59, 134, 177, .5)" },
    paper: { background: '#fff', color: '#000' },
    dialog: { background: '#fff', color: '#000' },
    layout: { background: '#eee', color: "#000" },
    tab: { background: '#fff', color: '#53bdff' },
    table: { background: '#fafafa', color: 'rgba(0, 0, 0, 0.87)', odd: "", even: "", border: '', disabled: 'rgba(0, 0, 0, 0.4)' },
    action: { background: '#fff', color: 'rgba(0, 0, 0, 0.87)' },
    select: { background: '#fff', color: 'rgba(0, 0, 0, 0.87)', },
    pagination: { color: 'rgba(0, 0, 0, 0.87)', disabled: 'rgba(0, 0, 0, 0.4)' },
    breadcrumbs: { background: '#fff', color: 'rgba(0, 0, 0, 0.54)', },
    input: { background: '#000', color: 'rgba(0, 0, 0, 0.6)', contrastText: '#fff' },
    disabled: { background: 'rgba(0, 0, 0, 0.26)', color: "rgba(0, 0, 0, 0.26)", contrastText: '#fff' }
}

export const dark_palette = {
    primary: { main: "#0087dc", contrastText: '#fff' },
    secondary: { main: '#E53B2F', contrastText: '#fff' },
    warning: { main: '#FFD23F', contrastText: '#fff' },
    appbar: { background: dark[900], color: '#fff', svg: '#fff' },
    divider: dark[300],
    boxShadow: ['0px 10px 15px -2px rgba(0, 18, 40, 1)', '0px 10px 15px -2px rgba(0, 18, 40, 1)'],
    siderbar: { background: dark[900], color: '#fff', active: dark[800], hover: "rgba(0, 135, 220, .5)" },
    paper: { background: dark[500], color: '#fff' },
    dialog: { background: dark[500], color: '#fff' },
    layout: { background: dark[700], color: "#fff" },
    tab: { background: dark[300], color: '#fff' },
    table: { background: dark[300], color: '#fff', odd: dark[500], even: dark[400], border: 'unset', disabled: '#647386' },
    action: { background: dark[300], color: '#fff' },
    select: { background: dark[300], color: "#fff" },
    pagination: { color: '#fff', disabled: '#647386' },
    breadcrumbs: { background: '#fff', color: 'rgba(255, 255, 255, 0.54)', },
    input: { background: 'rgba(255, 255, 255, 0.7)', color: 'rgba(255, 255, 255, 0.7)', contrastText: '#fff' },
    disabled: { background: 'rgba(0, 0, 0, 0.36)', color: "rgba(255, 255, 255, 0.36)", contrastText: dark[500] }
}