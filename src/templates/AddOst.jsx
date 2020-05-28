import React from 'react'
import gql from 'graphql-tag'
import Select from 'react-select'
import serialize from 'form-serialize'
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import getBase64 from './getBase64'

export class Links extends React.Component {
  state={ links: [[[]]] }
  render () {
    return (
      <>
        <Row>
          <Col>
            <Button
              color='primary' onClick={() => {
                const links = this.state.links
                links.push([[]])
                this.setState({ links: links })
              }}
            >Add Link Section
            </Button>
          </Col>
        </Row>
        <Row>
          {this.state.links.map((a, category) =>
            <Col md={6} key={category}>
              <Row>
                <Col md={6}>
                  <FormGroup className='mt-3'>
                    <Label>Category {category + 1} title:</Label>
                    <Input name='links[][title]' type='text' />
                  </FormGroup>
                </Col>
                <Col md={6} className='mt-auto'>
                  <FormGroup>
                    <Button
                      color='primary'
                      onClick={() => {
                        const links = this.state.links
                        links[category].push([])
                        this.setState({ links: links })
                      }}
                    >Add Link
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
              {this.state.links[category].map((l, link) =>
                <Row key={link}>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Provider:</Label>
                      <Input name={`links[${category}][links][${link}][provider]`} type='text' />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Url:</Label>
                      <Input name={`links[${category}][links][${link}][url]`} type='text' />
                    </FormGroup>
                  </Col>
                </Row>
              )}
            </Col>
          )}
        </Row>
      </>
    )
  }
}

export default class AddOst extends React.Component {
  state = { osts: [], games: [], platforms: [], classes: [], types: [], discs: 0 }

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
        platforms{
          id
          name
        }
        games {
          slug
          name
        }    
        osts {
          id
          title
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

    const data = serialize(e.target, { hash: true })

    data.artists = data.artists.split(',')
    data.discs = data.discs.map((d, i) => {
      const payload = d
      payload.number = i
      return payload
    })
    data.cover = await getBase64(e.target.elements.cover.files[0])
    console.log(data)

    const query = gql`
      mutation CreateOst(
        $title: String, 
        $subTitle: String, 
        $cover: String,
        $releaseDate: String,
        $label: String,
        $links: [CategoryInput],
        $artists: [String],
        $classes: [ID],
        $types: [ID],
        $platforms: [ID],
        $games: [ID],
        $discs: [DiscInput],
        $related: [ID]
      ){
        createOst(
          title: $title, 
          subTitle: $subTitle, 
          cover: $cover,
          releaseDate: $releaseDate,
          label: $label,
          links: $links,
          artists: $artists,
          classes: $classes,
          types: $types,
          platforms: $platforms,
          games: $games,
          discs: $discs,
          related: $related
        )
        {
          id
        }
      }
    `
    this.props.client.mutate({
      mutation: query,
      variables: data
    }).then(results => {
      console.log(results)
    }).catch(console.log)
  }

  render () {
    const discs = []
    for (let i = 0; i <= this.state.discs; i++) {
      discs.push(
        <Col md={6} key={i}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label>Disc {i + 1}:</Label>
                <Input name='discs[][body]' type='textarea' />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      )
    }

    return (
      <>
        <div className='mb-2 mt-3'>Add OST</div>
        <Form className='site-form blackblock' onSubmit={this.handleSubmitForm}>
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
                <Input name='artists' type='textarea' />
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
                <Select isMulti name='games' options={this.state.games.map(c => ({ value: c.slug, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for='classes'>Classification:</Label>
                <Select isMulti name='classes' options={this.state.classes.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='types'>Types:</Label>
                <Select isMulti name='types' options={this.state.types.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='cover'>Cover:</Label>
                <Input name='cover' type='file' accept='image/*' />
              </FormGroup>
            </Col>
          </Row>

          <hr className='style2 style-white' />

          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for='related'>Related OSTs:</Label>
                <Select isMulti name='related' options={this.state.osts.map(c => ({ value: c.id, label: c.title }))} styles={{ option: () => ({ color: 'black' }) }} />
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

          <hr className='style2 style-white' />

          <Links />

          <Row form>
            <Col className='m-auto'>
              <Button type='submit' color='primary'>Add OST</Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}
