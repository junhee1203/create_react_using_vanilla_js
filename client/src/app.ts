const $appDiv = document.querySelector('.app')

function insertText(element: Element | null, text: string) {
  if (element instanceof Element) {
    element.textContent = text;
  } else {
    console.error('The provided element is null');
  }
}


insertText($appDiv, 'Hello World!!!!!')

