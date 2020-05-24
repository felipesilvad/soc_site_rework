import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddForms from './templates/AddForms'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({
  uri: '/api'
})

export default class App extends React.Component {
  render () {
    return (
      <>
        <header className='header'>
          <p><a href="{% url 'ost:list' %}"><img src='/img/winterlogo.png' width='250px;' /></a></p>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <ul className='navbar-nav mr-auto'>
              {/* % if user.is_authenticated % */}
              <li className='nav-item'>
                {/* <!-- <form className="logout-link" action="{% url 'accounts:logout' %}" method="post">
                                  {% csrf_token %}
                                  <button type="submit">Logout</button>
  </form> --> */}
              </li>
              <li className='nav-item'><a href='' className='nav-link'>Home</a></li>
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
        <AddForms client={client} ost={{}} platform={{}} game={{}} />
      </>
    )
  }
}
