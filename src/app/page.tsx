import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase.from("wine_stock").select();
  console.log(data, error);
  return "Mi Bodega";
}
