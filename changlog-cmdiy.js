'format cjs';

const wrap = require('word-wrap');
module.exports = {
  prompter (cz, commit) {
    cz.prompt([{
      type: 'list',
      name: 'type',
      message: 'Select the type of change that you\'re committing:',
      choices: [{
        name: 'feat:     A new feature',
        value: 'feat',
      }, {
        name: 'fix:      A bug fix',
        value: 'fix',
      }, {
        name: 'docs:     Documentation only changes',
        value: 'docs',
      }, {
        name: 'refactor: A code change that neither fixes a bug or adds a feature',
        value: 'refactor',
      }, {
        name: 'perf:     A code change that improves performance',
        value: 'perf',
      }, {
        name: 'repo:     Changes to the build process or auxiliary tools',
        value: 'repo',
      }],
    }, {
      type: 'input',
      name: 'scope',
      message: 'Denote the scope of this change:\n',
    }, {
      type: 'input',
      name: 'subject',
      message: 'Write a short description of the change:\n',
    }, {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the change:\n',
    }]).then((answers) => {
      const maxLineWidth = 100;
      const wrapOptions = {
        trim: true,
        newline: '\n',
        indent: '',
        width: maxLineWidth,
      };
      // parentheses are only needed when a scope is present
      let scope = answers.scope.trim();
      scope = scope ? '(' + answers.scope.trim() + ')' : '';
      // Hard limit this line
      const head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth);
      // Wrap these lines at 100 characters
      const body = wrap(answers.body, wrapOptions);
      const footer = wrap(answers.footer, wrapOptions);
      commit(head + '\n\n' + body + '\n\n' + footer);
    });
  },
};
