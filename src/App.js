import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [state, setState] = useState({
		rateMin: undefined,
		rateMax: undefined,
		betMin: 1000,
		betMax: 0,
		totalBet: 0,
		totalWin: 0,
		win: undefined,
		ratioWin: 0,
	});

	useEffect(() => {
		result(state.rateMin, state.rateMax, state.betMin, state.betMax);
	}, [state.rateMin, state.rateMax, state.betMin]);

	const onRateMinChange = (e) => {
		setState((prevState) => ({ ...prevState, rateMin: e.target.value }));
	};
	const onRateMaxChange = (e) => {
		setState((prevState) => ({ ...prevState, rateMax: e.target.value }));
	};
	const onBetMinChange = (e) => {
		setState((prevState) => ({ ...prevState, betMin: +e.target.value }));
	};

	const result = (rateMin, rateMax, betMin, betMax) => {
		if (rateMin && rateMin !== 0 && rateMax && rateMax !== 0 && betMin && betMin !== 0) {
			//1.8 || 2.4
			const ratio = rateMax / rateMin;
			const totalBet = Math.round(betMin + ratio * betMin);
			const totalWin = Math.round(betMin * rateMax);
			const win = totalWin - totalBet;
			const ratioWin = ((win / totalBet) * 100).toFixed(1);
			setState((prevState) => ({
				...prevState,
				betMax: Math.round(ratio * betMin),
				totalBet: totalBet,
				totalWin: totalWin,
				win: win,
				ratioWin: ratioWin,
			}));
		}
	};

	return (
		<div className="App">
			<h3>Ăn Dín</h3>
			<input type="text" placeholder="rate thấp" value={state.rateMin} name="rateMin" onChange={onRateMinChange} />
			<input type="text" placeholder="rate cao" value={state.rateMax} name="rateMax" onChange={onRateMaxChange} />
			<input type="text" placeholder="bẹt rate to" value={state.betMin} name="betMin" onChange={onBetMinChange} />
			{!state.win ? null : state.win === 0 ? (
				<p>Hoà</p>
			) : state.win < 0 ? (
				<p>Lộ</p>
			) : (
				<>
					<p>bẹt rate to: {state.betMin}</p>
					<p>bẹt rate nhỏ: {state.betMax}</p>
					<p>Tổng bẹt: {state.totalBet}</p>
					<p>Tổng win: {state.totalWin}</p>
					<p>Tổng lời: {state.win}</p>
					<p>Phần trăm lời: {state.ratioWin}%</p>
				</>
			)}
		</div>
	);
}

export default App;
