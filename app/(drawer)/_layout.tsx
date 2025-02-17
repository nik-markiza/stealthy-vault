import CustomDrawerContent from "@/components/CustomDrawerContent";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

const SCREEN_OPTIONS = {
  drawerHideStatusBarOnOpen: true,
} as DrawerNavigationOptions

export default function DrawerLayout() {
  return (
		<Drawer 
		drawerContent={CustomDrawerContent}
		screenOptions={SCREEN_OPTIONS}>
		<Drawer.Screen 
			name="index" 
			options={{ title: "Home" }} 
		/>
		<Drawer.Screen 
			name="localimage" 
			options={{ title: "Local Image" }} 
		/>
		<Drawer.Screen 
			name="onlineimage" 
			options={{ title: "Online Image" }} 
		/>
		<Drawer.Screen 
			name="localfile" 
			options={{ title: "Local File" }} 
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