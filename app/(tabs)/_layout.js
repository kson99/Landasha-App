import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home-sharp" : "home-outline";
					} else if (route.name === "AddItem") {
						iconName = focused
							? "add-circle"
							: "add-circle-outline";
					} else if (route.name === "Wishlist") {
						iconName = focused ? "heart" : "heart-outline";
					} else if (route.name === "Account") {
						iconName = focused
							? "md-person-sharp"
							: "md-person-outline";
					}

					return (
						<Ionicons name={iconName} size={size} color={color} />
					);
				},
				tabBarActiveTintColor: "red",
				tabBarInactiveTintColor: "gray",
			})}>
			<Tabs.Screen
				name="Home"
				options={{
					headerShown: false,
				}}
			/>
			<Tabs.Screen name="Account" />
		</Tabs>
	);
};

export default TabsLayout;
