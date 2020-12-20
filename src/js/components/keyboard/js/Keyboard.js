import * as storage from './storage.js';
import create from './utils/create.js';
import language from './layouts/index.js';
import Key from './Key.js';
// import '../css/font.css'
import '../css/style.css'

const main = create('main', '',
    [
    create('audio', 'audio', null, null, ['src', 'public/assets/button.mp3']),
    create('audio', 'audio', null, null, ['src', 'public/assets/sound.mp3']),
    create('audio', 'audio', null, null, ['src', 'public/assets/caps.mp3']),
    create('audio', 'audio', null, null, ['src', 'public/assets/shift.mp3']),
    create('audio', 'audio', null, null, ['src', 'public/assets/backspace.mp3'])
    ]);

export default class Keyboard {
    constructor(rowsOrder) {
        this.rowsOrder = rowsOrder;
        this.keysPressed = {};
        this.isCaps = false;
    }

    init(langCode) {
        this.keyBase = language[langCode];
        this.container = create('div', 'keyboard', null, main, ['language', langCode]);
        document.body.prepend(main);
        return this;
    }

    generateLayout(output) {
        this.output = output;
        this.keyButtons = [];
        this.rowsOrder.forEach((row, i) => {
            const rowElement = create('div', 'keyboard__row', null, this.container, ['row', i + 1]);
            rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
            row.forEach((code) => {
                const keyObj = this.keyBase.find((key) => key.code === code);
                if (keyObj) {
                    const keyButton = new Key(keyObj);
                    this.keyButtons.push(keyButton);
                    rowElement.appendChild(keyButton.div);
                }
            });
        });

        document.addEventListener('keydown', this.handleEvent);
        document.addEventListener('keyup', this.handleEvent);
        this.container.addEventListener('mousedown', this.preHandleEvent);
        this.container.addEventListener('mouseup', this.preHandleEvent);
    }

    preHandleEvent = (e) => {
        e.stopPropagation();
        const keyDiv = e.target.closest('.keyboard__key');
        if (!keyDiv) return;
        const { dataset: { code } } = keyDiv;
        keyDiv.addEventListener('mouseleave', this.resetButtonState);
        this.handleEvent({ code, type: e.type });
    }

    resetButtonState = ({ target: { dataset: { code } } }) => {
        //if (code.match(/Shift/)) this.switchToUpperCase(false);
        // this.resetPressedButtons(code);
        if (!code.match(/Caps/) && !code.match(/Shift/) && !code.match(/Snd/)) {
            const keyObj = this.keyButtons.find((key) => key.code === code);
            keyObj.div.classList.remove('active');
            keyObj.div.removeEventListener('mouseleave', this.resetButtonState);
        }
    }

    handleEvent = (e) => {
        if (e.stopPropagation) e.stopPropagation();
        const { code, type } = e;
        const keyObj = this.keyButtons.find((key) => key.code === code);

        if (!keyObj) return;

        this.output.focus();

        if (type.match(/keydown|mousedown/)) {
            if (type.match(/key/)) e.preventDefault();

            keyObj.div.classList.add('active');

            if (code.match(/Speech/)) {
                window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                let rec = new SpeechRecognition();
                rec.interimResults = true;
                rec.start();
                let output = this.output;
                rec.addEventListener("result", function (e) {
                    let text = Array.from(e.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('');
                    output.innerHTML += text;
                });
            }

            // Handle Sound Key
            if (code.match(/Snd/) && !this.soundKey) {
                this.soundKey = true;
            } else if (code.match(/Snd/) && this.soundKey) {
                this.soundKey = false;
                keyObj.div.classList.remove('active');
            }

            // Play Sound Kbd
            if (this.container.dataset.language === 'en' && this.soundKey) {
                if (code.match(/Enter/)) {
                    const audio = document.querySelector(`audio[src="assets/sound.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                } else if (code.match(/Shift/)) {
                    const audio = document.querySelector(`audio[src="assets/shift.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                } else if (code.match(/Caps/)) {
                    const audio = document.querySelector(`audio[src="assets/caps.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                } else if (code.match(/Backspace/)) {
                    const audio = document.querySelector(`audio[src="assets/backspace.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                } else {
                    const audio = document.querySelector(`audio[src="assets/button.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                }
            } else if (this.container.dataset.language === 'ru' && this.soundKey) {
                if (code.match(/Enter/)) {
                    const audio = document.querySelector(`audio[src="assets/button.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                } else if (code.match(/Shift/)) {
                    const audio = document.querySelector(`audio[src="assets/caps.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                } else if (code.match(/Caps/)) {
                    const audio = document.querySelector(`audio[src="assets/shift.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                } else if (code.match(/Backspace/)) {
                    const audio = document.querySelector(`audio[src="assets/backspace.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                } else {
                    const audio = document.querySelector(`audio[src="assets/sound.mp3"]`);
                    audio.currentTime = 0;
                    audio.play();
                }
            }

            // Handle button switch language
            if (code.match(/Win/)) {
                this.switchLanguage();
            }

            // Handle Caps Down
            if (code.match(/Caps/) && !this.isCaps) {
                this.isCaps = true;
                this.switchUpperCase(true);
            } else if (code.match(/Caps/) && this.isCaps) {
                this.isCaps = false;
                this.switchUpperCase(false);
                keyObj.div.classList.remove('active');
            }

            // Handle Shift Down
            if (code.match(/Shift/) && !this.shiftKey) {
                this.shiftKey = true;
                this.switchUpperCase(true);
            } else if (code.match(/Shift/) && this.shiftKey) {
                this.shiftKey = false;
                this.switchUpperCase(false);
                keyObj.div.classList.remove('active');
            }

            if (this.shiftKey) this.switchUpperCase(true);

            //switch language
            if (code.match(/Control/)) this.ctrlKey = true;
            if (code.match(/Alt/)) this.altKey = true;

            if (code.match(/Control/) && this.altKey) this.switchLanguage();
            if (code.match(/Alt/) && this.ctrlKey) this.switchLanguage();


            //release button
            if (!this.isCaps) {
                this.printToOutput(keyObj, this.shiftKey ? keyObj.shift : keyObj.small);
            } else if (this.isCaps) {
                if (this.shiftKey) {
                    this.printToOutput(keyObj, keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
                } else {
                    this.printToOutput(keyObj, !keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
                }
            }

        } else if (type.match(/keyup|mouseup/)) {

            // if (code.match(/Shift/)) {
            //     this.shiftKey = false;
            //     this.switchUpperCase(false);
            // }
            if (code.match(/Control/)) this.ctrlKey = false;
            if (code.match(/Alt/)) this.altKey = false;

            if (!code.match(/Caps/) && !code.match(/Shift/) && !code.match(/Snd/)) keyObj.div.classList.remove('active');
        }
    }

    switchLanguage = () => {
        const langAbbr = Object.keys(language);
        let langIdx = langAbbr.indexOf(this.container.dataset.language);
        this.keyBase = langIdx + 1 < langAbbr.length ? language[langAbbr[langIdx += 1]]
            : language[langAbbr[langIdx -= langIdx]];

        this.container.dataset.language = langAbbr[langIdx];
        storage.set('kbLang', langAbbr[langIdx]);

        this.keyButtons.forEach((button) => {
            const keyObj = this.keyBase.find((key) => key.code === button.code);
            if (!keyObj) return;
            button.shift = keyObj.shift;
            button.small = keyObj.small;
            if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/g)) {
                button.sub.innerHTML = keyObj.shift;
            } else {
                button.sub.innerHTML = '';
            }
            button.letter.innerHTML = keyObj.small;
        });

        if (this.isCaps) this.switchUpperCase(true);
    }

    switchUpperCase(isTrue) {
        if (isTrue) {
            this.keyButtons.forEach((button) => {
                if (button.sub) {
                    if (this.shiftKey) {
                        button.sub.classList.add('sub-active');
                        button.letter.classList.add('sub-inactive');
                    }
                }

                if (!button.isFnKey && this.isCaps && !this.shiftKey && !button.sub.innerHTML) {
                    button.letter.innerHTML = button.shift;
                } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
                    button.letter.innerHTML = button.small;
                } else if (!button.isFnKey && !button.sub.innerHTML) {
                    button.letter.innerHTML = button.shift;
                }
            });
        } else {
            this.keyButtons.forEach((button) => {
                if (button.sub.innerHTML && !button.isFnKey) {
                    button.sub.classList.remove('sub-active');
                    button.letter.classList.remove('sub-inactive');

                    if (!this.isCaps) {
                        button.letter.innerHTML = button.small;
                    } else if (!this.isCaps) {
                        button.letter.innerHTML = button.shift;
                    }
                } else if (!button.isFnKey) {
                    if (this.isCaps) {
                        button.letter.innerHTML = button.shift;
                    } else {
                        button.letter.innerHTML = button.small;
                    }
                }
            });
        }
    }

    printToOutput(keyObj, symbol) {
        let cursorPos = this.output.selectionStart;
        const left = this.output.value.slice(0, cursorPos);
        const right = this.output.value.slice(cursorPos);

        const fnButtonsHandler = {
            Tab: () => {
                this.output.value = `${left}\t${right}`;
                cursorPos += 1;
            },
            ArrowLeft: () => {
                cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
            },
            ArrowRight: () => {
                cursorPos += 1;
            },
            ArrowUp: () => {
                const positionFromLeft = this.output.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
                cursorPos -= positionFromLeft[0].length;
            },
            ArrowDown: () => {
                const positionFromLeft = this.output.value.slice(cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];
                cursorPos += positionFromLeft[0].length;
            },
            Enter: () => {
                this.output.value = `${left}\n${right}`;
                cursorPos += 1;
            },
            Delete: () => {
                this.output.value = `${left}${right.slice(1)}`;
            },
            Backspace: () => {
                this.output.value = `${left.slice(0, -1)}${right}`;
                cursorPos -= 1;
            },
            Space: () => {
                this.output.value = `${left} ${right}`;
                cursorPos += 1;
            },
        }

        if (fnButtonsHandler[keyObj.code]) {
            fnButtonsHandler[keyObj.code]();
        } else if (!keyObj.isFnKey) {
            cursorPos += 1;
            this.output.value = `${left}${symbol || ''}${right}`;
        }
        this.output.setSelectionRange(cursorPos, cursorPos);
    }
}
