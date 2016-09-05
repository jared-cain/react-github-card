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
                <button>add</button>
            </form>
        );
    }
});


var Main = React.createClass({
    getInitialState: function(){
        return { logins: [] };
    },
    addCard: function(loginToAdd){
       // var dupe_count = 0;
       // this.state.logins.forEach(function(el, ind, arr){
       //     console.log(el);
       //      if (el == loginToAdd) {
       //          dupe_count++
       //      }
       // });
       //  console.log(dupe_count);
       //  if (dupe_count >= 1){
       //      dupe_count = 0;
       //      return;
       //  }
       //  else {
       //      this.setState({logins: this.state.logins.concat(loginToAdd)});
       //  }

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