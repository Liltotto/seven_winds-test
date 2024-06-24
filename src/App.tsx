
import './App.scss'
import Header from './components/Header/Header'
import MainSection from './components/MainSection/MainSection'
import ProjectsList from './components/ProjectsList/ProjectsList'

function App() {

	return (
		<>
			<Header />
			<div className="common-section">
				<ProjectsList />
				<MainSection />
			</div>

		</>
	)
}

export default App
