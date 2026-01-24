export interface Game {
  id: string;
  slug: string;
  name: string;
  background_image: string;
  platforms: Platform[];
  genres: Common[];
}

export interface Platform {
  platform: Common;
}

export interface Common {
  id: string;
  slug: string;
  name: string;
}
