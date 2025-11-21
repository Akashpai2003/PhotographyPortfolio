
import { Photo } from './types';

/* 
  =============================================================================
  HOW TO CUSTOMIZE YOUR PHOTOS
  =============================================================================
  1. To change an image, replace the 'url' string with your own image link.
  2. To change the text in the popup bubble, edit the 'caption'.
  3. To change the text under the icon on the desktop, edit 'location'.
  4. You can adjust 'top' and 'left' percentages to move them around on Desktop.
     (Note: Mobile layout is handled automatically)
*/

export const INITIAL_PHOTOS: Photo[] = [
  // --- Top Left Cluster ---
  {
    id: '5',
    url: 'https://picsum.photos/id/1015/600/400',
    caption: 'Morning mist in the valley.',
    location: 'Psycho_Dia_01.jpg',
    rotation: 0,
    top: '5%',
    left: '5%',
    zIndex: 15,
    type: 'image'
  },
  {
    id: '101',
    url: 'https://picsum.photos/id/16/400/300',
    caption: 'The waves were perfect today.',
    location: 'DCIM_0042.jpg',
    rotation: 0,
    top: '5%',
    left: '15%',
    zIndex: 14,
    type: 'image'
  },
  {
    id: '102',
    url: 'https://picsum.photos/id/28/500/400',
    caption: 'Found this quiet spot in the woods.',
    location: 'woods_scan.jpg',
    rotation: 0,
    top: '20%',
    left: '8%',
    zIndex: 13,
    type: 'image'
  },

  // --- Top Right Cluster ---
  {
    id: '6',
    url: 'https://picsum.photos/id/1040/500/500',
    caption: 'The light hitting this castle was unreal.',
    location: 'CTRL_comp_1.jpg',
    rotation: 0,
    top: '8%',
    left: '85%',
    zIndex: 16,
    type: 'image'
  },
  {
    id: '103',
    url: 'https://picsum.photos/id/42/400/500',
    caption: 'Routine.',
    location: 'morning_routine.png',
    rotation: 0,
    top: '12%',
    left: '75%',
    zIndex: 15,
    type: 'image'
  },
  {
    id: '12',
    url: 'https://picsum.photos/id/535/400/300',
    caption: 'Desert winds picking up.',
    location: 'inspiration_v1.jpg',
    rotation: 0,
    top: '25%',
    left: '88%',
    zIndex: 16,
    type: 'image'
  },

  // --- Bottom Right Cluster ---
  {
    id: '7',
    url: 'https://picsum.photos/id/1060/400/500',
    caption: 'Color study #4.',
    location: 'Moods.jpg',
    rotation: 0,
    top: '65%',
    left: '78%',
    zIndex: 17,
    type: 'image'
  },
  {
    id: '104',
    url: 'https://picsum.photos/id/64/400/300',
    caption: 'She looked right at the lens.',
    location: 'portrait_ref.jpg',
    rotation: 0,
    top: '75%',
    left: '85%',
    zIndex: 18,
    type: 'image'
  },
  {
    id: '105',
    url: 'https://picsum.photos/id/91/300/400',
    caption: 'Textures of the old city.',
    location: 'texture_04.png',
    rotation: 0,
    top: '55%',
    left: '90%',
    zIndex: 12,
    type: 'image'
  },

  // --- Bottom Left Cluster ---
  {
    id: '8',
    url: 'https://picsum.photos/id/1076/500/350',
    caption: 'Final shot of the day.',
    location: 'logo_final2.png',
    rotation: 0,
    top: '70%',
    left: '15%',
    zIndex: 12,
    type: 'image'
  },
  {
    id: '106',
    url: 'https://picsum.photos/id/129/400/400',
    caption: 'Sunday chill.',
    location: 'sunday_chill.jpg',
    rotation: 0,
    top: '60%',
    left: '5%',
    zIndex: 11,
    type: 'image'
  },
  {
    id: '107',
    url: 'https://picsum.photos/id/180/500/300',
    caption: 'My messy workspace.',
    location: 'desktop_clean.jpg',
    rotation: 0,
    top: '82%',
    left: '8%',
    zIndex: 13,
    type: 'image'
  },

  // --- Scattered Middle ---
  {
    id: '108',
    url: 'https://picsum.photos/id/230/300/500',
    caption: 'Street lights buzzing.',
    location: 'night_walk.jpg',
    rotation: 0,
    top: '45%',
    left: '80%',
    zIndex: 14,
    type: 'image'
  },
  {
    id: '109',
    url: 'https://picsum.photos/id/349/500/300',
    caption: 'City views.',
    location: 'city_view.jpg',
    rotation: 0,
    top: '50%',
    left: '12%',
    zIndex: 15,
    type: 'image'
  },
  {
    id: '110',
    url: 'https://picsum.photos/id/400/300/300',
    caption: 'Greenery.',
    location: 'plant_life.jpg',
    rotation: 0,
    top: '85%',
    left: '60%',
    zIndex: 16,
    type: 'image'
  },
  {
    id: '111',
    url: 'https://picsum.photos/id/450/400/300',
    caption: 'Playing with shadows.',
    location: 'contrast_test.png',
    rotation: 0,
    top: '85%',
    left: '35%',
    zIndex: 16,
    type: 'image'
  }
];

// Empty string implies white background in App logic
export const DEFAULT_BG_IMAGE = '';
