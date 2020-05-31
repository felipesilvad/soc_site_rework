import React from 'react'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { Container, Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'

export default class OstDetail extends React.Component {
  state = {
    ost: {
      platforms: [],
      games: [],
      artists: [],
      classes: [],
      types: [],
      available: [],
      links: []
    }
  }

  componentDidMount () {
    const query = gql`
      query Ost ($id: ID) {
        ost(id: $id){
          title
          subTitle
          releaseDate
          vgmdb
          platforms {
            id
            name
          }
          games {
            slug
            name
          }
          artists {
            id
            name
          }
          classes {
            name
          }
          types {
            name
          }
          available {
            url
            provider
          }
          links{
            title
            links{
              url
              provider
              custom
            }
          }
        }
      }
    `
    this.props.client.query({ query, variables: { id: this.props.ost } }).then(results => {
      this.setState({ ost: results.data.ost })
    }).catch(err => {
      console.log(err)
      toast.error('Failed to fetch server info')
    })
  }

  render () {
    return (
      <div className='ost-container' style={{ backgroundImage: `/img/ost/${this.props.ost}.png` }}>
        <div className='background-overlay'>
          <Container>
            <div className='ost-detail'>
              <Row>
                <Col lg={5}><img className='img-fluid' src={`/img/ost/${this.props.ost}.png`} /></Col>
                <Col lg={7} className='blackblock'>
                  <Row><Col><h1 className='text-center ost-title'>{this.state.ost.title}</h1></Col></Row>
                  <Row><Col><h6 className='text-center tracklist'>{this.state.ost.subTitle}</h6></Col></Row>
                  <table className='table table-dark'>
                    <tbody>
                      <tr>
                        <th className='width-row'>Release Date</th>
                        <td>{this.state.ost.releaseDate}</td>
                      </tr>

                      {this.state.ost.artists.length > 0 ? (
                        <tr>
                          <th>Composers</th>
                          <td>
                            {this.state.ost.artists.map(({ id, name }) => name).join(', ')}
                          </td>
                        </tr>
                      ) : null}

                      <tr>
                        <th>Classification</th>
                        <td>
                          {this.state.ost.classes.map(({ name }) => `${name} Soundtrack`).join(' & ')}
                          {' - '}{this.state.ost.types.map(({ name }) => name).join(', ')}
                        </td>
                      </tr>
                      {this.state.ost.label ? (
                        <tr>
                          <th>Published by</th>
                          <td>{this.state.ost.label}</td>
                        </tr>
                      ) : null}
                      {this.state.ost.platforms.length > 0 ? (
                        <tr>
                          <th>Platforms</th>
                          <td>
                            {this.state.ost.platforms.map(({ id, name }) => <a key={id} href={`/platform/${id}`}>{name}</a>)}
                          </td>
                        </tr>
                      ) : null}

                      {this.state.ost.games.length > 0 ? (
                        <tr>
                          <th>Games</th>
                          <td>
                            {this.state.ost.games.map(({ slug, name }) => <a key={slug} href={`/game/${slug}`}>{name}</a>)}
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </div>

            <hr className='style2 style-white' />

            <Row className='row'>
              <div className='col-lg-6'>
                <div className='blackblock h-100 d-inline-block'>
                  <h1 className='text-center ost-title'>TRACKLIST</h1>
                  <h6 className='tracklist'>{this.state.ost.tracklist}</h6>
                </div>
              </div>
              <Col lg={6} className='blackblock px-10px pt-0'>
                {this.state.ost.vgmdb ? (
                  <Row>
                    <p className='pl-2'>Check album at:</p>
                    <a target='_blank' rel='noopener noreferrer' href={this.state.ost.vgmdb}><img width='100px' src='https://vgmdb.net/db/img/vgmdblogo.png' /></a>
                  </Row>) : null}

                {this.state.ost.available.length > 0 ? (
                  <Row className='mt-2'>
                    <Col>
                      <div className='red-block links-list' style={{ paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '10px' }}>
                        <h1 className='text-center ost-title'>Buy The Original Soundtrack to support the artists</h1>
                        <hr className='style-white w-100 mt-0' />
                        {this.state.ost.available.map(({ url, provider }) => (
                          <div className='links-list-items' key={provider}>
                            <a target='_blank' rel='noopener noreferrer' href={url}><img className='link-img' src={`/img/provider/${provider}.jpg`} /></a>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>) : null}

                {this.state.ost.links.length > 0 ? (this.state.ost.links.map(({ links, title, small }, i) => (
                  <Row className='mt-3' key={i}>
                    <Col>
                      <Row>
                        <Col md={12}>
                          {small
                            ? <h5 className='text-center'>{title}</h5>
                            : <h2 className='text-center'>{title}</h2>}
                        </Col>
                      </Row>
                      <Row className='text-center'>
                        {links.map(({ url, provider, custom }, i) => (
                          <Col key={i} md={4} className='px-3 mx-auto'>
                            <Button
                              className='download-button w-100' style={{
                                backgroundColor: custom ? '#c321ff' : '#2185f5',
                                borderColor: custom ? '#c321ff' : '#2185f5'
                              }}
                            >
                              <a target='_blank' rel='noopener noreferrer' className='dla' href={url}>{provider}</a>
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>))) : null}
              </Col>

              <div className='blackblock w-100 m-3'><h1 className='text-center ost-title'>RELATED SOUNDTRACKS</h1></div>

              <div className='links-list w-100 m-3'>
                {/* % for ost in this.state.ost.releated_this.state.ost.all % */}
                <div className='ost-list-items'>
                  <a href='/ost/{{this.state.ost.slug}'>
                    <div className='.ost-list-items-bg'>
                      <p><img className='ost-list-img' src='{{this.state.ost.cover.url}' /></p>
                      <div className='ost-list-text text-wrap'>
                        {this.state.ost.title}
                      </div>
                    </div>
                  </a>
                </div>
                {/* % endfor % */}
              </div>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
