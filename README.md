# CoreUp

Aplicativo fitness focado em consistência: streak de treinos, progresso semanal,
feedback de coach e conquistas. iOS, Android e web a partir de uma mesma base.

## Stack

- **Expo SDK 54** + **React Native 0.81** + **React 19**
- **Expo Router** (navegação file-based)
- **TypeScript** estrito
- **CoreUpDS** — design system próprio (tokens + componentes), documentado em Storybook

## Rodando

```sh
npm install
npm run web      # iterar no navegador
npm run ios      # simulador iOS (requer Xcode)
npm run android  # emulador Android (requer Android Studio)
npm start        # servidor Expo + QR code pro Expo Go no celular
```

## Estrutura

```
app/              # rotas Expo Router (home, workouts, …)
components/       # componentes de tela (compostos)
src/
  tokens/         # fonte da verdade de design tokens
  ds/             # CoreUpDS — componentes primitivos do design system
constants/        # configs
hooks/            # hooks compartilhados
assets/           # fontes, imagens, ícones
legacy-prototype/ # protótipo HTML original, mantido como referência visual
```

## Protótipo legado

Referência visual da iteração anterior (HTML + React via Babel Standalone):

```sh
cd legacy-prototype
python3 -m http.server 8000
# http://localhost:8000/CoreUp.html
```

## Roadmap

Fase 0 — Bootstrap Expo + Storybook (em andamento)
Fase 1 — Tokens (primitives + semantic)
Fase 2 — Componentes CoreUpDS
Fase 3 — Home pixel-perfect a partir do Figma
Fase 4 — Documentação de handoff
