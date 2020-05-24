import React from 'react'
import AddSimple from './AddSimple'
import AddOst from './AddOst'
import AddSeries from './AddSeries'
import AddGame from './AddGame'

export default class OstAdd extends React.Component {
  render () {
    return (
      <>
        <div className='container'>
          <AddOst client={this.props.client} />
          <AddSimple client={this.props.client} />
          <AddSeries client={this.props.client} />
          <AddGame client={this.props.client} />
        </div>
        <script src='/static/slugify.js' />
      </>
    )
  }
}
