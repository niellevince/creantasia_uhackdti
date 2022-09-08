const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        // port: 8080,
        // https: true,
        allowedHosts: 'all'
    },
    transpileDependencies: [
        'vuetify'
    ]
})
