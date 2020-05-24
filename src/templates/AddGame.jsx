import React from 'react'
import gql from 'graphql-tag'
import Select from 'react-select'
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'

export default class AddGame extends React.Component {
  state={ publishers: [], series: [] }
  selectToArray (data) {
    if (data.length) return Array.from(data).map(e => e.value)
    else return [data.value]
  }

  componentDidMount () {
    const query = gql`
      query {
        series {
          slug
          name
        }
        publishers {
          id
          name
        }
      }
    `
    this.props.client.query({ query }).then(results => {
      this.setState(results.data)
    })
  }

  handleSubmitForm = (e) => {
    const query = gql`
    mutation CreateGame($slug:String!, $name:String!, $series: [ID]!, $publishers:[ID]!){
      createGame(
        name: $name
        slug: $slug
        series: $series
        publishers: $publishers
      ) {
        slug
        name
      }
    }
    
`
    const { slug, name, publishers, series } = e.target.elements
    console.log({ slug: slug.value, name: name.value, publishers: this.selectToArray(publishers), series: this.selectToArray(series) })
    this.props.client.mutate({ mutation: query, variables: { slug: slug.value, name: name.value, publishers: this.selectToArray(publishers), series: this.selectToArray(series.value) } }).then(results => {
      console.log(results)
    }).catch(console.log)
    e.preventDefault()
    e.persist()
  }

  render () {
    return (
      <>
        <div className='mb-2 mt-3'>Add Game</div>
        <Form className='site-form blackblock' onSubmit={this.handleSubmitForm}>
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label for='slug'>Slug:</Label>
                <Input type='text' name='slug' />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for='name'>Name:</Label>
                <Input type='text' name='name' />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label for='series'>Series:</Label>
                <Select isMulti name='series' options={this.state.series.map(c => ({ value: c.slug, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for='publishers'>Publishers:</Label>
                <Select isMulti name='publishers' options={this.state.publishers.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
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
