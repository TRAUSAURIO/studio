export type ThemeType = 'midnight-romance' | 'cinematic-love' | 'golden-hour' | 'starlit-night' | 'rose-garden' | 'romantic-aurora' | 'parchment' | 'luxury-white';
export type ParticleType = 'gold-dust' | 'hearts' | 'petals' | 'stars' | 'snow' | 'glitter' | 'sparks';
export type FontStyle = 'cursive' | 'parchment' | 'serif' | 'cinematic' | 'clean' | 'glow';
export type AmbientSoundType = 'none' | 'heartbeat' | 'rain' | 'wind';

export interface ExperienceData {
  title: string;
  name: string;
  senderName: string;
  senderIsCursive: boolean;
  specialDate: string;
  message: string;
  secretMessage: string;
  youtubeId: string;
  imageUrl?: string;
  theme: ThemeType;
  particles: ParticleType;
  fontStyle: FontStyle;
  // Font sizes in px
  titleFontSize: number;
  nameFontSize: number;
  messageFontSize: number;
  secretFontSize: number;
  // Extra details
  confettiStrength: number;
  showDate: boolean;
  ambientSound: AmbientSoundType;
}

export const DEFAULT_EXPERIENCE: ExperienceData = {
  title: 'Nuestra Eternidad',
  name: 'Mi Amor',
  senderName: '',
  senderIsCursive: true,
  specialDate: new Date().toISOString().split('T')[0],
  message: 'Quería decirte lo mucho que significas para mí...',
  secretMessage: 'Eres mi mundo entero.',
  youtubeId: 'L_jWHffIx5E',
  imageUrl: '',
  theme: 'midnight-romance',
  particles: 'gold-dust',
  fontStyle: 'cursive',
  titleFontSize: 64,
  nameFontSize: 32,
  messageFontSize: 24,
  secretFontSize: 128,
  confettiStrength: 50,
  showDate: false,
  ambientSound: 'none',
};
