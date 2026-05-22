# CoreUp — Plano funcional-first (substitui Fases 1-4 do README)

## Contexto

O plano original do README era design-system-first: tokens → componentes → telas. Decidimos inverter para **telas funcionando → DS extraído do uso real**, com a premissa "incrivelmente fácil e bom de usar". O objetivo é chegar a um app testável (inclusive em TestFlight) antes de investir em DS formal.

Estado atual: Fase 0 fechada (Expo SDK 54 + RN 0.81 + React 19 + Expo Router + Storybook 10). Existe `legacy-prototype/` como referência visual concreta (paleta lime `#D4FF3A`, Genos italic, dark `#09090B/#1A1A1F`, radii 12/16/9999) e funcional (telas: home, workouts, execute, evolution, achievements, profile + `data.jsx` com modelo de dados).

## Decisões técnicas

- **Styling:** NativeWind (Tailwind no RN) + componentes próprios. Sem lib de componentes prontos.
- **Persistência:** AsyncStorage (`@react-native-async-storage/async-storage`). Migra pra `expo-sqlite` se queries de histórico ficarem complexas.
- **Estado:** Zustand (leve, sem boilerplate, persistência simples com middleware) — opcional, pode começar com Context+useReducer e migrar.
- **Navegação:** Expo Router file-based, já configurado.
- **Charts:** `react-native-svg` + componentes próprios (sem Victory/Skia ainda).
- **EAS Build / TestFlight:** depois do MVP local rodar (Fase 5).
- **Crash reporting / analytics:** Sentry + PostHog (ou similar) — Fase 6.

## Core features (happy path do MVP)

1. Abrir app → Home com **streak** + **treino de hoje** + progresso da semana
2. Tocar "Iniciar treino" → Execute screen
3. Logar sets (load/reps) com **rest timer** auto entre séries
4. Detecção de PR → toast "Novo recorde"
5. Concluir → volta pra Home com streak atualizado e sessão persistida

---

## Fases

### Fase 1 — Esqueleto navegável + NativeWind
**Deliverable:** app abre, 5 tabs navegam, NativeWind aplica classes.

- Instalar `nativewind` + `tailwindcss`, configurar `tailwind.config.js`, `babel.config.js`, `global.css`, `nativewind-env.d.ts`
- Configurar tema Tailwind com tokens do legacy: cores (`brand`, `bg`, `fg`, `tier-bronze/silver/gold`), fontFamily (`display: Genos`, `sans: Inter`, `mono`), radii, animations
- Carregar fontes Genos + Inter via `expo-font` no `app/_layout.tsx`
- Trocar template `app/(tabs)/` (atualmente `index.tsx` + `explore.tsx`) por 5 rotas: `home`, `workouts`, `evolution`, `achievements`, `profile` com placeholders mínimos
- Remover `components/themed-*`, `hello-wave.tsx`, `parallax-scroll-view.tsx` (template Expo) — não vamos usar
- Adicionar 1 story no Storybook validando uma classe NativeWind

**Critical files:**
- `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/*.tsx` (5 rotas)
- `tailwind.config.js`, `babel.config.js`, `global.css` (novos)
- `metro.config.js` (novo, pra NativeWind)

### Fase 2 — Modelo de dados + store + seed
**Deliverable:** types completos, store Zustand persistido, dados de seed espelhando `legacy-prototype/data.jsx`.

- `src/types/` com `Workout`, `Exercise`, `Session`, `SetLog`, `Streak`, `Achievement`, `Measurement`, `User`
- `src/store/` com slices: `userSlice`, `workoutsSlice` (catálogo do split A/B/C/D), `sessionsSlice` (histórico), `streakSlice`, `achievementsSlice`
- Middleware `persist` do Zustand → AsyncStorage
- `src/seed/` com dados iniciais (split ABC, 1 user, streak começando do 0)
- Selectors derivados: `getTodayWorkout`, `getWeekProgress`, `getCurrentStreak`, `detectPR`

**Critical files:**
- `src/types/index.ts`
- `src/store/index.ts` + slices
- `src/seed/initial.ts`

### Fase 3 — Home + Workouts list + Execute end-to-end
**Deliverable:** happy path inteiro funciona — abre, escolhe treino, executa, salva, streak atualiza.

- **Home (`app/(tabs)/home.tsx`):** card de streak, card de "treino de hoje" (com botão Iniciar), grid de progresso semanal (7 dias)
- **Workouts (`app/(tabs)/workouts.tsx`):** lista os 4 treinos do split (A/B/C/D), stats da semana
- **Execute (`app/execute/[workoutId].tsx`):** dynamic route (fora das tabs), lista exercícios, inputs de load/reps por set, botão "concluir set" → dispara rest timer, ao final salva session + atualiza streak + detecta PR (toast)
- Componentes locais por tela em `components/screens/<screen>/` — sem promover pra DS ainda
- Rest timer: hook `useRestTimer` (useState + setInterval, cleanup correto)
- PR detection: comparar `setLog.load` vs `exercise.previousLoad` no momento de salvar

**Critical files:**
- `app/(tabs)/home.tsx`, `app/(tabs)/workouts.tsx`
- `app/execute/[workoutId].tsx`, `app/execute/_layout.tsx`
- `components/screens/home/*`, `components/screens/execute/*`
- `src/hooks/useRestTimer.ts`

### Fase 4 — Telas secundárias
**Deliverable:** Evolution, Achievements, Profile funcionais com dados reais do store.

- **Evolution:** gráfico simples de peso (6m) com `react-native-svg`, heatmap 30 dias (grid de divs), measurements list
- **Achievements:** grid de medalhas, cálculo de unlock a partir de `sessions` (ex: 30 dias seguidos → ouro de constância)
- **Profile:** dados do user, settings list (placeholders)

**Critical files:**
- `app/(tabs)/evolution.tsx`, `app/(tabs)/achievements.tsx`, `app/(tabs)/profile.tsx`
- `components/screens/evolution/Chart.tsx`, `Heatmap.tsx`
- `src/logic/achievements.ts` (calcula unlocks)

### Fase 5 — EAS Build + TestFlight
**Deliverable:** build iOS no TestFlight, instalável no celular.

- Conta Apple Developer ativa (pré-requisito do usuário)
- `eas.json` com profiles `development`, `preview`, `production`
- `eas build --platform ios --profile preview`
- `eas submit --platform ios` → App Store Connect → TestFlight internal testers
- Configurar Expo Updates (OTA) pra empurrar bundle sem re-submit
- Bundle identifier, ícone, splash, privacy manifest mínimo

**Critical files:**
- `eas.json`, `app.json` (ios.bundleIdentifier, android.package, runtimeVersion)
- `assets/icon.png`, `assets/splash.png` (substituir defaults)

### Fase 6 — Polish + DS iterativo
**Deliverable:** tokens extraídos, componentes recorrentes promovidos pro DS, pixel-perfect pass.

- Auditar repetições de className → extrair pra `@apply` em `global.css` ou componentes em `src/ds/`
- Promover componentes: `Card`, `Button`, `Pill`, `StatBlock`, `ProgressGrid`, `Toast` — cada um com story
- Animations: Reanimated pra pulse-glow do streak, scale-pop pra unlock
- Pixel-perfect pass tela a tela usando o `legacy-prototype` como referência

### Fase 7 — Observabilidade + features avançadas (backlog)
- Sentry (`sentry-expo`)
- Analytics (PostHog/Amplitude)
- Coach feedback real (provavelmente requer backend → Supabase)
- Push notifications de lembrete de treino

---

## Reuso do que já existe

- `legacy-prototype/data.jsx` — modelo mental dos entities (copiar estrutura)
- `legacy-prototype/styles.css` — fonte dos tokens visuais
- `legacy-prototype/screen-*.jsx` — referência visual + lógica de cada tela
- `legacy-prototype/charts.jsx` — referência de implementação de gráfico SVG
- Storybook (já configurado) — usar pra iterar componentes promovidos na Fase 6

## Limpeza do template Expo

Remover assim que tiver substituto:
- `components/themed-text.tsx`, `themed-view.tsx`, `hello-wave.tsx`, `parallax-scroll-view.tsx`, `external-link.tsx`, `haptic-tab.tsx`
- `components/ui/` (ícones do template)
- `hooks/` (provavelmente todos do template)
- `constants/` (theme do template — vai virar Tailwind config)
- `app/(tabs)/explore.tsx`, `app/modal.tsx`

## Verificação por fase

- **Fase 1:** `npm run web` abre app, navega entre 5 tabs, classe NativeWind (`bg-brand text-fg`) renderiza. `npm run storybook` abre.
- **Fase 2:** store reseta no reload? Não — AsyncStorage persiste. `getTodayWorkout()` retorna workout A no primeiro acesso.
- **Fase 3:** abrir app → tocar Iniciar → logar 2 exercícios → concluir → voltar pra Home → streak == 1, semana mostra 1 dia marcado. Reabrir app → streak persistido.
- **Fase 4:** Evolution renderiza gráfico sem crash mesmo com poucos dados. Achievement de "primeiro treino" desbloqueia após Fase 3 happy path.
- **Fase 5:** build sobe em TestFlight, instala em iPhone real, happy path funciona em device.
- **Fase 6:** todos componentes do DS têm story, `legacy-prototype` aberto lado-a-lado bate visualmente.

## Riscos / decisões em aberto

- **Genos italic:** verificar se está disponível no Google Fonts ou se precisa licenciar. Se não rolar, escolher alternativa display similar (Bebas, Anton, Archivo Narrow).
- **NativeWind + Reanimated 4:** validar compatibilidade no SDK 54 — pode precisar de versão específica.
- **Apple Developer account:** bloqueio externo pra Fase 5, melhor iniciar o processo durante Fase 3-4.
