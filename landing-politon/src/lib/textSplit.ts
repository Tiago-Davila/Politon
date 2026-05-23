/**
 * textSplit.ts — alternativa a GSAP SplitText (que es de pago)
 * Divide texto en <span> individuales para animar con GSAP stagger.
 */

export interface SplitResult {
  chars: HTMLElement[]
  words: HTMLElement[]
  revert: () => void
}

/**
 * Divide el contenido de texto de un elemento en chars y words individuales.
 * Cada caracter queda envuelto en <span class="char">.
 * Cada palabra queda envueltos en <span class="word">.
 */
export function splitText(element: HTMLElement): SplitResult {
  const originalHTML = element.innerHTML
  const originalText = element.textContent ?? ''

  // Limpiar y procesar
  const words = originalText.trim().split(/\s+/)
  const wordSpans: HTMLElement[] = []
  const charSpans: HTMLElement[] = []

  element.innerHTML = ''

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span')
    wordSpan.className = 'word'
    wordSpan.style.display = 'inline-block'
    wordSpan.style.overflow = 'hidden'

    const chars = word.split('')
    chars.forEach((char) => {
      const charSpan = document.createElement('span')
      charSpan.className = 'char'
      charSpan.style.display = 'inline-block'
      charSpan.textContent = char
      wordSpan.appendChild(charSpan)
      charSpans.push(charSpan)
    })

    element.appendChild(wordSpan)
    wordSpans.push(wordSpan)

    // Espacio entre palabras (excepto el último)
    if (wordIndex < words.length - 1) {
      const space = document.createTextNode('\u00A0')
      element.appendChild(space)
    }
  })

  return {
    chars: charSpans,
    words: wordSpans,
    revert: () => {
      element.innerHTML = originalHTML
    },
  }
}

/**
 * Split simple por líneas — útil para subtítulos
 */
export function splitLines(element: HTMLElement): SplitResult {
  const originalHTML = element.innerHTML
  const text = element.textContent ?? ''
  const lineSpans: HTMLElement[] = []

  // Split by existing <br> or treat whole thing as one line
  const lines = text.split('\n').filter(l => l.trim())

  element.innerHTML = ''
  lines.forEach((line) => {
    const lineSpan = document.createElement('span')
    lineSpan.className = 'line'
    lineSpan.style.display = 'block'
    lineSpan.style.overflow = 'hidden'
    lineSpan.textContent = line
    element.appendChild(lineSpan)
    lineSpans.push(lineSpan)
  })

  return {
    chars: [],
    words: lineSpans,
    revert: () => {
      element.innerHTML = originalHTML
    },
  }
}
