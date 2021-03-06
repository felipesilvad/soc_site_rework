import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import AddForms from './templates/AddForms'
import OstDetail from './templates/OstDetail'

import ApolloClient from 'apollo-boost'

import { useRoutes } from 'hookrouter'

const routes = {
  '/': () => <AddForms client={client} />,
  '/admin/ost': () => <AddForms client={client} />,
  '/ost/:id': ({ id }) => <OstDetail ost={id} client={client} />
}

const client = new ApolloClient({
  uri: '/api'
})

export default function App () {
  const routeResult = useRoutes(routes)
  return <AppContent route={routeResult} />
}

class AppContent extends React.Component {
  render () {
    return (
      <>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <header className='header'>
          <p><a href='/'><img alt='soc_logo' src='/img/winterlogo.png' width='250px;' /></a></p>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <ul className='navbar-nav mr-auto'>
              {/* % if user.is_authenticated % */}
              <li className='nav-item'>
                {/* <!-- <form className="logout-link" action="{% url 'accounts:logout' %}" method="post">
                                  {% csrf_token %}
                                  <button type="submit">Logout</button>
  </form> --> */}
              </li>
              <li className='nav-item'><a href='/' className='nav-link'>Home</a></li>
              <li className='nav-item'><a href="{% url 'ost:add' %}" className='nav-link'>Add OST</a></li>
              {/* % else % */}
              <li className='nav-item'><a href="{% url 'accounts:login' %}">Login</a></li>
              <li className='nav-item'><a href="{% url 'accounts:signup' %}">SignUp</a></li>
              {/* % endif % */}
            </ul>
            <form className='form-inline my-2 my-lg-0'>
              <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' />
              <button className='btn btn-outline-info my-2 my-sm-0' type='submit'>Search</button>
            </form>
          </nav>
        </header>
        {this.props.route}
      </>
    )
  }
}
