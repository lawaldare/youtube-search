import React, { Component } from 'react';
import SearchBar from './SearchBar';
import YouTube from '../api/YouTube';
import VideoList from '../components/VideoList';
import VideoDetails from './VideoDetails';

class App extends Component {
	state = {
		videos: [],
		selectedVideo: null
	};

	componentDidMount() {
		this.onTermSubmit('nigeria');
	}

	onTermSubmit = async (term) => {
		const response = await YouTube.get('/search', {
			params: {
				q: term
			}
		});

		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0]
		});
	};

	onVideoSelect = (video) => {
		this.setState({
			selectedVideo: video
		});
	};
	render() {
		return (
			<div className="ui container">
				<SearchBar onFormSubmit={this.onTermSubmit} />{' '}
				<div className="ui grid">
					<div className="ui row">
						<div className="eleven wide column">
							<VideoDetails video={this.state.selectedVideo} />{' '}
						</div>{' '}
						<div className="five wide column">
							<VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />{' '}
						</div>{' '}
					</div>{' '}
				</div>{' '}
			</div>
		);
	}
}

export default App;
