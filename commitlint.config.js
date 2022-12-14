/**
 * feat：新功能
 * update：更新某功能
 * fix：修补某功能的bug
 * refactor：重构某个功能
 * optimize: 优化构建工具或运行时性能
 * style：仅样式改动
 * docs：仅文档新增/改动
 * chore：构建过程或辅助工具的变动
 * other：其他杂项
 */
/**
 * 提交格式（注意冒号后面有空格）
 * git commit -m <type>[optional scope]: <description>
 * type: 改动类型, 如修复了bug就写fix.
 * optional scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 * description：简述代码变更内容
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'update', 'fix', 'refactor', 'optimize', 'style', 'docs', 'chore', 'other'],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
