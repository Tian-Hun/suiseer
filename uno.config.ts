import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            collections: {
                'game-icons': () => import('@iconify-json/game-icons/icons.json').then((m) => m.default as any),
            }
        }),
    ],
});
