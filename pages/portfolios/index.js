import axios from 'axios';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import Link from 'next/link';
import { useState } from 'react';

const graphQLDeletePortfolio = (id) => {
  const query = `
    mutation DeletePortfolio {
      deletePortfolio(id: "${id}")
    }
  `
  return axios.post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then(data => data.deletePortfolio)
}

const fetchPortfolios = () => {
  const query = `query Portfolios {
    portfolios { 
      _id, 
      title, 
      company, 
      companyWebsite, 
      location, 
      jobTitle, 
      description,
      startDate,
      endDate
    }
  }`;
  return axios.post('http://localhost:3000/graphql', {query: query})
    .then(({data: graph}) => graph.data)
    .then(data => data.portfolios)
}

const graphQLCreatePortfolio = () => {
  const query = `
    mutation CreatePortfolio {
      createPortfolio(input: {
        title: "New Job"
        company: "New Company"
        companyWebsite: "New Website"
        location: "New Location"
        jobTitle: "New Job Title"
        description: "New Description"
        startDate: "12/12/2012"
        endDate: "11/14/2012"
      }) {
        _id, 
        title, 
        company, 
        companyWebsite, 
        location, 
        jobTitle, 
        description,
        startDate,
        endDate
      }
    }
  `;
  return axios.post('http://localhost:3000/graphql', {query: query})
    .then(({data: graph}) => graph.data)
    .then(data => data.createPortfolio)
}

const graphQLUpdatePortfolio = (id) => {
  const query = `
    mutation UpdatePortfolio {
      updatePortfolio(id: "${id}", input: {
        title: "Update Job"
        company: "Update Company"
        companyWebsite: "Update Website"
        location: "Update Location"
        jobTitle: "Update Job Title"
        description: "Update Description"
        startDate: "12/12/2012"
        endDate: "11/14/2012"
      }) {
        _id, 
        title, 
        company, 
        companyWebsite, 
        location, 
        jobTitle, 
        description,
        startDate,
        endDate
      }
    }
  `;
  return axios.post('http://localhost:3000/graphql', {query: query})
    .then(({data: graph}) => graph.data)
    .then(data => data.updatePortfolio)
}

const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await graphQLCreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  }

  const updatePortfolio = async (id) => {
    const updatedPortfolio = await graphQLUpdatePortfolio(id);
    const index = portfolios.findIndex(p => p._id === id);
    const newPortfolios = portfolios.slice();
    newPortfolios[index] = updatedPortfolio;
    setPortfolios(newPortfolios);
  }

  const deletePortfolio = async (id) => {
    const deletedId = await graphQLDeletePortfolio(id);
    const index = portfolios.findIndex(p => p._id === deletedId);
    const newPortfolios = portfolios.slice();
    newPortfolios.splice(index, 1);
    setPortfolios(newPortfolios);
  }
  
  return(
    <div>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={createPortfolio}>Create Portfolio</button>
      </section>
      <section className="pb-5">
        <div className="row">
          { portfolios.map(portfolio =>
              <div key={portfolio._id} className="col-md-4">
                <Link
                  href='/portfolios/[id]' 
                  as={`/portfolios/${portfolio._id}`}
                >
                  <a className="card-link">
                    <PortfolioCard portfolio={portfolio}/>
                  </a>
                </Link>
                <button className="btn btn-warning" onClick={() => updatePortfolio(portfolio._id)}>Update Portfolio</button>
                <button className="btn btn-danger" onClick={() => deletePortfolio(portfolio._id)}>Delete Portfolio</button>
              </div>
            )
          }
        </div>
      </section>
    </div>
  )
}

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { data: {portfolios} };
}

export default Portfolios;