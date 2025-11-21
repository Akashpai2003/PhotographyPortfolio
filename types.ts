
export interface Photo {
  id: string;
  url: string;
  caption: string;
  location: string; // Used as the filename label
  rotation: number;
  top: string;
  left: string;
  zIndex: number;
  type: 'image' | 'folder' | 'doc';
}

export interface GeminiResponse {
  text: string;
}

export enum ViewState {
  GALLERY = 'GALLERY',
  MODAL = 'MODAL'
}
