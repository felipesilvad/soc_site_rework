import React from 'react'
import gql from 'graphql-tag'
import Select from 'react-select'
import serialize from 'form-serialize'
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import getBase64 from './getBase64'

export default class AddGame extends React.Component {
  state={ publishers: [], series: [], platforms: [] }

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
        platforms{
          id
          name
        }
      }
    `
    this.props.client.query({ query }).then(results => {
      this.setState(results.data)
    })
  }

  handleSubmitForm = async (e) => {
    e.preventDefault()
    e.persist()
    const game = serialize(e.target, { hash: true })
    game.cover = await getBase64(e.target.elements.cover.files[0])

    const query = gql`
    mutation CreateGame($cover:String, $releaseDate:String!, $slug:String!, $name:String!, $series: [String]!, $publishers:[ID]!, $platforms:[ID]){
      createGame(
        name: $name
        slug: $slug
        series: $series
        publishers: $publishers   
        releaseDate: $releaseDate
        cover: $cover,
        platforms: $platforms
      ) {
          slug
        }
      }
`
    console.log(game)
    this.props.client.mutate({
      mutation: query,
      variables: game
    }).then(results => {
      console.log(results)
    }).catch(console.log)
  }

  render () {
    return (
      <>
        <div className='mb-2 mt-3'>Add Game</div>
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
                <Label for='releaseDate'>Release Date:</Label>
                <Input type='date' name='releaseDate' pattern='\d{4}-\d{2}-\d{2}' />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for='series'>Series:</Label>
                <Select isMulti name='series' options={this.state.series.map(c => ({ value: c.slug, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='publishers'>Publishers:</Label>
                <Select isMulti name='publishers' options={this.state.publishers.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='platforms'>Platforms:</Label>
                <Select isMulti name='platforms' options={this.state.platforms.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for='cover'>Cover:</Label>
                <Input name='cover' type='file' accept='image/*' />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className='m-auto'>
              <Button type='submit' color='primary'>Add Game</Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}
