# MISSÃO: Landing Page de Vendas Premium — Hugo Silva (@hugosilvaprodutor)

## CONTEXTO
Hugo Silva é produtor/compositor tier S do sertanejo brasileiro. Créditos: Luan Santana, Luan Pereira, Matheus e Kauan, Felipe Araújo, Fernando e Sorocaba, MC Hariel. 133K seguidores no Instagram. Tracks confirmadas: "Eu Sou Sentimento" (Luan Santana + Luan Pereira), "Pega Escandaloso" (Luan Santana + MC Kevin O Chris).

Esta LP é o PRODUTO que entregaremos ao Hugo — onde artistas chegam via tráfego pago e viram leads dele. É diferente da proposta (que já está em wesleydantas.app/proposta/hugosilvaprodutor/).

**Estratégia:** entregar esta LP como overdelivery na reunião. Valor percebido R$10K. Fecha contrato por R$7K + fee mensal.

---

## ETAPA 1 — INTELIGÊNCIA DE MERCADO (FireCrawl)

Usar FireCrawl para raspar 3-5 sites de produtores musicais premium (preferencialmente gringos, nível alto de design):

### Sites para raspar (buscar e raspar os melhores entre estes):
1. Produtores musicais de Nashville/LA com sites premium (buscar "music producer website" top results)
2. Sites de estúdios de gravação premium (mixing/mastering studios)
3. Sites de compositores/songwriters com portfólio visual
4. Sites de produtores que vendem beats/sessions online

### O que extrair de cada:
- **Layout completo** (estrutura de seções, ordem, hierarquia)
- **Design tokens** (cores, tipografia, espaçamentos)
- **Copy patterns** (como apresentam créditos, depoimentos, CTA)
- **Elementos visuais** (hero style, player embeds, portfólio grid)
- **Animações e efeitos** (scroll, hover, transitions)
- **SEO structure** (meta tags, heading hierarchy, schema markup)

### Sintetizar Blueprint:
Após raspar, gerar documento `blueprint-hugo-silva.md` com:
- O que TODOS os melhores sites têm em comum
- O que os diferencia (unique elements)
- Gaps que podemos explorar (o que ninguém faz mas deveria)
- Recomendação final de estrutura para o Hugo

---

## ETAPA 2 — EXTRAÇÃO DE DESIGN SYSTEM (Método Vibe Design / Asimov)

Do site referência mais premium que o FireCrawl trouxe, extrair design system completo:

### Gerar `design-system-hugo.html` com:

```
DESIGN SYSTEM — Hugo Silva Producer
├── Typography
│   ├── Display font (títulos hero — algo bold, premium, com personalidade)
│   ├── Body font (texto corrido — legível, moderna)
│   ├── Mono font (detalhes técnicos, créditos)
│   ├── Scale completa (h1→h6 com rem + weights)
│   └── Letter-spacing e line-height por nível
├── Colors
│   ├── Background primary (dark — preto/grafite profundo)
│   ├── Background secondary (dark variant)
│   ├── Text primary (branco/off-white)
│   ├── Text secondary (cinza claro)
│   ├── Accent primary (dourado/amber — luxo, música)
│   ├── Accent secondary (complementar)
│   ├── Glass surface (rgba com blur)
│   ├── Error/Success tokens
│   └── Gradients (mesh gradient pro hero?)
├── Components
│   ├── Buttons (primary CTA, secondary, ghost, play button)
│   ├── Cards (glassmorphism — backdrop-blur, border sutil)
│   ├── Music player embed style
│   ├── Portfólio grid (artistas produzidos)
│   ├── Testimonial cards
│   ├── Stats/numbers (streams, tracks, artistas)
│   ├── Contact form / CTA WhatsApp
│   └── Navigation (transparente, sticky on scroll)
├── Effects
│   ├── Glassmorphism (backdrop-filter: blur + bg rgba)
│   ├── Glow effects (accent color glow em CTAs)
│   ├── Grain/noise overlay (textura sutil)
│   ├── Hover states (scale, glow, reveal)
│   ├── Scroll-triggered animations (GSAP ou CSS)
│   └── Parallax layers
└── Layout
    ├── Max-width container
    ├── Section spacing
    ├── Grid: 12 columns
    ├── Breakpoints (mobile-first: 375, 768, 1024, 1440)
    └── Aspect ratios (hero 16:9, cards 4:3, avatar 1:1)
```

---

## ETAPA 3 — BUILD DA LANDING PAGE

### Stack:
- **React + Tailwind CSS** (mesmo stack da proposta existente)
- **GSAP** para animações scroll-triggered
- **Three.js ou CSS 3D** para elemento hero (se Nano Banana 2 não estiver disponível, criar efeito 3D via código)
- **Mobile-first** (90%+ tráfego será mobile via Meta Ads)

### Estrutura de Seções:

```
1. HERO
   - Vídeo/animação 3D de fundo (studio, ondas sonoras, equalizer)
   - Headline: "O Produtor Por Trás dos Maiores Hits do Brasil"
   - Sub: créditos em texto animado (Luan Santana, Felipe Araújo...)
   - CTA principal: "Agende Sua Sessão" → WhatsApp
   - Stats animados: [X hits] [X artistas] [X milhões streams]

2. CREDENCIAIS / SOCIAL PROOF
   - Logos ou fotos dos artistas produzidos (grid visual)
   - Número de streams total
   - Selos: Sony Music, etc
   - Animação: scroll reveal staggered

3. PRODUÇÕES EM DESTAQUE
   - Player embeds (Spotify/YouTube) dos maiores hits
   - Card pra cada track: capa + artista + nome + stats
   - Glassmorphism cards com hover glow
   - Filtro por gênero/artista (se fizer sentido)

4. COMO FUNCIONA (O Processo)
   - 3-4 steps visuais do processo de produção
   - Ícones animados
   - Timeline ou cards horizontais com scroll
   - Objetivo: desmistificar, mostrar profissionalismo

5. DEPOIMENTOS
   - Quotes de artistas (se disponível)
   - Cards glassmorphism com foto + nome + quote
   - Carousel ou grid

6. SOBRE HUGO
   - Foto profissional
   - Bio curta, direta
   - Números da carreira
   - Personalidade: profissional mas acessível

7. PACOTES / SERVIÇOS (opcional — depende se Hugo quer mostrar preço)
   - Produção completa
   - Beat/instrumental
   - Mix & Master
   - Composição sob demanda
   - Cards com hover effect

8. CTA FINAL
   - Headline urgente: "Próxima vaga disponível em [mês]"
   - Formulário simples OU botão WhatsApp direto
   - Escassez real (limitar sessões por mês)

9. FOOTER
   - Redes sociais
   - Instagram embed ou link
   - Spotify artist profile
   - Copyright
```

### Integrações obrigatórias:
- **Pixel Meta** (código do pixel — solicitar ao Wesley ou usar placeholder)
- **Google Analytics 4** (GA4 — mesmo)
- **WhatsApp CTA** (link direto: wa.me/55XXXXXXXXXXX)
- **Spotify embeds** (tracks do Hugo)
- **Open Graph tags** (preview bonito quando compartilhar link)
- **Schema markup** (MusicProducer, LocalBusiness)

### Regras de Design (NÃO NEGOCIÁVEIS):
- **NUNCA** usar Inter, Roboto, Arial — escolher fonts premium (ex: Clash Display, Satoshi, General Sans)
- **Dark theme** obrigatório — combina com indústria musical
- **Glassmorphism** como linguagem visual principal
- **Dourado/amber** como accent — luxo + música
- **Grain overlay** sutil no background — textura analógica
- **Animações fluidas** — GSAP scroll triggers, não CSS transitions genéricas
- **Espaçamento generoso** — premium respira
- **Mobile-first** — testar em 375px primeiro

---

## ETAPA 4 — DEPLOY

1. Build production: `npm run build`
2. Copiar dist para VPS: `/docker/wesleydantas-site/html/hugosilvaprodutor/`
3. Testar: `wesleydantas.app/hugosilvaprodutor/`
4. Validar mobile (Chrome DevTools → responsive)
5. Validar Pixel Meta (Meta Pixel Helper extension)
6. Validar GA4 (Realtime → verificar pageview)
7. Validar Open Graph (opengraph.xyz)

---

## ETAPA 5 — ITERAÇÃO

Após feedback do Hugo:
- Ajustar copy, fotos, cores baseado no que ele pedir
- Usar portal Notion pra gerenciar mudanças futuras
- A cada ajuste: build → deploy → validar

---

## ARQUIVOS DE REFERÊNCIA NO PROJETO

Consultar estes arquivos antes de começar:
- `clientes/produtor/hugo-silva/profile.json` — dados completos do Hugo
- `clientes/produtor/hugo-silva/assets/fotos/` — fotos disponíveis
- `clientes/produtor/hugo-silva/landing-page/` — proposta existente (referência de stack)
- Pasta `sites-premium/` → CLAUDE.md com processo FireCrawl + build
- `agentes-ia/asimov-ai-designer-guia-completo.md` — método Vibe Design completo

---

## COMANDO DE EXECUÇÃO

Executar na ordem:
1. `firecrawl` → raspar 3-5 sites produtores premium
2. `blueprint` → sintetizar documento de inteligência
3. `design-system` → extrair design system da melhor referência
4. `build` → construir LP com React + Tailwind + GSAP
5. `audit` → rodar Skill UI/UX Pro (SEO + acessibilidade)
6. `deploy` → mandar pro VPS
7. `validate` → testar pixel, GA4, mobile, OG tags

---

*LP Hugo Silva v1.0 — Sites Premium × Content Machine × Asimov Method*
*Stack: FireCrawl + Claude Code + React + Tailwind + GSAP + Glassmorphism*
