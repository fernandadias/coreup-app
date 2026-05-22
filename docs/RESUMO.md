# CoreUp — Resumo executivo

Snapshot rápido: o plano, o que ficou pronto, o que falta. Para detalhes, ver `docs/PLAN.md` e `STATUS.md`.

## O plano (7 fases)

| # | Fase | Status |
|---|---|---|
| 0 | Bootstrap Expo + Storybook | ✅ feito |
| 1 | NativeWind + 5 tabs + fontes | ✅ feito |
| 2 | Types + store Zustand + AsyncStorage + seed + selectors | ✅ feito |
| 3 | Home + Workouts + Execute end-to-end (happy path) | ✅ feito |
| 4 | Evolution + Achievements + Profile | ⬜ não começou |
| 5 | EAS Build + TestFlight | ⬜ não começou |
| 6 | Polish + extração de DS iterativa | ⬜ não começou |
| 7 | Sentry + analytics + backend + push | ⬜ não começou |

## O que ficou faltando (não foi implementado)

**Fase 4 — telas secundárias**
- Evolution (gráfico de peso/bodyfat 6 meses, heatmap 30 dias, lista de medidas)
- Achievements (grid de medalhas bronze/prata/ouro, unlocks calculados a partir do histórico)
- Profile (dados do user, settings list)

**Fase 5 — empacotar e publicar**
- `eas.json`, profiles dev/preview/prod
- Bundle iOS + submit pro TestFlight
- Expo Updates (OTA)

**Fase 6 — polimento**
- Animações (pulse-glow no streak, scale-pop no toast de PR)
- Extrair tokens repetidos para `@apply` ou componentes em `src/ds/`
- Pixel-perfect pass usando legacy-prototype como referência
- Integrar NativeWind no Storybook
- Tela de reset / botão de logout (hoje só dá pra resetar apagando o app)

**Fase 7 — produção real**
- Sentry, analytics, push notifications, backend, auth, coach feedback real

## O que falta do seu lado (do que já está pronto)

### Testar em device
Tudo das Fases 1–3 passou em `tsc`, `lint` e bundle web, mas **nada foi rodado em iPhone/Android**. Vale fazer o happy path inteiro (`npm start` + Expo Go):

1. Abre → vê Home com streak 0 + treino A
2. "Iniciar treino" → preenche sets → timer aparece → conclui treino
3. Volta pra Home → streak vira 1, semana mostra dia preenchido
4. Mata e reabre o app → estado persistiu

### Decisões e contas externas pendentes

**Para Fase 5 (TestFlight)**
- Conta Apple Developer (US$ 99/ano)
- Bundle ID definitivo (ex: `com.coreup.app`)
- Ícone + splash screen reais (hoje são placeholders do Expo)
- Privacy policy publicada em URL
- App Store listing: nome, descrição, screenshots, categoria

**Para Fase 6 / 7**
- Confirmar licença da fonte Genos (Google Fonts → OFL, em tese liberado)
- Figma oficial se for além do `legacy-prototype`
- Decidir backend: Supabase, Firebase ou próprio
- Como o coach manda feedback (texto, mensagem, vídeo?)
- Onboarding: como o user recebe o split A/B/C/D no primeiro acesso? Coach cadastra? Tem template?
- Auth: login obrigatório ou opcional?
- Quais push notifications ativar (lembrete de treino, mensagem de coach, novo PR…)
