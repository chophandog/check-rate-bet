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
		radio: 0,
		recent: "betMin",
	});

	useEffect(() => {
		if (state.recent === "betMin") {
			resultBetMax(state.rateMin, state.rateMax, state.betMin, state.radio);
		} else {
			resultBetMin(state.rateMin, state.rateMax, state.betMax, state.radio);
		}
	}, [state.rateMin, state.rateMax, state.radio]);

	const onRateMinChange = (e) => {
		setState((prevState) => ({ ...prevState, rateMin: e.target.value }));
	};
	const onRateMaxChange = (e) => {
		setState((prevState) => ({ ...prevState, rateMax: e.target.value }));
	};
	const onBetMinChange = (e) => {
		setState((prevState) => ({ ...prevState, betMin: +e.target.value, recent: "betMin" }));
		resultBetMax(state.rateMin, state.rateMax, +e.target.value, state.radio);
	};

	const onBetMaxChange = (e) => {
		setState((prevState) => ({ ...prevState, betMax: +e.target.value, recent: "betMax" }));
		resultBetMin(state.rateMin, state.rateMax, +e.target.value, state.radio);
	};
	const onRadioChange = (e) => {
		setState((prevState) => ({ ...prevState, radio: +e.target.value }));
	};

	const resultBetMax = (rateMin, rateMax, betMin, radio) => {
		if (rateMin && rateMin !== 0 && rateMax && rateMax !== 0 && betMin && betMin !== 0) {
			//1.8 || 2.4
			if (radio === 0) {
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
			} else if (radio === 1) {
				const betMax = betMin * rateMax - betMin;
				const totalBet = Math.round(betMin + betMax);
				const totalWin = Math.round(betMax * rateMin);
				const win = totalWin - totalBet;
				const ratioWin = ((win / totalBet) * 100).toFixed(1);
				setState((prevState) => ({
					...prevState,
					betMax: Math.round(betMax),
					totalBet: totalBet,
					totalWin: totalWin,
					win: win,
					ratioWin: ratioWin,
				}));
			} else if (radio === 2) {
				const betMax = betMin / (rateMin - 1);
				const totalBet = Math.round(betMin + betMax);
				const totalWin = Math.round(betMin * rateMax);
				const win = totalWin - totalBet;
				const ratioWin = ((win / totalBet) * 100).toFixed(1);
				setState((prevState) => ({
					...prevState,
					betMax: Math.round(betMax),
					totalBet: totalBet,
					totalWin: totalWin,
					win: win,
					ratioWin: ratioWin,
				}));
			}
		}
	};

	const resultBetMin = (rateMin, rateMax, betMax, radio) => {
		if (rateMin && rateMin !== 0 && rateMax && rateMax !== 0 && betMax && betMax !== 0) {
			if (radio === 0) {
				const ratio = rateMin / rateMax;
				const totalBet = Math.round(betMax + ratio * betMax);
				const totalWin = Math.round(betMax * rateMin);
				const win = totalWin - totalBet;
				const ratioWin = ((win / totalBet) * 100).toFixed(1);
				setState((prevState) => ({
					...prevState,
					betMin: Math.round(ratio * betMax),
					totalBet: totalBet,
					totalWin: totalWin,
					win: win,
					ratioWin: ratioWin,
				}));
			} else if (radio === 1) {
				const betMin = betMax / (rateMax - 1);
				const totalBet = Math.round(betMax + betMin);
				const totalWin = Math.round(betMax * rateMin);
				const win = totalWin - totalBet;
				const ratioWin = ((win / totalBet) * 100).toFixed(1);
				setState((prevState) => ({
					...prevState,
					betMin: Math.round(betMin),
					totalBet: totalBet,
					totalWin: totalWin,
					win: win,
					ratioWin: ratioWin,
				}));
			} else if (radio === 2) {
				const betMin = betMax * rateMin - betMax;
				const totalBet = Math.round(betMin + betMax);
				const totalWin = Math.round(betMin * rateMax);
				const win = totalWin - totalBet;
				const ratioWin = ((win / totalBet) * 100).toFixed(1);
				setState((prevState) => ({
					...prevState,
					betMin: Math.round(betMin),
					totalBet: totalBet,
					totalWin: totalWin,
					win: win,
					ratioWin: ratioWin,
				}));
			}
		}
	};

	return (
		<div className="App">
			<h3>Ăn Dín</h3>
			<input type="text" placeholder="rate thấp" value={state.rateMin} name="rateMin" onChange={onRateMinChange} />
			<input type="text" placeholder="rate cao" value={state.rateMax} name="rateMax" onChange={onRateMaxChange} />
			<input type="text" placeholder="bẹt rate to" value={state.betMin} name="betMin" onChange={onBetMinChange} />
			<input type="text" placeholder="bẹt rate nhỏ" value={state.betMax} name="betMin" onChange={onBetMaxChange} />
			{!state.win ? null : state.win === 0 ? (
				<p>Hoà</p>
			) : state.win < 0 ? (
				<p>Lộ</p>
			) : (
				<>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
						<div style={{ display: "flex", gap: "8px" }}>
							<input
								style={{ width: "unset", cursor: "pointer" }}
								type="radio"
								id={0}
								value={0}
								checked={state.radio === 0}
								onChange={onRadioChange}
								name="line"
							/>
							<label htmlFor={0}>Chia 2</label>
						</div>
						<div style={{ display: "flex", gap: "8px" }}>
							<input
								style={{ width: "unset", cursor: "pointer" }}
								type="radio"
								id={1}
								value={1}
								checked={state.radio === 1}
								onChange={onRadioChange}
								name="line"
							/>
							<label htmlFor={1}>rate nhỏ ăn</label>
						</div>
						<div style={{ display: "flex", gap: "8px" }}>
							<input
								style={{ width: "unset", cursor: "pointer" }}
								type="radio"
								id={2}
								value={2}
								checked={state.radio === 2}
								onChange={onRadioChange}
								name="line"
							/>
							<label htmlFor={2}>rate bự ăn</label>
						</div>
					</div>
					<p>bẹt rate to: {state.betMin}</p>
					<p>bẹt rate nhỏ: {state.betMax}</p>
					<p>Tổng bẹt: {state.totalBet}</p>
					<p>Tổng win: {state.totalWin}</p>
					<p>Tổng lời: {state.win}</p>
					<p>Phần trăm lời: {state.ratioWin}%</p>
					{state.radio !== 0 && (
						<>
							<br />
							<p>Nếu kèo ngược lại ăn thì:</p>
							<p>Tổng win: 0</p>
							<p>Tổng lời: 0</p>
							<p>Phần trăm lời: 0%</p>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default App;
