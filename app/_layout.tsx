import { Drawer } from "expo-router/drawer";
export default function Layout() {
  return (
    <Drawer screenOptions={{ drawerHideStatusBarOnOpen: true}}>
      <Drawer.Screen 
        name="index" 
        options={{ title: "Home" }} 
      />
      <Drawer.Screen 
        name="localimage" 
        options={{ title: "Local Image" }} 
      />
      <Drawer.Screen 
        name="localfile" 
        options={{ title: "Local File" }} 
      />
      <Drawer.Screen 
        name="onlineimage" 
        options={{ title: "Online Image" }} 
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