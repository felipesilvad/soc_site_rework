import React from 'react'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { Container, Button, Col, Row } from 'reactstrap'

export default class OstDetail extends React.Component {
  state = {
    ost: {
      platforms: [],
      games: [],
      artists: [],
      classes: [],
      types: [],
      available: [],
      links: [],
      discs: [{ body: '' }]
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
            small
            links{
              url
              provider
              custom
            }
          }
          discs {
            number
            body
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
                <Col lg={5}><img alt='' className='img-fluid w-100 my-auto' src={`/img/ost/${this.props.ost}.png`} /></Col>
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
              <TrackList discs={this.state.ost.discs} />

              <Col lg={6} className='blackblock px-10px'>
                {this.state.ost.vgmdb ? (
                  <Row>
                    <Col className='mx-auto mb-2'>
                      Check album at:
                      <a target='_blank' rel='noopener noreferrer' href={this.state.ost.vgmdb}><img alt='' width='100px' src='https://vgmdb.net/db/img/vgmdblogo.png' /></a>
                    </Col>
                  </Row>) : null}

                {this.state.ost.available.length > 0 ? (
                  <Row className='mt-2'>
                    <Col>
                      <div className='red-block links-list' style={{ paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '10px' }}>
                        <h1 className='text-center ost-title'>Buy The Original Soundtrack to support the artists</h1>
                        <hr className='style-white w-100 mt-0' />
                        {this.state.ost.available.map(({ url, provider }) => (
                          <div className='links-list-items' key={provider}>
                            <a target='_blank' rel='noopener noreferrer' href={url}><img alt='' className='link-img' src={`/img/provider/${provider}.jpg`} /></a>
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
                      <p><img alt='' className='ost-list-img' src={`/img/ost/${this.props.ost}.png`} /></p>
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

class TrackList extends React.Component {
  state={ current: 0 }
  render () {
    return (
      <Col lg={6}>
        <div className='blackblock d-inline-block'>
          <Row>
            <Col>
              <h1 className='text-center ost-title'>TRACKLIST</h1>
            </Col>
          </Row>
          <Row style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            {this.props.discs.map(({ number }) => (
              <Col key={number} className='px-0 text-center'>
                <div
                  onClick={() => this.setState({ current: number })}
                  style={{
                    padding: '8px 8px 8px 8px',
                    cursor: this.state.current === number ? '' : 'pointer',
                    borderStyle: 'solid',
                    borderWidth: '2px 2px 2px 2px',
                    borderColor: '#efefef',
                    borderBottomWidth: this.state.current === number ? '0px' : '2px'
                  }}
                >
                Disc {number + 1}
                </div>
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <div style={{
                padding: '5px 5px 5px 5px',
                borderStyle: 'solid',
                borderWidth: '0px 2px 2px 2px',
                borderColor: '#efefef'
              }}
              >
                <table cellSpacing='0' cellPadding='1' border='0'>
                  <tbody>
                    {this.props.discs[this.state.current].body.split('\n').map((e, i) => {
                      const [track, length] = e.split(',')
                      return (
                        <tr key={i}>
                          <td className='smallfont' style={{ padding: '8px' }}>
                            <span className='label'>{i + 1}</span>
                          </td>
                          <td className='smallfont' width='100%' style={{ padding: '8px' }}>{track}</td>
                          <td className='smallfont' nowrap='nowrap' align='right' style={{ padding: '8px' }}>
                            <span className='time'>{length}</span>
                          </td>
                        </tr>

                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </div>
      </Col>

    )
  }
}
