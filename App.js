import React from "react";
import { View } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

export default class App extends React.Component {
	render () {
		return (
			<Provider store={createStore(rootReducer)}>
				<View>
					<AddEntry />
				</View>
			</Provider>
		);
	}
}
