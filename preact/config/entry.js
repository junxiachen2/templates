const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PAGE_PATH = path.resolve(__dirname, '../src/pages');
const isProd = process.argv.slice(2)[0].split('=')[1] === 'prod';
const entry = {};
const template = [];
const lang = isProd ? '{{ lang }}' : 'en';
const projectName = 'projectName';

// 输出head、body标签的参数
const _script = {
  flexible: `<script>!function (e, t) { function n() { t.body ? t.body.style.fontSize = 12 * o + "px" : t.addEventListener("DOMContentLoaded", n) } function d() { var e = i.clientWidth / 10; i.style.fontSize = e + "px" } var i = t.documentElement, o = e.devicePixelRatio || 1; if (n(), d(), e.addEventListener("resize", d), e.addEventListener("pageshow", function (e) { e.persisted && d() }), o >= 2) { var a = t.createElement("body"), s = t.createElement("div"); s.style.border = ".5px solid transparent", a.appendChild(s), i.appendChild(a), 1 === s.offsetHeight && i.classList.add("hairlines"), i.removeChild(a) } }(window, document);</script>`,
  tempParams: `<script>window.lang = '${lang}' </script>`
};

/**
 * 生成模板
 * @param {string} name path最后的文件名
 */
const buildTemplate = (name) => {
  // return !isProd ? path.resolve(__dirname, `../dist/${name}.html`)
  //   : path.resolve(process.cwd(), `../../../../salam_app/templates/${projectName}/${name}.html`);
  return !isProd ? path.resolve(__dirname, `../dist/${name}.html`) : path.resolve(__dirname, `../build/${name}.html`);
};

// 扫描pages目录
const getPages = () => {
  return fs.readdirSync(PAGE_PATH).filter(item => {
    const filePath = path.join(PAGE_PATH, item, 'main.js');
    if (!filePath || item === '.DS_Store') return false;
    return true;
  });
};

// 生成配置
getPages().forEach(file => {
  const name = path.basename(file);
  // 入口配置
  entry[name] = [`${PAGE_PATH}/${file}/main.js`];
  // 生成html模板配置
  template.push(
    new HtmlWebpackPlugin({
      filename: buildTemplate(name),
      template: `${PAGE_PATH}/${file}/index.html`,
      chunks: [`${name}`],
      minify: false,
      params: _script
    })
  );
});

module.exports = { projectName, entry, template };
