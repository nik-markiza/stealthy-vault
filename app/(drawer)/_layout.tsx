import CustomDrawerContent from "@/components/CustomDrawerContent";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

const SCREEN_OPTIONS = {
  drawerHideStatusBarOnOpen: true,
} as DrawerNavigationOptions

export default function DrawerLayout() {
  return (
		<Drawer
			screenOptions={SCREEN_OPTIONS}
			drawerContent={CustomDrawerContent}
		>
		<Drawer.Screen 
			name="index" 
			options={{ title: "Local Image", drawerLabel: 'Local Image' }} 
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