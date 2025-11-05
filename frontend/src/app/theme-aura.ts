import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura'; // Puedes usar otro preset si lo prefieres
// import Material from '@primeuix/themes/material';
// import Lara from '@primeuix/themes/lara';
// import Nora from '@primeuix/themes/nora';

export const ThemeAura = definePreset(Aura, {
  semantic: {
    primary: palette('{sky}')
  }
});

