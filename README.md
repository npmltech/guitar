# npmlguitar.github.io

Kit de estudo de guitarra (método Antônio Lugão) publicado como site estático — sem build, sem dependências, só HTML/CSS/JS puro. Serve como material pessoal de prática: teoria, rotina semanal e diagramas interativos de braço.

## Páginas

| Arquivo | O que é |
| --- | --- |
| `index.html` | Central de estudos — menu de entrada com links para as três peças abaixo. |
| `cronograma.html` | Rotina semanal de estudo (construção, pentatônicas, campo/modos, aplicação de arpejos, checklist de cobertura). |
| `fundamentos.html` | Guia de teoria em Dó — arpejos, pentatônica, tétrades, derivação modal e ponte qualidade→modo. |
| `diagramas.html` | Diagrama de braço horizontal interativo para arpejos — escolha o tipo de estudo e a tônica; alterna entre graus (T·3·5…) e nomes de notas reais. |
| `login.html` | Portão de acesso simples (gate) que libera as demais páginas. |

## Acesso

O site é protegido por um login simples baseado em `localStorage` (chave `npml-guitar-auth`), válido por 90 dias por navegador. Não há backend nem autenticação real — é apenas uma barreira leve contra acesso casual, já que o conteúdo é pessoal.

## Diagramas de arpejos

A página `diagramas.html` desenha o braço da guitarra em SVG e mostra **apenas as notas da seleção ativa** (ex.: só T·3·5 no arpejo maior, só as 5 notas da pentatônica). Controles:

- **Seleção de estudo** — tipo de arpejo/escala (maior, menor, pentatônica, tétrades 7M/7/m7/m7♭5).
- **Tônica** — as 12 notas cromáticas.
- **Exibição** — alterna os rótulos dos pontos entre **graus** (T, 3, 5, 7...) e **notas reais** (C, E, G...).
- **Posição (CAGED)** — por padrão, cada nota do braço já vem colorida pela posição CAGED a que pertence (C·A·G·E·D). Para arpejos/tétrades, selecionar uma letra isola o grip real daquela forma (uma nota por corda, tocável com a mão) com uma linha conectando as notas; para a pentatônica, os números 1-5 isolam a caixa de escala ao redor de cada tônica.

## Stack

HTML, CSS e JavaScript vanilla, sem dependências ou etapa de build. Publicado via GitHub Pages a partir do branch `main`.

## Rodando localmente

Basta abrir os arquivos `.html` direto no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
```
