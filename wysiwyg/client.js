console.log('working');

const form = document.getElementById('form')
const output = document.getElementById('markdownOutput')

form.addEventListener('submit', function (e) {
    e.preventDefault()
    const searchValue = document.getElementsByClassName('editor')[0];
    var newValue = String(searchValue.innerHTML)
    newValue = convBold(newValue)
    newValue = convItalic(newValue)
    newValue = convStrikethrough(newValue)
    newValue = convHeading(newValue)
    newValue = convUl(newValue)
    newValue = convOl(newValue)
    newValue = convA(newValue)
    newValue = convImg(newValue)
    newValue = convBq(newValue)
    // console.log(newValue);
    output.innerHTML = newValue;
})

function convBold(input) {
    var rx = /(<[/]*b>)/g
    let get = input.replace(rx, (...x) => {
        return `**`;
    });
    return get;
}

function convItalic(input) {
    var rx = /(<[/]*i>)/g
    let get = input.replace(rx, (...x) => {
        return `*`;
    });
    return get;
}

function convStrikethrough(input) {
    var rx = /(<[/]*strike>)/g
    let get = input.replace(rx, (...x) => {
        return `~~`;
    });
    return get;
}

function convHeading(input) {
    var rx1 = /(<h)([1-6])(>)/g
    var rx2 = /(<\/h[1-6]>)/g
    let get = input.replace(rx1, (...x) => {
        var count = Number(x[2])
        var hash = "";
        for (var i = 0; i < count; i++) {
            hash = hash + '#';
            console.log(hash);
        }
        return `${hash}`;
    });
    let rem = get.replace(rx2, (...x) => {
        return ``;
    });
    return rem;
}

function convUl(input) {
    var rx1 = /(<ul>)(.*)(<\/ul>)/g
    var rx2 = /(<[\/]*ul>)/g
    var rx3 = /(<li>)/g
    var rx4 = /(<\/li>)/g

    let parent = input.replace(rx1, (...x) => {

        let li1 = x[0].replace(rx2, (...r) => {
            return ``;
        });

        let li2 = li1.replace(rx3, (...r2) => {
            return `⋅⋅*`;
        });

        let li3 = li2.replace(rx4, (...x) => {
            return `<br>`;
        });
        return li3
    });

    return parent;
}

function convOl(input) {
    var rx1 = /(<ol>)(.*)(<\/ol>)/g
    var rx2 = /(<[\/]*ol>)/g
    var rx3 = /(<li>)/g
    var rx4 = /(<\/li>)/g
    var liCount = 0;

    let parent = input.replace(rx1, (...x) => {

        let li1 = x[0].replace(rx2, (...r) => {
            return ``;
        });

        let li2 = li1.replace(rx3, (...r2) => {
            liCount += 1;
            return `${liCount}.`;
        });

        let li3 = li2.replace(rx4, (...x) => {
            return `<br>`;
        });
        return li3
    });

    return parent;
}

function convA(input) {
    var rx1 = /(<a href=")([^"]*)(">)([\w\d\s\:\/\.\-\?\=\&\;]*)(<\/a>)/g
    let get = input.replace(rx1, (...x) => {
        return `[${x[2]}]`;
    });
    return get;
}

function convImg(input) {
    var rx1 = /(<img src=")([^"]*)(">)/g
    let get = input.replace(rx1, (...x) => {
        return `![${x[2]}]`;
    });
    return get;
}

function convBq(input) {
    var rx1 = /(<blockquote>)/g
    var rx2 = /(<\/blockquote>)/g
    let get = input.replace(rx1, (...x) => {
        return `> `;
    });
    let rem = get.replace(rx2, (...x) => {
        return ``;
    });
    return rem;
}


document.addEventListener('keydown', logKey);

function logKey(e) {
    if (e.path[0].className === 'editor') {
        var currentInputValue = String(e.path[0].innerText + e.key)
        var secondLastChar = currentInputValue.slice(-2, -1)
        var thirdLastChar = currentInputValue.slice(-3, -2)
        var lastSixChars = currentInputValue.slice(-6)
        if (String(e.key)) {
            name(e.key, secondLastChar, lastSixChars, e, thirdLastChar)
        }
    }
}

function name(newChar, lastChar, lastSixChars, e, secondLast) {
    var specialChars = ['*', '_', '~', '+', '-', '[', '(', '#']

    setTimeout(function () {
        var textField = document.getElementsByClassName('editor')[0]
        var checkTag = String(textField.innerHTML).slice(-12)
        var rx1 = /(<\/[\w\d]*>)/g
        let get = checkTag.replace(rx1, (...x) => {
            checkTag = x[0]
        });
        console.log(checkTag);



        console.log(' ');
        var closingTagFix = (String(textField.innerHTML).slice(-(checkTag.length + 3)));
        closingTagFix = closingTagFix.slice(0, 1)
        var duplicate = (newChar === lastChar);
        var caretNum = textField.innerText.length
        console.log(newChar);
        console.log(lastChar);
        console.log(secondLast);
        // var typedHeading;

        // Werkt -- checkt begin van italic markdown
        if (((lastChar === '*' || lastChar === '_') && (newChar !== lastChar)) && (lastChar !== secondLast) && (checkTag.includes('</') === false)) {
            console.log('italic');
            textField.innerHTML = textField.innerHTML.slice(0, -1) + `<em>${newChar}</em>`
            placeCaretAtEnd(textField);

        }
        // Werkt -- checkt begin van bold markdown
        if ((lastChar === '*' || lastChar === '_') && (lastChar === secondLast) && (checkTag.includes('</') === false)) {
            console.log('bold');
            textField.innerHTML = textField.innerHTML.slice(0, -1) + `<b>${newChar}</b>`
            placeCaretAtEnd(textField);
        }
        // Werkt -- checkt begin van strikeThrough markdown
        if ((lastChar === '~') && (lastChar === secondLast) && (checkTag.includes('</') === false)) {
            console.log('strikethrough');
            textField.innerHTML = textField.innerHTML.slice(0, -1) + `<strike>${newChar}</strike>`
            placeCaretAtEnd(textField);
        }

        // Nog niet af
        if ((newChar === '+' || newChar === '-') && (lastChar === '/')) {
            console.log('bullitpoint');
        }
        // Nog niet af
        if ((newChar === '[') && (lastChar !== '!')) {
            console.log('link');
        }
        // Nog niet af
        if ((newChar === '[') && (lastChar === '!')) {
            console.log('image');
        }
        // Nog niet af
        if (((lastChar !== '#') && (newChar === '#')) || ((lastChar = '#') && (newChar === '#')) && (checkTag.includes('</') === false)) {
            var countHeadingLvl = String(lastSixChars.replace(/[^#]/g, "").length);
            var typedHeading = 'h' + countHeadingLvl;
            console.log(typedHeading);
        }

        // Werkt -- checkt of Italic markdown wordt afgesloten
        if (((checkTag === '</em>') && (lastChar !== '*') && (newChar === '*') && (e.keyCode !== 32))) {
            console.log('closingTag');
            var FirstInnerHtmlValue = String(textField.innerHTML).slice(0, -(checkTag.length + 1))
            console.log(`first = ${FirstInnerHtmlValue}`);
            var LastInnerHtmlValue = String(textField.innerHTML).slice(-(checkTag.length))
            console.log(`last = ${LastInnerHtmlValue}`);
            textField.innerHTML = `${FirstInnerHtmlValue}${LastInnerHtmlValue}${newChar}`
            placeCaretAtEnd(textField);
        }
        // Werkt -- checkt of Bold markdown wordt afgesloten
        if (((checkTag === '</b>') && (newChar === '*' || newChar === '_') && (e.keyCode !== 32))) {
            console.log('closing bold');
            console.log(lastChar);
            var FirstInnerHtmlValue = String(textField.innerHTML).slice(0, -(checkTag.length + 1))
            var LastInnerHtmlValue = String(textField.innerHTML).slice(-(checkTag.length))
            textField.innerHTML = FirstInnerHtmlValue + LastInnerHtmlValue + newChar;
            placeCaretAtEnd(textField);
        }
        // Werkt -- checkt of StrikeThrough markdown wordt afgesloten
        if (((checkTag === '</strike>') && (newChar === '~') && (e.keyCode !== 32))) {
            console.log('closing bold');
            console.log(lastChar);
            var FirstInnerHtmlValue = String(textField.innerHTML).slice(0, -(checkTag.length + 1))
            var LastInnerHtmlValue = String(textField.innerHTML).slice(-(checkTag.length))
            textField.innerHTML = FirstInnerHtmlValue + LastInnerHtmlValue + newChar;
            placeCaretAtEnd(textField);
        }

        // nog niet af
        if (newChar === 'Backspace') {
            console.log('backspace');
        }
    }, 0)
}

//Werkt --- Zet de caret op de juiste plek
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}