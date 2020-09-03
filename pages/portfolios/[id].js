import React from 'react';

class PortfolioDetail extends React.Component{

    // Called on the server
    static getInitialProps({ query }) {
        return { query };
    }

    render() {
        const { id } = this.props.query;
        return (
            <h1>I am detail page with ID: { id }</h1>
        )
    }
}

export default PortfolioDetail;