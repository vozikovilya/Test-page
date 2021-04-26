module.exports = {
    output: {
        filename: 'index.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',

                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },

    performance: {hints: false}
};