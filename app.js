/* ==========================================================================
   MecaPro - Motor de Mecanografía Profesional (JavaScript Vanilla)
   Soporte Completo ISO-ES, Detección de Combinaciones, Acentos y Signos
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- MAPA DE CARACTERES, COMBINACIONES Y DEDOS EN TECLADO ESPAÑOL ISO ---
    // Métodos: 'DIRECT', 'SHIFT', 'ALTGR', 'ACCENT', 'DIERESIS', 'ACCENT_UPPER'
    const CHAR_MAP = {
        // --- FILA GUÍA / BASE (MINÚSCULAS) ---
        'a': { code: 'KeyA', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'DIRECT', keyName: 'A' },
        's': { code: 'KeyS', finger: 'anular-izq', hand: 'Izquierda', fingerName: 'Anular Izquierdo', method: 'DIRECT', keyName: 'S' },
        'd': { code: 'KeyD', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'DIRECT', keyName: 'D' },
        'f': { code: 'KeyF', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'DIRECT', keyName: 'F' },
        'g': { code: 'KeyG', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'DIRECT', keyName: 'G' },
        'h': { code: 'KeyH', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIRECT', keyName: 'H' },
        'j': { code: 'KeyJ', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIRECT', keyName: 'J' },
        'k': { code: 'KeyK', finger: 'medio-der', hand: 'Derecha', fingerName: 'Medio Derecho', method: 'DIRECT', keyName: 'K' },
        'l': { code: 'KeyL', finger: 'anular-der', hand: 'Derecha', fingerName: 'Anular Derecho', method: 'DIRECT', keyName: 'L' },
        'ñ': { code: 'Semicolon', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: 'Ñ' },
        'ç': { code: 'Backslash', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: 'Ç' },

        // --- FILA SUPERIOR (MINÚSCULAS) ---
        'q': { code: 'KeyQ', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'DIRECT', keyName: 'Q' },
        'w': { code: 'KeyW', finger: 'anular-izq', hand: 'Izquierda', fingerName: 'Anular Izquierdo', method: 'DIRECT', keyName: 'W' },
        'e': { code: 'KeyE', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'DIRECT', keyName: 'E' },
        'r': { code: 'KeyR', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'DIRECT', keyName: 'R' },
        't': { code: 'KeyT', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'DIRECT', keyName: 'T' },
        'y': { code: 'KeyY', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIRECT', keyName: 'Y' },
        'u': { code: 'KeyU', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIRECT', keyName: 'U' },
        'i': { code: 'KeyI', finger: 'medio-der', hand: 'Derecha', fingerName: 'Medio Derecho', method: 'DIRECT', keyName: 'I' },
        'o': { code: 'KeyO', finger: 'anular-der', hand: 'Derecha', fingerName: 'Anular Derecho', method: 'DIRECT', keyName: 'O' },
        'p': { code: 'KeyP', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: 'P' },

        // --- FILA INFERIOR (MINÚSCULAS) ---
        'z': { code: 'KeyZ', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'DIRECT', keyName: 'Z' },
        'x': { code: 'KeyX', finger: 'anular-izq', hand: 'Izquierda', fingerName: 'Anular Izquierdo', method: 'DIRECT', keyName: 'X' },
        'c': { code: 'KeyC', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'DIRECT', keyName: 'C' },
        'v': { code: 'KeyV', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'DIRECT', keyName: 'V' },
        'b': { code: 'KeyB', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'DIRECT', keyName: 'B' },
        'n': { code: 'KeyN', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIRECT', keyName: 'N' },
        'm': { code: 'KeyM', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIRECT', keyName: 'M' },

        // --- ESPACIO ---
        ' ': { code: 'Space', finger: 'pulgar', hand: 'Cualquier mano', fingerName: 'Pulgares', method: 'DIRECT', keyName: 'Espacio' },

        // --- NÚMEROS DIRECTOS ---
        '1': { code: 'Digit1', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'DIRECT', keyName: '1' },
        '2': { code: 'Digit2', finger: 'anular-izq', hand: 'Izquierda', fingerName: 'Anular Izquierdo', method: 'DIRECT', keyName: '2' },
        '3': { code: 'Digit3', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'DIRECT', keyName: '3' },
        '4': { code: 'Digit4', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'DIRECT', keyName: '4' },
        '5': { code: 'Digit5', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'DIRECT', keyName: '5' },
        '6': { code: 'Digit6', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIRECT', keyName: '6' },
        '7': { code: 'Digit7', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIRECT', keyName: '7' },
        '8': { code: 'Digit8', finger: 'medio-der', hand: 'Derecha', fingerName: 'Medio Derecho', method: 'DIRECT', keyName: '8' },
        '9': { code: 'Digit9', finger: 'anular-der', hand: 'Derecha', fingerName: 'Anular Derecho', method: 'DIRECT', keyName: '9' },
        '0': { code: 'Digit0', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: '0' },

        // --- PUNTUACIÓN Y SIGNOS DIRECTOS ---
        ',': { code: 'Comma', finger: 'medio-der', hand: 'Derecha', fingerName: 'Medio Derecho', method: 'DIRECT', keyName: ',' },
        '.': { code: 'Period', finger: 'anular-der', hand: 'Derecha', fingerName: 'Anular Derecho', method: 'DIRECT', keyName: '.' },
        '-': { code: 'Slash', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: '-' },
        '\'': { code: 'Minus', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: '\'' },
        '¡': { code: 'Equal', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: '¡' },
        '+': { code: 'BracketRight', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: '+' },
        '`': { code: 'BracketLeft', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'DIRECT', keyName: '`' },
        '<': { code: 'IntlBackslash', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'DIRECT', keyName: '<' },
        'º': { code: 'Backquote', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'DIRECT', keyName: 'º' },

        // --- SIGNOS CON SHIFT (MAYÚS) ---
        '!': { code: 'Digit1', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'SHIFT', keyName: '1', shiftKey: 'ShiftRight', instruction: 'Mantén pulsado Shift derecho y pulsa la tecla 1' },
        '"': { code: 'Digit2', finger: 'anular-izq', hand: 'Izquierda', fingerName: 'Anular Izquierdo', method: 'SHIFT', keyName: '2', shiftKey: 'ShiftRight', instruction: 'Mantén pulsado Shift derecho y pulsa la tecla 2' },
        '·': { code: 'Digit3', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'SHIFT', keyName: '3', shiftKey: 'ShiftRight', instruction: 'Mantén pulsado Shift derecho y pulsa la tecla 3' },
        '$': { code: 'Digit4', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'SHIFT', keyName: '4', shiftKey: 'ShiftRight', instruction: 'Mantén pulsado Shift derecho y pulsa la tecla 4' },
        '%': { code: 'Digit5', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'SHIFT', keyName: '5', shiftKey: 'ShiftRight', instruction: 'Mantén pulsado Shift derecho y pulsa la tecla 5' },
        '&': { code: 'Digit6', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'SHIFT', keyName: '6', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla 6' },
        '/': { code: 'Digit7', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'SHIFT', keyName: '7', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla 7' },
        '(': { code: 'Digit8', finger: 'medio-der', hand: 'Derecha', fingerName: 'Medio Derecho', method: 'SHIFT', keyName: '8', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla 8' },
        ')': { code: 'Digit9', finger: 'anular-der', hand: 'Derecha', fingerName: 'Anular Derecho', method: 'SHIFT', keyName: '9', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla 9' },
        '=': { code: 'Digit0', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'SHIFT', keyName: '0', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla 0' },
        '?': { code: 'Minus', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'SHIFT', keyName: '\'', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla \'' },
        '¿': { code: 'Equal', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'SHIFT', keyName: '¡', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla ¡' },
        'ª': { code: 'Backquote', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'SHIFT', keyName: 'º', shiftKey: 'ShiftRight', instruction: 'Mantén pulsado Shift derecho y pulsa la tecla º' },
        '>': { code: 'IntlBackslash', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'SHIFT', keyName: '<', shiftKey: 'ShiftRight', instruction: 'Mantén pulsado Shift derecho y pulsa la tecla <' },
        ';': { code: 'Comma', finger: 'medio-der', hand: 'Derecha', fingerName: 'Medio Derecho', method: 'SHIFT', keyName: ',', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla de coma ,' },
        ':': { code: 'Period', finger: 'anular-der', hand: 'Derecha', fingerName: 'Anular Derecho', method: 'SHIFT', keyName: '.', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla de punto .' },
        '_': { code: 'Slash', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'SHIFT', keyName: '-', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla de guion -' },
        '*': { code: 'BracketRight', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'SHIFT', keyName: '+', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla +' },
        '^': { code: 'BracketLeft', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'SHIFT', keyName: '`', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla `' },

        // --- SIGNOS CON ALTGR ---
        '\\': { code: 'Backquote', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'ALTGR', keyName: 'º', instruction: 'Mantén pulsada la tecla AltGr (con la mano derecha) y pulsa la tecla º / \\' },
        '|': { code: 'Digit1', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'ALTGR', keyName: '1', instruction: 'Mantén pulsada la tecla AltGr (con la mano derecha) y pulsa la tecla 1' },
        '@': { code: 'Digit2', finger: 'anular-izq', hand: 'Izquierda', fingerName: 'Anular Izquierdo', method: 'ALTGR', keyName: '2', instruction: 'Mantén pulsada la tecla AltGr (con la mano derecha) y pulsa el número 2' },
        '#': { code: 'Digit3', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'ALTGR', keyName: '3', instruction: 'Mantén pulsada la tecla AltGr (con la mano derecha) y pulsa el número 3' },
        '~': { code: 'Digit4', finger: 'indice-izq', hand: 'Izquierda', fingerName: 'Índice Izquierdo', method: 'ALTGR', keyName: '4', instruction: 'Mantén pulsada la tecla AltGr (con la mano derecha) y pulsa el número 4' },
        '€': { code: 'KeyE', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'ALTGR', keyName: 'E', instruction: 'Mantén pulsada la tecla AltGr (con la mano derecha) y pulsa la letra E' },
        '¬': { code: 'Digit6', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'ALTGR', keyName: '6', instruction: 'Mantén pulsada la tecla AltGr y pulsa el número 6' },
        '[': { code: 'BracketLeft', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'ALTGR', keyName: '`', instruction: 'Mantén pulsada la tecla AltGr y pulsa la tecla ` / [' },
        ']': { code: 'BracketRight', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'ALTGR', keyName: '+', instruction: 'Mantén pulsada la tecla AltGr y pulsa la tecla + / ]' },
        '{': { code: 'Quote', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'ALTGR', keyName: '´', instruction: 'Mantén pulsada la tecla AltGr y pulsa la tecla ´ / {' },
        '}': { code: 'Backslash', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'ALTGR', keyName: 'ç', instruction: 'Mantén pulsada la tecla AltGr y pulsa la tecla ç / }' },

        // --- VOCALES CON TILDE (ACENTO AGUDO) ---
        'á': { code: 'KeyA', accentCode: 'Quote', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'ACCENT', vowel: 'A', instruction: 'Paso 1: Pulsa y suelta la tecla de tilde ´ (junto a la Ñ). Paso 2: Pulsa la letra A' },
        'é': { code: 'KeyE', accentCode: 'Quote', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'ACCENT', vowel: 'E', instruction: 'Paso 1: Pulsa y suelta la tecla de tilde ´ (junto a la Ñ). Paso 2: Pulsa la letra E' },
        'í': { code: 'KeyI', accentCode: 'Quote', finger: 'medio-der', hand: 'Derecha', fingerName: 'Medio Derecho', method: 'ACCENT', vowel: 'I', instruction: 'Paso 1: Pulsa y suelta la tecla de tilde ´ (junto a la Ñ). Paso 2: Pulsa la letra I' },
        'ó': { code: 'KeyO', accentCode: 'Quote', finger: 'anular-der', hand: 'Derecha', fingerName: 'Anular Derecho', method: 'ACCENT', vowel: 'O', instruction: 'Paso 1: Pulsa y suelta la tecla de tilde ´ (junto a la Ñ). Paso 2: Pulsa la letra O' },
        'ú': { code: 'KeyU', accentCode: 'Quote', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'ACCENT', vowel: 'U', instruction: 'Paso 1: Pulsa y suelta la tecla de tilde ´ (junto a la Ñ). Paso 2: Pulsa la letra U' },

        // --- DIÉRESIS ---
        'ü': { code: 'KeyU', accentCode: 'Quote', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIERESIS', vowel: 'U', instruction: 'Paso 1: Pulsa Shift + ´ para activar diéresis (¨). Paso 2: Pulsa la letra U' },

        // --- MAYÚSCULAS CON TILDE ---
        'Á': { code: 'KeyA', accentCode: 'Quote', finger: 'meñique-izq', hand: 'Izquierda', fingerName: 'Meñique Izquierdo', method: 'ACCENT_UPPER', vowel: 'A', instruction: 'Paso 1: Pulsa la tilde ´. Paso 2: Mantén Shift derecho y pulsa A' },
        'É': { code: 'KeyE', accentCode: 'Quote', finger: 'medio-izq', hand: 'Izquierda', fingerName: 'Medio Izquierdo', method: 'ACCENT_UPPER', vowel: 'E', instruction: 'Paso 1: Pulsa la tilde ´. Paso 2: Mantén Shift derecho y pulsa E' },
        'Í': { code: 'KeyI', accentCode: 'Quote', finger: 'medio-der', hand: 'Derecha', fingerName: 'Medio Derecho', method: 'ACCENT_UPPER', vowel: 'I', instruction: 'Paso 1: Pulsa la tilde ´. Paso 2: Mantén Shift izquierdo y pulsa I' },
        'Ó': { code: 'KeyO', accentCode: 'Quote', finger: 'anular-der', hand: 'Derecha', fingerName: 'Anular Derecho', method: 'ACCENT_UPPER', vowel: 'O', instruction: 'Paso 1: Pulsa la tilde ´. Paso 2: Mantén Shift izquierdo y pulsa O' },
        'Ú': { code: 'KeyU', accentCode: 'Quote', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'ACCENT_UPPER', vowel: 'U', instruction: 'Paso 1: Pulsa la tilde ´. Paso 2: Mantén Shift izquierdo y pulsa U' },
        'Ü': { code: 'KeyU', accentCode: 'Quote', finger: 'indice-der', hand: 'Derecha', fingerName: 'Índice Derecho', method: 'DIERESIS', vowel: 'U', instruction: 'Paso 1: Pulsa Shift + ´ (diéresis). Paso 2: Mantén Shift izquierdo y pulsa U' },
        'Ç': { code: 'Backslash', finger: 'meñique-der', hand: 'Derecha', fingerName: 'Meñique Derecho', method: 'SHIFT', keyName: 'ç', shiftKey: 'ShiftLeft', instruction: 'Mantén pulsado Shift izquierdo y pulsa la tecla ç' }
    };

    // Auto-completar Mayúsculas alfabéticas estándar A-Z y Ñ
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ';
    for (let char of ALPHABET) {
        if (!CHAR_MAP[char]) {
            const lower = char.toLowerCase();
            const lowerInfo = CHAR_MAP[lower];
            if (lowerInfo) {
                const isLeftHand = lowerInfo.hand === 'Izquierda';
                CHAR_MAP[char] = {
                    code: lowerInfo.code,
                    finger: lowerInfo.finger,
                    hand: lowerInfo.hand,
                    fingerName: lowerInfo.fingerName,
                    method: 'SHIFT',
                    keyName: char,
                    shiftKey: isLeftHand ? 'ShiftRight' : 'ShiftLeft',
                    instruction: `Mantén pulsado ${isLeftHand ? 'Shift derecho' : 'Shift izquierdo'} y pulsa la letra ${char}`
                };
            }
        }
    }

    // --- CURRÍCULO PROFESIONAL EXPANDIDO (12 NIVELES PROGRESIVOS) ---
    const CURRICULUM = [
        {
            id: 'lvl-1',
            title: 'Nivel 1: Fila Base',
            icon: '<i class="fa-solid fa-keyboard"></i>',
            lessons: [
                { id: '1-1', title: '1.1 Teclas F y J (Con relieve táctil)', text: 'ffff jjjj ffff jjjj fjfj jfjf fjfj jfjf' },
                { id: '1-2', title: '1.2 Teclas D y K (Dedos medios)', text: 'dddd kkkk dddd kkkk dkdk kdkd fjdk dkfj' },
                { id: '1-3', title: '1.3 Teclas S y L (Dedos anulares)', text: 'ssss llll ssss llll slsl lsls fdsj klfl' },
                { id: '1-4', title: '1.4 Teclas A y Ñ (Dedos meñiques)', text: 'aaaa ññññ aaaa ññññ añañ ñaña asdf jklñ' },
                { id: '1-5', title: '1.5 Fila Base Completa y Espacio', text: 'asdf jklñ asdf jklñ fda sñlk lafa kaña' },
                { id: '1-6', title: '1.6 Estiramiento a G y H', text: 'ffg jjh ffg jjh gfh jhf fghj hjgf gaha' },
                { id: '1-7', title: '1.7 Primeras Palabras en Fila Base', text: 'hada falda salsa laja ala alas gas faena' }
            ]
        },
        {
            id: 'lvl-2',
            title: 'Nivel 2: Fila Superior',
            icon: '<i class="fa-solid fa-arrow-up"></i>',
            lessons: [
                { id: '2-1', title: '2.1 Teclas R, T, Y, U (Índices arriba)', text: 'frf ftf jyj juj rtyu uytr frft jyju' },
                { id: '2-2', title: '2.2 Teclas E e I (Medios arriba)', text: 'ded kik edik dede kiki edie kiki deki' },
                { id: '2-3', title: '2.3 Teclas W y O (Anulares arriba)', text: 'sws lol wolo swol swos lolo wols' },
                { id: '2-4', title: '2.4 Teclas Q y P (Meñiques arriba)', text: 'aqa pñp qpqp pqpq aqap pñqa qpñp' },
                { id: '2-5', title: '2.5 Palabras Fila Base y Superior', text: 'para perro gato agua queso sol rio dulce flor' }
            ]
        },
        {
            id: 'lvl-3',
            title: 'Nivel 3: Fila Inferior',
            icon: '<i class="fa-solid fa-arrow-down"></i>',
            lessons: [
                { id: '3-1', title: '3.1 Teclas V, B, N, M (Índices abajo)', text: 'fvf fbf jnj jmj vbnm mnbv fvfj jnjm' },
                { id: '3-2', title: '3.2 Teclas C y Coma (Medios abajo)', text: 'dcd k,k c,c, ckkd dcdc k,k, c,dk' },
                { id: '3-3', title: '3.3 Teclas X y Punto (Anulares abajo)', text: 'sxs l.l x.x. sxl. sxsx l.l. xl.s' },
                { id: '3-4', title: '3.4 Teclas Z y Guion (Meñiques abajo)', text: 'aza ñ-ñ z-z- aazñ azaz ñ-ñ- z-ñaz' },
                { id: '3-5', title: '3.5 Todo el Teclado Alfabético', text: 'casa barco luna manzana vida amor trabajo feliz' }
            ]
        },
        {
            id: 'lvl-4',
            title: 'Nivel 4: Fila Numérica',
            icon: '<i class="fa-solid fa-arrow-up-right-dots"></i>',
            lessons: [
                { id: '4-1', title: '4.1 Mano Izquierda (1, 2, 3, 4, 5)', text: '111 222 333 444 555 12345 54321 135 24' },
                { id: '4-2', title: '4.2 Mano Derecha (6, 7, 8, 9, 0)', text: '666 777 888 999 000 67890 09876 680 79' },
                { id: '4-3', title: '4.3 Combinaciones de Cifras y Años', text: '1984 2024 2026 1492 100 250 500 1000' },
                { id: '4-4', title: '4.4 Cantidades y Números con Letras', text: 'tengo 2 gatos y 3 perros en el piso 4' }
            ]
        },
        {
            id: 'lvl-5',
            title: 'Nivel 5: Puntuación Básica',
            icon: '<i class="fa-solid fa-quote-right"></i>',
            lessons: [
                { id: '5-1', title: '5.1 El Punto y la Coma (. y ,)', text: 'pan, leche, huevos. café, fruta, agua.' },
                { id: '5-2', title: '5.2 El Punto y Coma (Shift + , ➔ ;)', text: 'primero vino él; luego nosotros; al final todos.' },
                { id: '5-3', title: '5.3 Los Dos Puntos (Shift + . ➔ :)', text: 'nota: aprobado. aviso: cerrado. orden: silencio.' },
                { id: '5-4', title: '5.4 Guion y Guion Bajo (- y Shift + - ➔ _)', text: 'palabra-clave texto-corto usuario_nuevo test_1' },
                { id: '5-5', title: '5.5 Párrafo con Puntuación Completa', text: 'hoy es un gran día: sol, brisa y calma; todo marcha bien.' }
            ]
        },
        {
            id: 'lvl-6',
            title: 'Nivel 6: Preguntas y Exclamaciones',
            icon: '<i class="fa-solid fa-circle-question"></i>',
            lessons: [
                { id: '6-1', title: '6.1 Apertura y Cierre de Interrogación (¿ y ?)', text: '¿como? ¿cuando? ¿donde? ¿por que? ¿quien?' },
                { id: '6-2', title: '6.2 Apertura y Cierre de Exclamación (¡ y !)', text: '¡hola! ¡atencion! ¡vamos! ¡cuidado! ¡genial!' },
                { id: '6-3', title: '6.3 Oraciones Interrogativas Completas', text: '¿que hora tienes? ¿quieres un café? ¿como estas?' },
                { id: '6-4', title: '6.4 Oraciones Exclamativas Dinámicas', text: '¡que alegria verte! ¡felicidades por tu exito!' },
                { id: '6-5', title: '6.5 Diálogo Mixto Interrogativo y Exclamativo', text: '¡hola! ¿como te va? ¡muy bien, gracias! ¿y a ti?' }
            ]
        },
        {
            id: 'lvl-7',
            title: 'Nivel 7: Acentos, Tildes y Diéresis',
            icon: '<i class="fa-solid fa-spell-check"></i>',
            lessons: [
                { id: '7-1', title: '7.1 Vocales con Tilde (á é í ó ú)', text: 'café canción música árbol único fácil rápido' },
                { id: '7-2', title: '7.2 Palabras Agudas, Llanas y Esdrújulas', text: 'avión jardín compás lápiz césped difícil clásico' },
                { id: '7-3', title: '7.3 Mayúsculas con Tilde (Á É Í Ó Ú)', text: 'Álvaro Érica Íñigo Óscar Úrsula Ángel' },
                { id: '7-4', title: '7.4 La Diéresis (Shift + ´ ➔ ü)', text: 'pingüino bilingüe vergüenza cigüeña agüita' },
                { id: '7-5', title: '7.5 Oraciones con Acentuación Rigurosa', text: 'El músico tocó una canción mágica en el café de Álvaro.' }
            ]
        },
        {
            id: 'lvl-8',
            title: 'Nivel 8: Paréntesis, Corchetes y Llaves',
            icon: '<i class="fa-solid fa-code"></i>',
            lessons: [
                { id: '8-1', title: '8.1 Paréntesis Ordinarios ( y )', text: '(inicio) (final) (madrid, 2026) (nota 1)' },
                { id: '8-2', title: '8.2 Corchetes con AltGr ([ y ])', text: '[0] [1] [item] [lista de espera] [ok]' },
                { id: '8-3', title: '8.3 Llaves con AltGr ({ y })', text: '{clave: valor} {id: 10} {nombre: ana} {color: azul}' },
                { id: '8-4', title: '8.4 Comillas Dobles y Simples (" y \')', text: '"hola mundo" "antigravity" \'dato\' \'valor\'' },
                { id: '8-5', title: '8.5 Estructuras Anidadas Complejas', text: 'datos[0] = {usuario: "carlos", notas: [8, 9, 10]};' }
            ]
        },
        {
            id: 'lvl-9',
            title: 'Nivel 9: Símbolos Especiales (AltGr)',
            icon: '<i class="fa-solid fa-at"></i>',
            lessons: [
                { id: '9-1', title: '9.1 Arroba y Hastags (@ y #)', text: 'contacto@correo.es info@web.com #tecnologia #mecanografia' },
                { id: '9-2', title: '9.2 Monedas (€ y $)', text: 'precio: 49€ oferta: 99€ saldo: 1500$ descuento: 20%' },
                { id: '9-3', title: '9.3 Barras y Plecas (/ \\ |)', text: 'ruta/archivo C:\\Windows\\System32 opcion1 | opcion2' },
                { id: '9-4', title: '9.4 Virgulilla y Lógica (~ & ¬)', text: 'servidor~user a && b ¬p & valor & test' },
                { id: '9-5', title: '9.5 Enlaces y Credenciales Reales', text: 'https://github.com/proyecto/main user@empresa.es:2026' }
            ]
        },
        {
            id: 'lvl-10',
            title: 'Nivel 10: Operadores Matemáticos',
            icon: '<i class="fa-solid fa-calculator"></i>',
            lessons: [
                { id: '10-1', title: '10.1 Operaciones Básicas (+ - * / =)', text: '10 + 25 = 35; 100 - 45 = 55; 8 * 7 = 56; 40 / 5 = 8;' },
                { id: '10-2', title: '10.2 Comparaciones (< > <= >=)', text: 'a < b; x > 10; edad >= 18; saldo <= 0;' },
                { id: '10-3', title: '10.3 Igualdades y Porcentajes', text: 'total == 100; valor != 0; 25% + 75% = 100%;' },
                { id: '10-4', title: '10.4 Ecuaciones y Fórmulas', text: '(a + b) * (c - d) / 2 = resultado;' }
            ]
        },
        {
            id: 'lvl-11',
            title: 'Nivel 11: Código y Programación',
            icon: '<i class="fa-solid fa-laptop-code"></i>',
            lessons: [
                { id: '11-1', title: '11.1 JavaScript: Declaraciones', text: 'const mensaje = "Hola Mundo"; let contador = 0;' },
                { id: '11-2', title: '11.2 Funciones y Retornos', text: 'function sumar(a, b) { return a + b; }' },
                { id: '11-3', title: '11.3 Condicionales Lógicos', text: 'if (x >= 10 && y <= 20) { console.log("ok"); }' },
                { id: '11-4', title: '11.4 Python: Listas y Tipado', text: 'def procesar(items: list) -> bool: return len(items) > 0' },
                { id: '11-5', title: '11.5 CSS y Selectores', text: '.contenedor { display: flex; gap: 1rem; width: 100%; }' }
            ]
        },
        {
            id: 'lvl-12',
            title: 'Nivel 12: Textos Reales y Redacción',
            icon: '<i class="fa-solid fa-file-lines"></i>',
            lessons: [
                { id: '12-1', title: '12.1 Correo Formal Profesional', text: 'Estimado Carlos: Le escribo para confirmar la reunión del 15/10/2026 a las 10:30h.' },
                { id: '12-2', title: '12.2 Extracto Literario con Diálogo', text: '—¿Vendrás mañana? —preguntó María—. ¡Por supuesto, cuenten conmigo!' },
                { id: '12-3', title: '12.3 Informe Técnico de Redes', text: 'El servidor 192.168.1.1:8080 respondió con estado 200 OK en 14ms (carga: 12%).' },
                { id: '12-4', title: '12.4 Redacción Integral con Signos', text: 'Para más información, envíe un correo a soporte@meca.es o llame al (+34) 912-345-678.' }
            ]
        }
    ];

    // --- ESTADO DE LA APLICACIÓN ---
    let state = {
        currentCategoryIdx: 0,
        currentLessonIdx: 0,
        targetText: '',
        typedChars: [],
        currentIndex: 0,
        startTime: null,
        endTime: null,
        timerInterval: null,
        errorsCount: 0,
        correctCount: 0,
        streak: 0,
        maxStreak: 0,
        isCompleted: false,
        soundEnabled: true,
        fontSizeLevel: 1, // 0: Normal, 1: Grande, 2: Muy Grande
        pendingDeadKey: false // Para acentos/diéresis
    };

    // --- ELEMENTOS DEL DOM ---
    const levelsContainer = document.getElementById('levels-container');
    const navPrevLevel = document.getElementById('nav-prev-level');
    const navNextLevel = document.getElementById('nav-next-level');
    const currentCategoryName = document.getElementById('current-category-name');
    const currentLessonTitle = document.getElementById('current-lesson-title');
    const lessonSelect = document.getElementById('lesson-select');

    const textDisplay = document.getElementById('text-display');
    const statWpm = document.getElementById('stat-wpm');
    const statAccuracy = document.getElementById('stat-accuracy');
    const statErrors = document.getElementById('stat-errors');
    const statStreak = document.getElementById('stat-streak');
    const btnRestart = document.getElementById('btn-restart');

    // HUD de Ayuda ("¿Cómo se saca?")
    const shortcutHelper = document.getElementById('shortcut-helper');
    const helperStatusIcon = document.getElementById('helper-status-icon');
    const helperTypeLabel = document.getElementById('helper-type-label');
    const helperCombination = document.getElementById('helper-combination');
    const helperInstruction = document.getElementById('helper-instruction');
    const fingerDot = document.getElementById('finger-dot');
    const fingerName = document.getElementById('finger-name');

    // Botones Header
    const btnSound = document.getElementById('btn-sound');
    const btnFontSize = document.getElementById('btn-font-size');
    const btnTheme = document.getElementById('btn-theme');

    // Modal
    const modalSuccess = document.getElementById('modal-success');
    const modalGrade = document.getElementById('modal-grade');
    const modalWpm = document.getElementById('modal-wpm');
    const modalAccuracy = document.getElementById('modal-accuracy');
    const modalErrors = document.getElementById('modal-errors');
    const modalTime = document.getElementById('modal-time');
    const modalMessage = document.getElementById('modal-message');
    const btnModalRepeat = document.getElementById('btn-modal-repeat');
    const btnModalNext = document.getElementById('btn-modal-next');

    // --- SINTETIZADOR DE AUDIO (INTERRUPTORES MECÁNICOS TÁCTILES) ---
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playSound(type) {
        if (!state.soundEnabled) return;
        initAudio();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;

        if (type === 'key') {
            // Clic de switch mecánico (Clicky / Tactile)
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

            osc.start(now);
            osc.stop(now + 0.035);
        } else if (type === 'error') {
            // Sonido de error mecánico sordo
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.linearRampToValueAtTime(110, now + 0.12);

            gain.gain.setValueAtTime(0.16, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === 'victory') {
            // Acorde triunfal elegante
            const freqs = [523.25, 659.25, 783.99, 1046.50];
            freqs.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                gain.gain.setValueAtTime(0.2, now + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.35);
            });
        }
    }

    // --- RENDERIZADO DE NIVELES Y LECCIONES ---
    function renderLevelTabs() {
        levelsContainer.innerHTML = '';
        CURRICULUM.forEach((cat, idx) => {
            const tab = document.createElement('button');
            tab.className = `level-tab ${idx === state.currentCategoryIdx ? 'active' : ''}`;
            tab.innerHTML = `${cat.icon} <span>${cat.title.replace('Nivel ', 'N')}</span>`;
            tab.title = cat.title;
            tab.addEventListener('click', () => {
                selectCategory(idx);
            });
            levelsContainer.appendChild(tab);
        });

        // Asegurar que la pestaña activa sea visible en el scroll
        const activeTab = levelsContainer.children[state.currentCategoryIdx];
        if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    function selectCategory(catIdx, lessonIdx = 0) {
        state.currentCategoryIdx = catIdx;
        state.currentLessonIdx = lessonIdx;

        renderLevelTabs();
        populateLessonDropdown();
        loadLesson();
    }

    function populateLessonDropdown() {
        const cat = CURRICULUM[state.currentCategoryIdx];
        lessonSelect.innerHTML = '';
        cat.lessons.forEach((l, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = l.title;
            if (idx === state.currentLessonIdx) opt.selected = true;
            lessonSelect.appendChild(opt);
        });
    }

    function loadLesson() {
        const cat = CURRICULUM[state.currentCategoryIdx];
        const lesson = cat.lessons[state.currentLessonIdx];

        currentCategoryName.textContent = cat.title.toUpperCase();
        currentLessonTitle.textContent = lesson.title;
        state.targetText = lesson.text;

        state.currentIndex = 0;
        state.errorsCount = 0;
        state.correctCount = 0;
        state.streak = 0;
        state.maxStreak = 0;
        state.startTime = null;
        state.endTime = null;
        state.isCompleted = false;
        state.pendingDeadKey = false;

        if (state.timerInterval) clearInterval(state.timerInterval);

        state.typedChars = state.targetText.split('').map((char, index) => ({
            char,
            status: index === 0 ? 'current' : 'pending'
        }));

        updateStatsUI();
        renderTextDisplay();
        updateShortcutHelperAndKeyboard();
    }

    // Renderizar la caja de texto a escribir
    function renderTextDisplay() {
        textDisplay.innerHTML = '';
        state.typedChars.forEach((item, index) => {
            const span = document.createElement('span');
            span.className = `char ${item.status}`;

            if (item.char === ' ') {
                span.innerHTML = item.status === 'current' ? '␣' : '&nbsp;';
            } else {
                span.textContent = item.char;
            }

            textDisplay.appendChild(span);
        });

        // Auto-scroll para mantener el cursor en el centro del campo de visión
        const currentCharElem = textDisplay.children[state.currentIndex];
        if (currentCharElem) {
            currentCharElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    // Actualizar Estadísticas en Tiempo Real
    function updateStatsUI() {
        statErrors.textContent = state.errorsCount;
        statStreak.textContent = state.streak;

        const totalTyped = state.correctCount + state.errorsCount;
        const accuracy = totalTyped > 0 ? Math.round((state.correctCount / totalTyped) * 100) : 100;
        statAccuracy.textContent = accuracy;

        let wpm = 0;
        if (state.startTime && state.correctCount > 0) {
            const now = state.endTime || new Date();
            const timeInMinutes = (now - state.startTime) / 60000;
            if (timeInMinutes > 0) {
                const words = state.correctCount / 5;
                wpm = Math.round(words / timeInMinutes);
            }
        }
        statWpm.textContent = wpm;
    }

    // --- ACTUALIZAR HUD ("CÓMO SE SACA") Y RESALTADO EN EL TECLADO ---
    function updateShortcutHelperAndKeyboard() {
        // Limpiar todas las clases de objetivo en el teclado
        document.querySelectorAll('.key').forEach(k => {
            k.classList.remove('target-key', 'target-shift', 'target-altgr', 'target-accent-step1', 'target-accent-step2');
        });

        // Limpiar clases de modo en el helper
        shortcutHelper.classList.remove('altgr-mode', 'shift-mode', 'accent-mode');

        if (state.currentIndex >= state.typedChars.length) return;

        const targetChar = state.typedChars[state.currentIndex].char;
        const charInfo = CHAR_MAP[targetChar] || {
            code: 'Space',
            finger: 'pulgar',
            hand: 'Mano',
            fingerName: 'Dedo asignado',
            method: 'DIRECT',
            keyName: targetChar
        };

        // Asignar color de dedo al indicador
        const fingerColors = {
            'meñique-izq': '#ec4899',
            'anular-izq': '#f97316',
            'medio-izq': '#eab308',
            'indice-izq': '#3b82f6',
            'pulgar': '#64748b',
            'indice-der': '#10b981',
            'medio-der': '#14b8a6',
            'anular-der': '#a855f7',
            'meñique-der': '#06b6d4'
        };
        fingerDot.style.backgroundColor = fingerColors[charInfo.finger] || '#6366f1';
        fingerName.textContent = `${charInfo.fingerName} (${charInfo.hand})`;

        // Configurar según el método de entrada
        const method = charInfo.method || 'DIRECT';

        if (method === 'ALTGR') {
            shortcutHelper.classList.add('altgr-mode');
            helperStatusIcon.innerHTML = '<i class="fa-solid fa-bolt" style="color: var(--amber-altgr);"></i>';
            helperTypeLabel.textContent = 'COMBINACIÓN ALTGR';

            helperCombination.innerHTML = `
                <kbd class="kbd-altgr">AltGr</kbd>
                <span class="combo-symbol">+</span>
                <kbd>${charInfo.keyName}</kbd>
                <span class="combo-arrow"><i class="fa-solid fa-arrow-right"></i></span>
                <span class="combo-result" style="border-color: var(--amber-altgr); color: var(--amber-altgr);">${targetChar}</span>
            `;

            helperInstruction.innerHTML = charInfo.instruction || `Mantén pulsada la tecla <strong>AltGr</strong> y pulsa <strong>${charInfo.keyName}</strong>.`;

            // Resaltar en el teclado virtual
            const altgrKey = document.querySelector('.key[data-code="AltRight"]') || document.querySelector('.key-altgr');
            const targetKeyElem = document.querySelector(`.key[data-code="${charInfo.code}"]`);
            if (altgrKey) altgrKey.classList.add('target-altgr');
            if (targetKeyElem) targetKeyElem.classList.add('target-key');

        } else if (method === 'SHIFT') {
            shortcutHelper.classList.add('shift-mode');
            helperStatusIcon.innerHTML = '<i class="fa-solid fa-arrow-up" style="color: var(--cyan-mod);"></i>';
            helperTypeLabel.textContent = 'COMBINACIÓN MAYÚS (SHIFT)';

            helperCombination.innerHTML = `
                <kbd class="kbd-shift">⇧ Mayús</kbd>
                <span class="combo-symbol">+</span>
                <kbd>${charInfo.keyName}</kbd>
                <span class="combo-arrow"><i class="fa-solid fa-arrow-right"></i></span>
                <span class="combo-result" style="border-color: var(--cyan-mod); color: var(--cyan-mod);">${targetChar}</span>
            `;

            helperInstruction.innerHTML = charInfo.instruction || `Mantén pulsado <strong>Shift</strong> y pulsa <strong>${charInfo.keyName}</strong>.`;

            // Resaltar Shift (izquierdo o derecho según mano) y la tecla base
            const shiftCode = charInfo.shiftKey || 'ShiftLeft';
            const shiftElem = document.querySelector(`.key[data-code="${shiftCode}"]`);
            const targetKeyElem = document.querySelector(`.key[data-code="${charInfo.code}"]`);
            if (shiftElem) shiftElem.classList.add('target-shift');
            if (targetKeyElem) targetKeyElem.classList.add('target-key');

        } else if (method === 'ACCENT') {
            shortcutHelper.classList.add('accent-mode');
            helperStatusIcon.innerHTML = '<i class="fa-solid fa-spell-check" style="color: #ec4899;"></i>';
            helperTypeLabel.textContent = 'ACENTO AGUDO (TILDE)';

            helperCombination.innerHTML = `
                <kbd class="kbd-accent">´ Tilde</kbd>
                <span class="combo-symbol">luego</span>
                <kbd>${charInfo.vowel}</kbd>
                <span class="combo-arrow"><i class="fa-solid fa-arrow-right"></i></span>
                <span class="combo-result" style="border-color: #ec4899; color: #ec4899;">${targetChar}</span>
            `;

            helperInstruction.innerHTML = charInfo.instruction || `1º Pulsa la tecla de tilde <strong>´</strong>. 2º Pulsa la vocal <strong>${charInfo.vowel}</strong>.`;

            // Resaltar tecla de tilde y tecla de vocal
            const accentElem = document.querySelector('.key[data-code="Quote"]');
            const vowelElem = document.querySelector(`.key[data-code="${charInfo.code}"]`);
            if (accentElem) accentElem.classList.add('target-accent-step1');
            if (vowelElem) vowelElem.classList.add('target-accent-step2');

        } else if (method === 'DIERESIS') {
            shortcutHelper.classList.add('accent-mode');
            helperStatusIcon.innerHTML = '<i class="fa-solid fa-ellipsis" style="color: #ec4899;"></i>';
            helperTypeLabel.textContent = 'DIÉRESIS ( ¨ )';

            helperCombination.innerHTML = `
                <kbd class="kbd-shift">⇧ Mayús</kbd>
                <span class="combo-symbol">+</span>
                <kbd class="kbd-accent">´</kbd>
                <span class="combo-symbol">luego</span>
                <kbd>U</kbd>
                <span class="combo-arrow"><i class="fa-solid fa-arrow-right"></i></span>
                <span class="combo-result" style="border-color: #ec4899; color: #ec4899;">${targetChar}</span>
            `;

            helperInstruction.innerHTML = charInfo.instruction || `Pulsa <strong>Shift + ´</strong> para activar diéresis, luego pulsa <strong>U</strong>.`;

            const shiftElem = document.querySelector('.key[data-code="ShiftLeft"]');
            const accentElem = document.querySelector('.key[data-code="Quote"]');
            const vowelElem = document.querySelector(`.key[data-code="${charInfo.code}"]`);
            if (shiftElem) shiftElem.classList.add('target-shift');
            if (accentElem) accentElem.classList.add('target-accent-step1');
            if (vowelElem) vowelElem.classList.add('target-accent-step2');

        } else if (method === 'ACCENT_UPPER') {
            shortcutHelper.classList.add('accent-mode');
            helperStatusIcon.innerHTML = '<i class="fa-solid fa-spell-check" style="color: #ec4899;"></i>';
            helperTypeLabel.textContent = 'MAYÚSCULA CON TILDE';

            helperCombination.innerHTML = `
                <kbd class="kbd-accent">´ Tilde</kbd>
                <span class="combo-symbol">luego</span>
                <kbd class="kbd-shift">⇧ Mayús</kbd>
                <span class="combo-symbol">+</span>
                <kbd>${charInfo.vowel}</kbd>
                <span class="combo-arrow"><i class="fa-solid fa-arrow-right"></i></span>
                <span class="combo-result" style="border-color: #ec4899; color: #ec4899;">${targetChar}</span>
            `;

            helperInstruction.innerHTML = charInfo.instruction || `Pulsa primero la tilde <strong>´</strong> y luego <strong>Shift + ${charInfo.vowel}</strong>.`;

            const accentElem = document.querySelector('.key[data-code="Quote"]');
            const shiftElem = document.querySelector('.key[data-code="ShiftRight"]') || document.querySelector('.key-shift-right');
            const vowelElem = document.querySelector(`.key[data-code="${charInfo.code}"]`);
            if (accentElem) accentElem.classList.add('target-accent-step1');
            if (shiftElem) shiftElem.classList.add('target-shift');
            if (vowelElem) vowelElem.classList.add('target-accent-step2');

        } else {
            // DIRECT
            helperStatusIcon.innerHTML = '<i class="fa-solid fa-keyboard" style="color: var(--accent-primary);"></i>';
            helperTypeLabel.textContent = 'PULSACIÓN DIRECTA';

            let displayKey = targetChar === ' ' ? 'Barra Espaciadora' : charInfo.keyName;
            helperCombination.innerHTML = `
                <kbd>${displayKey}</kbd>
                <span class="combo-arrow"><i class="fa-solid fa-arrow-right"></i></span>
                <span class="combo-result">${targetChar === ' ' ? '␣ Espacio' : targetChar}</span>
            `;

            helperInstruction.innerHTML = `Presiona la tecla con el <strong>${charInfo.fingerName.toLowerCase()}</strong> de la mano <strong>${charInfo.hand.toLowerCase()}</strong>.`;

            const keyElement = document.querySelector(`.key[data-code="${charInfo.code}"]`);
            if (keyElement) {
                keyElement.classList.add('target-key');
            }
        }
    }

    // --- MANEJO DE ENTRADA TECLADO FÍSICO CON ACCIDENTES Y DEAD KEYS ---
    document.addEventListener('keydown', (e) => {
        if (state.isCompleted) return;

        // Tecla de escape para reiniciar
        if (e.key === 'Escape') {
            loadLesson();
            return;
        }

        // Evitar que el navegador scrollee o navegue con teclas del juego
        if (['Space', 'Tab', 'Slash', 'Quote', 'SingleQuote', 'Backspace'].includes(e.code) || e.key === ' ') {
            if (document.activeElement.tagName !== 'SELECT') {
                e.preventDefault();
            }
        }

        // Flashear tecla física presionada para retroalimentación
        flashKeyPressed(e.code, e.key);

        // Si es una tecla modificadora sola (Shift, Ctrl, Alt, CapsLock), no registrar como error ni carácter
        if (['Shift', 'Control', 'Alt', 'AltGraph', 'CapsLock', 'Meta', 'Tab'].includes(e.key)) {
            return;
        }

        // Iniciar temporizador al presionar la primera tecla
        if (!state.startTime) {
            state.startTime = new Date();
            state.timerInterval = setInterval(updateStatsUI, 1000);
        }

        const expectedChar = state.typedChars[state.currentIndex].char;
        const expectedInfo = CHAR_MAP[expectedChar] || {};

        // TRATAMIENTO DE DEAD KEYS (Acentos / Tildes en teclado español)
        if (e.key === 'Dead') {
            // El usuario pulsó la tecla de tilde o diéresis
            if (['ACCENT', 'DIERESIS', 'ACCENT_UPPER'].includes(expectedInfo.method)) {
                // ¡Correcto! El usuario preparó el acento
                state.pendingDeadKey = true;
                playSound('key');

                // Animar paso 2 en el HUD
                helperInstruction.innerHTML = `¡Tilde activada! Ahora presiona la vocal <strong>${expectedInfo.vowel}</strong>.`;
                const accentElem = document.querySelector('.key[data-code="Quote"]');
                if (accentElem) {
                    accentElem.classList.remove('target-accent-step1');
                    accentElem.classList.add('pressed');
                }
                const vowelElem = document.querySelector(`.key[data-code="${expectedInfo.code}"]`);
                if (vowelElem) {
                    vowelElem.classList.remove('target-accent-step2');
                    vowelElem.classList.add('target-key');
                }
            } else {
                // El usuario pulsó tilde para un carácter que no lleva tilde
                playSound('error');
                flashKeyError(e.code, e.key);
            }
            return;
        }

        const pressedChar = e.key;

        // Comprobar coincidencia exacta
        if (pressedChar === expectedChar) {
            // ¡PULSACIÓN CORRECTA!
            playSound('key');
            state.typedChars[state.currentIndex].status = 'correct';
            state.correctCount++;
            state.streak++;
            state.pendingDeadKey = false;

            if (state.streak > state.maxStreak) {
                state.maxStreak = state.streak;
            }

            state.currentIndex++;

            if (state.currentIndex < state.typedChars.length) {
                state.typedChars[state.currentIndex].status = 'current';
            } else {
                // Lección terminada
                finishLesson();
            }
        } else {
            // ¡ERROR!
            playSound('error');
            state.typedChars[state.currentIndex].status = 'incorrect';
            state.errorsCount++;
            state.streak = 0;
            state.pendingDeadKey = false;

            flashKeyError(e.code, e.key);
        }

        updateStatsUI();
        renderTextDisplay();
        updateShortcutHelperAndKeyboard();
    });

    // Soporte para clics en el teclado virtual (accesibilidad / testing)
    document.querySelectorAll('.key').forEach(keyElem => {
        keyElem.addEventListener('mousedown', () => {
            if (state.isCompleted) return;

            const targetChar = state.typedChars[state.currentIndex].char;
            const code = keyElem.getAttribute('data-code');
            const dataKey = keyElem.getAttribute('data-key');

            // Simular pulsación
            const event = new KeyboardEvent('keydown', {
                key: targetChar, // para permitir probar con click directo
                code: code || 'Space'
            });
            document.dispatchEvent(event);
        });
    });

    // Efecto visual de tecla presionada en el teclado virtual
    function flashKeyPressed(code, key) {
        let keyElement = document.querySelector(`.key[data-code="${code}"]`);
        if (!keyElement && key) {
            keyElement = document.querySelector(`.key[data-key="${key.toLowerCase()}"]`);
        }
        if (keyElement) {
            keyElement.classList.add('pressed');
            setTimeout(() => keyElement.classList.remove('pressed'), 130);
        }
    }

    // Efecto de error en tecla
    function flashKeyError(code, key) {
        let keyElement = document.querySelector(`.key[data-code="${code}"]`);
        if (keyElement) {
            keyElement.classList.add('error-key');
            setTimeout(() => keyElement.classList.remove('error-key'), 280);
        }
    }

    // --- FINALIZACIÓN DE LECCIÓN Y MODAL DE EVALUACIÓN PROFESIONAL ---
    function finishLesson() {
        state.isCompleted = true;
        state.endTime = new Date();
        if (state.timerInterval) clearInterval(state.timerInterval);

        playSound('victory');

        const totalTimeSeconds = Math.round((state.endTime - state.startTime) / 1000);
        const minutes = Math.floor(totalTimeSeconds / 60);
        const seconds = totalTimeSeconds % 60;
        const timeFormatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        const totalTyped = state.correctCount + state.errorsCount;
        const accuracy = totalTyped > 0 ? Math.round((state.correctCount / totalTyped) * 100) : 100;

        const words = state.correctCount / 5;
        const timeInMinutes = (state.endTime - state.startTime) / 60000;
        const wpm = timeInMinutes > 0 ? Math.round(words / timeInMinutes) : 0;

        // Calificación Profesional (S, A, B, C)
        let grade = 'S';
        let gradeColor = '#f59e0b';
        let feedback = '';

        if (accuracy >= 98 && state.errorsCount === 0) {
            grade = 'S';
            gradeColor = '#f59e0b';
            feedback = '¡Rendimiento impecable! Precisión del 100% y cero fallos. Tienes un control sobresaliente.';
        } else if (accuracy >= 94) {
            grade = 'A';
            gradeColor = '#10b981';
            feedback = 'Excelente dominio técnico. Muy buena precisión y ritmo de escritura constante.';
        } else if (accuracy >= 85) {
            grade = 'B';
            gradeColor = '#3b82f6';
            feedback = 'Buen progreso. Repetir esta lección te ayudará a asentar la memoria muscular de estos signos.';
        } else {
            grade = 'C';
            gradeColor = '#f43f5e';
            feedback = 'Practica despacio prestando atención a qué dedo corresponde cada signo antes de acelerar.';
        }

        modalGrade.textContent = grade;
        modalGrade.style.background = `linear-gradient(135deg, ${gradeColor} 0%, rgba(0,0,0,0.4) 100%)`;
        modalGrade.style.boxShadow = `0 0 25px ${gradeColor}`;

        modalWpm.textContent = `${wpm} PPM`;
        modalAccuracy.textContent = `${accuracy}%`;
        modalErrors.textContent = state.errorsCount;
        modalTime.textContent = timeFormatted;
        modalMessage.textContent = feedback;

        // Confeti de celebración
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 }
            });
        }

        modalSuccess.classList.add('show');
    }

    // --- EVENTOS DE INTERFAZ Y CONFIGURACIÓN ---
    btnModalRepeat.addEventListener('click', () => {
        modalSuccess.classList.remove('show');
        loadLesson();
    });

    btnModalNext.addEventListener('click', () => {
        modalSuccess.classList.remove('show');
        const cat = CURRICULUM[state.currentCategoryIdx];
        if (state.currentLessonIdx < cat.lessons.length - 1) {
            selectCategory(state.currentCategoryIdx, state.currentLessonIdx + 1);
        } else if (state.currentCategoryIdx < CURRICULUM.length - 1) {
            selectCategory(state.currentCategoryIdx + 1, 0);
        } else {
            selectCategory(0, 0);
        }
    });

    btnRestart.addEventListener('click', () => {
        loadLesson();
    });

    lessonSelect.addEventListener('change', (e) => {
        state.currentLessonIdx = parseInt(e.target.value, 10);
        loadLesson();
    });

    navPrevLevel.addEventListener('click', () => {
        if (state.currentCategoryIdx > 0) {
            selectCategory(state.currentCategoryIdx - 1, 0);
        }
    });

    navNextLevel.addEventListener('click', () => {
        if (state.currentCategoryIdx < CURRICULUM.length - 1) {
            selectCategory(state.currentCategoryIdx + 1, 0);
        }
    });

    btnSound.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        btnSound.classList.toggle('active', state.soundEnabled);
        const iconElem = btnSound.querySelector('.icon');
        if (iconElem) {
            iconElem.className = state.soundEnabled ? 'fa-solid fa-volume-high icon' : 'fa-solid fa-volume-xmark icon';
        }
    });

    btnFontSize.addEventListener('click', () => {
        state.fontSizeLevel = (state.fontSizeLevel + 1) % 3;
        const fontSizes = ['15px', '16px', '18px'];
        const displayCharSizes = ['2.2rem', '2.6rem', '3.1rem'];

        document.documentElement.style.setProperty('--base-font-size', fontSizes[state.fontSizeLevel]);
        document.documentElement.style.setProperty('--display-char-size', displayCharSizes[state.fontSizeLevel]);
    });

    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('theme-dark');
        const isDark = document.body.classList.contains('theme-dark');
        const iconElem = btnTheme.querySelector('.icon');
        if (iconElem) {
            iconElem.className = isDark ? 'fa-solid fa-sun icon' : 'fa-solid fa-moon icon';
        }
    });

    // --- INICIALIZACIÓN ---
    renderLevelTabs();
    populateLessonDropdown();
    loadLesson();
});
