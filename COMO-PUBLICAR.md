# Publicar o FC 27 Build AI na Vercel (grátis)

A pasta já está pronta (página em `public/`, API em `api/`). Não precisa instalar nada além do Node.

## Opção A — pelo terminal (mais rápida)
1. Abra o terminal DENTRO desta pasta (`vercel-deploy`).
2. `npx vercel login` (faça login com e-mail ou GitHub).
3. `npx vercel --prod` — responda Enter às perguntas (projeto novo, nome `fc27-build-ai`).
4. Ao terminar ele mostra o link `https://fc27-build-ai-xxxx.vercel.app`. Abra no celular ou PC.

## Opção B — pelo site (sem terminal)
1. Crie um repositório no GitHub e envie o CONTEÚDO desta pasta.
2. Em vercel.com → *Add New → Project* → importe o repositório → *Deploy* (sem mudar nada).

## Testar
- Teste automático: `node TESTAR.mjs https://SEU-LINK.vercel.app` (mostra o que a busca real achou; se algo falhar, copie a saída e me envie).
- `https://SEU-LINK/api/health` deve mostrar `{"ok":true,...}`.
- Na página, digite "Henry" ou "Ronaldo" em "1 · Jogador de inspiração".

## Opcional: estatísticas reais (API-Football; só com TheSportsDB de chave própria)
No painel da Vercel → Settings → Environment Variables, crie `API_FOOTBALL_KEY` com a sua chave e faça *Redeploy*.
Esta versão da página usa a API; a chave fica só no servidor da Vercel.

## Observações
- Os jogadores importados ficam salvos no navegador de quem usa (localStorage), como as builds.
- O Prime é uma ESTIMATIVA (posição, corpo, idade e, com a chave, estatísticas), nunca dado oficial.
- A API limita cada IP (30 buscas e 10 importações por minuto).
- A busca usa o Wikidata (base aberta, sem chave). Não foi testada contra o Wikidata real, só com respostas simuladas.

## Conta e builds na nuvem (Supabase)
Esta página já vem com o endereço e a chave PÚBLICA do seu projeto Supabase (`edogtgtowenvtbvgmjke`) embutidos. Não use variáveis de ambiente na Vercel para isso: o arquivo `public/index.html` já está pronto.
Depois de ter o link da Vercel:
1. No Supabase → *Authentication → URL Configuration*: coloque o link da Vercel em **Site URL** e em **Redirect URLs** (sem isso o link do e-mail não volta para o app).
2. Abra a página → aba **Salvas** → "Sua conta" → digite o e-mail → toque no link que chegar. Salve uma build e confira em *Table Editor → builds* no Supabase.
3. O e-mail do plano grátis tem limite de envios por hora; se não chegar, veja o spam e espere alguns minutos.
4. Para a tela **Dados** aparecer para você no site público: abra uma vez `https://SEU-LINK/?admin=SEU_CÓDIGO`.
Nunca coloque a chave `sb_secret_...` (service_role) em nenhum arquivo.
