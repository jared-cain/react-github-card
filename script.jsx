var Card = React.createClass({
    getInitialState: function(){
        return {};
    },
    componentDidMount: function(){
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login, function(data){
            component.setState(data);
        });
    },
    render: function(){
        return (
            <div>
                <img src={this.state.avatar_url}
                     width="80" />
                <h3>{this.state.login}</h3>
                <hr/>
            </div>
        )
    }
});


var Form = React.createClass({
    handleSubmit: function(event){
        event.preventDefault();
        console.log("here");
        var loginInput = this.refs.login;
        this.props.addCard(loginInput.value);
        loginInput.value = "";
    },
    render: function(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="github lookup" ref="login" />
                <button className="btn btn-primary">add</button>
            </form>
        );
    }
});


var Main = React.createClass({
    getInitialState: function(){
        return { logins: [] };
    },
    addCard: function(loginToAdd){

        if (this.state.logins.indexOf(loginToAdd) < 0){
            this.setState({logins: this.state.logins.concat(loginToAdd)});
        }

    },
    render: function(){
        var cards = this.state.logins.map(function(login, i){
            return(<Card key={i} login={login} />);
        });
        return (
            <div className="well">
                <Form addCard={this.addCard}/>
                {cards}
            </div>
        )
    }
});



ReactDOM.render(<Main />, document.getElementById("root"));