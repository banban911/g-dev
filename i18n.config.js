module.exports = {
    i18n: {
        locales: ['en-US', 'vi'],
        defaultLocale: 'vi',
        domains: [
            {
                domain: 'http://localhost:3000',
                defaultLocale: 'vi',
            },
            {
                domain: 'http://localhost:3000.en-US',
                defaultLocale: 'en-US',
            },
        ],
    },
}