import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { white, purple, gray } from "../utils/colors";

export default function UdaciSteppers ({
	max,
	step,
	unit,
	value,
	onIncrement,
	onDecrement,
}) {
	return (
		<View style={[ styles.row, { justifyContent: "space-between" } ]}>
			{Platform.OS === "ios" ? (
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={[
							styles.iosBtn,
							{ borderTopRightRadius: 0, borderBottomRightRadius: 0 },
						]}
						onPress={onDecrement}>
						<Entypo name="minus" color={purple} size={30} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.iosBtn,
							{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
						]}
						onPress={onIncrement}>
						<Entypo name="plus" color={purple} size={30} />
					</TouchableOpacity>
				</View>
			) : (
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={[
							styles.androidBtn,
							{ borderTopRightRadius: 0, borderBottomRightRadius: 0 },
						]}
						onPress={onDecrement}>
						<FontAwesome name="minus" color={white} size={30} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.androidBtn,
							{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
						]}
						onPress={onIncrement}>
						<FontAwesome name="plus" color={white} size={30} />
					</TouchableOpacity>
				</View>
			)}
			<View style={styles.metricCounter}>
				<Text style={{ fontSize: 24, textAlign: "center" }}>{value}</Text>
				<Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	metricCounter: {
		width: 90,
		justifyContent: "center",
		alignItems: "center",
	},
	iosBtn: {
		backgroundColor: white,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 3,
		padding: 5,
		paddingRight: 25,
		paddingLeft: 25,
	},
	androidBtn: {
		backgroundColor: purple,
		margin: 2,
		padding: 10,
		borderRadius: 2,
	},
});
