"use client";

import { Song } from "@/types";
import { createClient } from "@/lib/supabase/client";

const useLoadImage = (song: Song) => {
  const supabase = createClient();

  if (!song) {
    return null;
  }

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return data.publicUrl;
};

export default useLoadImage;