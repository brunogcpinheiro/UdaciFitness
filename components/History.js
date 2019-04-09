import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/api";
import Calendar from "udacifitness-calendar";
import { white } from "../utils/colors";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";

class History extends Component {
	componentDidMount () {
		const { dispatch } = this.props;

		fetchCalendarResults()
			.then(entries => dispatch(receiveEntries(entries)))
			.then(({ entries }) => {
				if (!entries[timeToString()]) {
					dispatch(
						addEntry({
							[timeToString()]: getDailyReminderValue(),
						}),
					);
				}
			});
	}

	renderItem = ({ today, ...metrics }, formattedDate, key) => (
		<View style={styles.item}>
			{today ? (
				<View>
					<DateHeader date={formattedDate} />
					<Text style={styles.noDateText}>{today}</Text>
				</View>
			) : (
				<TouchableOpacity onPress={() => console.log("Pressed!")}>
					<MetricCard metrics={metrics} date={formattedDate} />
				</TouchableOpacity>
			)}
		</View>
	);

	renderEmptyDate (formattedDate) {
		return (
			<View style={styles.item}>
				<DateHeader date={formattedDate} />
				<Text style={styles.noDateText}>
					You didn't log any data on this day.
				</Text>
			</View>
		);
	}

	render () {
		const { entries } = this.props;

		return (
			<Calendar
				items={entries}
				renderItem={this.renderItem}
				renderEmptyDate={this.renderEmptyDate}
			/>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: white,
		borderRadius: Platform.OS === "ios" ? 16 : 8,
		padding: 20,
		marginRight: 10,
		marginLeft: 10,
		marginTop: 17,
		marginBottom: 17,
		justifyContent: "center",
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: "rgba(0,0,0,0.24)",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: Platform.OS === "ios" ? 0 : 3,
	},
	noDateText: {
		fontSize: 16,
		paddingTop: 20,
		paddingBottom: 20,
	},
});

function mapStateToProps (entries) {
	return {
		entries,
	};
}

export default connect(mapStateToProps)(History);
