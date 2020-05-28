import React from 'react'
import gql from 'graphql-tag'
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import serialize from 'form-serialize'
import getBase64 from './getBase64'

export default class AddOst extends React.Component {
  handleSubmitForm = async (e) => {
    e.preventDefault()
    e.persist()

    const query = gql`
    mutation CreateSeries($slug:String!, $name:String!, $cover: String!){
      createSeries(
        name: $name
        slug: $slug
        cover: $cover
      ) {
        slug
        name
      }
    }
    
`

    const data = serialize(e.target, { hash: true })
    data.cover = await getBase64(e.target.elements.cover.files[0])
    this.props.client.mutate({ mutation: query, variables: data }).then(results => {
      console.log(results)
    }).catch(console.log)
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
            <Col md={4}>
              <FormGroup>
                <Label for='cover'>Cover:</Label>
                <Input name='cover' type='file' accept='image/*' />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className='m-auto'>
              <Button type='submit' color='primary'>Add Series</Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}
