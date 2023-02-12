import "./App.css"
import Card from "./components/Card/Card"
import Form from "./components/Form/Form"
import LoadingIcon from "./components/LoadingIcon/LoadingIcon"
import IconBar from "./components/IconBar/IconBar"
import { useState, useEffect } from "react"
import { useTransition, animated } from "react-spring"

function App() {
	const [prompt, setPrompt] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [responses, setResponses] = useState(() => {
		const storage = JSON.parse(localStorage.getItem("responses"))
		return storage || []
	})
	const [settings, setSettings] = useState(() => {
		const localSettings = JSON.parse(localStorage.getItem("settings"))

		return (
			localSettings || {
				model: "text-curie-001",
				temperature: 0.5,
				max_tokens: 50,
			}
		)
	})

	useEffect(() => {
		localStorage.setItem("responses", JSON.stringify(responses))
	}, [responses])

	useEffect(() => {
		localStorage.setItem("settings", JSON.stringify(settings))
	}, [settings])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		const body = JSON.stringify({
			prompt: prompt,
			model: settings.model,
			temperature: settings.temperature,
			max_tokens: settings.max_tokens,
		})

		console.log(body)

		const response = await fetch("/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		})
		const data = await response.json()
		setResponses([
			{
				prompt: prompt,
				response: data.response.choices[0].text,
				model: data.response.model,
			},
			...responses,
		])
		setIsLoading(false)
		setPrompt("")
	}

	const transitionIcon = useTransition(isLoading, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	})

	const transitionCard = useTransition(!isLoading, {
		from: { opacity: 0, marginTop: 100 },
		enter: { opacity: 1, marginTop: 0 },
		leave: { opacity: 0, marginTop: 100 },
	})

	return (
		<div className="App">
			<IconBar />
			<div className="form-container">
				<Form
					prompt={prompt}
					setPrompt={setPrompt}
					handleSubmit={handleSubmit}
					settings={settings}
					setSettings={setSettings}
				/>
			</div>
			<div
				style={isLoading ? { overflow: "hidden" } : {}}
				className="responses"
			>
				{!responses.length && !isLoading && <h2>Ask GPT3 anything!</h2>}
				{transitionIcon((style, loading) =>
					loading ? (
						<animated.div style={style}>
							<LoadingIcon />
						</animated.div>
					) : null
				)}
				{transitionCard((style, loaded) =>
					loaded
						? responses.map((response, index) => (
								<animated.div className="card" key={index} style={style}>
									<Card response={response} />
									<small
										style={{
											position: "absolute",
											right: 0,
											bottom: 0,
											float: "right",
										}}
									>
										{response.model}
									</small>
								</animated.div>
						  ))
						: null
				)}
			</div>
		</div>
	)
}

export default App
