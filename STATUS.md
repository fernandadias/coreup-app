# CoreUp — Status

Documento vivo. Atualizado a cada fase concluída.

Plano completo: `/root/.claude/plans/isso-mas-vamos-planejar-crispy-pie.md`

## Roadmap

- [x] **Fase 0** — Bootstrap Expo SDK 54 + TypeScript + Storybook
- [x] **Fase 1** — NativeWind + esqueleto de 5 tabs + fontes (Genos + Inter)
- [x] **Fase 2** — Types + store Zustand com persist (AsyncStorage) + seed + selectors
- [x] **Fase 3** — Home + Workouts list + Execute end-to-end
- [ ] **Fase 4** — Evolution + Achievements + Profile (próxima)
- [ ] **Fase 5** — EAS Build + TestFlight
- [ ] **Fase 6** — Polish + extração de DS iterativa
- [ ] **Fase 7** — Observabilidade + features avançadas

---

## Implementado mas ainda não testado em device real

Tudo abaixo passa por `tsc --noEmit`, `expo lint`, e (quando aplicável) compila o bundle web no Metro. Mas **nada foi rodado em iPhone/Android físico nem no simulador** ainda.

### Fase 1
- Carregamento de fontes Genos + Inter via `@expo-google-fonts/*` com splash gate — só validado que o CSS gerado contém as font-families corretas.
- Navegação entre as 5 tabs (home, workouts, evolution, achievements, profile) — sem render em device.
- Aplicação das classes NativeWind (`bg-bg-0`, `text-fg-0`, `font-display`, etc.) — validado via CSS gerado, não via pixel.
- Status bar e cores de fundo da tab bar.

### Fase 2
- `startSession`, `logSet`, `completeSession`, `cancelSession`, `reset` do store.
- Persistência em AsyncStorage (rehidratação via `_hasHydrated`).
- Recálculo de streak: +1 dia seguinte, reset se gap > 1, no-op no mesmo dia.
- Detecção de PR: `loadKg > historicalBest && loadKg > sessionBestSoFar`.
- Recálculo de progresso e desbloqueio automático de achievements.
- Selectors: `getTodayWorkout`, `getWeekProgress`, `getCurrentStreak`, `getTotalCompletedSessions`, `getTotalPRs`, `getActiveSession`, `getWeekDoneCount`.

Nada disso tem testes unitários ainda.

### Fase 3
- **Home** (`app/(tabs)/home.tsx`): saudação personalizada, `StreakCard`, `TodayWorkoutCard` com botão "Iniciar treino", `WeekProgressGrid` Seg–Dom, banner de sessão em andamento.
- **Workouts** (`app/(tabs)/workouts.tsx`): stats da semana/total, lista dos 4 treinos com badge "Hoje" + último registro, tap navega pra Execute.
- **Execute** (`app/execute/[workoutId].tsx`):
  - Cria ou retoma sessão automaticamente ao abrir.
  - Header com progresso de sets (X/Y) + barra de progresso.
  - Cards de exercício com `series` linhas de input (kg × reps).
  - Default da linha vem do `targetLoadKg` e `targetReps` do exercício.
  - "Concluir set" → grava no store → dispara rest timer flutuante.
  - Rest timer com pausa, retomar, pular e barra de progresso.
  - Badge "PR" aparece automaticamente na linha quando o load supera o histórico.
  - Botão "Concluir treino" aparece quando todos os sets estão completos → atualiza streak, achievements, e mostra toast de PR (se houver) antes de voltar pra Home.
  - Cancelar pede confirmação e descarta a sessão em andamento.
- **Rest timer** (`src/hooks/useRestTimer.ts`): hook standalone com `start/pause/resume/skip/reset`, cleanup do interval no unmount.
- **Splash gate**: aguarda fontes carregarem **e** o store hidratar do AsyncStorage antes de mostrar a UI (evita piscar com dados vazios).
- Rota Execute registrada como modal full-screen no Stack root (sem tab bar).

Limitações conhecidas que vão pra Fase 6:
- Sem animação de pulse-glow no streak card / hero (planejado pro Reanimated).
- Sem animação de scale-pop no toast de PR.
- Toast de PR só aparece no momento de concluir o treino (não em tempo real ao bater o set).

---

## Pendente do seu lado (Fernanda)

Itens que dependem de decisão, conta externa ou input que eu não posso resolver sozinha. Marquei prioridade (quando vai ser bloqueio).

### Pra Fase 5 (TestFlight)
- **Conta Apple Developer** ($99/ano) — bloqueia o primeiro build iOS.
- **Conta Google Play Console** ($25 único) — só bloqueia se quiser lançar Android.
- **Bundle identifier**: definir algo tipo `com.coreup.app` (precisa ser único na App Store, então confirmar disponibilidade).
- **Ícone do app** e **splash screen** definitivos (hoje são os placeholders do template Expo).
- **App Store Connect**: nome do app, subtítulo, descrição, palavras-chave, categoria, idade indicativa, screenshots em pelo menos 3 tamanhos.
- **Privacy policy** publicada em URL pública — App Store exige.

### Pra Fase 6 (polish)
- **Figma oficial** ou outra fonte de verdade pixel-perfect (se for além do `legacy-prototype`).
- **Licença Genos**: confirmar que pode usar comercialmente (Google Fonts → OFL, em tese liberado, mas vale checar o EULA).

### Pra Fase 7 (avançado)
- **Backend**: decidir se vamos com Supabase, Firebase, ou backend próprio (afeta coach feedback real, sync entre devices, login).
- **Sentry**: criar conta + projeto, gerar DSN. (Grátis até certo volume.)
- **Analytics**: escolher PostHog / Amplitude / Mixpanel.
- **Conteúdo de coach**: como o coach vai mandar feedback? Texto pré-cadastrado, mensagem direta, vídeo? Modelo de relacionamento aluno↔coach.
- **Onboarding**: o usuário começa sem nenhum treino. Como ele recebe o split A/B/C/D? Coach cadastra? Tem template? Hoje o seed assume Joaquina já existindo.

### Decisões de produto pendentes
- **Notificações push**: lembrete de treino, coach mandando mensagem, novo PR — quais ativar?
- **Onboarding flow**: primeiro acesso → criar conta? Login? Pular tudo?
- **Login/auth**: precisa ter? Quando? (Sem login não dá pra ter coach real nem sync.)

---

## Configurações que JÁ estão prontas

- `tailwind.config.js` com todos os design tokens do `legacy-prototype` (cores, fontes, radii)
- `babel.config.js` + `metro.config.js` pro NativeWind
- `tsconfig.json` em modo estrito
- `app.json` com nome "CoreUp", slug "coreup-app", scheme "coreup", new arch habilitado
- Storybook configurado (Vite + react-native-web) — integração com NativeWind deferida pra Fase 6

---

## Como rodar localmente

```sh
npm install
npm run web        # browser
npm run ios        # simulador (precisa Xcode)
npm run android    # emulador (precisa Android Studio)
npm start          # Expo dev + QR code pro celular físico via Expo Go
npm run storybook  # design system playground
```
