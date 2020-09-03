import React from 'react';
import { useRouter } from 'next/router';

// const PortfolioDetail = () => {
//     const router = useRouter();
//     const { id } = router.query;

//     return (
//         <h1>I am detail pages with ID: {id}</h1>
//     )
// }

const PortfolioDetail = ({ query }) => {
    const { id } = query;

    return (
        <h1>I am detail pages with ID: {id}</h1>
    )
}

PortfolioDetail.getInitialProps = ({ query }) => {
    return { query };
}

// class PortfolioDetail extends React.Component{

//     // Called on the server
//     static getInitialProps({ query }) {
//         return { query };
//     }

//     render() {
//         const { id } = this.props.query;
//         return (
//             <h1>I am detail page with ID: { id }</h1>
//         )
//     }
// }

export default PortfolioDetail;