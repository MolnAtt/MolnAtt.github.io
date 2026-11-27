'use strict';

// A számolás végig egész BigInt értékekkel történik,
// így 64 biten is pontos.
function exactDecimal(n, denominator = 1n) {
  const sign = n < 0n ? '−' : '';
  if (n < 0n) n = -n;
  let result = (n / denominator).toString();
  let remainder = n % denominator;
  if (remainder) {
    result += ',';
    while (remainder) {
      remainder *= 10n;
      result += (remainder / denominator).toString();
      remainder %= denominator;
    }
  }
  return sign + result;
}

function decodeFixed(bits, point) {
  const n = bits.length;
  if (n < 8 || n > 64 || !/^[01]+$/.test(bits))
    throw new Error('Adj meg 8–64 darab bitet.');

  if (!Number.isInteger(point) || point < 1 || point > n)
    throw new Error('Érvénytelen ponthelyzet.');

  const fractionBits = n - point;
  const scale = 1n << BigInt(fractionBits);

  const rows = Array.from(bits, (bit, i) => {
    const coefficient =
      (i === 0 ? -1n : 1n) * (1n << BigInt(n - i - 1));

    return {
      bit,
      i,
      exponent: point - i - 1,
      coefficient,
      contribution: BigInt(bit) * coefficient
    };
  });

  const integer = rows.slice(0, point)
    .reduce((s, row) => s + row.contribution, 0n);

  const fraction = rows.slice(point)
    .reduce((s, row) => s + row.contribution, 0n);

  return {
    bits, n, point, fractionBits, scale,
    rows, integer, fraction,
    total: integer + fraction
  };
}

if (typeof module !== 'undefined')
  module.exports = { decodeFixed, exactDecimal };

if (typeof document !== 'undefined') {

  const $ = id => document.getElementById(id);

  const editor = $('bit-editor');
  const count = $('bit-count');
  const form = $('decode-form');
  const solution = $('decode-solution');
  const error = $('decode-error');

  let values = [...'0101011001010110'];
  let point = 10;
  let inputs = [];
  let cells = [];

  const dot = make('span', ',', 'point');
  dot.setAttribute('aria-hidden', 'true');

  function make(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function add(parent, tag, text, className) {
    const el = make(tag, text, className);
    parent.append(el);
    return el;
  }

  function power(parent, exponent, negative = false) {
    parent.append(
      document.createTextNode((negative ? '−' : '') + '2')
    );
    add(parent, 'sup', String(exponent).replace('-', '−'));
  }

  function clearSolution() {
    solution.hidden = true;
    error.hidden = true;
  }

  function focusBit(index) {
    if (index < 0 || index >= inputs.length) return;

    inputs[index].focus();
    inputs[index].select();
    inputs[index].scrollIntoView({
      block: 'nearest',
      inline: 'nearest'
    });
  }

  function refreshInfo() {
    $('bit-progress').textContent =
      `${values.filter(v => v !== '').length} / ${values.length} kitöltött bit`;

    $('point-position').textContent =
      `${point}. bit után`;

    $('point-left').disabled = point === 1;
    $('point-right').disabled = point === values.length;

    $('format-info').textContent =
      `${values.length} bit · ${point} egész bit (előjelbittel együtt) · ${values.length - point} törtbit`;

    $('question').textContent =
      `Milyen decimális számot ábrázol ez a ${values.length} bites bitsorozat, ha a ${point}. bit után van a kettedespont?`;
  }

  function setBit(index, bit, advance = false) {
    values[index] = bit;
    inputs[index].value = bit;

    clearSolution();
    refreshInfo();

    if (advance && index + 1 < inputs.length)
      focusBit(index + 1);
    else if (advance)
      inputs[index].select();
  }

  function placePoint() {
    // Csak a pont helye változik,
    // a bitmezők változatlanok maradnak.

    if (point === values.length)
      editor.append(dot);
    else
      editor.insertBefore(dot, cells[point]);

    cells.forEach((cell, i) => {
      cell.className = 'bit' +
        (i === 0 ? ' sign' : i >= point ? ' fraction' : '');

      const label = cell.querySelector('.weight');
      label.replaceChildren();

      power(label, point - i - 1, i === 0);
    });

    refreshInfo();
  }

  function rebuild() {
    editor.replaceChildren();
    cells = [];
    inputs = [];

    values.forEach((bit, i) => {
      const cell = add(editor, 'div', undefined, 'bit');
      const input = add(cell, 'input', undefined, 'digit');

      input.type = 'text';
      input.inputMode = 'numeric';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.maxLength = 1;
      input.pattern = '[01]';
      input.placeholder = '·';
      input.value = bit;

      input.setAttribute(
        'aria-label',
        `${i + 1}. bit${i === 0 ? ', előjelbit' : ''}`
      );

      add(cell, 'span', undefined, 'weight');

      inputs.push(input);
      cells.push(cell);

      input.addEventListener('focus', () => input.select());
      input.addEventListener('click', () => input.select());

      // Billentyűzetes vezérlés
      input.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        if (e.key === '0' || e.key === '1') {
          e.preventDefault();
          setBit(i, e.key, true);
        }
        else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          focusBit(i - 1);
        }
        else if (e.key === 'ArrowRight') {
          e.preventDefault();
          focusBit(i + 1);
        }
        else if (e.key === 'Home') {
          e.preventDefault();
          focusBit(0);
        }
        else if (e.key === 'End') {
          e.preventDefault();
          focusBit(values.length - 1);
        }
        else if (e.key === 'Backspace') {
          e.preventDefault();

          if (values[i] !== '') {
            setBit(i, '');
          }
          else if (i > 0) {
            setBit(i - 1, '');
            focusBit(i - 1);
          }
        }
        else if (e.key === 'Delete') {
          e.preventDefault();
          setBit(i, '');
        }
        else if (e.key.length === 1) {
          e.preventDefault();
        }
      });

      // Mobiltelefonos billentyűzet kezelése
      input.addEventListener('input', () => {
        if (/^[01]$/.test(input.value))
          setBit(i, input.value, true);
        else if (!input.value)
          setBit(i, '');
        else
          input.value = values[i];
      });

      // Teljes bitsorozat beillesztése
      input.addEventListener('paste', e => {
        e.preventDefault();

        const raw = e.clipboardData.getData('text');
        const cleaned = raw.replace(/[\s.,_]/g, '');

        if (!/^[01]+$/.test(cleaned) ||
            cleaned.length > values.length) {

          error.textContent =
            'Csak 0 és 1 biteket illessz be, legfeljebb a beállított bitszámig.';

          error.hidden = false;
          return;
        }

        const start =
          cleaned.length === values.length ? 0 : i;

        if (start + cleaned.length > values.length) {
          error.textContent =
            'A beillesztett bitsorozat nem fér el a hátralévő mezőkben.';

          error.hidden = false;
          return;
        }

        [...cleaned].forEach((b, j) => {
          values[start + j] = b;
          inputs[start + j].value = b;
        });

        clearSolution();
        refreshInfo();

        focusBit(
          Math.min(start + cleaned.length, values.length - 1)
        );
      });
    });

    placePoint();
    clearSolution();
  }

  function movePoint(direction) {
    const next = point + direction;

    if (next < 1 || next > values.length) return;

    point = next;
    placePoint();
    clearSolution();

    dot.scrollIntoView({
      block: 'nearest',
      inline: 'nearest'
    });
  }

  // Bitszám megváltoztatása
  count.addEventListener('input', () => {
    const n = Number(count.value);

    clearSolution();

    if (!Number.isInteger(n) || n < 8 || n > 64) return;

    values = Array.from(
      { length: n },
      (_, i) => values[i] ?? ''
    );

    point = Math.min(point, n);
    rebuild();
  });

  $('point-left').addEventListener(
    'click', () => movePoint(-1)
  );

  $('point-right').addEventListener(
    'click', () => movePoint(1)
  );

  $('clear-bits').addEventListener('click', () => {
    values.fill('');
    rebuild();
    focusBit(0);
  });

  $('random-bits').addEventListener('click', () => {
    values = values.map(
      () => Math.random() < .5 ? '0' : '1'
    );

    count.value = values.length;
    rebuild();
  });

  function example(bits, p) {
    values = [...bits];
    point = p;
    count.value = bits.length;
    rebuild();
  }

  $('example-3').addEventListener(
    'click', () => example('0101011001010110', 10)
  );

  $('example-4').addEventListener(
    'click', () => example('1111000011110000', 12)
  );

  // ==============================================
  // A megoldás megjelenítése
  // ==============================================

  function step(title) {
    const section = add(
      solution, 'section', undefined, 'step'
    );

    add(section, 'h2', title);
    return section;
  }

  function visualBits(parent, r) {
    const line = add(parent, 'div', undefined, 'bits');

    line.setAttribute(
      'aria-label',
      r.bits.slice(0, r.point) + ',' + r.bits.slice(r.point)
    );

    r.rows.forEach(row => {
      if (row.i === r.point)
        add(line, 'span', ',', 'point');

      const cell = add(
        line,
        'div',
        undefined,
        'bit' + (
          row.i === 0
            ? ' sign'
            : row.exponent < 0
              ? ' fraction'
              : ''
        )
      );

      add(cell, 'span', row.bit, 'digit');

      power(
        add(cell, 'span', undefined, 'weight'),
        row.exponent,
        row.i === 0
      );
    });

    if (r.point === r.n)
      add(line, 'span', ',', 'point');
  }

  function terms(parent, rows, scale, type, total) {
    const line = add(parent, 'div', undefined, 'formula');

    const active = rows.filter(row => row.bit === '1');

    if (!active.length)
      add(line, 'span', '0', 'term');

    active.forEach((row, i) => {
      if (i > 0)
        add(line, 'span', ' + ');

      const term = add(
        line,
        'span',
        undefined,
        (type === 'decimal' ? 'long-term' : 'term') +
        (row.i === 0 ? ' negative-weight' : '')
      );

      if (type === 'power')
        power(term, row.exponent, row.i === 0);
      else
        term.textContent =
          exactDecimal(row.contribution, scale);
    });

    if (total !== undefined) {
      add(line, 'span', '=');
      add(line, 'strong', exactDecimal(total, scale), 'long-term');
    }
  }

  function table(parent, r) {
    const wrap = add(parent, 'div', undefined, 'scroll');
    const t = add(wrap, 'table', undefined, 'calc-table');

    const header = add(add(t, 'thead'), 'tr');

    [
      'Bit sorszáma',
      'Bit',
      'Helyiérték',
      'Helyiérték (decimális)',
      'Hozzájárulás'
    ].forEach(label => {
      const th = add(header, 'th', label);
      th.scope = 'col';
    });

    const body = add(t, 'tbody');

    r.rows.forEach(row => {
      const tr = add(
        body,
        'tr',
        undefined,
        (row.bit === '0' ? 'inactive ' : '') +
        (
          row.i === 0
            ? 'sign-row'
            : row.exponent < 0
              ? 'fraction-row'
              : ''
        )
      );

      add(tr, 'td', String(row.i + 1));
      add(tr, 'td', row.bit);

      power(
        add(
          tr,
          'td',
          undefined,
          row.i === 0 ? 'negative-weight' : ''
        ),
        row.exponent,
        row.i === 0
      );

      add(
        tr, 'td',
        exactDecimal(row.coefficient, r.scale)
      );

      add(
        tr, 'td',
        exactDecimal(row.contribution, r.scale)
      );
    });
  }

  function render(r) {
    solution.replaceChildren();
    solution.hidden = false;

    add(solution, 'h2', 'Megoldás');

    // 1. Helyiértékek

    const a = step('1. A helyiértékek meghatározása');

    visualBits(a, r);

    const line = add(a, 'p');

    line.append(document.createTextNode(
      'Kettes komplemensben az első bit helyiértéke negatív: '
    ));

    power(line, r.point - 1, true);

    line.append(document.createTextNode(
      '. A ponttól jobbra a kitevők negatívak. ' +
      'A 0 értékű bitek nem járulnak hozzá az összeghez.'
    ));

    add(
      a,
      'p',
      `Az első bit ${r.bits[0]}, ezért az ábrázolt szám ${
        r.bits[0] === '1'
          ? 'negatív'
          : r.total === 0n
            ? 'nulla'
            : 'pozitív'
      }.`
    );

    table(a, r);

    // 2. Egész rész

    const b = step('2. A pont előtti bitek összege');

    const integerRows = r.rows.slice(0, r.point);

    terms(b, integerRows, r.scale, 'power');

    terms(
      b, integerRows, r.scale, 'decimal', r.integer
    );

    // 3. Törtrész

    const c = step('3. A pont utáni bitek összege');

    if (!r.fractionBits) {
      add(c, 'p', 'Nincs törtbit, így a hozzájárulás 0.');
    }
    else {
      const fractionRows = r.rows.slice(r.point);

      terms(c, fractionRows, r.scale, 'power');

      terms(
        c, fractionRows, r.scale, 'decimal', r.fraction
      );
    }

    // 4. A két rész összeadása

    const d = step('4. A két rész összeadása');

    const sum = add(d, 'div', undefined, 'formula');

    add(
      sum, 'span',
      exactDecimal(r.integer, r.scale),
      'long-term'
    );

    add(sum, 'span', '+');

    add(
      sum, 'span',
      exactDecimal(r.fraction, r.scale),
      'long-term'
    );

    add(sum, 'span', '=');

    add(
      sum, 'strong',
      exactDecimal(r.total, r.scale),
      'long-term'
    );

    if (r.bits[0] === '1' && r.fraction !== 0n) {
      add(
        d,
        'p',
        'Figyelem: negatív számnál is pozitív a törtbitek hozzájárulása. ' +
        'A két értéket összeadjuk, nem kivonjuk.',
        'hint'
      );
    }

    // Végeredmény

    const result = add(
      d, 'div', undefined, 'decode-result'
    );

    add(result, 'span', 'Az ábrázolt decimális szám');

    add(
      result, 'p',
      exactDecimal(r.total, r.scale),
      'result'
    );

    add(
      result, 'p',
      r.bits.slice(0, r.point) + ',' + r.bits.slice(r.point),
      'mono'
    );

    add(
      result, 'p',
      'A számítás pontos, nincs kerekítés.',
      'hint'
    );
  }

  // Megoldás megjelenítése gomb

  form.addEventListener('submit', e => {
    e.preventDefault();

    clearSolution();

    const missing = values.indexOf('');

    if (missing !== -1) {
      error.textContent =
        `A(z) ${missing + 1}. bit még üres. Töltsd ki az összes bitet!`;

      error.hidden = false;
      focusBit(missing);
      return;
    }

    try {
      render(decodeFixed(values.join(''), point));
    }
    catch (err) {
      error.textContent = err.message;
      error.hidden = false;
    }
  });

  // A felület inicializálása
  rebuild();
}
