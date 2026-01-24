export interface Game {
  id: string;
  slug: string;
  name: string;
  background_image: string;
  platforms: Platform[];
  genres: Common[];
}

export interface MutateGame extends Pick<
  Game,
  "id" | "name" | "slug" | "background_image"
> {
  backlog_id: number;
  raw_json: Game;
}

export interface Platform {
  platform: Common;
}

export interface Common {
  id: string;
  slug: string;
  name: string;
}
