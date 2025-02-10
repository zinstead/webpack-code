module.exports={
    // 智能预设：编译es6以上的代码
    presets: [
        [
            '@babel/preset-env',
            {
                "useBuiltIns": "usage", // 按需引入polyfill
                "corejs": "3",
            },
        ]
    ],
}