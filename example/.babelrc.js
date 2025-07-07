module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '../index.js',  // 使用相对路径引用上级目录的插件
      {
        enabled: true,  // 强制启用来测试
        prefixName: 'data-loc',
        debug: true,   // 启用调试输出
        include: ['.tsx', '.jsx'],
        exclude: ['node_modules']
      }
    ]
  ]
};