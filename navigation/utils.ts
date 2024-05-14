type TabIcon =
  | "home"
  | "home-outline"
  | "heart"
  | "heart-outline"
  | "time"
  | "time-outline";

export function getTabIcon({
  routeName,
  focused,
}: {
  routeName: string;
  focused: boolean;
}): TabIcon {
  if (routeName === "Favoritos") {
    return focused ? "heart" : "heart-outline";
  } else if (routeName === "Historial") {
    return focused ? "time" : "time-outline";
  }
  return focused ? "home" : "home-outline";
}
