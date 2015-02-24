var React = require('react');

/* Actions */
var RunActions    = require('../actions/RunActions');

/* Components */
var { TabbedArea, TabPane } = require('react-bootstrap');
var MyOwnRuns          = require('./MyOwnRuns');
var MySavedQueries     = require('./MySavedQueries');
var AllRunningQueries  = require('./AllRunningQueries');

var QueryInformation = React.createClass({
  displayName: 'QueryInformation',

  getInitialState() {
    return {
      selectedTab: 1,
    };
  },

  componentDidMount() {
    RunActions.connect();
  },

  componentWillUnmount() {
    RunActions.disconnect();
  },

  render() {
    var {selectedTab} = this.state;
    return (
      <div className="row spaced query-information" style={{marginTop: 5}}>
        <TabbedArea bsStyle={'pills'} activeKey={selectedTab} animation={false} onSelect={this._onTabSelect}>
          {/* Lazy-init the child components so they can lazy-fetch their data. */}
          <TabPane eventKey={1} tab="My recent queries" className="query-information-table-tab">
            {selectedTab === 1 ? <MyOwnRuns /> : null}
          </TabPane>
          <TabPane eventKey={2} tab="My saved queries">
            {selectedTab === 2 ? <MySavedQueries /> : null}
          </TabPane>
          <TabPane eventKey={3} tab="All queries" className="query-information-table-tab">
            {selectedTab === 3 ? <AllRunningQueries /> : null}
          </TabPane>
        </TabbedArea>
      </div>
    );
  },

  _onTabSelect(selectedTab) {
    this.setState({selectedTab});
  },
});

module.exports = QueryInformation;