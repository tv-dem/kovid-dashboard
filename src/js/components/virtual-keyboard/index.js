import './style/style.scss';
import keyboardConstants from './keyLayouts';
const appendInfoInBtn = (btn, text) => {
  switch (text) {
    case 'ᐈ':
      btn.textContent = text;
      btn.dataset.type = text;
      btn.dataset.value = 'voice';
      break;
    case 'backspace':
      btn.textContent = text;
      btn.dataset.type = text;
      btn.dataset.value = '';
      break;
    case 'capslock':
      btn.textContent = 'caps';
      btn.dataset.type = text;
      btn.dataset.value = '';
      break;
    case 'lang(ru)':
      btn.textContent = text;
      btn.dataset.type = 'lang';
      btn.dataset.value = '';
      break;
    case 'lang(en)':
      btn.textContent = text;
      btn.dataset.type = 'lang';
      btn.dataset.value = '';
      break;
    case 'enter':
      btn.textContent = text;
      btn.dataset.type = text;
      btn.dataset.value = '\n';
      break;
    case 'shift':
      btn.textContent = text;
      btn.dataset.type = text;
      btn.dataset.value = '';
      break;
    case ' ':
      btn.dataset.type = text;
      btn.dataset.value = ' ';
      break;
    case 'up':
      btn.dataset.type = text;
      btn.dataset.value = '';
      btn.innerHTML = '&#8593;';
      break;
    case 'left':
      btn.dataset.type = text;
      btn.dataset.value = '';
      btn.innerHTML = '&#8592;';
      break;
    case 'down':
      btn.dataset.type = text;
      btn.dataset.value = '';
      btn.innerHTML = '&#8595;';
      break;
    case 'right':
      btn.dataset.type = text;
      btn.dataset.value = '';
      btn.innerHTML = '&#8594;';
      break;
    default:
      btn.dataset.type = text;
      btn.textContent = text;
      btn.dataset.value = text;
  }
};

class Keyboard {
  constructor(keys, isLowerCase, isEng) {
    this.hasVoice = true;
    this.ruAud = new Audio('./source/ru.mp3');
    this.engAud = new Audio('./source/eng.mp3');
    this.enterAud = new Audio('./source/enter.mp3');
    this.shiftAud = new Audio('./source/shift.mp3');
    this.spaceAud = new Audio('./source/ .mp3');
    this.bsAud = new Audio('./source/backspace.mp3');
    this.capsAud = new Audio('./source/capslock.mp3');
    this.EngSymbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    this.RuSymblos = ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')'];
    this.numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    this.isEng = isEng;
    this.isshiftEnabled = false;
    this.isLowerCase = isLowerCase;
    this.keys = [];
    let row = 1;

    this.board = document.createElement('div');
    this.board.setAttribute('class', 'keyboard-container');

    let br = document.createElement('div');
    br.setAttribute('class', `row-${row}`);
    br.setAttribute('class', 'row');
    this.board.append(br);
    keys.forEach((key) => {
      const btn = this.createBut(key);
      br.append(btn);
      if (key === 'ᐈ') {
        btn.classList.add('active');
      }
      this.keys.push(btn);
      if (keyboardConstants.brAfterKey.includes(key)) {
        br = document.createElement('div');
        br.setAttribute('class', `row-${++row}`);
        br.setAttribute('class', 'row');
        this.board.append(br);
      }
    });
  }

  render(parent) {
    parent.append(this.board);
  }

  createBut(text) {
    const btn = document.createElement('button');
    let additionalClass = 'st-button';
    if (keyboardConstants.wideKeys.includes(text)) additionalClass = 'w-button';
    if (keyboardConstants.widerKeys.includes(text)) additionalClass = 'ww-button';
    btn.classList.add(additionalClass);
    appendInfoInBtn(btn, text);
    return btn;
  }

  getBtnByType(value) {
    return this.keys.find(({dataset}) => dataset.type === value);
  }

  setUpperCase() {
    this.isLowerCase = false;
    this.keys.map((key) => {
      key.textContent = key.textContent.toUpperCase();
      key.dataset.value = key.dataset.value.toUpperCase();
    });
  }

  setLowerCase() {
    this.isLowerCase = true;
    this.keys.map((key) => {
      key.textContent = key.textContent.toLowerCase();
      key.dataset.value = key.dataset.value.toLowerCase();
    });
  }

  changeNumbers() {
    const setContent = (key, i) => {
      this.keys[i].textContent = key;
      this.keys[i].dataset.value = key;
    }
    if (this.isshiftEnabled) {
      const arrName = this.isEng ? 'EngSymbols' : 'RuSymblos'
      this[arrName].forEach((key, i) => setContent(key, i));
    } else {
      this.numbers.forEach((key, i) => setContent(key, i));
    }
  }

  changeLang(keys) {
    keys.forEach((key, i) => {
      appendInfoInBtn(this.keys[i], key);
      if (!this.isLowerCase) this.setUpperCase();
      this.changeNumbers();
    });
    this.isEng = !this.isEng;
  }

  hideView() {
    this.board.classList.toggle('hide');
  }
}

const keyboardLink = (output) => {
  const textarea = output;
  const kb = new Keyboard(keyboardConstants.enKeyLayout, true, true);

  const getCaretPos = (objName) => {
    const obj = document.getElementById(objName);
    obj.focus(); // Gecko
    return obj.selectionStart ? obj.selectionStart : 0;
  };

  const insertText = (text) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
    textarea.focus();
    textarea.selectionEnd = (start === end) ? (end + text.length) : end;
  };

  const playKey = (key) => {
    const aud = kb.isEng ? kb.engAud : kb.ruAud;
    textarea.focus();
    switch (key) {
      case 'enter':
        kb.enterAud.play();
        break;
      case 'shift':
        kb.shiftAud.play();
        break;
      case 'backspace':
        kb.bsAud.play();
        break;
      case 'capslock':
        kb.capsAud.play();
        break;
      default:
        aud.play();
    }
  };

  kb.board.addEventListener('mousedown', ({target}) => {
    const btn = target;
    if (kb.hasVoice) playKey(btn.dataset.type.toLowerCase());
    if (btn.dataset.type === 'capslock' || btn.dataset.type === 'shift') {
      btn.classList.toggle('active');
      kb.isLowerCase ? kb.setUpperCase() : kb.setLowerCase();
      if (btn.dataset.type === 'shift') {
        kb.isshiftEnabled = !kb.isshiftEnabled;
        kb.changeNumbers();
      }
      return;
    }
    if (btn.dataset.type === 'ᐈ') {
      kb.hasVoice = !kb.hasVoice;
      btn.classList.toggle('active');
      return;
    }
    btn.classList.add('active');
    const letter = btn.dataset.value;
    insertText(letter || '');
  });

  kb.board.addEventListener('mouseup', ({target}) => {
    textarea.focus();
    const btn = target;
    if (btn.dataset.type === 'shift' || btn.dataset.type === 'capslock' || btn.dataset.type === 'ᐈ') return;
    btn.classList.remove('active');
  });

  kb.getBtnByType('backspace').addEventListener('click', () => {
    const string = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (!start) return;
    textarea.value = string.substring(0, start - 1) + string.substring(end);
    textarea.selectionEnd = start - 1;
  });

  kb.getBtnByType('lang').addEventListener('click', () => {
    kb.isEng
      ? kb.changeLang(keyboardConstants.ruKeyLayout)
      : kb.changeLang(keyboardConstants.enKeyLayout);
    kb.changeNumbers();
  });

  kb.getBtnByType('left').addEventListener('click', () => {
    if (!textarea.selectionEnd) return;
    --textarea.selectionEnd;
  });
  kb.getBtnByType('right').addEventListener('click', () => {
    ++textarea.selectionStart;
  });

  const capsDown = ({key}) => {
    const btn = kb.getBtnByType(key.toLowerCase());
    if (!(btn && btn.dataset.type === 'capslock')) return;
    if (!btn.classList.contains('active')) {
      btn.classList.add('active');
      kb.isLowerCase ? kb.setUpperCase() : kb.setLowerCase();
    } else {
      btn.classList.remove('active');
      kb.isLowerCase ? kb.setUpperCase() : kb.setLowerCase();
    }
    textarea.removeEventListener('keydown', capsDown);
  };

  const shiftDown = ({ key }) => {
    const btn = kb.getBtnByType(key.toLowerCase());
    if (!btn) return;
    if (btn.dataset.type === 'shift') {
      btn.classList.toggle('active');
      kb.isLowerCase ? kb.setUpperCase() : kb.setLowerCase();
      textarea.removeEventListener('keydown', shiftDown);
    }
  };

  textarea.addEventListener('keydown', capsDown);

  textarea.addEventListener('keydown', shiftDown);

  textarea.addEventListener('keydown', ({key}) => {
    if (key.toLowerCase() === 'capslock' || key.toLowerCase() === 'shift') {
      return;
    }
    const btn = kb.getBtnByType(e.key.toLowerCase());
    if (!btn) {
      return;
    }
    btn.classList.add('active');
  });

  textarea.addEventListener('keyup', ({key}) => {
    textarea.addEventListener('keydown', capsDown);
    textarea.addEventListener('keydown', shiftDown);
    const btn = kb.getBtnByType(e.key.toLowerCase());
    if (!btn || key.toLowerCase() === 'capslock') return;
    if (key.toLowerCase() === 'shift') {
      btn.classList.toggle('active');
      kb.isLowerCase ? kb.setUpperCase() : kb.setLowerCase();
      return;
    }
    btn.classList.remove('active');
  });
  return kb;
};

export default keyboardLink;
