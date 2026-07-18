# npmlguitar.github.io

Kit de estudo de guitarra (método Antônio Lugão) publicado como site estático — sem build, sem dependências, só HTML/CSS/JS puro. Serve como material pessoal de prática: teoria, rotina semanal e diagramas interativos de braço e de acordes.

## Páginas

| Arquivo | O que é |
| --- | --- |
| `index.html` | Central de estudos — menu de entrada com links para as peças abaixo. |
| `cronograma.html` | Rotina semanal de estudo (construção, pentatônicas, campo/modos, aplicação de arpejos, checklist de cobertura). |
| `fundamentos.html` | Guia de teoria em Dó — arpejos, pentatônica, tétrades, derivação modal e ponte qualidade→modo. |
| `diagramas.html` | Diagrama de braço horizontal interativo para arpejos — escolha o tipo de estudo e a tônica; alterna entre graus (T·3·5…) e nomes de notas reais. |
| `acordes.html` | 12 variações do acorde de Dó (tríade, sétimas, sexta, extensões, diminuto e meio-diminuto) — braço vertical com pestana, dedilhado sugerido e áudio interativo (nota e acorde). |
| `login.html` | Portão de acesso simples (gate) que libera as demais páginas. |

## Acesso

O site é protegido por um login simples baseado em `localStorage` (chave `npml-guitar-auth`), válido por 90 dias por navegador. Não há backend nem autenticação real — é apenas uma barreira leve contra acesso casual, já que o conteúdo é pessoal.

## Tema claro/escuro

Todas as páginas têm um alternador de tema (☀️/🌙) — na barra superior das páginas internas, e no canto da tela em `login.html`. Sem escolha manual, o tema segue a preferência do sistema (`prefers-color-scheme`); ao clicar no alternador, a escolha é salva em `localStorage` (chave `npml-guitar-theme`) e passa a valer em todas as páginas, até ser trocada de novo.

## Diagramas de arpejos

A página `diagramas.html` desenha o braço da guitarra em SVG e mostra **apenas as notas da seleção ativa** (ex.: só T·3·5 no arpejo maior, só as 5 notas da pentatônica). Controles:

- **Seleção de estudo** — tipo de arpejo/escala (maior, menor, pentatônica, tétrades 7M/7/m7/m7♭5).
- **Tônica** — as 12 notas cromáticas.
- **Exibição** — alterna os rótulos dos pontos entre **graus** (T, 3, 5, 7...) e **notas reais** (C, E, G...).
- **Posição (CAGED)** — por padrão, cada nota do braço já vem colorida pela posição CAGED a que pertence (C·A·G·E·D). Para arpejos/tétrades, selecionar uma letra isola o grip real daquela forma (uma nota por corda, tocável com a mão) com uma linha conectando as notas; para a pentatônica, os números 1-5 isolam a caixa de escala ao redor de cada tônica.

## 12 variações de Dó

A página `acordes.html` mostra o acorde de Dó em doze roupagens (tríade, C7, Cm7, C6, Cm6, C7+/maj7, Cm7+, Cadd9, C7(#9), C° e Cø), cada uma como um diagrama de braço vertical: pestana (quando existe) desenhada como barra sólida no dedo 1, demais notas coloridas por função (tônica, 3ª/5ª, 7ª, 6ª/9ª) usando o mesmo esquema de cores dos diagramas de arpejo. Cada card também tem botão de alto-falante para tocar o acorde, e cada nota do diagrama pode ser clicada para tocar individualmente.

## Stack

HTML, CSS e JavaScript vanilla, sem etapa de build e sem dependências locais. Tokens de tema (cores, tipografia, sombra) e os componentes comuns (barra superior, alternador de tema, tipografia base) ficam centralizados em `style.css`, importado por todas as páginas; cada página mantém em seu próprio `<style>` apenas o CSS específico dela (layout de conteúdo e, quando existem, tokens de cor extras como os da grade do braço). Em `acordes.html`, o áudio usa SoundFont via CDN com fallback para síntese WebAudio local. Publicado via GitHub Pages a partir do branch `main`.

## Rodando localmente

Basta abrir os arquivos `.html` direto no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
```

## Checklist de revisão musical e editorial

Use esta lista sempre que alterar textos, tabelas, fórmulas ou exemplos.

- Conferir se os nomes das qualidades batem com as fórmulas:
	- maior = 1 3 5
	- menor = 1 ♭3 5
	- 7M = 1 3 5 7
	- 7 (dominante) = 1 3 5 ♭7
	- m7 = 1 ♭3 5 ♭7
	- m7(♭5) = 1 ♭3 ♭5 ♭7
- Conferir coerência entre campo harmônico, modo e acorde (ex.: em C maior, VI grau = Am7 = Eólio).
- Conferir se os exemplos de aplicação de arpejos usam notas e acordes diatônicos do mesmo campo.
- Conferir se grafia de notas e acidentes está consistente em cada contexto (ex.: usar B♭ quando o texto está em contexto de bemóis).
- Conferir se o texto evita ambiguidade pedagógica e mantém termos consistentes entre páginas (tônica, grau, forma, posição, tétrade, arpejo).
- Conferir se a copy segue o mesmo tom (português BR, direto, didático, sem jargão desnecessário).
- Conferir acessibilidade mínima após mudanças textuais:
	- botões com aria-label quando aplicável
	- foco visível em controles interativos
	- sem depender só de cor para significado
- Testar fluxo funcional após alterações:
	- login válido e redirecionamento para página interna
	- logout redirecionando para login
	- alternância de tema em todas as páginas
	- persistência de checklists no localStorage
	- renderização dos diagramas em desktop e mobile

Critério final: conteúdo musical coerente + texto claro + interface consistente.
