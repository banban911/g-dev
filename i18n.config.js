module.exports = {
    i18n: {
        locales: ['vi', 'en-US'],
        defaultLocale: 'vi',
        domains: [
            {
                domain: 'http://localhost:3000',
                defaultLocale: 'vi',
            },
            {
                domain: 'http://localhost:3000/en-US',
                defaultLocale: 'en-US',
            },
        ],
    },
}