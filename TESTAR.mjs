// Teste rápido do site publicado. Uso:  node TESTAR.mjs https://SEU-LINK.vercel.app
// Mostra o que a busca real encontrou (Wikidata). Copie a saída e me mande se algo falhar.
const base = (process.argv[2] || '').replace(/\/$/, '');
if (!base) { console.log('Uso: node TESTAR.mjs https://SEU-LINK.vercel.app'); process.exit(1); }
const get = async (path) => { const t = Date.now(); const r = await fetch(base + path); let j = null; try { j = await r.json(); } catch {} return { status: r.status, ms: Date.now() - t, j }; };
let falhas = 0;
const ok = (c, msg) => { console.log((c ? '  ✔ ' : '  ✘ ') + msg); if (!c) falhas++; };

console.log('Saúde da API'); const h = await get('/api/health'); ok(h.status === 200 && h.j?.ok, `/api/health → ${h.status}`);

const casos = [
  ['Thierry Henry', /thierry/i, 'deve achar Thierry Henry (não só Karl Henry)'],
  ['Henry', /thierry/i, 'busca só "Henry" deve listar Thierry entre as opções'],
  ['Ronaldo Fenomeno', /ronaldo/i, '"Ronaldo Fenomeno" deve achar algum Ronaldo'],
  ['Ronaldo Nazario', /naz[aá]rio/i, 'Ronaldo Nazário'],
  ['Zidane', /zidane/i, 'Zinédine Zidane'],
  ['Maldini', /maldini/i, 'Paolo Maldini'],
  ['Van Dijk', /dijk/i, 'Virgil van Dijk'],
];
for (const [q, re, desc] of casos) {
  console.log(`\nBusca: "${q}"`);
  const r = await get('/api/players/search?q=' + encodeURIComponent(q));
  const cands = r.j?.candidates ?? [];
  ok(r.status === 200, `status ${r.status} em ${r.ms} ms`);
  ok(cands.length > 0, `${cands.length} opção(ões)`);
  cands.slice(0, 6).forEach((c) => console.log('     · ' + [c.name, c.nationality, c.birthDate?.slice(0, 4), c.description].filter(Boolean).join(' — ')));
  ok(cands.some((c) => re.test(c.name || '')), desc);
}
console.log(falhas ? `\n${falhas} verificação(ões) falharam — me envie esta saída.` : '\nTudo certo.');
process.exit(falhas ? 1 : 0);
