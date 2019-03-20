// utils/helpers.js
import React from "react";
import { View, StyleSheet } from "react-native";
import {
	FontAwesome,
	MaterialIcons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { white, red, orange, blue, lightPurp, pink } from "./colors";

export function isBetween (num, x, y) {
	if (num >= x && num <= y) {
		return true;
	}

	return false;
}

export function calculateDirection (heading) {
	let direction = "";

	if (isBetween(heading, 0, 22.5)) {
		direction = "Norte";
	} else if (isBetween(heading, 22.5, 67.5)) {
		direction = "Nordeste";
	} else if (isBetween(heading, 67.5, 112.5)) {
		direction = "Leste";
	} else if (isBetween(heading, 112.5, 157.5)) {
		direction = "Sudeste";
	} else if (isBetween(heading, 157.5, 202.5)) {
		direction = "Sul";
	} else if (isBetween(heading, 202.5, 247.5)) {
		direction = "Suldoeste";
	} else if (isBetween(heading, 247.5, 292.5)) {
		direction = "Oeste";
	} else if (isBetween(heading, 292.5, 337.5)) {
		direction = "Noroeste";
	} else if (isBetween(heading, 337.5, 360)) {
		direction = "Norte";
	} else {
		direction = "Calculando...";
	}

	return direction;
}

export function timeToString (time = Date.now()) {
	const date = new Date(time);
	const todayUTC = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
	);
	return todayUTC.toISOString().split("T")[0];
}

const styles = StyleSheet.create({
	iconContainer: {
		padding: 5,
		borderRadius: 8,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 20,
	},
});

export function getMetricMetaInfo (metric) {
	const info = {
		run: {
			displayName: "Run",
			max: 50,
			unit: "Kilometers",
			step: 1,
			type: "steppers",
			getIcon () {
				return (
					<View style={[ styles.iconContainer, { backgroundColor: red } ]}>
						<MaterialIcons name="directions-run" color={white} size={35} />
					</View>
				);
			},
		},
		bike: {
			displayName: "Bike",
			max: 100,
			unit: "kilometers",
			step: 1,
			type: "steppers",
			getIcon () {
				return (
					<View style={[ styles.iconContainer, { backgroundColor: orange } ]}>
						<MaterialCommunityIcons name="bike" color={white} size={35} />
					</View>
				);
			},
		},
		swim: {
			displayName: "Swim",
			max: 9900,
			unit: "meters",
			step: 100,
			type: "steppers",
			getIcon () {
				return (
					<View style={[ styles.iconContainer, { backgroundColor: blue } ]}>
						<MaterialCommunityIcons name="swim" color={white} size={35} />
					</View>
				);
			},
		},
		sleep: {
			displayName: "Sleep",
			max: 24,
			unit: "hours",
			step: 1,
			type: "slider",
			getIcon () {
				return (
					<View
						style={[ styles.iconContainer, { backgroundColor: lightPurp } ]}>
						<FontAwesome name="bed" color={white} size={35} />
					</View>
				);
			},
		},
		eat: {
			displayName: "Eat",
			max: 10,
			unit: "rating",
			step: 1,
			type: "slider",
			getIcon () {
				return (
					<View style={[ styles.iconContainer, { backgroundColor: pink } ]}>
						<MaterialCommunityIcons name="food" color={white} size={35} />
					</View>
				);
			},
		},
	};

	export function getDailyReminderValue () {
		return {
			today: "Don't forget to log your data today!",
		};
	}

	return typeof metric === "undefined" ? info : info[metric];
}
