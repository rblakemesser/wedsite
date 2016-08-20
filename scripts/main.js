var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

/*
  NavItem
*/
var NavItem = React.createClass({
  mixins: [History],

  onClick: function(e) {
    e.preventDefault();
    this.history.pushState(null, this.props.destination);
  },

  render: function() {
    return (
      <div onClick={this.onClick} className="header-nav-item">
        <a href="#">{this.props.content}</a>
      </div>
    )
  }
});


/*
  Nav
*/
var Nav = React.createClass({

  render: function() {
    return (
      <header>
        <div className="header-title"><span>Blendra Wedding Shiz</span></div>
        <div className="header-nav">
          <NavItem content="about" destination="/" />
          <NavItem content="pics" destination="/pics" />
          <NavItem content="rsvp" destination="/rsvp" />
          <NavItem content="music" destination="/music" />
        </div>
      </header>
    )
  }
});

/*
  Home
*/
var Home = React.createClass({
  render: function() {
    return (
      <div className="main-container">
        <Nav />
        <div className="body"><p>this is the home page</p></div>
      </div>
    )
  }
});

var AddMusicForm = React.createClass({
  addSong: function(e) {
    e.preventDefault();

    var newSong = {
      title: this.refs.title.value,
      artist: this.refs.artist.value,
      addedBy: this.refs.addedBy.value,
      image: this.refs.image.value
    };

    this.props.addSong(newSong);
    this.refs.musicForm.reset();
  },

  render: function() {
    return (
      <form className="music-form" ref="musicForm" onSubmit={this.addSong}>
        <input type="text" ref="title" placeholder="Title" />
        <input type="text" ref="artist" placeholder="Artist" />
        <input type="text" ref="addedBy" placeholder="Your name" />
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Title</button>
      </form>
    )
  }
});

/*
  Song
*/
var Song = React.createClass({
  render: function() {
    return (
      <div className="music-list-item">
        <div className="music-list-item-image"><img src={this.props.image} /></div>
        <div className="music-list-item-title">{this.props.title}</div>
        <div className="music-list-item-artist">{this.props.artist}</div>
        <div className="music-list-item-addedBy">{this.props.addedBy}</div>
      </div>
    )
  }
});

/*
  Music
*/
var Music = React.createClass({
  getInitialState: function() {
    return {
      songs: {}
    }
  },

  addSong: function(song) {
    var timestamp = (new Date()).getTime();
    this.state.songs['song-' + timestamp] = song;
    this.setState({songs: this.state.songs});
  },

  renderSong: function(key) {
    var song = this.state.songs[key];

    return (
      <Song index={key} key={key} title={song.title} artist={song.artist} image={song.image} addedBy={song.addedBy} />
    )
  },

  render: function() {
    return (
      <div className="main-container">
        <Nav />
        <div className="body">
          <p>
            this is the music page. add songs if you are hip enough.
            don't worry-- ultimate veto power rests with the right people.
          </p>
          <div className="music">
            <div className="music-list">
              {Object.keys(this.state.songs).map(this.renderSong)}
            </div>
            <AddMusicForm addSong={this.addSong} />
          </div>
        </div>
      </div>
    )
  }
});

/*
  RSVP
*/
var RSVP = React.createClass({
  render: function() {
    return (
      <div className="main-container">
        <Nav />
        <div className="body">
          <p>this is the rsvp page</p>
        </div>
      </div>
    )
  }
});

/*
  Pics
*/
var Pics = React.createClass({
  render: function() {
    return (
      <div className="main-container">
        <Nav />
        <div className="body">
          <p>this is the pics page</p>
        </div>
      </div>
    )
  }
});

/*
  About
*/
var About = React.createClass({
  render: function() {
    return (
      <div className="main-container">
        <Nav />
        <div className="body">
          <p>
            We are kendra and blake.
          </p>
          <p>
            Our love is filled with relentless light and unfuckingstoppable happiness. It is the one true love.
          </p>
          <p>
            Come hear all about it.
          </p>
          </div>
      </div>
    )
  }
});

/*
  Not found
*/
var NotFound = React.createClass({
  render: function() {
    return (
      <div className="main-container">
        <Nav />
        <div className="body">
          <p>404. why are you so bad at this</p>
        </div>
      </div>
    )
  }
});

/*
  Routes
*/
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={About} />
    <Route path="/rsvp" component={RSVP} />
    <Route path="/pics" component={Pics} />
    <Route path="/music" component={Music} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
