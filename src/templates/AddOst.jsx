import React from 'react'
import gql from 'graphql-tag'
import Select from 'react-select'
import serialize from 'form-serialize'
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import { toast } from 'react-toastify'
import getBase64 from './getBase64'

class Links extends React.Component {
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
        {this.state.links.map((a, category) =>
          <Row key={category}>

            <Col>
              <Row>
                <Col md={6}>
                  <FormGroup className='mt-3'>
                    <Label>Category {category + 1} title:</Label>
                    <Input required name='links[][title]' type='text' />
                  </FormGroup>
                </Col>
                <Col md={3} className='mt-auto'>
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
                <Col md={3} className='mt-auto mb-3'>
                  <div class='form-check'>
                    <Input type='checkbox' name={`links[${category}][small]`} className='form-check-input' />
                    <Label className='form-check-label' for={`links[${category}][small]`}>Small Title</Label>
                  </div>
                </Col>
              </Row>
              {this.state.links[category].map((l, link) =>
                <Row key={link}>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Provider:</Label>
                      <Select
                        name={`links[${category}][links][${link}][provider]`} options={[
                          { value: 'MEGA', label: 'MEGA' },
                          { value: 'MEDIAFIRE', label: 'MediaFire' },
                          { value: 'GOOGLEDRIVE', label: 'Google Drive' },
                          { value: 'BEDRIVE', label: 'BeDrive' },
                          { value: 'MIRROR', label: 'Mirror' }
                        ]} styles={{ option: () => ({ color: 'black' }) }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Url:</Label>
                      <Input required name={`links[${category}][links][${link}][url]`} type='text' />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Direct Url:</Label>
                      <Input required name={`links[${category}][links][${link}][directUrl]`} type='text' />
                    </FormGroup>
                  </Col>
                  <Col md={3} className='mt-auto mb-3'>
                    <div class='form-check'>
                      <Input type='checkbox' name={`links[${category}][links][${link}][custom]`} className='form-check-input' />
                      <Label className='form-check-label' for={`links[${category}][links][${link}][custom]`}>Custom</Label>
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        )}
      </>
    )
  }
}

class AvailableLinks extends React.Component {
  state={ links: [[]] }
  render () {
    return (
      <>
        <Row>
          <Col>
            <Button
              color='primary' onClick={() => {
                const links = this.state.links
                links.push([])
                this.setState({ links: links })
              }}
            >Add Available link
            </Button>
          </Col>
        </Row>

        <Row>
          {this.state.links.map((item, i) => (
            <Col key={i} md={6}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Provider:</Label>
                    <Select
                      name={`available[${i}][provider]`} options={[
                        { value: 'amazon',  label: 'Amazon'},
                        { value: 'amazon_jp',  label: 'Amazon JP'},
                        { value: 'play_asia',  label: 'Play Asia'},
                        { value: 'cd_japan',  label: 'CD Japan'},
                        { value: 'spotify',  label: 'Spotify'},
                        { value: 'google_play',  label: 'Google Play'},
                        { value: 'steam',  label: 'Steam'},
                        { value: 'mora',  label: 'Mora'},
                        { value: 'apple_music',  label: 'Apple Music'},
                        { value: 'ototoy',  label: 'OTOTOY'},
                      ]} styles={{ option: () => ({ color: 'black' }) }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Url:</Label>
                    <Input required name={`available[${i}][url]`} type='text' />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </>
    )
  }
}

export default class AddOst extends React.Component {
  state = {
    ostLoading: false,
    osts: [],
    games: [],
    platforms: [],
    classes: [],
    types: [],
    discs: 0,
    loading: false
  }

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
      }
    `
    this.props.client.query({ query }).then(results => {
      this.setState(results.data)
    }).catch(err => {
      console.log(err)
      toast.error('Failed to fetch server info')
    })

    this.handleOstChange('')
  }

  handleSubmitForm = async (e) => {
    e.persist()
    e.preventDefault()
    const data = serialize(e.target, { hash: true })

    if (data.artists) data.artists = data.artists.split(',')
    data.discs = data.discs.map((d, i) => {
      const payload = d
      payload.number = i
      return payload
    })
    data.cover = await getBase64(e.target.elements.cover.files[0])
    data.links.forEach(link => {
      link.small = link.small === 'on'
      link.links.forEach(linkItem => {
        linkItem.custom = linkItem.custom === 'on'
      })
    })
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
        $related: [ID],
        $available: [LinkInput],
        $vgmdb: String
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
          related: $related,
          available: $available,
          vgmdb: $vgmdb
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
      toast.success(`Added "${data.title}" succesfully!`)
      e.target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    }).finally(() => this.setState({ loading: false }))
    this.setState({ loading: true })
  }

  handleOstChange = newValue => {
    this.setState({ ostLoading: true }, () => {
      const queryString = newValue === '' ? `
      query RecentOst($limit: Int!){
        recentOst(limit: $limit) {
          id
          title
        }
      }
    ` : `
    query SearchOst($title: String){
      searchOstByTitle(title: $title) {
        id
        title
      }
    }
  `
      const query = gql`${queryString}`
      this.props.client.query({ query, variables: { title: newValue, limit: 10 } }).then(results => {
        const data = results.data.searchOstByTitle || results.data.recentOst
        this.setState({ osts: data, ostLoading: false })
      }).catch(err => {
        console.log(err)
        this.setState({ ostLoading: false })
        toast.error('Failed to fetch server info')
      })
    })
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
                <Input required name='discs[][body]' type='textarea' />
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
                <Input required type='text' name='title' />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='subTitle'>Sub Title:</Label>
                <Input required type='text' name='subTitle' />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='releaseDate'>Release Date:</Label>
                <Input required type='date' name='releaseDate' pattern='\d{4}-\d{2}-\d{2}' />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='label'>Label:</Label>
                <Input required type='text' name='label' />
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
                <Select required isMulti name='classes' options={this.state.classes.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='types'>Types:</Label>
                <Select required isMulti name='types' options={this.state.types.map(c => ({ value: c.id, label: c.name }))} styles={{ option: () => ({ color: 'black' }) }} />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for='vgmdb'>VGMdb:</Label>
                <Input name='vgmdb' type='text' />
              </FormGroup>
            </Col>

          </Row>

          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for='cover'>Cover:</Label>
                <Input required name='cover' type='file' accept='image/*' />
              </FormGroup>
            </Col>
          </Row>

          <hr className='style2 style-white' />

          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for='related'>Related OSTs:</Label>
                <Select isMulti name='related' onInputChange={this.handleOstChange} isLoading={this.state.ostLoading} options={this.state.osts.map(c => ({ value: c.id, label: c.title }))} styles={{ option: () => ({ color: 'black' }) }} />
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

          <AvailableLinks />

          <hr className='style2 style-white' />

          <Links />

          <Row form>
            <Col className='m-auto'>
              {this.state.loading
                ? <Button type='submit' color='primary' className='py-0' disabled><img alt='' src='/img/assets/spinner_white.svg' style={{ height: '35px' }} /></Button>
                : <Button type='submit' color='primary'>Add OST</Button>}
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}
