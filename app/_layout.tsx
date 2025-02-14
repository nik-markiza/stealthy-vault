import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen 
        name="index" 
        options={{ title: "Home" }} 
      />
      <Drawer.Screen 
        name="fileinfo" 
        options={{ title: "FileInfo" }} 
      />
      <Drawer.Screen 
        name="location" 
        options={{ title: "Location" }} 
      />
			<Drawer.Screen 
        name="map" 
        options={{ title: "Map" }} 
      />
      <Drawer.Screen 
        name="profile" 
        options={{ title: "Profile" }} 
      />
      <Drawer.Screen 
        name="settings" 
        options={{ title: "Settings" }} 
      />
    </Drawer>
  );
}