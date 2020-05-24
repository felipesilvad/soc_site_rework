import React from 'react'
import gql from 'graphql-tag'
import Select from 'react-select'
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class Disc extends React.Component {
  state={ tracks: 0 }
  render () {
    const tracks = []
    for (let i = 0; i <= this.state.tracks; i++) {
      tracks.push(
        <Row key={i}>
          <Col md={6}>
            <FormGroup>
              <Label>Name:</Label>
              <Input name={`disc[${this.props.id}][${i}][name]`} type='text' />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Length:</Label>
              <Input name={`disc[${this.props.id}][${i}][length]`} type='text' />
            </FormGroup>
          </Col>
        </Row>
      )
    }
    return (
      <Col md={6}>
        <Row>
          <Col>
            <FormGroup inline>
              <Label>Disc {this.props.id + 1}</Label>
              <Button className='ml-1' color='primary' onClick={() => this.setState({ tracks: this.state.tracks + 1 })}>Add Track</Button>
            </FormGroup>
          </Col>
        </Row>
        {tracks}
      </Col>
    )
  }
}

export default class AddOst extends React.Component {
  state = { platforms: [], classes: [], types: [], artists: [], discs: 0 }

  componentDidMount () {
    const query = gql`
      query {
        types {
          id
          name
        }
        classes {
          id
          name
        }
        artists{
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

  render () {
    const discs = []
    for (let i = 0; i <= this.state.discs; i++) {
      discs.push(
        <Disc key={i} id={i} />
      )
    }

    return (
      <>
        <div className='mb-2 mt-3'>Add OST</div>
        <Form className='site-form blackblock'>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='title'>Title:</Label>
                <Input type='text' name='title' />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='subTitle'>Sub Title:</Label>
                <Input type='text' name='subTitle' />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='releaseDate'>Release Date:</Label>
                <Input type='date' name='releaseDate' pattern='\d{4}-\d{2}-\d{2}' />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='label'>Label:</Label>
                <Input type='text' name='label' />
              </FormGroup>
            </Col>
          </Row>
          <hr className='style2 style-white' />
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for='artists'>Artists:</Label>
                <Select isMulti name='artists' options={this.state.artists.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for='platforms'>Platforms:</Label>
                <Select isMulti name='platforms' options={this.state.platforms.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for='games'>Games:</Label>
                <Select isMulti name='games' options={options} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='classes'>Classification:</Label>
                <Select isMulti name='classes' options={this.state.classes.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='types'>Types:</Label>
                <Select isMulti name='types' options={this.state.types.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
          </Row>

          <hr className='style2 style-white' />
          <Row>
            <Col>
              <Button color='primary' onClick={() => this.setState({ discs: this.state.discs + 1 })}>Add Disc</Button>
            </Col>
          </Row>

          <Row form className='mt-3'>
            {discs}
          </Row>
        </Form>
      </>
    )
  }
}
