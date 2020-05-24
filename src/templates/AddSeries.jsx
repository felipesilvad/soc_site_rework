import React from 'react'
import gql from 'graphql-tag'
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'

export default class AddOst extends React.Component {
  handleSubmitForm = (e) => {
    const query = gql`
    mutation CreateSeries($slug:String!, $name:String!){
      createSeries(
        name: $name
        slug: $slug
      ) {
        slug
        name
      }
    }
    
`
    this.props.client.mutate({ mutation: query, variables: { slug: e.target.elements.slug.value, name: e.target.elements.name.value } }).then(results => {
      console.log(results)
    }).catch(console.log)
    e.preventDefault()
    e.persist()
  }

  render () {
    return (
      <>
        <div className='mb-2 mt-3'>Add Series</div>
        <Form className='site-form blackblock' onSubmit={this.handleSubmitForm}>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for='slug'>Slug:</Label>
                <Input type='text' name='slug' />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='name'>Name:</Label>
                <Input type='text' name='name' />
              </FormGroup>
            </Col>
            <Col className='m-auto'>
              <Button type='submit' color='primary'>Add Series</Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}
