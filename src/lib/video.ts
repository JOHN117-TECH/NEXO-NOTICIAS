export interface Video {
  id: number;
  titulo: string;
  descripcion: string | null;
  categoria: string;
  mux_asset_id: string | null;
  mux_playback_id: string;
  duracion: number | null;
  activo: boolean;
  fecha_creacion: string;
}
export function videoDuration(seconds: number | null) {
  if (seconds === null) return "—";
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
