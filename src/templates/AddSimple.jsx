import React from 'react'
import { Row, Button, Input, Form, Col } from 'reactstrap'
// import $ from 'jquery'

import gql from 'graphql-tag'

export default class AddSimple extends React.Component {
  handleSubmitForm (e, type) {
    const query = gql`
    mutation Create${type}($name:String!){
      create${type}(
        name: $name
      ) {
        id
        name
      }
    }
    
`
    this.props.client.mutate({ mutation: query, variables: { name: e.target.elements.name.value } }).then(results => {
      console.log(results)
    }).catch(console.log)
    e.preventDefault()
    e.persist()
  }

  render () {
    return (
      <div className='mt-3'>
        <div className='mb-2'>Add Publisher/Platform</div>
        <div className='site-form blackblock'>
          <Row>
            <Col md={6}>
              <Form onSubmit={e => this.handleSubmitForm(e, 'Publisher')}>
                <Row form>
                  <Col md={8}>
                    <Input type='text' name='name' />
                  </Col>
                  <Col md={4}>
                    <Button color='primary' className='mb-2'>Add Publisher</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col md={6}>
              <Form onSubmit={e => this.handleSubmitForm(e, 'Platform')}>
                <Row form>
                  <Col md={8}>
                    <Input type='text' name='name' />
                  </Col>
                  <Col md={4}>
                    <Button color='primary' className='mb-2'>Add Platform</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
